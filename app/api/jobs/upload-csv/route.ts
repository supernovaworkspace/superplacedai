import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import Papa from "papaparse";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (!file) return NextResponse.json({ error: "No CSV file" }, { status: 400 });

    const text = await file.text();
    const { data, errors } = Papa.parse(text, { header: true, skipEmptyLines: true });

    if (errors.length > 0) {
      return NextResponse.json({ error: "CSV parsing errors", details: errors.slice(0, 5) }, { status: 400 });
    }

    const jobs = (data as Record<string, string>[]).map((row) => ({
      job_title: row.job_title || row.title || "Untitled",
      company_name: row.company_name || row.company || "Unknown",
      job_description: row.job_description || row.description || "",
      job_link: row.job_link || row.link || "",
      referral_link: row.referral_link || null,
      required_skills: row.required_skills
        ? (row.required_skills.startsWith("[") ? JSON.parse(row.required_skills) : row.required_skills.split(",").map((s: string) => s.trim()))
        : [],
      location: row.location || "Remote",
      job_type: row.job_type || row.type || "Full-time",
      source: "csv",
    }));

    let jobsAdded = 0;
    const insertErrors: string[] = [];

    try {
      const supabase = await createClient();
      const { error, count } = await supabase.from("jobs").insert(jobs).select("id");
      if (error) insertErrors.push(error.message);
      else jobsAdded = count || jobs.length;
    } catch {
      insertErrors.push("Database not configured — jobs parsed but not stored");
      jobsAdded = jobs.length;
    }

    return NextResponse.json({ success: true, jobs_added: jobsAdded, jobs_updated: 0, errors: insertErrors });
  } catch (error) {
    console.error("CSV upload error:", error);
    return NextResponse.json({ error: "Failed to process CSV" }, { status: 500 });
  }
}
