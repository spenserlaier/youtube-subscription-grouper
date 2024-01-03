import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import {
    getUserGroups,
    userCredentials,
} from "@/utils/database/database-utils";

export async function GET(request: NextRequest, response: NextResponse) {
    const token = await getToken({ req: request });
    if (token) {
        const userCredentials: userCredentials = {
            email: token.email!,
            googleID: token.userId!,
        };
        const userGroups = await getUserGroups(userCredentials);
        return Response.json(userGroups);
    } else {
        return new Response(null, {
            status: 400,
        });
    }
}

//export async function POST(request: NextRequest, response: NextResponse) {}
