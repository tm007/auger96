import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET() {
    const apiKey = process.env.YOUTUBE_API_KEY;
    const channelId = "UCMZx5j45AytavudrXKKeGlQ"; // realauger96

    if (!apiKey) {
        return NextResponse.json({ error: "Missing YouTube API Key" }, { status: 500 });
    }

    try {
        // Search specifically for Shorts using the shorts shelf
        const searchRes = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=12&type=video&videoDuration=short`
        );
        const searchData = await searchRes.json();

        if (searchData.error) {
            throw new Error(searchData.error.message);
        }

        return NextResponse.json(searchData.items || []);
    } catch (error) {
        console.error("YouTube Shorts API Error:", error);
        return NextResponse.json({ error: "Failed to fetch YouTube Shorts" }, { status: 500 });
    }
}
