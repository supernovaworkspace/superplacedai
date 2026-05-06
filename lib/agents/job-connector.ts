import { GoogleGenerativeAI } from "@google/generative-ai";
import type { Job } from "@/lib/types";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface MatchResult {
  job_id: string;
  match_score: number;
  skill_overlap: string[];
  missing_skills: string[];
  reasoning: string;
}

export async function matchJobs(
  userSkills: string[],
  experienceLevel: string,
  targetRole: string,
  jobs: Job[]
): Promise<MatchResult[]> {
  if (jobs.length === 0) return [];

  const jobSummaries = jobs.slice(0, 20).map((j, i) => (
    `[${i}] ${j.job_title} at ${j.company_name} | Skills: ${(j.required_skills || []).join(", ")} | ${j.location} | ${j.job_type}`
  )).join("\n");

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are a job matching AI. Match user profile to jobs.
Score formula: 40% skill match, 30% semantic relevance, 20% keyword, 10% experience.
Return ONLY a valid JSON object (no markdown, no code fences):
{ "matches": [{ "index": <number>, "match_score": <0-100>, "skill_overlap": ["skill1"], "missing_skills": ["skill1"], "reasoning": "<1 sentence>" }] }
Order by match_score descending. Include all jobs.

User Skills: ${userSkills.join(", ")}
Experience: ${experienceLevel}
Target Role: ${targetRole}

Jobs:
${jobSummaries}`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return parsed.matches.map((m: { index: number; match_score: number; skill_overlap: string[]; missing_skills: string[]; reasoning: string }) => ({
      job_id: jobs[m.index]?.id || "",
      match_score: m.match_score,
      skill_overlap: m.skill_overlap,
      missing_skills: m.missing_skills,
      reasoning: m.reasoning,
    })).filter((m: MatchResult) => m.job_id);
  } catch (error) {
    console.error("Job matching error:", error);
    // Fallback to keyword matching
    return jobs.map((j) => {
      const overlap = userSkills.filter((s) =>
        (j.required_skills || []).some((rs: string) => rs.toLowerCase().includes(s.toLowerCase()))
      );
      const score = Math.min(95, Math.round((overlap.length / Math.max((j.required_skills || []).length, 1)) * 100));
      return {
        job_id: j.id,
        match_score: Math.max(score, 20),
        skill_overlap: overlap,
        missing_skills: (j.required_skills || []).filter((rs: string) => !overlap.some((s) => rs.toLowerCase().includes(s.toLowerCase()))),
        reasoning: "Keyword-based matching (AI unavailable)",
      };
    });
  }
}

export function getDemoJobs(): Omit<Job, "id" | "created_at">[] {
  return [
    { job_title: "AI/ML Engineer Intern", company_name: "Google India", job_description: "Work on cutting-edge ML models for Search and Ads products.", job_link: "https://careers.google.com", referral_link: null, required_skills: ["Python", "TensorFlow", "Machine Learning", "Deep Learning", "Statistics"], location: "Bangalore", job_type: "Internship", source: "demo" },
    { job_title: "Frontend Developer", company_name: "Flipkart", job_description: "Build high-performance React applications for India's largest e-commerce platform.", job_link: "https://www.flipkartcareers.com", referral_link: null, required_skills: ["React", "JavaScript", "TypeScript", "CSS", "Redux"], location: "Bangalore", job_type: "Full-time", source: "demo" },
    { job_title: "Backend Engineer", company_name: "Razorpay", job_description: "Design and build scalable payment infrastructure serving millions of businesses.", job_link: "https://razorpay.com/careers", referral_link: null, required_skills: ["Go", "Python", "PostgreSQL", "Redis", "Microservices", "AWS"], location: "Bangalore", job_type: "Full-time", source: "demo" },
    { job_title: "Data Analyst", company_name: "Swiggy", job_description: "Analyze delivery metrics and optimize food delivery operations using data.", job_link: "https://careers.swiggy.com", referral_link: null, required_skills: ["SQL", "Python", "Tableau", "Statistics", "Excel"], location: "Bangalore", job_type: "Full-time", source: "demo" },
    { job_title: "DevOps Engineer", company_name: "Atlassian", job_description: "Manage CI/CD pipelines and cloud infrastructure for collaboration tools.", job_link: "https://www.atlassian.com/company/careers", referral_link: null, required_skills: ["Docker", "Kubernetes", "AWS", "Terraform", "Jenkins", "Linux"], location: "Bangalore", job_type: "Full-time", source: "demo" },
    { job_title: "Product Manager", company_name: "CRED", job_description: "Drive product strategy for fintech features used by millions of credit card users.", job_link: "https://careers.cred.club", referral_link: null, required_skills: ["Product Strategy", "Analytics", "SQL", "User Research", "Agile"], location: "Bangalore", job_type: "Full-time", source: "demo" },
    { job_title: "Full Stack Developer", company_name: "Zerodha", job_description: "Build trading platforms and financial tools for India's largest stock broker.", job_link: "https://zerodha.com/careers", referral_link: null, required_skills: ["React", "Node.js", "Go", "PostgreSQL", "WebSockets"], location: "Bangalore", job_type: "Full-time", source: "demo" },
    { job_title: "Mobile Developer", company_name: "PhonePe", job_description: "Develop features for one of India's most popular UPI payment apps.", job_link: "https://www.phonepe.com/careers", referral_link: null, required_skills: ["React Native", "Kotlin", "Swift", "REST APIs", "Firebase"], location: "Bangalore", job_type: "Full-time", source: "demo" },
    { job_title: "Cloud Engineer", company_name: "TCS", job_description: "Design and manage enterprise cloud solutions for global clients.", job_link: "https://www.tcs.com/careers", referral_link: null, required_skills: ["AWS", "Azure", "GCP", "Terraform", "Python", "Networking"], location: "Mumbai", job_type: "Full-time", source: "demo" },
    { job_title: "Cybersecurity Analyst", company_name: "Infosys", job_description: "Monitor and protect enterprise systems from security threats.", job_link: "https://www.infosys.com/careers", referral_link: null, required_skills: ["Network Security", "SIEM", "Penetration Testing", "Python", "Linux"], location: "Pune", job_type: "Full-time", source: "demo" },
    { job_title: "NLP Research Intern", company_name: "Microsoft India", job_description: "Research and develop NLP models for Indian languages.", job_link: "https://careers.microsoft.com", referral_link: null, required_skills: ["Python", "PyTorch", "NLP", "Transformers", "Research"], location: "Hyderabad", job_type: "Internship", source: "demo" },
    { job_title: "SDE-1", company_name: "Amazon India", job_description: "Build scalable distributed systems for Amazon's delivery network.", job_link: "https://www.amazon.jobs", referral_link: null, required_skills: ["Java", "Data Structures", "System Design", "AWS", "SQL"], location: "Hyderabad", job_type: "Full-time", source: "demo" },
    { job_title: "UI/UX Designer", company_name: "Freshworks", job_description: "Design beautiful and intuitive SaaS product interfaces.", job_link: "https://www.freshworks.com/careers", referral_link: null, required_skills: ["Figma", "User Research", "Prototyping", "Design Systems", "CSS"], location: "Chennai", job_type: "Full-time", source: "demo" },
    { job_title: "Data Engineer", company_name: "Walmart Labs India", job_description: "Build data pipelines processing petabytes of retail data.", job_link: "https://careers.walmart.com", referral_link: null, required_skills: ["Spark", "Python", "SQL", "Airflow", "Hadoop", "AWS"], location: "Bangalore", job_type: "Full-time", source: "demo" },
    { job_title: "QA Engineer", company_name: "Zoho", job_description: "Ensure quality of enterprise software products through automated testing.", job_link: "https://www.zoho.com/careers", referral_link: null, required_skills: ["Selenium", "Java", "API Testing", "Automation", "JIRA"], location: "Chennai", job_type: "Full-time", source: "demo" },
    { job_title: "Blockchain Developer", company_name: "Polygon", job_description: "Build and optimize Layer 2 scaling solutions for Ethereum.", job_link: "https://polygon.technology/careers", referral_link: null, required_skills: ["Solidity", "Ethereum", "Web3.js", "Go", "Distributed Systems"], location: "Remote", job_type: "Full-time", source: "demo" },
    { job_title: "Technical Writer", company_name: "Postman", job_description: "Create developer documentation and API guides.", job_link: "https://www.postman.com/careers", referral_link: null, required_skills: ["Technical Writing", "API Documentation", "Markdown", "REST APIs"], location: "Bangalore", job_type: "Full-time", source: "demo" },
    { job_title: "Site Reliability Engineer", company_name: "Ola", job_description: "Ensure 99.99% uptime for ride-hailing platform serving millions.", job_link: "https://www.olacabs.com/careers", referral_link: null, required_skills: ["Kubernetes", "Prometheus", "Go", "Linux", "Incident Management"], location: "Bangalore", job_type: "Full-time", source: "demo" },
    { job_title: "React Native Developer", company_name: "Meesho", job_description: "Build social commerce features for India's fastest growing e-commerce app.", job_link: "https://meesho.io/careers", referral_link: null, required_skills: ["React Native", "JavaScript", "TypeScript", "GraphQL", "Firebase"], location: "Bangalore", job_type: "Full-time", source: "demo" },
    { job_title: "AI Research Associate", company_name: "IISc Bangalore", job_description: "Conduct research in Computer Vision and publish papers.", job_link: "https://iisc.ac.in", referral_link: null, required_skills: ["Python", "PyTorch", "Computer Vision", "Research Papers", "Mathematics"], location: "Bangalore", job_type: "Research", source: "demo" },
  ];
}
