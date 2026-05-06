// ─── Database Row Types ───────────────────────────────

export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  avatar_url: string | null;
  profile_complete: boolean;
  readiness_score: number;
  target_role: string | null;
  skills: string[];
  experience_level: string | null;
  created_at: string;
}

export interface Resume {
  id: string;
  user_id: string;
  file_name: string;
  raw_text: string;
  parsed_data: ResumeAnalysis | null;
  ats_score: number;
  created_at: string;
}

export interface ResumeAnalysis {
  ats_score: number;
  strengths: string[];
  weaknesses: string[];
  extracted_skills: string[];
  experience_summary: string;
  education: { degree: string; institution: string; year: string }[];
  recommendations: string[];
}

export interface SkillGap {
  id: string;
  user_id: string;
  target_role: string;
  industry: string;
  experience_level: string;
  missing_skills: MissingSkill[];
  roadmap: RoadmapWeek[];
  current_match: number;
  created_at: string;
}

export interface MissingSkill {
  skill: string;
  priority: "high" | "medium" | "low";
  category: string;
  description: string;
}

export interface RoadmapWeek {
  week: number;
  focus: string;
  tasks: string[];
  resources: string[];
}

export interface InterviewResult {
  id: string;
  user_id: string;
  role: string;
  overall_score: number;
  questions: InterviewQuestion[];
  category_scores: {
    technical: number;
    behavioral: number;
    communication: number;
  };
  improvement_areas: string[];
  completed_at: string;
}

export interface InterviewQuestion {
  question: string;
  user_response: string;
  score: number;
  feedback: string;
  ideal_answer: string;
  category: "technical" | "behavioral" | "situational";
}

export interface Job {
  id: string;
  job_title: string;
  company_name: string;
  job_description: string;
  job_link: string;
  referral_link: string | null;
  required_skills: string[];
  location: string;
  job_type: string;
  source: string;
  created_at: string;
}

export interface JobMatch {
  id: string;
  user_id: string;
  job_id: string;
  match_score: number;
  match_details: {
    skill_overlap: string[];
    missing_skills: string[];
    reasoning: string;
  };
  job?: Job; // joined
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

// ─── API Request/Response Types ───────────────────────

export interface ResumeUploadResponse {
  success: boolean;
  resume_id: string;
  analysis: ResumeAnalysis;
}

export interface SkillGapRequest {
  target_role: string;
  industry: string;
  experience_level: string;
  current_skills: string[];
  instructions?: string;
}

export interface InterviewStartResponse {
  session_id: string;
  role: string;
  question: string;
  question_number: number;
  total_questions: number;
  category: string;
}

export interface InterviewRespondRequest {
  session_id: string;
  response: string;
}

export interface InterviewRespondResponse {
  score: number;
  feedback: string;
  ideal_answer: string;
  next_question: string | null;
  question_number: number;
  total_questions: number;
  category: string;
  is_complete: boolean;
}

export interface JobMatchResponse {
  matches: (JobMatch & { job: Job })[];
  total_jobs: number;
}

export interface CSVUploadResponse {
  success: boolean;
  jobs_added: number;
  jobs_updated: number;
  errors: string[];
}
