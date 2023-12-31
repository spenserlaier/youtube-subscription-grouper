import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const token = await getToken({ req: request });
    try {
        let fetchURL = "";
        let maxResults = "50"; //it seems the max results per page is 50, even if we set it higher
        const currentURL = request.url;
        const urlParams = new URLSearchParams(currentURL);
        const pageToken = urlParams.get("pageToken");
        if (pageToken == null) {
            fetchURL = `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&mine=true&maxResults=${maxResults}`;
        } else {
            fetchURL = `https://youtube.googleapis.com/youtube/v3/subscriptions?part=snippet%2CcontentDetails&mine=true&maxResults=${maxResults}&pageToken=${pageToken}`;
        }
        const subscriptionResponse = await fetch(fetchURL, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });
        if (!subscriptionResponse.ok) {
            /*
            throw new Error(
                `HTTP error! Status: ${subscriptionResponse.status}`
            );
            */
            console.log("Something went wrong when requesting subscriptions");
            return new Response(null, {
                status: 400,
            });
        }
        const data = await subscriptionResponse.json();
        return new Response(data, {


        })
        return data;
    } catch (error) {
        console.log(error);
        console.error("Error fetching subscribed channels:", error);
        return null;
    }
}
