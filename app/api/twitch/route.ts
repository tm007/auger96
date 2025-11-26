import { NextResponse } from "next/server";

export const runtime = 'edge';


export async function GET() {
    const clientId = process.env.TWITCH_CLIENT_ID;
    const clientSecret = process.env.TWITCH_CLIENT_SECRET;
    const username = "auger"; // Updated username

    if (!clientId || !clientSecret) {
        console.error("Twitch credentials missing!", {
            hasClientId: !!clientId,
            hasClientSecret: !!clientSecret
        });
        return NextResponse.json({
            error: "Missing Twitch credentials",
            details: {
                clientId: clientId ? "present" : "missing",
                clientSecret: clientSecret ? "present" : "missing"
            }
        }, { status: 500 });
    }

    try {
        console.log("Twitch API: Starting request...");
        console.log("Client ID exists:", !!clientId);
        console.log("Client Secret exists:", !!clientSecret);

        // 1. Get App Access Token
        const tokenRes = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`, {
            method: "POST",
        });

        console.log("Token response status:", tokenRes.status);
        const tokenData = await tokenRes.json();
        console.log("Token data:", tokenData);

        if (!tokenRes.ok) {
            console.error("Failed to get Twitch token:", tokenData);
            return NextResponse.json({ error: `Twitch auth failed: ${tokenData.message || tokenData.error}` }, { status: tokenRes.status });
        }

        const accessToken = tokenData.access_token;

        if (!accessToken) {
            console.error("No access token in response");
            throw new Error("Failed to get access token");
        }

        console.log("Access token obtained successfully");

        const headers = {
            "Client-ID": clientId,
            "Authorization": `Bearer ${accessToken}`,
        };

        // 2. Get User ID from username
        console.log(`Looking up user ID for username: ${username}`);
        const userRes = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, { headers, next: { revalidate: 3600 } });
        const userData = await userRes.json();
        console.log("User data:", userData);

        if (!userData.data || userData.data.length === 0) {
            console.error("User not found:", username);
            return NextResponse.json({ error: `Twitch user '${username}' not found` }, { status: 404 });
        }

        const broadcasterId = userData.data[0].id;
        console.log("Broadcaster ID:", broadcasterId);

        // 3. Get Stream Status
        console.log("Fetching stream status...");
        const streamRes = await fetch(`https://api.twitch.tv/helix/streams?user_id=${broadcasterId}`, { headers, next: { revalidate: 60 } });
        const streamData = await streamRes.json();
        console.log("Stream data:", streamData);
        const isLive = streamData.data && streamData.data.length > 0;

        // 3. Get Latest VODs
        console.log("Fetching VODs...");
        const vodsRes = await fetch(`https://api.twitch.tv/helix/videos?user_id=${broadcasterId}&first=6&type=archive`, { headers, next: { revalidate: 300 } });
        const vodsData = await vodsRes.json();
        console.log("VODs data:", vodsData);

        // 4. Get Clips
        console.log("Fetching Clips...");
        const clipsRes = await fetch(`https://api.twitch.tv/helix/clips?broadcaster_id=${broadcasterId}&first=8`, { headers, next: { revalidate: 300 } });
        const clipsData = await clipsRes.json();
        console.log("Clips data:", clipsData);

        // 5. Get Schedule
        console.log("Fetching schedule...");
        const scheduleRes = await fetch(`https://api.twitch.tv/helix/schedule?broadcaster_id=${broadcasterId}`, { headers });
        const scheduleData = await scheduleRes.json();
        console.log("Schedule data:", scheduleData);

        const result = {
            isLive,
            stream: isLive ? streamData.data[0] : null,
            vods: vodsData.data || [],
            clips: clipsData.data || [],
            schedule: scheduleData.data?.segments || [],
        };

        console.log("Twitch API: Returning result with", result.vods.length, "VODs and", result.clips.length, "clips");
        return NextResponse.json(result);

    } catch (error) {
        console.error("Twitch API Error:", error);
        return NextResponse.json({ error: "Failed to fetch Twitch data" }, { status: 500 });
    }
}
