import { NextResponse } from "next/server";

export async function GET() {
    // Return a 401 Unauthorized response to trigger the browser to clear Basic Auth credentials
    return new NextResponse("Logged out", {
        status: 401,
        headers: {
            "WWW-Authenticate": 'Basic realm="Secure Admin Area"',
        },
    });
}
