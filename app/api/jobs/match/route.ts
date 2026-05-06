import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { matchJobs } from "@/lib/agents/job-connector";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { skills, experience_level, target_role } = body;

    const supabase = await createClient();
    const { data: jobs } = await supabase.from("jobs").select("*").limit(50);

    if (!jobs || jobs.length === 0) {
      return NextResponse.json({ matches: [], total_jobs: 0, message: "No jobs in database. Upload a CSV or seed demo jobs first." });
    }

    const matches = await matchJobs(skills || [], experience_level || "Junior", target_role || "", jobs);

    // Store top matches
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const topMatches = matches.slice(0, 10);
        for (const match of topMatches) {
          await supabase.from("job_matches").upsert({
            user_id: user.id,
            job_id: match.job_id,
            match_score: match.match_score,
            match_details: { skill_overlap: match.skill_overlap, missing_skills: match.missing_skills, reasoning: match.reasoning },
          }, { onConflict: "user_id,job_id" });
        }
      }
    } catch { /* guest mode */ }

    const enrichedMatches = matches.map((m) => ({
      ...m,
      job: jobs.find((j) => j.id === m.job_id),
    })).filter((m) => m.job);

    return NextResponse.json({ matches: enrichedMatches, total_jobs: jobs.length });
  } catch (error) {
    console.error("Job match error:", error);
    return NextResponse.json({ error: "Failed to match jobs" }, { status: 500 });
  }
}
