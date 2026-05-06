import { NextRequest, NextResponse } from "next/server";
import { evaluateResponse } from "@/lib/agents/interview-ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id, response } = body;
    if (!session_id || !response) return NextResponse.json({ error: "session_id and response required" }, { status: 400 });
    const result = await evaluateResponse(session_id, response);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Interview respond error:", error);
    return NextResponse.json({ error: "Failed to evaluate response" }, { status: 500 });
  }
}
