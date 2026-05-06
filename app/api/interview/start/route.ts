import { NextRequest, NextResponse } from "next/server";
import { startInterview } from "@/lib/agents/interview-ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { role, question_count } = body;
    if (!role) return NextResponse.json({ error: "Role is required" }, { status: 400 });
    const result = await startInterview(role, question_count || 6);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Interview start error:", error);
    return NextResponse.json({ error: "Failed to start interview" }, { status: 500 });
  }
}
