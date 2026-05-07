"use client";

import React, { useState } from "react";
import { ArrowLeft, Download, Plus, Trash2 } from "lucide-react";

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: { company: string; role: string; dates: string; description: string }[];
  education: { school: string; degree: string; dates: string }[];
  skills: string[];
}

const defaultData: ResumeData = {
  name: "Jane Doe",
  title: "Senior Software Engineer",
  email: "jane.doe@example.com",
  phone: "(555) 123-4567",
  location: "San Francisco, CA",
  summary: "Results-driven Software Engineer with 6+ years of experience building scalable web applications. Passionate about clean code, performance optimization, and mentoring junior developers.",
  experience: [
    {
      company: "Tech Innovators Inc.",
      role: "Senior Frontend Engineer",
      dates: "2021 - Present",
      description: "Led the migration from Vue to React, improving performance by 40%. Mentored a team of 4 junior developers. Architected a new design system used across 3 major products."
    },
    {
      company: "Web Solutions LLC",
      role: "Software Developer",
      dates: "2018 - 2021",
      description: "Developed responsive web interfaces using React and TypeScript. Collaborated closely with UX designers. Reduced bundle size by 25% through advanced Webpack configuration."
    }
  ],
  education: [
    {
      school: "University of Technology",
      degree: "B.S. in Computer Science",
      dates: "2014 - 2018"
    }
  ],
  skills: ["React", "TypeScript", "Node.js", "GraphQL", "Tailwind CSS", "AWS"]
};

interface ResumeEditorProps {
  template: any;
  color: string;
  onBack: () => void;
}

