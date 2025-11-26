import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET() {
    return NextResponse.json({
        YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY ? "present" : "missing",
        TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID ? "present" : "missing",
        TWITCH_CLIENT_SECRET: process.env.TWITCH_CLIENT_SECRET ? "present" : "missing",
        TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN ? "present" : "missing",
    });
}
