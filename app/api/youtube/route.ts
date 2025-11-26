import { NextResponse } from "next/server";

export const runtime = 'edge';


export async function GET() {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = "UCMZx5j45AytavudrXKKeGlQ"; // realauger96

    if (!apiKey) {
        return NextResponse.json({ error: "Missing YouTube API Key" }, { status: 500 });
    }

    try {
        // First, get the list of videos (excluding shorts)
        const searchRes = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=9&type=video&videoDuration=medium`
        );
        const searchData = await searchRes.json();

        if (searchData.error) {
            throw new Error(searchData.error.message);
        }

        return NextResponse.json(searchData.items || []);
    } catch (error) {
        console.error("YouTube API Error:", error);
        return NextResponse.json({ error: "Failed to fetch YouTube data" }, { status: 500 });
    }
}
