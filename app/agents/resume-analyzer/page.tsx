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

const colorOptions = ["#f8fafc", "#1e293b", "#0ea5e9", "#2563eb", "#0d9488", "#d97706", "#dc2626", "#475569"];

const TemplateCard = ({ name, activeColor, onColorChange, isDark = false }: { name: string, activeColor: string, onColorChange: (c:string) => void, isDark?: boolean }) => {
  const isDefaultColor = activeColor === '#f8fafc' || activeColor === '#1e293b';
  return (
    <div className="flex flex-col items-center">
      <div 
        className="w-full aspect-[1/1.4] bg-white rounded-xl shadow-md border border-gray-200 mb-6 relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
        style={{ borderColor: !isDefaultColor ? activeColor : undefined }}
      >
         {/* CSS Layout of the template matching its name */}
         <div className="absolute inset-0 p-5 flex flex-col gap-3">
            {isDark && <div className="absolute top-0 left-0 w-1/3 h-full opacity-[0.15]" style={{ backgroundColor: activeColor }}></div>}
            
            {/* Header part */}
            <div className="flex justify-between items-end pb-2 border-b border-gray-100 z-10">
              <div className="h-5 w-1/2 rounded" style={{ backgroundColor: isDefaultColor ? '#1f2937' : activeColor }}></div>
              <div className="space-y-1">
                <div className="h-1.5 w-12 bg-gray-200 rounded"></div>
                <div className="h-1.5 w-16 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 flex gap-4 z-10">
               {/* Left Column */}
               <div className="w-[30%] space-y-4">
                 <div className="space-y-1">
                   <div className="h-2 w-full rounded" style={{ backgroundColor: isDefaultColor ? '#4b5563' : activeColor }}></div>
                   {[1,2,3].map(i => <div key={i} className="h-1.5 w-full bg-gray-100 rounded"></div>)}
                 </div>
                 <div className="space-y-1">
                   <div className="h-2 w-full rounded" style={{ backgroundColor: isDefaultColor ? '#4b5563' : activeColor }}></div>
                   {[1,2,3,4].map(i => <div key={i} className="h-1.5 w-full bg-gray-100 rounded"></div>)}
                 </div>
               </div>
               {/* Right Column */}
               <div className="w-[70%] space-y-4">
                 {[1,2].map(section => (
                    <div key={section} className="space-y-2">
                      <div className="h-2.5 w-1/3 rounded" style={{ backgroundColor: isDefaultColor ? '#4b5563' : activeColor }}></div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between">
                          <div className="h-1.5 w-1/2 bg-gray-300 rounded"></div>
                          <div className="h-1.5 w-1/4 bg-gray-200 rounded"></div>
                        </div>
                        <div className="h-1.5 w-full bg-gray-100 rounded"></div>
                        <div className="h-1.5 w-[90%] bg-gray-100 rounded"></div>
                        <div className="h-1.5 w-[95%] bg-gray-100 rounded"></div>
                      </div>
                    </div>
                 ))}
               </div>
            </div>
         </div>
      </div>
      <div className="flex gap-2 mb-4 justify-center flex-wrap px-2">
        {colorOptions.map(color => (
          <button
            key={color}
            onClick={() => onColorChange(color)}
            className={`w-5 h-5 rounded-full border shadow-sm transition-all ${
              activeColor === color 
                ? 'ring-2 ring-offset-2 ring-gray-400 scale-110 border-gray-400' 
                : 'border-gray-200 hover:scale-110'
            }`}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
      <h4 className="font-bold text-lg text-gray-900">{name}</h4>
    </div>
  )
}

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
  const [activeTemplateColors, setActiveTemplateColors] = useState({
    multicolumn: "#000000",
    classic: "#000000",
    modern: "#2563eb",
    quotation: "#000000"
  });

  const handleAction = (message: string) => {
    alert(message);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-24 pb-20 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <div className="space-y-8 z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-[1.1] tracking-tight text-black">
            Job-Winning<br />
            <span className="relative inline-block mt-2">
              Resume Templates
              <div className="absolute bottom-0 left-0 w-full h-3 bg-green-300 opacity-60 rounded-full -z-10 transform -rotate-1"></div>
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
            Get the job 2x as fast. Use recruiter-approved templates and step-by-step content recommendations to create a new resume or optimize your current one.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button 
              onClick={() => handleAction("Opening create new resume flow...")}
              className="bg-[#3b66ff] hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/30 active:scale-95"
            >
              Create new resume
            </button>
            <button 
              onClick={() => handleAction("Opening optimize resume flow...")}
              className="bg-white border-2 border-gray-900 hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-full font-bold text-lg transition-all active:scale-95"
            >
              Optimize my resume
            </button>
          </div>
          
          <div className="inline-flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-200 mt-4 shadow-sm">
            <span className="font-bold text-xs tracking-widest text-gray-800">EXCELLENT</span>
            <div className="flex text-[#00b67a]">
              {[1,2,3,4,5].map(i => <Star key={i} fill="currentColor" stroke="none" className="w-4 h-4 mr-0.5" />)}
            </div>
            <span className="text-sm font-medium text-gray-600">4.5 out of 5 based on 17,236 reviews</span>
            <div className="flex items-center gap-1 font-bold text-sm text-gray-800 ml-2">
              <Star className="text-[#00b67a] w-5 h-5" fill="currentColor" stroke="none" /> Trustpilot
            </div>
          </div>
        </div>

        {/* Hero Interactive Graphic */}
        <div className="relative h-[500px] md:h-[600px] w-full flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
           {/* Abstract Background styling */}
           <div className="absolute inset-0 right-0 bg-gradient-to-tr from-green-50 to-blue-50 opacity-50 rounded-full blur-3xl transform translate-x-1/4"></div>
           
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, ease: "easeOut" }}
             className="relative w-[380px] md:w-[420px] h-[520px] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-gray-200 overflow-hidden transform rotate-2 hover:rotate-0 transition-transform duration-500"
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
                onClick={() => handleAction("AI Enhancement feature triggered")}
                className="absolute top-6 right-6 bg-[#ffb84d] text-orange-950 px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 shadow-xl border border-orange-300 z-20 cursor-pointer"
              >
                <Wand2 size={16} /> Enhance with AI
              </motion.button>
           </motion.div>
        </div>
      </section>

      {/* Trusted By & Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        {/* Logos */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mb-24">
          <p className="text-sm font-bold text-gray-900 whitespace-nowrap">Our customers have been hired by</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center opacity-80">
            {/* Logos text representations */}
            <span className="text-2xl font-black tracking-tighter text-gray-800">TATA</span>
            <span className="text-2xl font-sans tracking-tight text-gray-800">Google</span>
            <span className="text-2xl font-serif italic text-gray-800">Apple</span>
            <span className="text-2xl font-black italic text-gray-800">NIKE</span>
            <span className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              <div className="grid grid-cols-2 gap-0.5 w-5 h-5"><div className="bg-gray-800"></div><div className="bg-gray-800"></div><div className="bg-gray-800"></div><div className="bg-gray-800"></div></div> Microsoft
            </span>
          </div>
        </div>

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
              onClick={() => handleAction("Scrolling to templates...")}
              className="bg-[#3b66ff] hover:bg-blue-700 text-white px-8 py-3.5 rounded-full font-bold text-lg transition-all shadow-md active:scale-95 z-10"
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
      <section className="bg-gray-50 py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <TemplateCard 
              name="Multicolumn" 
              activeColor={activeTemplateColors.multicolumn}
              onColorChange={(c) => setActiveTemplateColors(prev => ({...prev, multicolumn: c}))}
            />
            <TemplateCard 
              name="Classic" 
              activeColor={activeTemplateColors.classic}
              onColorChange={(c) => setActiveTemplateColors(prev => ({...prev, classic: c}))}
            />
            <TemplateCard 
              name="Modern" 
              activeColor={activeTemplateColors.modern}
              onColorChange={(c) => setActiveTemplateColors(prev => ({...prev, modern: c}))}
              isDark
            />
            <TemplateCard 
              name="Quotation" 
              activeColor={activeTemplateColors.quotation}
              onColorChange={(c) => setActiveTemplateColors(prev => ({...prev, quotation: c}))}
            />
          </div>
          <div className="mt-16 text-center">
            <button 
              onClick={() => handleAction("Navigating to template gallery...")}
              className="text-[#3b66ff] font-bold text-xl inline-flex items-center gap-2 hover:gap-3 transition-all"
            >
              View all templates <ArrowRight size={20} strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </section>

      {/* 6 Features Grid Section */}
      <section className="bg-[#f2f8fc] py-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black text-center mb-16 tracking-tight">
            6 features to boost your job search
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
            <FeatureCard title="35+ Template Designs" graphicType={1} />
            <FeatureCard title="Enhance with AI" graphicType={2} />
            <FeatureCard title="Resume Review" graphicType={3} />
            <FeatureCard title="AI Cover Letter Builder" graphicType={4} />
            <FeatureCard title="Resume Website" graphicType={5} />
            <FeatureCard title="Resume Tracking" graphicType={6} />
          </div>
        </div>
      </section>

    </div>
  );
}

