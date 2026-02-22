"use client";
import React, { useEffect, useState } from 'react';
import { mainProfileService } from '@/app/APIcont/services/mainProfileService';
import { Button } from '@/app/components/ui/button';
import { Camera, Save, User, Briefcase, Sparkles } from 'lucide-react';
import Image from 'next/image';

export default function MainProfilePage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    role: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [oldImageUrl, setOldImageUrl] = useState("");

  useEffect(() => {
    mainProfileService.get().then(data => {
      if (data) {
        setForm({
          firstname: data.firstname || "",
          lastname: data.lastname || "",
          role: data.role || "",
          description: data.description || "",
        });
        if (data.image_url) {
          setPreview(data.image_url);
          setOldImageUrl(data.image_url);
        }
      }
    });
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalUrl = oldImageUrl;
      if (imageFile) {
        finalUrl = await mainProfileService.uploadImage(imageFile);
      }
      await mainProfileService.update({ ...form, image_url: finalUrl });
      alert("Profile updated successfully! ✨");
    } catch {
      alert("Error saving profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Personal Information</h1>
          <p className="text-slate-500 mt-2 font-medium">จัดการข้อมูลส่วนตัวที่ใช้แสดงผลในหน้าแรก</p>
        </div>
        <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
            <Sparkles size={28} />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Profile Image Section */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 flex flex-col items-center">
            <div className="relative group">
              <div className="w-56 h-56 rounded-[2.5rem] overflow-hidden bg-slate-100 border-4 border-white shadow-md relative">
                {preview ? (
                  <Image src={preview} alt="Avatar" fill className="object-cover transition-transform duration-500 group-hover:scale-110" unoptimized />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-300">
                    <User size={64} />
                  </div>
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 p-4 bg-slate-900 text-white rounded-2xl shadow-xl hover:bg-blue-600 transition-all cursor-pointer active:scale-90">
                <Camera size={20} />
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            </div>
            <div className="mt-8 text-center">
                <h4 className="font-bold text-slate-900">Profile Picture</h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">แนะนำภาพที่เห็นใบหน้าชัดเจน<br/>รองรับ PNG, JPG, WebP</p>
            </div>
          </div>
        </div>

        {/* Form Fields Section */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-900 flex items-center gap-2">
                    First Name
                </label>
                <input 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-900 font-bold placeholder:text-slate-300 placeholder:font-normal"
                  placeholder="กรอกชื่อจริงของคุณ"
                  value={form.firstname}
                  onChange={e => setForm({...form, firstname: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">
                    Last Name
                </label>
                <input 
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-900 font-bold placeholder:text-slate-300 placeholder:font-normal"
                  placeholder="กรอกนามสกุลของคุณ"
                  value={form.lastname}
                  onChange={e => setForm({...form, lastname: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">
                  Current Role / Headline
              </label>
              <div className="relative">
                <Briefcase className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  className="w-full pl-14 pr-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-900 font-bold placeholder:text-slate-300 placeholder:font-normal"
                  placeholder="เช่น Senior Frontend Developer"
                  value={form.role}
                  onChange={e => setForm({...form, role: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">
                  Professional Summary
              </label>
              <textarea 
                className="w-full px-6 py-5 bg-slate-50 border border-slate-200 rounded-3xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-900 font-bold placeholder:text-slate-300 placeholder:font-normal min-h-[180px] leading-relaxed"
                placeholder="อธิบายความเป็นคุณให้ดูเป็นมืออาชีพ..."
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={loading}
              className="h-16 px-12 bg-slate-900 hover:bg-blue-600 text-white rounded-[2rem] font-black shadow-2xl shadow-blue-200 transition-all flex items-center gap-3 active:scale-95 group"
            >
              {loading ? "SAVING..." : (
                <>
                  <span>SAVE SETTINGS</span>
                  <Save size={20} className="group-hover:rotate-12 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}