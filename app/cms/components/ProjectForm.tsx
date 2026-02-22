"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { projectService } from '@/app/APIcont/services/projectService';
import { Input } from '@/app/components/ui/Input';
import { X, ImageIcon, Layout, Briefcase, AlertCircle, Save } from 'lucide-react';
import Image from 'next/image';
import { ProjectStatus } from '../lib/types'; // นำเข้า Enum

export default function ProjectForm({ id }: { id?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // 1. ระบุ Type ให้ useState เพื่อรองรับ Enum ProjectStatus
  const [form, setForm] = useState<{
    title: string;
    content: string;
    position: string;
    tasks: string;
    problems: string;
    solutions: string;
    company: string;
    employmentType: string;
    status: ProjectStatus;
  }>({
    title: "",
    content: "",
    position: "",
    tasks: "",
    problems: "",
    solutions: "",
    company: "",
    employmentType: "Full-time",
    status: ProjectStatus.ACTIVATED // ใช้ Enum แทน string "Activated"
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [oldImageUrl, setOldImageUrl] = useState("");
  const [isImageDeleted, setIsImageDeleted] = useState(false);

  // 2. ใช้ฟังก์ชันดึงข้อมูลเพียงตัวเดียว (ลบตัวซ้ำซ้อนออก)
  const fetchData = useCallback(async () => {
    if (!id || id === 'new' || id === 'create') return;

    try {
      setLoading(true);
      const data = await projectService.getById(id);
      
      if (data) {
        setForm({
          title: data.title ?? "",
          content: data.content ?? "",
          position: data.position ?? "",
          tasks: data.tasks ?? "",
          problems: data.problems ?? "",
          solutions: data.solutions ?? "",
          company: data.company ?? "",
          employmentType: data.employmentType ?? "Full-time",
          status: (data.status as ProjectStatus) ?? ProjectStatus.ACTIVATED
        });
        
        if (data.image_url) {
          setPreview(data.image_url);
          setOldImageUrl(data.image_url);
        }
      }
    } catch {
      console.error("Fetch Error:");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      setIsImageDeleted(false);
    }
  };

  const cancelImage = () => {
    setImageFile(null);
    setPreview("");
    setIsImageDeleted(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalImageUrl = oldImageUrl;
      if (isImageDeleted) finalImageUrl = "";
      if (imageFile) finalImageUrl = await projectService.uploadImage(imageFile);

      const payload = { ...form, image_url: finalImageUrl };

      if (id && id !== 'new') {
        await projectService.update(id, payload);
      } else {
        await projectService.create(payload);
      }
      router.push('/cms/project');
      router.refresh();
    } catch {
      alert("Error saving project data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
      <div className="mb-8 border-b pb-6">
        <h2 className="text-2xl font-black text-slate-900">{id && id !== 'new' ? "Edit Project" : "Create New Project"}</h2>
        <p className="text-slate-500 text-sm font-sm">จัดการรายละเอียดโปรเจกต์และผลงานของคุณ</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Project Image */}
        <div className="space-y-3">
          <label className="text-xs font-black uppercase tracking-widest text-slate-400">Project Cover Image</label>
          <div className="relative border-2 border-dashed border-slate-200 rounded-[2rem] p-4 bg-slate-50 flex flex-col items-center justify-center min-h-[250px] transition-all hover:bg-slate-100">
            {preview ? (
              <div className="relative w-full max-w-md h-56 rounded-2xl shadow-md overflow-hidden bg-white">
                <Image src={preview} alt="Preview" fill className="object-cover" />
                <button 
                  type="button" 
                  onClick={cancelImage} 
                  className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all active:scale-90"
                >
                  <X size={20}/>
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center cursor-pointer w-full py-12">
                <div className="p-4 bg-white rounded-2xl shadow-sm mb-4">
                    <ImageIcon className="text-blue-500" size={40} />
                </div>
                <span className="text-sm text-slate-500 font-sm">คลิกเพื่ออัปโหลดรูปภาพโปรเจกต์</span>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Input label="Project Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} placeholder="เช่น Co-Operative Thai Cart" required />
          </div>
          
          <Input label="Company / Organization" value={form.company} onChange={e => setForm({...form, company: e.target.value})} placeholder="เช่น Bangkok Solutions" />
          <Input label="Your Position" value={form.position} onChange={e => setForm({...form, position: e.target.value})} placeholder="เช่น Full Stack Developer" required />

          <div className="space-y-2">
            <label className="block text-sm font-sm text-slate-700">Employment Type</label>
            <select 
              className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-sm text-slate-700"
              value={form.employmentType} 
              onChange={e => setForm({...form, employmentType: e.target.value})}
            >
              <option value="Full-time">Full-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
              <option value="Freelance">Freelance</option>
              <option value="Co-Operative">Co-Operative</option>
              <option value="Thesis">Thesis</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-sm text-slate-700">Status</label>
            <select 
              className="w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-sm text-slate-700"
              value={form.status} 
              onChange={e => setForm({...form, status: e.target.value as ProjectStatus})}
            >
              <option value={ProjectStatus.ACTIVATED}>Activated</option>
              <option value={ProjectStatus.INACTIVATED}>Inactivated</option>
            </select>
          </div>
        </div>

        {/* Detailed Description Section */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
             <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-700">
                    <Layout size={16} className="text-blue-500"/> Project Description
                </label>
                <textarea 
                  className="w-full p-4 bg-white border border-slate-200 rounded-2xl min-h-[100px] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-800 font-sm placeholder:text-slate-400"
                  value={form.content} 
                  onChange={e => setForm({...form, content: e.target.value})}
                  placeholder="อธิบายภาพรวมของโปรเจกต์..."
                />
             </div>

             <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-700">
                    <Briefcase size={16} className="text-green-500"/> Key Tasks & Responsibilities
                </label>
                <textarea 
                  className="w-full p-4 bg-white border border-slate-200 rounded-2xl min-h-[120px] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-800 font-sm placeholder:text-slate-400"
                  value={form.tasks} 
                  onChange={e => setForm({...form, tasks: e.target.value})}
                  placeholder="คุณทำอะไรในโปรเจกต์นี้บ้าง? (แนะนำให้ขึ้นบรรทัดใหม่สำหรับแต่ละข้อ)"
                />
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-700">
                    <AlertCircle size={16} className="text-amber-500"/> Challenges / Problems
                </label>
                <textarea 
                  className="w-full p-4 bg-white border border-slate-200 rounded-2xl min-h-[120px] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-800 font-sm placeholder:text-slate-400"
                  value={form.problems || ""} 
                  onChange={e => setForm({...form, problems: e.target.value})}
                  placeholder="ปัญหาที่พบเจอ..."
                />
            </div>
            <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-black uppercase tracking-wider text-slate-700">
                    <Save size={16} className="text-blue-500"/> Solutions
                </label>
                <textarea 
                  className="w-full p-4 bg-white border border-slate-200 rounded-2xl min-h-[120px] outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-800 font-sm placeholder:text-slate-400"
                  value={form.solutions || ""} 
                  onChange={e => setForm({...form, solutions: e.target.value})}
                  placeholder="วิธีแก้ปัญหาและการนำเทคโนโลยีมาใช้..."
                />
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-8 border-t border-slate-100">
          <button 
            type="submit" 
            disabled={loading} 
            className="flex-1 md:flex-none px-12 h-14 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-black transition-all shadow-xl shadow-slate-200 active:scale-95 disabled:opacity-50"
          >
            {loading ? "SAVING..." : "SAVE PROJECT"}
          </button>
          <button 
            type="button" 
            onClick={() => router.back()}
            className="px-8 h-14 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-sm transition-all"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}