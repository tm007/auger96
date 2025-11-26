import { NextResponse } from "next/server";

export const runtime = 'edge';


export async function GET() {
    const bearerToken = process.env.TWITTER_BEARER_TOKEN;
    const userId = "1076266667767664640"; // ttvauger96 ID (placeholder, needs lookup if incorrect)

    if (!bearerToken) {
        return NextResponse.json({ error: "Missing Twitter Bearer Token" }, { status: 500 });
    }

    try {
        // Fetch tweets from user timeline
        const res = await fetch(
            `https://api.twitter.com/2/users/${userId}/tweets?max_results=12&tweet.fields=created_at,text`,
            {
                headers: {
                    "Authorization": `Bearer ${bearerToken}`
                }
            }
        );

        const data = await res.json();

        console.log("Twitter API Response Status:", res.status);
        console.log("Twitter API Response Data:", JSON.stringify(data, null, 2));

        if (!res.ok) {
            console.error("Twitter API Error Response:", data);
            return NextResponse.json({ error: data.detail || data.title || "Twitter API request failed" }, { status: res.status });
        }

        if (data.errors) {
            console.error("Twitter API returned errors:", data.errors);
            throw new Error(data.errors[0].message);
        }

        const tweets = data.data || [];
        console.log(`Returning ${tweets.length} tweets`);

        return NextResponse.json(tweets);
    } catch (error) {
        console.error("Twitter API Error:", error);
        return NextResponse.json({ error: "Failed to fetch Tweets" }, { status: 500 });
    }
}
