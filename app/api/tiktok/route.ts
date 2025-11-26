import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET() {
    const accessToken = process.env.TIKTOK_ACCESS_TOKEN;

    // If no token is present, return a mock response or error
    // For now, we'll return an error so the frontend knows to show a placeholder or handle it
    if (!accessToken) {
        console.warn("Missing TIKTOK_ACCESS_TOKEN");
        return NextResponse.json({ error: "Missing TikTok Access Token" }, { status: 500 });
    }

    try {
        // TikTok API v2 Video List Endpoint
        // Documentation: https://developers.tiktok.com/doc/tiktok-api-v2-video-list
        const response = await fetch("https://open.tiktokapis.com/v2/video/list/", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                max_count: 12,
                fields: [
                    "id",
                    "title",
                    "cover_image_url",
                    "embed_link",
                    "view_count",
                    "like_count"
                ]
            }),
            next: { revalidate: 3600 }
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message || "TikTok API Error");
        }

        return NextResponse.json(data.data?.videos || []);
    } catch (error: any) {
        console.error("TikTok API Error:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch TikTok data" }, { status: 500 });
    }
}
