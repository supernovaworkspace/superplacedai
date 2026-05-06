import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { analyzeSkillGap } from "@/lib/agents/skill-gap";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { target_role, industry, experience_level, current_skills, instructions } = body;

    if (!target_role) {
      return NextResponse.json({ error: "Target role is required" }, { status: 400 });
    }

    const analysis = await analyzeSkillGap(
      current_skills || [],
      target_role,
      industry || "Technology",
      experience_level || "Junior",
      instructions
    );

    // Store in Supabase
    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        await supabase.from("skill_gaps").insert({
          user_id: user.id,
          target_role,
          industry: industry || "Technology",
          experience_level: experience_level || "Junior",
          missing_skills: analysis.missing_skills,
          roadmap: analysis.roadmap,
          current_match: analysis.current_match,
        });

        await supabase.from("activity_logs").insert({
          user_id: user.id,
          action: "skill_gap_analyzed",
          metadata: { target_role, gaps_found: analysis.missing_skills.length },
        });

        // Update readiness
        const { data: userData } = await supabase.from("users").select("readiness_score").eq("id", user.id).single();
        const currentScore = userData?.readiness_score || 0;
        await supabase.from("users").update({
          readiness_score: Math.min(100, currentScore + 15),
          target_role,
        }).eq("id", user.id);
      }
    } catch { /* guest mode */ }

    return NextResponse.json({ success: true, analysis });
  } catch (error) {
    console.error("Skill gap analysis error:", error);
    return NextResponse.json({ error: "Failed to analyze skill gap" }, { status: 500 });
  }
}
