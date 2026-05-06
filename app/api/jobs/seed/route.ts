import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getDemoJobs } from "@/lib/agents/job-connector";

export async function POST() {
  try {
    const supabase = await createClient();

    // Check if jobs already exist
    const { count } = await supabase.from("jobs").select("id", { count: "exact", head: true });
    if (count && count > 0) {
      return NextResponse.json({ message: `${count} jobs already in database`, seeded: 0 });
    }

    const demoJobs = getDemoJobs();
    const { error } = await supabase.from("jobs").insert(demoJobs);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, seeded: demoJobs.length });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json({ error: "Failed to seed jobs" }, { status: 500 });
  }
}
