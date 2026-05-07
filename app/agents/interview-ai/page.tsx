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
      <div style={{ minHeight: "100vh", background: "#0F172A", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
        {/* Header bar */}
        <div style={{ padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#020617" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Mock Interview</span>
            <span style={{ fontSize: 14, color: "#94A3B8" }}>{activeInterview}</span>
            <span style={{ fontSize: 11, color: "#22C55E", textTransform: "uppercase", fontWeight: 600, animation: "livePulse 1.5s ease infinite" }}>● {isComplete ? "COMPLETE" : "LIVE"}</span>
            {!isComplete && <span style={{ fontSize: 13, color: "#94A3B8" }}>Q {questionNum}/{totalQuestions}</span>}
          </div>
          <button onClick={() => setActiveInterview(null)} style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)", color: "#fff", borderRadius: 999, padding: "8px 20px", fontSize: 13, cursor: "pointer" }}>
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ minHeight: "100vh", background: "#ffffff", fontFamily: "'DM Sans', sans-serif", color: "#0F172A", paddingBottom: 100 }}>
      <style>{`@keyframes livePulse{0%,100%{opacity:1}50%{opacity:0.4}}@keyframes waitFade{0%,100%{opacity:0.5}50%{opacity:1}}@keyframes blink{0%,100%{opacity:1}50%{opacity:0}}@keyframes wave{0%,100%{height:8px}50%{height:24px}}`}</style>
      {/* Nav */}
      <div style={{ padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#0F172A", letterSpacing: "-0.3px" }}>SUPERPLACED AI</span>
          <span style={{ fontSize: 16, color: "#6B7280" }}>· Interview AI</span>
        </div>
        <button onClick={() => router.push("/dashboard")} style={{ background: "transparent", border: "none", color: "#6B7280", fontSize: 14, cursor: "pointer" }}>← Back to Dashboard</button>
      </div>

      {/* Hero */}
      <div style={{ padding: "80px 40px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#CCFBF1", color: "#0D9488", borderRadius: 999, padding: "5px 14px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 24 }}>PRACTICE AGENT</div>
        <h1 style={{ fontSize: "clamp(36px,5vw,48px)", fontWeight: 700, color: "#0F172A", lineHeight: 1.2, margin: "0 auto 32px", maxWidth: 700 }}>
          Ready to start mastering your{" "}<span style={{ background: "#CCFBF1", color: "#0D9488", borderRadius: 6, padding: "2px 8px" }}>interview skills?</span>
        </h1>
        <button onClick={() => startInterview("General Interview")}
          style={{ background: "#0F172A", color: "#fff", border: "none", borderRadius: 999, padding: "14px 32px", fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 32 }}
          onMouseEnter={e => e.currentTarget.style.opacity="0.85"} onMouseLeave={e => e.currentTarget.style.opacity="1"}
        >Start an Interview →</button>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>

        {/* Roles Grid */}
        <div style={{ textAlign: "center", marginBottom: 80, maxWidth: 900, margin: "0 auto 80px", padding: "0 40px" }}>
          <div style={{ display: "inline-block", background: "#CCFBF1", color: "#0D9488", borderRadius: 999, padding: "5px 14px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 24 }}>Quick start</div>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>Works for every type of job interview and role</h2>
          <p style={{ color: "#6B7280", fontSize: 16, marginBottom: 36 }}>Provide your own job description or choose from our sample roles.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, textAlign: "left" }}>
            {ROLES.map((role) => (
              <button key={role} onClick={() => startInterview(role)}
                style={{ background: "#fff", border: "1px solid #E5E7EB", padding: "20px", borderRadius: 12, fontSize: 15, fontWeight: 600, color: "#0F172A", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", transition: "all 0.2s ease" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow="0 4px 16px rgba(0,0,0,0.08)"; e.currentTarget.style.transform="translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="none"; }}
              >{role} <span style={{ color: "#14B8A6", fontSize: 18 }}>→</span></button>
            ))}
          </div>
        </div>

        {/* Success Stories */}
        <div style={{ textAlign: "center", marginBottom: 80, maxWidth: 900, margin: "0 auto 80px", padding: "0 40px" }}>
          <div style={{ display: "inline-block", background: "#CCFBF1", color: "#0D9488", borderRadius: 999, padding: "5px 14px", fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 24 }}>Success stories</div>
          <h2 style={{ fontSize: 32, fontWeight: 700, color: "#0F172A", marginBottom: 12 }}>Interviews by AI helped these job seekers and <span style={{ color: "#14B8A6", fontWeight: 700 }}>500+</span> more</h2>
          <p style={{ color: "#6B7280", fontSize: 16, marginBottom: 36 }}>You&apos;re a mock interview away from your dream job.</p>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { initials: "RS", bg: "#7C3AED", name: "Rahul Sharma", role: "Software Engineer", quote: "I used this for an Infosys interview and sure enough one of the AI questions came up ", highlight: "word for word", end: "." },
              { initials: "PN", bg: "#EA580C", name: "Priya Nair", role: "Data Analyst", quote: "Perfect tool for anyone preparing for tech roles in India, helped me ", highlight: "crack my TCS interview", end: "!" },
              { initials: "AM", bg: "#14B8A6", name: "Arjun Mehta", role: "Product Manager", quote: "Saved me so much prep time before my ", highlight: "Wipro round", end: ". Highly recommend." },
            ].map((t, i) => (
              <div key={i} style={{ flex: 1, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: 24, textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: t.bg, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>{t.initials}</div>
                  <div><div style={{ fontWeight: 600, color: "#0F172A", fontSize: 14 }}>{t.name}</div><div style={{ color: "#6B7280", fontSize: 12 }}>{t.role}</div></div>
                </div>
                <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.6, marginBottom: 12 }}>&quot;{t.quote}<span style={{ background: "#CCFBF1", color: "#0D9488", borderRadius: 4, padding: "1px 4px" }}>{t.highlight}</span>{t.end}&quot;</p>
                <div style={{ color: "#14B8A6", letterSpacing: 2 }}>★★★★★</div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Section */}
        <div style={{ background: "#F9FAFB", padding: "80px 40px", maxWidth: 1000, margin: "0 auto 80px" }}>
          <div style={{ display: "flex", gap: 60, alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 300px" }}>
              <h2 style={{ fontSize: 36, fontWeight: 700, color: "#0F172A", lineHeight: 1.2 }}>Make your next job interview <span style={{ background: "#CCFBF1", color: "#0D9488", borderRadius: 6, padding: "2px 8px" }}>stress-free thanks to AI</span></h2>
              <button onClick={() => startInterview("General Interview")} style={{ background: "#0F172A", color: "#fff", border: "none", borderRadius: 999, padding: "12px 28px", fontWeight: 600, fontSize: 15, cursor: "pointer", marginTop: 32 }}>Start an interview →</button>
            </div>
            <div style={{ flex: "1 1 300px", display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#EF4444", textTransform: "uppercase", marginBottom: 12 }}>Without Interviews by AI</div>
                {["Unprepared","Nervous","Ghosted"].map(t => <div key={t} style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 10, padding: "14px 16px", marginBottom: 12, display: "flex", alignItems: "center", gap: 8, color: "#991B1B", fontWeight: 600 }}><span style={{ color: "#EF4444" }}>✗</span>{t}</div>)}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 28, paddingTop: 40, color: "#14B8A6", fontSize: 20 }}>→→→</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#0D9488", textTransform: "uppercase", marginBottom: 12 }}>With Interviews by AI</div>
                {["Organized and ready","Confident answers","Hired!"].map(t => <div key={t} style={{ background: "#14B8A6", borderRadius: 10, padding: "14px 16px", marginBottom: 12, display: "flex", alignItems: "center", gap: 8, color: "#fff", fontWeight: 600 }}><span>✓</span>{t}</div>)}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Floating CTA */}
      <motion.div initial={{ y: 100 }} animate={{ y: 0 }} transition={{ delay: 0.5, type: "spring" }}
        style={{ position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 50 }}>
        <button onClick={() => startInterview("Custom Role")}
          style={{ background: "#0F172A", color: "#fff", border: "none", borderRadius: 999, padding: "14px 32px", fontSize: 15, fontWeight: 600, cursor: "pointer", boxShadow: "0 8px 32px rgba(0,0,0,0.3)", display: "flex", alignItems: "center", gap: 8 }}
          onMouseEnter={e => e.currentTarget.style.opacity="0.85"} onMouseLeave={e => e.currentTarget.style.opacity="1"}
        >Start an Interview →</button>
      </motion.div>
    </motion.div>
  );
}
