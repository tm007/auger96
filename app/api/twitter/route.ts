import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET() {
    const bearerToken = process.env.TWITTER_BEARER_TOKEN;

    if (!bearerToken) {
        console.error("Missing TWITTER_BEARER_TOKEN");
        return NextResponse.json({ error: "Missing Twitter Bearer Token" }, { status: 500 });
    }

    try {
        const username = "ttvauger";
        console.log(`Fetching Twitter data for: ${username}`);

        // 1. Get User ID
        const userUrl = `https://api.twitter.com/2/users/by/username/${username}`;
        const userRes = await fetch(userUrl, {
            headers: {
                "Authorization": `Bearer ${bearerToken}`
            },
            next: { revalidate: 3600 }
        });

        if (!userRes.ok) {
            const errorText = await userRes.text();
            console.error(`Twitter User Lookup Failed: ${userRes.status} ${userRes.statusText}`, errorText);
            throw new Error(`Twitter User Lookup Failed: ${userRes.status}`);
        }

        const userData = await userRes.json();

        if (userData.errors) {
            console.error("Twitter User Lookup API Error:", JSON.stringify(userData.errors, null, 2));
            throw new Error("Failed to lookup Twitter user: " + userData.errors[0].detail);
        }

        if (!userData.data) {
            console.error("Twitter User Lookup: No data returned", userData);
            throw new Error("Twitter user not found");
        }

        const userId = userData.data.id;
        console.log(`Found User ID: ${userId}`);

        // 2. Get Tweets
        const tweetsUrl = `https://api.twitter.com/2/users/${userId}/tweets?max_results=12&tweet.fields=created_at&exclude=retweets,replies`;
        const tweetsRes = await fetch(tweetsUrl, {
            headers: {
                "Authorization": `Bearer ${bearerToken}`
            },
            next: { revalidate: 3600 }
        });

        if (!tweetsRes.ok) {
            const errorText = await tweetsRes.text();
            console.error(`Twitter Timeline Fetch Failed: ${tweetsRes.status} ${tweetsRes.statusText}`, errorText);
            throw new Error(`Twitter Timeline Fetch Failed: ${tweetsRes.status}`);
        }

        const tweetsData = await tweetsRes.json();

        if (tweetsData.errors) {
            console.error("Twitter Timeline API Error:", JSON.stringify(tweetsData.errors, null, 2));
            throw new Error("Failed to fetch tweets: " + tweetsData.errors[0].detail);
        }

        return NextResponse.json(tweetsData.data || []);

    } catch (error: any) {
        console.error("Twitter API Error:", error);
        return NextResponse.json({ error: error.message || "Failed to fetch Twitter data" }, { status: 500 });
    }
}
