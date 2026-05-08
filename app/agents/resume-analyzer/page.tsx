"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Star, 
  ArrowRight, 
  Camera, 
  Clock, 
  Briefcase, 
  Wand2, 
  Check, 
  Globe, 
  BarChart, 
  FileText,
  PenTool,
  MessageSquare
} from "lucide-react";
import ResumeEditor from "../../../components/ResumeEditor";

const colorOptions = ["#f8fafc", "#1e293b", "#0ea5e9", "#2563eb", "#0d9488", "#d97706", "#dc2626", "#475569"];

type TemplateLayout = 'two-column' | 'left-sidebar' | 'single-column' | 'minimal' | 'header-centric' | 'creative';

const TemplateCard = ({ name, activeColor, onColorChange, layout, isDark = false, onSelect }: { name: string, activeColor: string, onColorChange: (c:string) => void, layout: TemplateLayout, isDark?: boolean, onSelect?: () => void }) => {
  const isDefaultColor = activeColor === '#f8fafc' || activeColor === '#1e293b' || activeColor === '#000000';
  const themeColor = isDefaultColor ? '#4b5563' : activeColor;
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className="w-full aspect-[1/1.4] bg-white rounded-xl shadow-md border border-gray-200 mb-4 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer group"
        style={{ borderColor: !isDefaultColor ? activeColor : undefined }}
      >
         <div className="absolute inset-0 w-full h-full">
            {/* Different layouts */}
            {layout === 'two-column' && (
              <div className="flex flex-col h-full p-4 gap-3">
                {isDark && <div className="absolute top-0 left-0 w-1/3 h-full opacity-[0.15]" style={{ backgroundColor: themeColor }}></div>}
                <div className="flex justify-between items-end pb-2 border-b border-gray-100 z-10">
                  <div className="h-5 w-1/2 rounded" style={{ backgroundColor: themeColor }}></div>
                  <div className="space-y-1">
                    <div className="h-1.5 w-12 bg-gray-200 rounded"></div>
                    <div className="h-1.5 w-16 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="flex-1 flex gap-4 z-10">
                   <div className="w-[30%] space-y-4">
                     <div className="space-y-1"><div className="h-2 w-full rounded" style={{ backgroundColor: themeColor }}></div>{[1,2,3].map(i => <div key={i} className="h-1.5 w-full bg-gray-100 rounded"></div>)}</div>
                     <div className="space-y-1"><div className="h-2 w-full rounded" style={{ backgroundColor: themeColor }}></div>{[1,2,3,4].map(i => <div key={i} className="h-1.5 w-full bg-gray-100 rounded"></div>)}</div>
                   </div>
                   <div className="w-[70%] space-y-4">
                     {[1,2].map(section => (
                        <div key={section} className="space-y-2">
                          <div className="h-2.5 w-1/3 rounded" style={{ backgroundColor: themeColor }}></div>
                          <div className="space-y-1.5"><div className="flex justify-between"><div className="h-1.5 w-1/2 bg-gray-300 rounded"></div><div className="h-1.5 w-1/4 bg-gray-200 rounded"></div></div><div className="h-1.5 w-full bg-gray-100 rounded"></div><div className="h-1.5 w-[90%] bg-gray-100 rounded"></div></div>
                        </div>
                     ))}
                   </div>
                </div>
              </div>
            )}

            {layout === 'left-sidebar' && (
              <div className="flex h-full w-full">
                <div className="w-[35%] h-full p-3 space-y-4 flex flex-col items-center" style={{ backgroundColor: themeColor }}>
                  <div className="h-10 w-10 rounded-full bg-white/30 mb-2"></div>
                  <div className="space-y-1.5 w-full"><div className="h-1.5 w-full bg-white/50 rounded"></div><div className="h-1.5 w-3/4 bg-white/50 rounded mx-auto"></div></div>
                  <div className="space-y-1.5 w-full pt-2 border-t border-white/20"><div className="h-2 w-1/2 bg-white/80 rounded mb-1"></div><div className="h-1 w-full bg-white/40 rounded"></div><div className="h-1 w-5/6 bg-white/40 rounded"></div></div>
                </div>
                <div className="w-[65%] h-full p-4 flex flex-col gap-3 bg-white">
                  <div className="h-5 w-3/4 bg-gray-800 rounded"></div>
                  <div className="h-1.5 w-1/2 bg-gray-400 rounded"></div>
                  <div className="mt-2 space-y-3">
                    <div className="space-y-1.5"><div className="h-2 w-1/3 bg-gray-800 rounded"></div><div className="h-1 w-full bg-gray-200 rounded"></div><div className="h-1 w-full bg-gray-200 rounded"></div></div>
                    <div className="space-y-1.5"><div className="h-2 w-1/3 bg-gray-800 rounded"></div><div className="h-1 w-full bg-gray-200 rounded"></div><div className="h-1 w-4/5 bg-gray-200 rounded"></div></div>
                  </div>
                </div>
              </div>
            )}

            {layout === 'single-column' && (
              <div className="flex flex-col h-full p-5 gap-3 bg-white">
                <div className="flex flex-col items-center border-b-[1.5px] pb-3" style={{ borderColor: themeColor }}>
                  <div className="h-4 w-2/3 bg-gray-900 rounded mb-2"></div>
                  <div className="flex gap-2 w-full justify-center"><div className="h-1 w-1/4 bg-gray-400 rounded"></div><div className="h-1 w-1/4 bg-gray-400 rounded"></div></div>
                </div>
                <div className="flex-1 space-y-4 mt-2">
                   {[1,2,3].map(section => (
                     <div key={section} className="space-y-1.5">
                       <div className="h-2 w-1/4 rounded mb-1" style={{ backgroundColor: themeColor }}></div>
                       <div className="h-1 w-full bg-gray-100 rounded"></div>
                       <div className="h-1 w-[95%] bg-gray-100 rounded"></div>
                       {section !== 3 && <div className="h-1 w-[85%] bg-gray-100 rounded"></div>}
                     </div>
                   ))}
                </div>
              </div>
            )}

            {layout === 'header-centric' && (
              <div className="flex flex-col h-full bg-white">
                <div className="h-[25%] w-full p-4 flex flex-col justify-end" style={{ backgroundColor: themeColor }}>
                  <div className="h-4 w-3/4 bg-white/90 rounded mb-1.5"></div>
                  <div className="h-1.5 w-1/2 bg-white/60 rounded"></div>
                </div>
                <div className="flex h-[75%] p-4 gap-4">
                  <div className="w-1/2 space-y-3">
                     <div className="space-y-1.5"><div className="h-2 w-1/2 bg-gray-800 rounded"></div><div className="h-1 w-full bg-gray-200 rounded"></div><div className="h-1 w-[90%] bg-gray-200 rounded"></div></div>
                     <div className="space-y-1.5"><div className="h-2 w-1/2 bg-gray-800 rounded"></div><div className="h-1 w-full bg-gray-200 rounded"></div></div>
                  </div>
                  <div className="w-1/2 space-y-3">
                     <div className="space-y-1.5"><div className="h-2 w-1/2 bg-gray-800 rounded"></div><div className="h-1 w-full bg-gray-200 rounded"></div><div className="h-1 w-[80%] bg-gray-200 rounded"></div></div>
                  </div>
                </div>
              </div>
            )}

            {layout === 'minimal' && (
              <div className="flex flex-col h-full p-5 gap-4 bg-white">
                <div>
                  <div className="h-3 w-1/2 bg-gray-800 rounded mb-2"></div>
                  <div className="flex gap-3"><div className="h-1 w-1/5 bg-gray-300 rounded"></div><div className="h-1 w-1/5 bg-gray-300 rounded"></div></div>
                </div>
                <div className="w-full h-[1px] bg-gray-100"></div>
                <div className="flex gap-4">
                  <div className="w-1/4 h-1.5 rounded opacity-70 mt-1" style={{ backgroundColor: themeColor }}></div>
                  <div className="w-3/4 space-y-2"><div className="h-1 w-full bg-gray-200 rounded"></div><div className="h-1 w-5/6 bg-gray-200 rounded"></div></div>
                </div>
                <div className="flex gap-4">
                  <div className="w-1/4 h-1.5 rounded opacity-70 mt-1" style={{ backgroundColor: themeColor }}></div>
                  <div className="w-3/4 space-y-2"><div className="h-1 w-full bg-gray-200 rounded"></div><div className="h-1 w-4/5 bg-gray-200 rounded"></div><div className="h-1 w-[90%] bg-gray-200 rounded"></div></div>
                </div>
              </div>
            )}

            {layout === 'creative' && (
              <div className="flex flex-col h-full bg-white relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-20%] w-[60%] aspect-square rounded-full opacity-10" style={{ backgroundColor: themeColor }}></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] aspect-square rounded-full opacity-10" style={{ backgroundColor: themeColor }}></div>
                <div className="flex flex-col h-full p-4 z-10">
                  <div className="flex gap-3 items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-gray-200 border-[1.5px]" style={{ borderColor: themeColor }}></div>
                    <div><div className="h-3 w-20 bg-gray-800 rounded mb-1"></div><div className="h-1 w-12 bg-gray-400 rounded"></div></div>
                  </div>
                  <div className="flex gap-3 h-full">
                    <div className="w-[40%] space-y-3">
                      <div className="h-1.5 w-full rounded" style={{ backgroundColor: themeColor }}></div>
                      <div className="space-y-1"><div className="h-1 w-full bg-gray-200 rounded"></div><div className="h-1 w-3/4 bg-gray-200 rounded"></div></div>
                    </div>
                    <div className="w-[60%] space-y-3">
                      <div className="space-y-1.5 border-l-[1.5px] pl-2" style={{ borderColor: themeColor }}>
                        <div className="h-1.5 w-1/2 bg-gray-700 rounded"></div>
                        <div className="h-1 w-full bg-gray-100 rounded"></div>
                        <div className="h-1 w-[90%] bg-gray-100 rounded"></div>
                      </div>
                      <div className="space-y-1.5 border-l-[1.5px] pl-2" style={{ borderColor: themeColor }}>
                        <div className="h-1.5 w-1/2 bg-gray-700 rounded"></div>
                        <div className="h-1 w-full bg-gray-100 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                <button onClick={(e) => { e.stopPropagation(); onSelect && onSelect(); }} className="bg-white/90 backdrop-blur-sm text-[#3b66ff] text-sm font-bold px-4 py-2 rounded-full shadow-lg border border-gray-100 hover:bg-[#3b66ff] hover:text-white transition-colors">Use Template</button>
              </div>
            </div>
         </div>
      </div>
      <div className="flex gap-1.5 mb-2 justify-center flex-wrap px-1">
        {colorOptions.map(color => (
          <button
            key={color}
            onClick={(e) => { e.stopPropagation(); onColorChange(color); }}
            className={`w-4 h-4 rounded-full border shadow-sm transition-all ${
              activeColor === color 
                ? 'ring-[1.5px] ring-offset-[1.5px] ring-gray-400 scale-110 border-gray-400' 
                : 'border-gray-200 hover:scale-110'
            }`}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
      <h4 className="font-semibold text-sm text-gray-800 text-center">{name}</h4>
    </div>
  )
}

const ALL_TEMPLATES: { id: string; name: string; category: string; layout: TemplateLayout; isDark?: boolean }[] = [
  { id: 't1', name: 'Standard Professional', category: 'Professional', layout: 'single-column' },
  { id: 't2', name: 'Executive Clean', category: 'Professional', layout: 'two-column' },
  { id: 't3', name: 'Corporate Standard', category: 'Professional', layout: 'header-centric' },
  { id: 't4', name: 'Modern Impact', category: 'Modern', layout: 'two-column', isDark: true },
  { id: 't5', name: 'Tech Innovator', category: 'Modern', layout: 'left-sidebar' },
  { id: 't6', name: 'Sleek Developer', category: 'Modern', layout: 'single-column' },
  { id: 't7', name: 'Minimalist Blank', category: 'Minimalist', layout: 'minimal' },
  { id: 't8', name: 'Clean Typography', category: 'Minimalist', layout: 'minimal' },
  { id: 't9', name: 'Essential Structure', category: 'Minimalist', layout: 'two-column' },
  { id: 't10', name: 'Creative Portfolio', category: 'Creative', layout: 'creative' },
  { id: 't11', name: 'Designer Bold', category: 'Creative', layout: 'left-sidebar' },
  { id: 't12', name: 'Marketing Pro', category: 'Creative', layout: 'header-centric' },
  { id: 't13', name: 'Academic CV', category: 'Professional', layout: 'single-column' },
  { id: 't14', name: 'Startup Founder', category: 'Modern', layout: 'creative' },
  { id: 't15', name: 'Elegant Edge', category: 'Minimalist', layout: 'left-sidebar' },
  { id: 't16', name: 'The Standout', category: 'Creative', layout: 'two-column', isDark: true },
];

const CATEGORIES = ['All', 'Professional', 'Modern', 'Minimalist', 'Creative'];

const FeatureCard = ({ title, graphicType }: { title: string, graphicType: number }) => {
  return (
    <div className="group cursor-pointer">
       <div className="bg-[#e7ebf6] rounded-xl h-56 mb-6 relative overflow-hidden flex items-center justify-center transition-all duration-300 group-hover:shadow-md group-hover:bg-[#dfe4f1]">
          {/* Different Graphics based on type */}
          <div className="transform group-hover:scale-105 transition-all duration-500 w-full h-full flex items-center justify-center">
            
            {graphicType === 1 && (
              <div className="relative w-48 h-36">
                 <div className="absolute top-4 left-4 w-32 h-40 bg-white rounded shadow-sm border border-gray-100 -rotate-6 transform origin-bottom-left flex flex-col p-2 gap-1">
                    <div className="w-full h-2 bg-rose-200 rounded"></div>
                    <div className="w-1/2 h-1 bg-gray-200 rounded"></div>
                 </div>
                 <div className="absolute top-0 right-4 w-36 h-40 bg-white rounded shadow-md border border-gray-200 rotate-3 transform origin-bottom-right p-3 flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                       <div className="w-6 h-6 bg-blue-100 rounded-full"></div>
                       <div className="w-16 h-2 bg-blue-900 rounded"></div>
                    </div>
                    <div className="w-full h-1 bg-gray-100 rounded mt-2"></div>
                    <div className="w-3/4 h-1 bg-gray-100 rounded"></div>
                 </div>
              </div>
            )}

            {graphicType === 2 && (
              <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 w-48 flex flex-col gap-3 relative">
                 <div className="absolute -top-3 -left-3 bg-green-100 text-green-700 p-1.5 rounded-lg shadow-sm">
                   <Wand2 size={16} />
                 </div>
                 <div className="flex gap-2 items-center bg-blue-50 p-2 rounded text-xs font-semibold text-blue-700">
                   Here are a few options for AI enhanced grammar.
                 </div>
                 <div className="space-y-2 border border-gray-100 p-2 rounded bg-gray-50">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border border-gray-300"></div><div className="w-full h-2 bg-gray-200 rounded"></div></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full border border-gray-300"></div><div className="w-4/5 h-2 bg-gray-200 rounded"></div></div>
                 </div>
              </div>
            )}

            {graphicType === 3 && (
              <div className="relative w-40 h-40">
                <div className="absolute inset-0 bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                  <div className="w-full h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2">
                    {[1,2,3,4].map(i => <div key={i} className="w-full h-1.5 bg-gray-100 rounded"></div>)}
                  </div>
                </div>
                <div className="absolute -right-6 top-6 bg-white p-2 rounded-lg shadow-lg border border-gray-100 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[url('https://i.pravatar.cc/150?img=47')] bg-cover"></div>
                  <div className="w-12 h-2 bg-blue-600 rounded"></div>
                </div>
                <div className="absolute -left-4 bottom-8 bg-blue-50 p-2 rounded-lg shadow border border-blue-100">
                  <Check size={16} className="text-blue-600" />
                </div>
              </div>
            )}

            {graphicType === 4 && (
              <div className="relative">
                <div className="bg-white p-4 w-40 h-48 rounded-lg shadow-sm border border-gray-200 rotate-[-4deg]">
                  <div className="flex justify-between items-center mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-800 text-xs">DJ</div>
                    <div className="w-16 h-2 bg-blue-900 rounded"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-full h-1.5 bg-gray-200 rounded"></div>
                    <div className="w-full h-1.5 bg-gray-200 rounded"></div>
                    <div className="w-3/4 h-1.5 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="absolute -right-8 top-1/2 transform -translate-y-1/2">
                   <div className="bg-yellow-100 text-yellow-600 p-2 rounded-xl shadow-lg border border-yellow-200 rotate-12">
                     <PenTool size={24} />
                   </div>
                </div>
              </div>
            )}

            {graphicType === 5 && (
              <div className="relative w-56 h-40">
                <div className="absolute inset-0 bg-white rounded-t-xl shadow-md border border-gray-200 flex flex-col overflow-hidden">
                  <div className="h-6 bg-indigo-900 w-full flex items-center px-2 gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-400"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  </div>
                  <div className="p-4 flex flex-col items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow"></div>
                    <div className="w-24 h-3 bg-gray-800 rounded"></div>
                    <div className="flex gap-2 w-full justify-center">
                      <div className="w-12 h-2 bg-gray-200 rounded"></div>
                      <div className="w-12 h-2 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 right-4 bg-orange-200 text-orange-900 text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
                  Your resume URL
                </div>
              </div>
            )}

            {graphicType === 6 && (
              <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200 w-56 h-36 flex flex-col relative">
                 <div className="text-xs font-bold text-gray-800 mb-2">Employers clicking your resume</div>
                 <div className="flex-1 border-l-2 border-b-2 border-gray-100 relative">
                   {/* Simple line chart CSS */}
                   <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                     <path d="M 0 80 L 25 60 L 50 70 L 75 30 L 100 20" fill="none" stroke="#22c55e" strokeWidth="4" />
                     <circle cx="0" cy="80" r="4" fill="#22c55e" />
                     <circle cx="25" cy="60" r="4" fill="#22c55e" />
                     <circle cx="50" cy="70" r="4" fill="#22c55e" />
                     <circle cx="75" cy="30" r="4" fill="#22c55e" />
                     <circle cx="100" cy="20" r="4" fill="#22c55e" />
                   </svg>
                 </div>
                 <div className="absolute right-2 top-10 bg-blue-100 p-1 rounded shadow cursor-pointer hover:bg-blue-200 transition">
                   <div className="w-4 h-4 bg-blue-500 rounded-full opacity-50 animate-ping absolute"></div>
                   <svg className="w-5 h-5 text-blue-900 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                   </svg>
                 </div>
              </div>
            )}

          </div>
       </div>
       <h4 className="font-bold text-lg text-gray-900 group-hover:text-[#3b66ff] transition-colors">{title}</h4>
    </div>
  )
}

export default function ResumeAnalyzerMarketingPage() {
  const [activeView, setActiveView] = useState<"hero" | "upload" | "templates" | "editor">("hero");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [templateColors, setTemplateColors] = useState<Record<string, string>>(
    ALL_TEMPLATES.reduce((acc, t) => ({...acc, [t.id]: '#1e293b'}), {})
  );

  const filteredTemplates = activeCategory === 'All' 
    ? ALL_TEMPLATES 
    : ALL_TEMPLATES.filter(t => t.category === activeCategory);

  // Upload state
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysis, setAnalysis] = useState<{ ats_score: number; strengths: string[]; weaknesses: string[]; extracted_skills: string[]; experience_summary: string; recommendations: string[] } | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleUpload = async (file: File) => {
    setUploadFile(file);
    setUploading(true);
    setUploadProgress(0);
    setAnalysis(null);

    // Simulate progress
    const interval = setInterval(() => {
      setUploadProgress(p => { if (p >= 90) { clearInterval(interval); return 90; } return p + 10; });
    }, 300);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";
      const endpoint = apiBase + "/api/agents/resume/analyze";
      const res = await fetch(endpoint, { method: "POST", body: formData });
      const data = await res.json();
      clearInterval(interval);
      setUploadProgress(100);
      if (data.success && data.analysis) {
        setAnalysis(data.analysis);
      }
    } catch (err) {
      console.error("Resume analysis failed:", err);
      clearInterval(interval);
      setUploadProgress(0);
    }
    setUploading(false);
  };

  const handleAction = (action: "optimize" | "create") => {
    if (action === "optimize") {
      setActiveView("upload");
      setAnalysis(null);
      setUploadFile(null);
      setUploadProgress(0);
    } else if (action === "create") {
      setActiveView("templates");
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.name.endsWith(".pdf") || file.name.endsWith(".docx"))) handleUpload(file);
  };

  return (
    <div className="min-h-screen font-sans text-gray-900 overflow-x-hidden" style={{ background: "#f0f0ed", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700&display=swap');
        .resume-page * { font-family: 'DM Sans', sans-serif; }
        .resume-serif { font-family: 'DM Serif Display', serif !important; }
      `}</style>

      {/* ─── TOP NAVIGATION ─── */}
      <header style={{ background: "#f0f0ed", padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button
          onClick={() => setActiveView("hero")}
          style={{ background: "transparent", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#1a1a1a", display: "flex", alignItems: "center", gap: 6 }}
        >
          ← Dashboard
        </button>
        <div style={{ background: "#ffffff", border: "1px solid #e0e0e0", borderRadius: 999, padding: "6px 16px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#1a1a1a", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: "#c9a84c" }}>●</span> SUPERPLACED AI
        </div>
      </header>

      {/* ═══ RESUME UPLOAD & ANALYSIS SECTION ═══ */}
      {activeView === "upload" && (
      <section style={{ background: "linear-gradient(180deg, #f8f9fa 0%, #fff 100%)", padding: "80px 20px", borderBottom: "1px solid #e6e9ed" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <button 
            onClick={() => setActiveView("hero")}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, textDecoration: "none", color: "#9ea5ad", fontSize: 14, fontWeight: 500, marginBottom: 32, background: "none", border: "none", cursor: "pointer", font: "inherit" }}
          >
            ← Back to Dashboard
          </button>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 600, color: "#1a1c1e", letterSpacing: "-0.02em", marginBottom: 12 }}>
            AI Resume <span style={{ color: "#d4af37" }}>Analyzer</span>
          </h2>
          <p style={{ fontSize: 16, color: "#687078", marginBottom: 40 }}>Upload your resume to get an instant ATS score and detailed AI analysis.</p>

          {/* Dropzone */}
          <div
            onDrop={handleDrop}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            style={{
              border: `2px dashed ${dragOver ? "#d4af37" : "#d3d7dc"}`,
              borderRadius: 20,
              padding: "48px 32px",
              background: dragOver ? "rgba(212,175,55,0.05)" : "#fff",
              transition: "all 0.2s",
              cursor: "pointer",
              marginBottom: 32,
            }}
            onClick={() => document.getElementById("resume-file-input")?.click()}
          >
            <input
              id="resume-file-input"
              type="file"
              accept=".pdf,.docx"
              style={{ display: "none" }}
              onChange={e => { const f = e.target.files?.[0]; if (f) handleUpload(f); }}
            />
            <div style={{ fontSize: 40, marginBottom: 12 }}>📄</div>
            <p style={{ fontSize: 16, fontWeight: 600, color: "#1a1c1e", marginBottom: 4 }}>
              {uploadFile ? uploadFile.name : "Drop your resume here or click to browse"}
            </p>
            <p style={{ fontSize: 13, color: "#9ea5ad" }}>Supports PDF and DOCX files</p>
          </div>

          {/* Progress */}
          {uploading && (
            <div style={{ marginBottom: 32 }}>
              <div style={{ height: 6, borderRadius: 3, background: "#e6e9ed", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${uploadProgress}%`, background: "linear-gradient(90deg, #d4af37, #b87333)", borderRadius: 3, transition: "width 0.3s" }} />
              </div>
              <p style={{ fontSize: 13, color: "#687078", marginTop: 8 }}>
                {uploadProgress < 90 ? "Analyzing your resume with AI..." : uploadProgress < 100 ? "Almost done..." : "Complete!"}
              </p>
            </div>
          )}

          {/* Results */}
          {analysis && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: "left" }}>
              {/* ATS Score */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
                <div style={{ width: 160, height: 160, borderRadius: "50%", background: `conic-gradient(${analysis.ats_score >= 70 ? "#d4af37" : "#b87333"} ${analysis.ats_score * 3.6}deg, #e6e9ed 0deg)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ width: 130, height: 130, borderRadius: "50%", background: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 42, fontWeight: 700, color: "#1a1c1e" }}>{analysis.ats_score}</span>
                    <span style={{ fontSize: 12, color: "#687078", fontWeight: 500 }}>ATS Score</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div style={{ background: "#f8f9fa", borderRadius: 16, padding: 28, marginBottom: 20 }}>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 600, color: "#1a1c1e", marginBottom: 12 }}>Extracted Skills</h3>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {analysis.extracted_skills.map(skill => (
                    <span key={skill} style={{ padding: "4px 14px", borderRadius: 20, background: "rgba(212,175,55,0.1)", border: "1px solid rgba(212,175,55,0.2)", fontSize: 13, fontWeight: 500, color: "#d4af37" }}>{skill}</span>
                  ))}
                </div>
              </div>

              {/* Strengths & Weaknesses */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
                <div style={{ background: "rgba(22,163,106,0.05)", borderRadius: 16, padding: 24, border: "1px solid rgba(22,163,106,0.15)" }}>
                  <h4 style={{ fontSize: 16, fontWeight: 600, color: "#16a34a", marginBottom: 12 }}>✅ Strengths</h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {analysis.strengths.map((s, i) => <li key={i} style={{ fontSize: 13, color: "#333", marginBottom: 8, paddingLeft: 16, position: "relative" }}><span style={{ position: "absolute", left: 0 }}>•</span> {s}</li>)}
                  </ul>
                </div>
                <div style={{ background: "rgba(239,68,68,0.05)", borderRadius: 16, padding: 24, border: "1px solid rgba(239,68,68,0.15)" }}>
                  <h4 style={{ fontSize: 16, fontWeight: 600, color: "#ef4444", marginBottom: 12 }}>⚠️ Weaknesses</h4>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {analysis.weaknesses.map((w, i) => <li key={i} style={{ fontSize: 13, color: "#333", marginBottom: 8, paddingLeft: 16, position: "relative" }}><span style={{ position: "absolute", left: 0 }}>•</span> {w}</li>)}
                  </ul>
                </div>
              </div>

              {/* Recommendations */}
              <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #d3d7dc" }}>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: "#1a1c1e", marginBottom: 12 }}>💡 Recommendations</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {analysis.recommendations.map((r, i) => <li key={i} style={{ fontSize: 13, color: "#333", marginBottom: 8, paddingLeft: 20, position: "relative" }}><span style={{ position: "absolute", left: 0, color: "#d4af37" }}>{i+1}.</span> {r}</li>)}
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </section>
      )}

      {/* Templates View */}
      {activeView === "templates" && (
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => setActiveView("hero")}
            className="mb-12 inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-semibold transition-colors"
          >
            ← Back
          </button>
          <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-4 text-black">
            Choose Your Resume Template
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            Select a template and customize it with your own content
          </p>
          <div className="flex justify-center gap-2 md:gap-4 mb-10 overflow-x-auto pb-4 hide-scrollbar">
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full font-medium text-sm transition-all whitespace-nowrap ${
                  activeCategory === category
                    ? 'bg-gray-900 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
            {filteredTemplates.map((template) => (
              <TemplateCard 
                key={template.id}
                name={template.name} 
                layout={template.layout}
                isDark={template.isDark}
                activeColor={templateColors[template.id]}
                onColorChange={(c) => setTemplateColors(prev => ({...prev, [template.id]: c}))}
                onSelect={() => {
                  setSelectedTemplateId(template.id);
                  setActiveView("editor");
                }}
              />
            ))}
          </div>
          <div className="mt-16 text-center">
            <button 
              onClick={() => handleAction("create")}
              className="text-[#3b66ff] font-bold text-xl inline-flex items-center gap-2 hover:gap-3 transition-all"
            >
              Get Started <ArrowRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </section>
      )}

      {/* Hero View */}
      {activeView === "hero" && (
      <>
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-24 pb-20 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <div className="space-y-8 z-10">
          {/* Overline */}
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "#c9a84c", fontWeight: 500 }}>
            ——&nbsp;&nbsp;AI-POWERED CAREER ACCELERATION
          </p>

          {/* Headline */}
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(42px, 5vw, 58px)", color: "#1a1a1a", lineHeight: 1.1, margin: 0 }}>
            AI-Powered<br />
            Resume{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              Analyzer
              <span style={{ position: "absolute", bottom: 4, left: 0, width: "100%", height: 3, background: "#c9a84c", borderRadius: 2 }}></span>
            </span>
          </h1>

          {/* Subtext */}
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, color: "#555555", lineHeight: 1.65, maxWidth: 480, margin: 0 }}>
            Upload your resume and get instant AI feedback on formatting, keywords, ATS compatibility, and overall strength — in seconds.
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, paddingTop: 8 }}>
            <button 
              onClick={() => handleAction("optimize")}
              style={{ background: "#c9a84c", color: "#ffffff", borderRadius: 999, padding: "14px 28px", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, border: "none", cursor: "pointer", transition: "opacity 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
            >
              Analyze My Resume →
            </button>
            <button 
              onClick={() => handleAction("create")}
              style={{ background: "#ffffff", border: "2px solid #1a1a1a", color: "#1a1a1a", borderRadius: 999, padding: "14px 28px", fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 400, cursor: "pointer", transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f5f5f5")}
              onMouseLeave={e => (e.currentTarget.style.background = "#ffffff")}
            >
              See How It Works
            </button>
          </div>
        </div>

        {/* Hero Right Side — Resume Preview */}
        <div className="relative h-[500px] md:h-[600px] w-full flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             style={{ borderRadius: 20, boxShadow: "0 8px 40px rgba(0,0,0,0.10)", overflow: "hidden" }}
             className="relative w-[380px] md:w-[420px] h-[520px] border border-gray-200 transform rotate-2 hover:rotate-0 transition-transform duration-500"
           >
              <Image
                src="/resume_hero_mockup.png"
                alt="AI Resume Mockup"
                fill
                className="object-cover"
                priority
              />

              {/* Enhance with AI Tooltip */}
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                onClick={() => handleAction("optimize")}
                style={{ background: "#c9a84c", color: "#fff" }}
                className="absolute top-6 right-6 px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl z-20 cursor-pointer border-0"
              >
                <Wand2 size={16} /> Analyze with AI
              </motion.button>
           </motion.div>
        </div>
      </section>

      {/* Features Section — no logos */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">

        {/* 3 Features Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-20 relative">
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-extrabold text-black leading-tight mb-2">
              Create a resume<br/>that gets results
            </h2>
            <div className="w-48 h-1.5 bg-green-300 rounded-full mt-4"></div>
          </div>
          <div className="lg:w-1/2 flex justify-start lg:justify-end items-center relative">
            <div className="hidden lg:block absolute right-64 top-4 text-gray-400 rotate-12">
               <svg width="60" height="40" viewBox="0 0 100 50" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M10,40 Q40,10 90,25 M80,15 L90,25 L75,30" />
               </svg>
            </div>
            <button 
              onClick={() => handleAction("create")}
              style={{ background: "#c9a84c", color: "#ffffff", padding: "14px 28px", borderRadius: 999, fontFamily: "'DM Sans', sans-serif", fontSize: 16, fontWeight: 600, border: "none", cursor: "pointer" }}
              className="active:scale-95 z-10"
            >
              Choose a template
            </button>
          </div>
        </div>

        {/* 3 Features Columns */}
        <div className="grid md:grid-cols-3 gap-12">
          <div className="flex flex-col items-start">
            <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-green-700 mb-6 border border-green-200">
              <Camera strokeWidth={1.5} size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Recruiter-Approved<br/>Resume</h3>
            <p className="text-gray-600 leading-relaxed">We work with recruiters to design resume templates that format automatically.</p>
          </div>
          <div className="flex flex-col items-start">
            <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center text-blue-700 mb-6 border border-blue-200">
              <Clock strokeWidth={1.5} size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Finish Your Resume<br/>in 15 Minutes</h3>
            <p className="text-gray-600 leading-relaxed">Resume Now helps you tackle your work experience by reminding you what you did at your job.</p>
          </div>
          <div className="flex flex-col items-start">
            <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center text-orange-700 mb-6 border border-orange-200">
              <Briefcase strokeWidth={1.5} size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Land an<br/>Interview</h3>
            <p className="text-gray-600 leading-relaxed">We suggest the skills you should add. It helped over a million people get interviews.</p>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section style={{ background: "#f0f0ed" }} className="py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {ALL_TEMPLATES.slice(0, 4).map((template) => (
              <TemplateCard 
                key={template.id}
                name={template.name} 
                layout={template.layout}
                isDark={template.isDark}
                activeColor={templateColors[template.id]}
                onColorChange={(c) => setTemplateColors(prev => ({...prev, [template.id]: c}))}
                onSelect={() => {
                  setSelectedTemplateId(template.id);
                  setActiveView("editor");
                }}
              />
            ))}
          </div>
          <div className="mt-16 text-center">
            <button 
              onClick={() => handleAction("create")}
              style={{ color: "#c9a84c", fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: 18, background: "none", border: "none", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              View all templates <ArrowRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </section>

      {/* What Our Resume Analyzer Does — 4 cards */}
      <section style={{ background: "#ffffff", padding: "80px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, color: "#1a1a1a", marginBottom: 48, lineHeight: 1.15 }}>
            What Our Resume Analyzer Does
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {[
              { emoji: "🎯", title: "ATS Score Analysis", desc: "Instantly checks if your resume passes Applicant Tracking Systems used by top companies." },
              { emoji: "🔍", title: "Keyword Optimization", desc: "Identifies missing industry keywords and suggests additions to match your target job roles." },
              { emoji: "✍️", title: "Formatting Feedback", desc: "Detects layout issues, font inconsistencies, and structure problems that hurt readability." },
              { emoji: "📈", title: "Strength Score", desc: "Gives you an overall resume strength score with a clear breakdown of what to improve." },
            ].map((card) => (
              <div key={card.title} style={{ background: "#f9f8f5", borderRadius: 16, padding: 32, border: "1px solid #eeede8", textAlign: "left" }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{card.emoji}</div>
                <h3 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "#1a1a1a", marginBottom: 12, marginTop: 0 }}>{card.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#666666", lineHeight: 1.6, margin: 0 }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </>
      )}

      {/* Editor View */}
      {activeView === "editor" && selectedTemplateId && (
        <ResumeEditor 
          template={ALL_TEMPLATES.find(t => t.id === selectedTemplateId)!} 
          color={templateColors[selectedTemplateId]} 
          onBack={() => setActiveView("templates")} 
        />
      )}

    </div>
  );
}

