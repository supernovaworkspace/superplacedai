import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { completeInterview } from "@/lib/agents/interview-ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id } = body;
    if (!session_id) return NextResponse.json({ error: "session_id required" }, { status: 400 });

    const result = completeInterview(session_id);

    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.from("interview_results").insert({
          user_id: user.id,
          role: result.role,
          overall_score: result.overall_score,
          questions: result.questions,
          category_scores: result.category_scores,
          improvement_areas: result.improvement_areas,
        });
        await supabase.from("activity_logs").insert({
          user_id: user.id,
          action: "interview_completed",
          metadata: { role: result.role, score: result.overall_score },
        });
        const { data: userData } = await supabase.from("users").select("readiness_score").eq("id", user.id).single();
        const currentScore = userData?.readiness_score || 0;
        await supabase.from("users").update({ readiness_score: Math.min(100, currentScore + 20) }).eq("id", user.id);
      }
    } catch { /* guest mode */ }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Interview complete error:", error);
    return NextResponse.json({ error: "Failed to complete interview" }, { status: 500 });
  }
}
