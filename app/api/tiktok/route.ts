import { NextResponse } from "next/server";

export const runtime = 'edge';

async function fetchTikTokVideos(accessToken: string) {
    if (!accessToken) return [];

    try {
        const response = await fetch("https://open.tiktokapis.com/v2/video/list/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                max_count: 6, // Fetch 6 from each to get a good mix
                fields: [
                    "id",
                    "title",
                    "cover_image_url",
                    "embed_link",
                    "view_count",
                    "like_count",
                    "create_time"
                ]
            }),
            next: { revalidate: 3600 }
        });

        const data = await response.json();
        if (data.error) {
            console.error("TikTok API Error for token:", data.error);
            return [];
        }
        return data.data?.videos || [];
    } catch (error) {
        console.error("TikTok Fetch Error:", error);
        return [];
    }
}

export async function GET() {
    const tokenMain = process.env.TIKTOK_ACCESS_TOKEN_MAIN;
    const tokenAlt = process.env.TIKTOK_ACCESS_TOKEN_ALT;

    // If no tokens are present, return empty array but don't error 500
    // This allows the frontend to show the fallback/placeholder
    if (!tokenMain && !tokenAlt) {
        return NextResponse.json([]);
    }

    const [videosMain, videosAlt] = await Promise.all([
        fetchTikTokVideos(tokenMain || ""),
        fetchTikTokVideos(tokenAlt || "")
    ]);

    // Combine and sort by create_time (descending)
    const allVideos = [...videosMain, ...videosAlt].sort((a, b) => {
        return (b.create_time || 0) - (a.create_time || 0);
    });

    // Return top 6-12 videos
    return NextResponse.json(allVideos.slice(0, 12));
}