export default function ResumeEditor({ template, color, onBack }: ResumeEditorProps) {
  const [data, setData] = useState<ResumeData>(defaultData);
  const themeColor = color === "#f8fafc" || color === "#1e293b" || color === "#000000" ? "#4b5563" : color;

  const [isExporting, setIsExporting] = useState(false);

  const handleChange = (field: keyof ResumeData, value: string) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleAdvancedExport = async () => {
    setIsExporting(true);
    try {
      const response = await fetch('/api/generate-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success && result.pdfUrl) {
        window.open(result.pdfUrl, '_blank');
      } else {
        alert('Export failed: ' + result.error);
      }
    } catch (error) {
      console.error(error);
      alert('Error triggering export API.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden font-sans">
      
      {/* ─── LEFT PANE: Editor Form ─── */}
      <div className="w-[400px] h-full bg-white border-r border-gray-200 flex flex-col hide-on-print">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 font-medium">
            <ArrowLeft size={16} /> Back to Templates
          </button>
          <div className="flex items-center gap-2">
            <button onClick={handleAdvancedExport} disabled={isExporting} className="flex items-center gap-2 text-sm bg-orange-500 hover:bg-orange-600 text-white px-3 py-1.5 rounded-md font-medium transition disabled:opacity-50">
              {isExporting ? 'Exporting...' : 'Superplaced AI Export'}
            </button>
            <button onClick={handlePrint} className="flex items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md font-medium transition">
              <Download size={16} /> Print PDF
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Personal Info */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Personal Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Full Name</label>
                <input value={data.name} onChange={e => handleChange("name", e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Professional Title</label>
                <input value={data.title} onChange={e => handleChange("title", e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Email</label>
                  <input value={data.email} onChange={e => handleChange("email", e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Phone</label>
                  <input value={data.phone} onChange={e => handleChange("phone", e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 mb-1">Location</label>
                <input value={data.location} onChange={e => handleChange("location", e.target.value)} className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm" />
              </div>
            </div>
          </section>

          {/* Summary */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Professional Summary</h3>
            <textarea 
              value={data.summary} 
              onChange={e => handleChange("summary", e.target.value)} 
              rows={4}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none"
            />
          </section>

          {/* Skills */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Skills (comma separated)</h3>
            <input 
              value={data.skills.join(", ")} 
              onChange={e => setData(prev => ({ ...prev, skills: e.target.value.split(",").map(s => s.trim()) }))} 
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
            />
          </section>

          {/* Experience */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2 flex justify-between items-center">
              Experience
            </h3>
            <div className="space-y-6">
              {data.experience.map((exp, index) => (
                <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-lg relative group">
                  <div className="space-y-3">
                    <input value={exp.company} placeholder="Company" onChange={e => {
                      const newExp = [...data.experience];
                      newExp[index].company = e.target.value;
                      setData(prev => ({...prev, experience: newExp}));
                    }} className="w-full p-2 border border-gray-300 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    
                    <div className="grid grid-cols-2 gap-3">
                      <input value={exp.role} placeholder="Role" onChange={e => {
                        const newExp = [...data.experience];
                        newExp[index].role = e.target.value;
                        setData(prev => ({...prev, experience: newExp}));
                      }} className="w-full p-2 border border-gray-300 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                      
                      <input value={exp.dates} placeholder="Dates (e.g. 2020-2022)" onChange={e => {
                        const newExp = [...data.experience];
                        newExp[index].dates = e.target.value;
                        setData(prev => ({...prev, experience: newExp}));
                      }} className="w-full p-2 border border-gray-300 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>

                    <textarea value={exp.description} placeholder="Description" rows={3} onChange={e => {
                      const newExp = [...data.experience];
                      newExp[index].description = e.target.value;
                      setData(prev => ({...prev, experience: newExp}));
                    }} className="w-full p-2 border border-gray-300 rounded text-sm outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>

      {/* ─── RIGHT PANE: Live Preview ─── */}
      <div className="flex-1 overflow-y-auto bg-gray-200 p-8 flex justify-center print:p-0 print:bg-white print:overflow-visible">
        <style>{`
          @media print {
            body * { visibility: hidden; }
            .print-area, .print-area * { visibility: visible; }
            .print-area { position: absolute; left: 0; top: 0; width: 100%; height: 100%; }
            .hide-on-print { display: none !important; }
            @page { size: auto; margin: 0mm; }
          }
        `}</style>

        {/* Real A4 Aspect Ratio container */}
        <div className="print-area w-[210mm] min-h-[297mm] bg-white shadow-2xl print:shadow-none relative">
           
           {/* ==== RENDER LAYOUTS ==== */}
           
           {template.layout === 'single-column' && (
             <div className="p-12">
               <div className="text-center border-b-2 pb-6 mb-6" style={{ borderColor: themeColor }}>
                 <h1 className="text-4xl font-light tracking-wide uppercase text-gray-900 mb-2">{data.name}</h1>
                 <p className="text-lg font-medium mb-3" style={{ color: themeColor }}>{data.title}</p>
                 <div className="flex justify-center gap-4 text-sm text-gray-600">
                   <span>{data.email}</span> • <span>{data.phone}</span> • <span>{data.location}</span>
                 </div>
               </div>
               
               <div className="mb-8">
                 <h2 className="text-xl font-bold uppercase tracking-wider mb-3" style={{ color: themeColor }}>Summary</h2>
                 <p className="text-gray-700 leading-relaxed text-sm">{data.summary}</p>
               </div>

               <div className="mb-8">
                 <h2 className="text-xl font-bold uppercase tracking-wider mb-4" style={{ color: themeColor }}>Experience</h2>
                 <div className="space-y-6">
                   {data.experience.map((exp, i) => (
                     <div key={i}>
                       <div className="flex justify-between items-baseline mb-1">
                         <h3 className="text-lg font-bold text-gray-800">{exp.role}</h3>
                         <span className="text-sm font-semibold text-gray-500">{exp.dates}</span>
                       </div>
                       <div className="text-md font-medium text-gray-600 mb-2">{exp.company}</div>
                       <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="mb-8">
                 <h2 className="text-xl font-bold uppercase tracking-wider mb-4" style={{ color: themeColor }}>Education</h2>
                 {data.education.map((edu, i) => (
                    <div key={i} className="flex justify-between items-baseline">
                      <div>
                        <h3 className="text-lg font-bold text-gray-800">{edu.degree}</h3>
                        <div className="text-gray-600">{edu.school}</div>
                      </div>
                      <span className="text-sm font-semibold text-gray-500">{edu.dates}</span>
                    </div>
                 ))}
               </div>

               <div>
                 <h2 className="text-xl font-bold uppercase tracking-wider mb-3" style={{ color: themeColor }}>Skills</h2>
                 <div className="flex flex-wrap gap-2">
                   {data.skills.map((skill, i) => (
                     <span key={i} className="text-sm text-gray-700 bg-gray-100 px-3 py-1 rounded-sm">{skill}</span>
                   ))}
                 </div>
               </div>
             </div>
           )}

           {template.layout === 'two-column' && (
             <div className="flex h-full min-h-[297mm]">
               {template.isDark && <div className="absolute top-0 left-0 w-[35%] h-full opacity-10" style={{ backgroundColor: themeColor }}></div>}
               <div className="w-[35%] p-8 z-10 border-r border-gray-100 bg-gray-50/50">
                 <h1 className="text-3xl font-bold text-gray-900 mb-1">{data.name}</h1>
                 <p className="text-lg font-medium mb-8" style={{ color: themeColor }}>{data.title}</p>
                 
                 <div className="space-y-3 mb-8 text-sm text-gray-600">
                   <div>{data.email}</div>
                   <div>{data.phone}</div>
                   <div>{data.location}</div>
                 </div>

                 <div className="mb-8">
                   <h2 className="text-lg font-bold uppercase tracking-wider mb-3 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Skills</h2>
                   <div className="space-y-1">
                     {data.skills.map((skill, i) => (
                       <div key={i} className="text-sm text-gray-700">{skill}</div>
                     ))}
                   </div>
                 </div>

                 <div>
                   <h2 className="text-lg font-bold uppercase tracking-wider mb-3 border-b pb-1" style={{ borderColor: themeColor, color: themeColor }}>Education</h2>
                   {data.education.map((edu, i) => (
                      <div key={i} className="mb-3">
                        <div className="font-bold text-gray-800 text-sm">{edu.degree}</div>
                        <div className="text-gray-600 text-sm">{edu.school}</div>
                        <div className="text-gray-500 text-xs mt-1">{edu.dates}</div>
                      </div>
                   ))}
                 </div>
               </div>
               <div className="w-[65%] p-8 z-10 bg-white">
                 <div className="mb-8">
                   <h2 className="text-xl font-bold uppercase tracking-wider mb-3" style={{ color: themeColor }}>Profile</h2>
                   <p className="text-gray-700 leading-relaxed text-sm">{data.summary}</p>
                 </div>
                 <div>
                   <h2 className="text-xl font-bold uppercase tracking-wider mb-4" style={{ color: themeColor }}>Experience</h2>
                   <div className="space-y-6">
                     {data.experience.map((exp, i) => (
                       <div key={i}>
                         <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                         <div className="flex justify-between items-center mb-2">
                           <span className="text-md font-medium" style={{ color: themeColor }}>{exp.company}</span>
                           <span className="text-sm font-semibold text-gray-500">{exp.dates}</span>
                         </div>
                         <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
                       </div>
                     ))}
                   </div>
                 </div>
               </div>
             </div>
           )}

           {template.layout === 'left-sidebar' && (
             <div className="flex h-full min-h-[297mm]">
               <div className="w-[35%] p-8 text-white" style={{ backgroundColor: themeColor }}>
                 <div className="w-24 h-24 rounded-full bg-white/20 mx-auto mb-6 flex items-center justify-center text-3xl font-bold">
                   {data.name.charAt(0)}
                 </div>
                 <h1 className="text-2xl font-bold text-center mb-1">{data.name}</h1>
                 <p className="text-sm text-center text-white/80 mb-8">{data.title}</p>
                 
                 <div className="space-y-6">
                   <div>
                     <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b border-white/20 pb-1">Contact</h2>
                     <div className="space-y-2 text-xs text-white/90">
                       <div>{data.email}</div>
                       <div>{data.phone}</div>
                       <div>{data.location}</div>
                     </div>
                   </div>
                   
                   <div>
                     <h2 className="text-sm font-bold uppercase tracking-wider mb-2 border-b border-white/20 pb-1">Skills</h2>
                     <div className="flex flex-wrap gap-2 text-xs text-white/90">
                       {data.skills.map((skill, i) => (
                         <span key={i} className="bg-white/10 px-2 py-1 rounded">{skill}</span>
                       ))}
                     </div>
                   </div>
                 </div>
               </div>
               <div className="w-[65%] p-10 bg-white">
                 <div className="mb-10">
                   <h2 className="text-2xl font-bold text-gray-900 mb-3 border-b-2 border-gray-100 pb-2">Summary</h2>
                   <p className="text-gray-600 leading-relaxed text-sm">{data.summary}</p>
                 </div>
                 
                 <div className="mb-10">
                   <h2 className="text-2xl font-bold text-gray-900 mb-5 border-b-2 border-gray-100 pb-2">Experience</h2>
                   <div className="space-y-6">
                     {data.experience.map((exp, i) => (
                       <div key={i}>
                         <div className="flex justify-between items-end mb-1">
                           <h3 className="text-lg font-bold text-gray-800">{exp.role}</h3>
                           <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded">{exp.dates}</span>
                         </div>
                         <div className="text-sm font-bold text-gray-500 mb-2">{exp.company}</div>
                         <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                       </div>
                     ))}
                   </div>
                 </div>

                 <div>
                   <h2 className="text-2xl font-bold text-gray-900 mb-5 border-b-2 border-gray-100 pb-2">Education</h2>
                   {data.education.map((edu, i) => (
                      <div key={i} className="mb-4">
                        <div className="flex justify-between items-end mb-1">
                          <h3 className="text-md font-bold text-gray-800">{edu.degree}</h3>
                          <span className="text-xs font-bold text-gray-400">{edu.dates}</span>
                        </div>
                        <div className="text-sm text-gray-500">{edu.school}</div>
                      </div>
                   ))}
                 </div>
               </div>
             </div>
           )}

           {template.layout === 'header-centric' && (
             <div className="flex flex-col h-full min-h-[297mm] bg-white">
               <div className="p-12 text-white text-center" style={{ backgroundColor: themeColor }}>
                 <h1 className="text-5xl font-extrabold tracking-tight mb-3">{data.name}</h1>
                 <p className="text-xl font-medium text-white/90 mb-6">{data.title}</p>
                 <div className="flex justify-center gap-6 text-sm text-white/80">
                   <span>{data.email}</span> • <span>{data.phone}</span> • <span>{data.location}</span>
                 </div>
               </div>
               
               <div className="p-12 max-w-4xl mx-auto">
                 <div className="mb-10 text-center">
                   <p className="text-gray-700 leading-relaxed text-md max-w-2xl mx-auto italic">"{data.summary}"</p>
                 </div>
                 
                 <div className="grid grid-cols-12 gap-8">
                   <div className="col-span-8">
                     <h2 className="text-2xl font-bold uppercase tracking-wider mb-6 pb-2 border-b-2" style={{ borderColor: themeColor }}>Experience</h2>
                     <div className="space-y-8">
                       {data.experience.map((exp, i) => (
                         <div key={i} className="relative pl-6 border-l-2 border-gray-200">
                           <div className="absolute w-3 h-3 rounded-full -left-[7px] top-1.5" style={{ backgroundColor: themeColor }}></div>
                           <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                           <div className="text-md font-medium text-gray-600 mb-1">{exp.company} | {exp.dates}</div>
                           <p className="text-gray-700 text-sm leading-relaxed mt-2">{exp.description}</p>
                         </div>
                       ))}
                     </div>
                   </div>
                   
                   <div className="col-span-4 space-y-10">
                     <div>
                       <h2 className="text-xl font-bold uppercase tracking-wider mb-4 pb-2 border-b-2" style={{ borderColor: themeColor }}>Skills</h2>
                       <div className="flex flex-col gap-2">
                         {data.skills.map((skill, i) => (
                           <div key={i} className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                             <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: themeColor }}></div>
                             {skill}
                           </div>
                         ))}
                       </div>
                     </div>
                     <div>
                       <h2 className="text-xl font-bold uppercase tracking-wider mb-4 pb-2 border-b-2" style={{ borderColor: themeColor }}>Education</h2>
                       {data.education.map((edu, i) => (
                          <div key={i} className="mb-4">
                            <h3 className="text-md font-bold text-gray-900 leading-tight">{edu.degree}</h3>
                            <div className="text-sm text-gray-600 mt-1">{edu.school}</div>
                            <div className="text-xs font-semibold text-gray-400 mt-1">{edu.dates}</div>
                          </div>
                       ))}
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           )}

           {template.layout === 'minimal' && (
             <div className="p-14 bg-white min-h-[297mm]">
               <div className="mb-12">
                 <h1 className="text-5xl font-black tracking-tighter text-gray-900 mb-2">{data.name}</h1>
                 <p className="text-xl text-gray-500 font-medium mb-4">{data.title}</p>
                 <div className="flex gap-4 text-sm font-semibold text-gray-400 uppercase tracking-widest">
                   <span>{data.email}</span> <span>{data.phone}</span> <span>{data.location}</span>
                 </div>
               </div>
               
               <div className="w-full h-0.5 bg-gray-100 mb-12"></div>
               
               <div className="grid grid-cols-12 gap-8 mb-12">
                 <div className="col-span-3">
                   <h2 className="text-sm font-black uppercase tracking-widest text-gray-400">Profile</h2>
                 </div>
                 <div className="col-span-9">
                   <p className="text-gray-800 leading-loose text-sm font-medium">{data.summary}</p>
                 </div>
               </div>

               <div className="grid grid-cols-12 gap-8 mb-12">
                 <div className="col-span-3">
                   <h2 className="text-sm font-black uppercase tracking-widest text-gray-400">Experience</h2>
                 </div>
                 <div className="col-span-9 space-y-10">
                   {data.experience.map((exp, i) => (
                     <div key={i}>
                       <div className="flex justify-between items-baseline mb-1">
                         <h3 className="text-lg font-black text-gray-900">{exp.role}</h3>
                         <span className="text-xs font-bold text-gray-400">{exp.dates}</span>
                       </div>
                       <div className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: themeColor }}>{exp.company}</div>
                       <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                     </div>
                   ))}
                 </div>
               </div>

               <div className="grid grid-cols-12 gap-8">
                 <div className="col-span-3">
                   <h2 className="text-sm font-black uppercase tracking-widest text-gray-400">Skills</h2>
                 </div>
                 <div className="col-span-9">
                   <div className="flex flex-wrap gap-x-6 gap-y-2">
                     {data.skills.map((skill, i) => (
                       <span key={i} className="text-sm font-bold text-gray-800">{skill}</span>
                     ))}
                   </div>
                 </div>
               </div>
             </div>
           )}

           {template.layout === 'creative' && (
             <div className="p-12 min-h-[297mm] bg-white relative overflow-hidden">
               <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full opacity-10" style={{ backgroundColor: themeColor }}></div>
               <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full opacity-10" style={{ backgroundColor: themeColor }}></div>
               
               <div className="relative z-10">
                 <div className="flex items-center gap-8 mb-12 border-b-4 pb-8" style={{ borderColor: themeColor }}>
                   <div className="w-24 h-24 rounded-full border-4 flex items-center justify-center text-3xl font-black text-white" style={{ borderColor: themeColor, backgroundColor: themeColor }}>
                     {data.name.split(' ').map(n => n[0]).join('')}
                   </div>
                   <div>
                     <h1 className="text-5xl font-black text-gray-900 tracking-tight">{data.name}</h1>
                     <p className="text-2xl font-light text-gray-500 mt-1">{data.title}</p>
                   </div>
                 </div>

                 <div className="grid grid-cols-12 gap-10">
                   <div className="col-span-4 space-y-10">
                     <div>
                       <h2 className="text-lg font-black uppercase tracking-widest mb-4 inline-block px-3 py-1 text-white" style={{ backgroundColor: themeColor }}>Contact</h2>
                       <div className="space-y-3 text-sm font-bold text-gray-600">
                         <div>{data.email}</div>
                         <div>{data.phone}</div>
                         <div>{data.location}</div>
                       </div>
                     </div>
                     <div>
                       <h2 className="text-lg font-black uppercase tracking-widest mb-4 inline-block px-3 py-1 text-white" style={{ backgroundColor: themeColor }}>Skills</h2>
                       <div className="flex flex-col gap-2">
                         {data.skills.map((skill, i) => (
                           <div key={i} className="text-sm font-bold text-gray-700 bg-gray-50 px-3 py-2 rounded-lg border border-gray-100">{skill}</div>
                         ))}
                       </div>
                     </div>
                   </div>
                   
                   <div className="col-span-8 space-y-10">
                     <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 relative">
                       <div className="absolute -left-2 top-6 w-1 h-12 rounded-full" style={{ backgroundColor: themeColor }}></div>
                       <p className="text-gray-700 leading-relaxed font-medium text-sm">{data.summary}</p>
                     </div>
                     
                     <div>
                       <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                         Experience <div className="h-1 flex-1 bg-gray-100 rounded-full"></div>
                       </h2>
                       <div className="space-y-8">
                         {data.experience.map((exp, i) => (
                           <div key={i} className="relative pl-6 border-l-4" style={{ borderColor: `${themeColor}40` }}>
                             <div className="absolute w-4 h-4 rounded-full -left-[10px] top-1 border-4 border-white" style={{ backgroundColor: themeColor }}></div>
                             <h3 className="text-xl font-black text-gray-900">{exp.role}</h3>
                             <div className="text-md font-bold text-gray-500 mb-2">{exp.company} <span className="mx-2 text-gray-300">|</span> {exp.dates}</div>
                             <p className="text-gray-600 text-sm leading-relaxed">{exp.description}</p>
                           </div>
                         ))}
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
           )}

        </div>
      </div>
    </div>
  );
}
