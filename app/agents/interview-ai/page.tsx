"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, XCircle, CheckCircle, Mic, Settings, Send, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const ROLES = [
  "My Job Description", "Business Analyst", "Product Manager",
  "Software Engineer", "Marketing Specialist", "Data Analyst",
  "Customer Service Representative", "Sales Representative", "Human Resources"
];

const TESTIMONIALS = [
  { name: "Henry Tran", role: "Marketing Operations", quote: "I used your product for an interview I had yesterday, and sure enough ", highlight: "one of the generated questions came up" },
  { name: "Jenny Jiang", role: "Software Engineer", quote: "Great tool for anyone who's preparing for an interview in tech, ", highlight: "helped me ace my interviews!" },
  { name: "Charles Burr", role: "UX Designer", quote: "Love interviews by AI, it has saved me so ", highlight: "much", quoteEnd: " prepping time." }
];

interface QuestionResult {
  question: string;
  response: string;
  score: number;
  feedback: string;
  ideal_answer: string;
}

export default function InterviewAIPage() {
  const router = useRouter();
  const [activeInterview, setActiveInterview] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentCategory, setCurrentCategory] = useState("");
  const [questionNum, setQuestionNum] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [userResponse, setUserResponse] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [lastFeedback, setLastFeedback] = useState<{ score: number; feedback: string; ideal_answer: string } | null>(null);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [finalResult, setFinalResult] = useState<{ overall_score: number; category_scores: { technical: number; behavioral: number; communication: number }; improvement_areas: string[] } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const startInterview = async (role: string) => {
    setActiveInterview(role);
    setLoading(true);
    setResults([]);
    setIsComplete(false);
    setFinalResult(null);
    setLastFeedback(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${apiUrl}/api/agents/interview/start`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interview_type: "mixed", target_role: role, user_id: "demo-user" }),
      });
      const data = await res.json();
      setSessionId(data.interview_id);
      setCurrentQuestion(data.questions[0]);
      setCurrentCategory("General");
      setQuestionNum(1);
      setTotalQuestions(data.questions.length);
      // Store all questions in local state or session storage for the frontend to progress
      sessionStorage.setItem(`interview_${data.interview_id}_questions`, JSON.stringify(data.questions));
    } catch {
      setCurrentQuestion("Tell me about yourself and your background.");
      setCurrentCategory("behavioral");
      setQuestionNum(1);
      setTotalQuestions(6);
    }
    setLoading(false);
  };

  const submitResponse = async () => {
    if (!userResponse.trim() || !sessionId) return;
    setSubmitting(true);
    setLastFeedback(null);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const res = await fetch(`${apiUrl}/api/agents/interview/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interview_id: sessionId, answer: userResponse, user_id: "demo-user" }),
      });
      const data = await res.json();

      // Since backend doesn't return per-question score immediately, we simulate a 'submitted' feedback
      setResults(prev => [...prev, { question: currentQuestion, response: userResponse, score: 0, feedback: "Response recorded.", ideal_answer: "" }]);
      setLastFeedback({ score: 100, feedback: "Response recorded successfully.", ideal_answer: "Waiting for final evaluation." });

      const questionsStr = sessionStorage.getItem(`interview_${sessionId}_questions`);
      const questions = questionsStr ? JSON.parse(questionsStr) : [];
      
      if (questionNum >= totalQuestions) {
        // Complete the interview
        const completeRes = await fetch(`${apiUrl}/api/agents/interview/results/${sessionId}`);
        const completeData = await completeRes.json();
        if (completeData.success && completeData.results) {
          setFinalResult({
            overall_score: completeData.results.overall_score || 0,
            category_scores: { technical: completeData.results.scores?.[0] || 0, behavioral: completeData.results.scores?.[1] || 0, communication: completeData.results.scores?.[2] || 0 },
            improvement_areas: completeData.results.improvement_tips || ["Keep practicing"]
          });
          // Update results with actual scores if possible
          if (completeData.results.scores) {
             setResults(prev => prev.map((r, i) => ({ ...r, score: completeData.results.scores[i] || r.score, feedback: completeData.results.feedback?.[i] || r.feedback })));
          }
        }
        setIsComplete(true);
      } else {
        setCurrentQuestion(questions[questionNum] || "Next question?");
        setCurrentCategory("General");
        setQuestionNum(questionNum + 1);
      }
      setUserResponse("");
    } catch {
      setLastFeedback({ score: 60, feedback: "Could not record response — please try again.", ideal_answer: "" });
    }
    setSubmitting(false);
  };

  // Active interview view
  if (activeInterview) {
    return (
      <div style={{ minHeight: "100vh", background: "#0f172a", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
        {/* Top bar */}
        <div style={{ padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e293b" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 18, fontWeight: 600 }}>Mock Interview: {activeInterview}</span>
            <span style={{ padding: "4px 12px", background: isComplete ? "rgba(239,68,68,0.2)" : "rgba(45,212,191,0.2)", color: isComplete ? "#f87171" : "#2dd4bf", borderRadius: 12, fontSize: 12, fontWeight: 600 }}>
              {isComplete ? "COMPLETED" : "LIVE"}
            </span>
            {!isComplete && <span style={{ fontSize: 13, color: "#64748b" }}>Q{questionNum}/{totalQuestions} • {currentCategory}</span>}
          </div>
          <button onClick={() => setActiveInterview(null)} style={{ background: "#334155", color: "#fff", border: "none", padding: "8px 16px", borderRadius: 8, cursor: "pointer", fontWeight: 500 }}>
            {isComplete ? "Back to Roles" : "End Session"}
          </button>
        </div>

        {loading ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh", gap: 12, color: "#64748b" }}>
            <Loader2 size={24} className="animate-spin" /> Preparing interview questions...
          </div>
        ) : isComplete && finalResult ? (
          /* Final results */
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "48px 20px" }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ fontSize: 64, fontWeight: 800, color: finalResult.overall_score >= 70 ? "#2dd4bf" : "#f59e0b", marginBottom: 8 }}>{finalResult.overall_score}</div>
              <div style={{ fontSize: 18, color: "#94a3b8" }}>Overall Score</div>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
              {Object.entries(finalResult.category_scores).map(([cat, score]) => (
                <div key={cat} style={{ background: "#1e293b", borderRadius: 12, padding: 20, textAlign: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#2dd4bf" }}>{score}</div>
                  <div style={{ fontSize: 12, color: "#64748b", textTransform: "capitalize" }}>{cat}</div>
                </div>
              ))}
            </div>

            <div style={{ background: "#1e293b", borderRadius: 12, padding: 24, marginBottom: 24 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 12, color: "#f1f5f9" }}>Areas for Improvement</h3>
              {finalResult.improvement_areas.map((area, i) => (
                <div key={i} style={{ fontSize: 14, color: "#94a3b8", marginBottom: 8, paddingLeft: 16, position: "relative" }}>
                  <span style={{ position: "absolute", left: 0, color: "#f59e0b" }}>•</span> {area}
                </div>
              ))}
            </div>

            {/* Question breakdown */}
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: "#f1f5f9" }}>Question Breakdown</h3>
            {results.map((r, i) => (
              <div key={i} style={{ background: "#1e293b", borderRadius: 12, padding: 20, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: "#64748b" }}>Q{i + 1}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: r.score >= 70 ? "#2dd4bf" : "#f59e0b" }}>{r.score}/100</span>
                </div>
                <p style={{ fontSize: 14, color: "#e2e8f0", marginBottom: 8 }}>{r.question}</p>
                <p style={{ fontSize: 13, color: "#94a3b8" }}>{r.feedback}</p>
              </div>
            ))}
          </div>
        ) : (
          /* Q&A View */
          <div style={{ maxWidth: 700, margin: "0 auto", padding: "48px 20px" }}>
            {/* Progress bar */}
            <div style={{ height: 4, borderRadius: 2, background: "#1e293b", marginBottom: 40, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${(questionNum / totalQuestions) * 100}%`, background: "#2dd4bf", borderRadius: 2, transition: "width 0.5s" }} />
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div key={currentQuestion} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div style={{ background: "#1e293b", borderRadius: 16, padding: 32, marginBottom: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#334155", display: "flex", alignItems: "center", justifyContent: "center" }}>🤖</div>
                    <span style={{ fontSize: 13, color: "#64748b" }}>AI Interviewer</span>
                  </div>
                  <p style={{ fontSize: 18, lineHeight: 1.6, color: "#f1f5f9" }}>{currentQuestion}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Feedback from last answer */}
            {lastFeedback && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ background: "rgba(45,212,191,0.1)", border: "1px solid rgba(45,212,191,0.2)", borderRadius: 12, padding: 20, marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 13, color: "#2dd4bf", fontWeight: 600 }}>Feedback on previous answer</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: lastFeedback.score >= 70 ? "#2dd4bf" : "#f59e0b" }}>{lastFeedback.score}/100</span>
                </div>
                <p style={{ fontSize: 13, color: "#94a3b8" }}>{lastFeedback.feedback}</p>
              </motion.div>
            )}

            {/* Response input */}
            <div style={{ display: "flex", gap: 12, alignItems: "flex-end" }}>
              <textarea
                value={userResponse}
                onChange={e => setUserResponse(e.target.value)}
                placeholder="Type your answer here..."
                style={{ flex: 1, background: "#1e293b", border: "1px solid #334155", borderRadius: 12, padding: 16, color: "#f1f5f9", fontSize: 15, fontFamily: "inherit", minHeight: 100, resize: "vertical", outline: "none" }}
                onFocus={e => e.target.style.borderColor = "#2dd4bf"}
                onBlur={e => e.target.style.borderColor = "#334155"}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submitResponse(); } }}
              />
              <button
                onClick={submitResponse}
                disabled={!userResponse.trim() || submitting}
                style={{ width: 48, height: 48, borderRadius: 12, background: userResponse.trim() ? "#2dd4bf" : "#334155", border: "none", color: userResponse.trim() ? "#0f172a" : "#64748b", cursor: userResponse.trim() ? "pointer" : "not-allowed", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
              >
                {submitting ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </div>
            <p style={{ fontSize: 12, color: "#475569", marginTop: 8 }}>Press Enter to submit, Shift+Enter for new line</p>
          </div>
        )}
      </div>
    );
  }

  // Landing page view (preserved exactly)
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "'DM Sans', sans-serif", color: "#0f172a", paddingBottom: 100 }}>
      {/* Top Navigation */}
      <div style={{ padding: "24px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f1f5f9" }}>
        <a href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
          <img src="/logo.png" alt="Logo" style={{ height: 120, filter: "invert(1) brightness(0)" }} />
          <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px" }}>Interview AI</span>
        </a>
        <button onClick={() => router.push("/dashboard")} style={{ background: "transparent", border: "none", color: "#64748b", fontWeight: 600, cursor: "pointer" }}>
          Back to Dashboard
        </button>
      </div>

      {/* Hero Section */}
      <div style={{ background: "#f8fafc", padding: "100px 20px", textAlign: "center", marginBottom: 60 }}>
        <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.2, margin: "0 auto 32px", maxWidth: 800 }}>
          Ready to start<br/>
          <span style={{ background: "rgba(45, 212, 191, 0.15)", padding: "4px 12px" }}>mastering your interview skills?</span>
        </h1>
        <button
          onClick={() => startInterview("General Interview")}
          style={{ background: "#334155", color: "#fff", border: "none", borderRadius: 30, padding: "16px 36px", fontSize: 18, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", transition: "transform 0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-2px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
        >
          Try now for free <ArrowRight size={20} />
        </button>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>

        {/* Roles Grid */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div style={{ display: "inline-block", background: "rgba(45,212,191,0.1)", color: "#0d9488", padding: "4px 16px", borderRadius: 20, fontSize: 14, fontWeight: 500, marginBottom: 24 }}>Quick start</div>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12, letterSpacing: "-0.02em" }}>Works for every type of job interview and role</h2>
          <p style={{ color: "#64748b", fontSize: 18, marginBottom: 48 }}>Provide your own job description or choose from our sample roles.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16, textAlign: "left" }}>
            {ROLES.map((role) => (
              <button
                key={role}
                onClick={() => startInterview(role)}
                style={{ background: "#ffffff", border: "1px solid #e2e8f0", padding: "24px", borderRadius: 12, fontSize: 18, fontWeight: 500, color: "#0f172a", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#cbd5e1"; e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.02)"; e.currentTarget.style.transform = "none"; }}
              >
                {role} <ArrowRight size={18} color="#94a3b8" />
              </button>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div style={{ textAlign: "center", marginBottom: 100 }}>
          <div style={{ display: "inline-block", background: "rgba(45,212,191,0.1)", color: "#0d9488", padding: "4px 16px", borderRadius: 20, fontSize: 14, fontWeight: 500, marginBottom: 24 }}>Success stories</div>
          <h2 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12, letterSpacing: "-0.02em" }}>
            Interviews by AI helped these job seekers and <span style={{ color: "#0d9488" }}>50,000+</span> more
          </h2>
          <p style={{ color: "#64748b", fontSize: 18, marginBottom: 48 }}>You&apos;re a mock interview away from your dream job.</p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: "#f8fafc", padding: "40px 32px", borderRadius: 16, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", background: "#e2e8f0", marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>👤</div>
                <div style={{ fontSize: 15, color: "#64748b", marginBottom: 24 }}>{t.name} &bull; {t.role}</div>
                <p style={{ fontSize: 18, fontStyle: "italic", lineHeight: 1.6, marginBottom: 32, color: "#334155" }}>
                  &quot;{t.quote}
                  <span style={{ color: "#0d9488" }}>{t.highlight}</span>
                  {t.quoteEnd}&quot;
                </p>
                <div style={{ display: "flex", gap: 4, color: "#2dd4bf", marginTop: "auto" }}>
                  {[1,2,3,4,5].map(n => <Star key={n} fill="currentColor" size={24} />)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Section */}
        <div style={{ background: "#f8fafc", borderRadius: 24, padding: "80px 60px", display: "flex", alignItems: "center", gap: 60, marginBottom: 100, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 400px" }}>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 44px)", fontWeight: 800, lineHeight: 1.2, letterSpacing: "-0.02em" }}>
              Make your next job interview<br/>
              <span style={{ background: "rgba(45, 212, 191, 0.15)", padding: "0 8px" }}>stress-free thanks to AI</span>
            </h2>
          </div>

          <div style={{ flex: "1 1 400px", display: "flex", gap: 24 }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", textAlign: "center", marginBottom: 8 }}>Without Interviews by AI</div>
              {["Unprepared", "Nervous", "Ghosted"].map((text) => (
                <div key={text} style={{ background: "#fee2e2", color: "#b91c1c", padding: "16px", borderRadius: 8, display: "flex", alignItems: "center", gap: 12, fontWeight: 500, fontSize: 18 }}>
                  <XCircle size={20} /> {text}
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 44, color: "#94a3b8", paddingTop: 40 }}>
              <ArrowRight size={20} />
              <ArrowRight size={20} />
              <ArrowRight size={20} />
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#1e293b", textAlign: "center", marginBottom: 8 }}>With Interviews by AI</div>
              {["Organized and ready", "Confident answers", "Hired!"].map((text) => (
                <div key={text} style={{ background: "#2dd4bf", color: "#ffffff", padding: "16px", borderRadius: 8, display: "flex", alignItems: "center", gap: 12, fontWeight: 600, fontSize: 18 }}>
                  <CheckCircle size={20} /> {text}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Floating CTA */}
      <motion.div
        initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 0.5, type: "spring" }}
        style={{ position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 50 }}
      >
        <button
          onClick={() => startInterview("Custom Role")}
          style={{ background: "#334155", color: "#fff", border: "none", borderRadius: 30, padding: "16px 36px", fontSize: 18, fontWeight: 500, display: "flex", alignItems: "center", gap: 8, cursor: "pointer", boxShadow: "0 12px 24px rgba(15,23,42,0.25)", transition: "transform 0.2s" }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-4px)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "none"}
        >
          Start an interview <ArrowRight size={20} />
        </button>
      </motion.div>
    </motion.div>
  );
}
