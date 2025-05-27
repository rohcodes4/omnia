// app/api/proxy/generate-podcast/route.ts
import { NextResponse } from "next/server";

const API_URL = "https://api.gasguard.xyz/mediaai/api/generate-podcast";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other required headers here
      },
      body: JSON.stringify(body),
    });

    // Handle 202 status specifically
    if (response.status === 202) {
      return NextResponse.json(
        {
          message:
            "Request accepted and being processed. This will take a few minutes to generate the podcast.",
        },
        { status: 202 }
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Optional: Handle OPTIONS requests for CORS
export async function OPTIONS(request: Request) {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}
