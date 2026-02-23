"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { hobbyService } from '@/app/APIcont/services/hobbyService'; 
import { Button } from '@/app/components/ui/button';
import { X, Upload } from 'lucide-react'; 
import Image from 'next/image';
import { HobbyStatus } from '@prisma/client';

export default function HobbyForm({ id }: { id?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  
  const [form, setForm] = useState<{
    name: string;
    description: string;
    status: HobbyStatus;
  }>({ 
    name: "", 
    description: "", 
    status: HobbyStatus.SUB 
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [oldImageUrl, setOldImageUrl] = useState("");
  const [isImageDeleted, setIsImageDeleted] = useState(false);

  useEffect(() => {
    if (id && id !== "new") {
      hobbyService.getById(parseInt(id)).then(data => {
        setForm({
          name: data.name,
          description: data.description || "",
          status: data.status || HobbyStatus.SUB
        });
        if (data.image_url) {
          setPreview(data.image_url);
          setOldImageUrl(data.image_url);
        }
      }).catch(err => console.error("Fetch error:", err));
    }
  }, [id]);

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
      if (imageFile) finalImageUrl = await hobbyService.uploadImage(imageFile);

      const payload = { ...form, image_url: finalImageUrl };

      if (id && id !== "new") {
        await hobbyService.update(parseInt(id), payload);
      } else {
        await hobbyService.create(payload);
      }
      router.push('/cms/hobbies');
      router.refresh();
    } catch { 
      alert("Error saving hobby data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {id && id !== "new" ? "Edit Hobby" : "Create New Hobby"}
        </h2>
        <p className="text-slate-500 mt-1">จัดการข้อมูลงานอดิเรกและความสนใจของคุณ</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100">
          <label className="block text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">
            Hobby Cover Image
          </label>
          <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-300 transition-all group flex flex-col items-center justify-center min-h-[300px]">
            {preview ? (
              <div className="relative w-full h-[280px] rounded-xl overflow-hidden shadow-md">
                <Image 
                    src={preview} 
                    alt="Preview" 
                    fill 
                    unoptimized
                    className="object-cover" 
                />
                <button 
                  type="button" 
                  onClick={cancelImage} 
                  className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-red-500 hover:text-white text-red-500 rounded-full shadow-lg transition-all z-10"
                >
                  <X size={20}/>
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center cursor-pointer w-full py-12">
                <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="text-blue-500" size={32} />
                </div>
                <span className="text-base text-slate-900 font-semibold">Upload a photo</span>
                <span className="text-sm text-slate-400 mt-1 font-normal">PNG, JPG or WebP up to 5MB</span>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            )}
          </div>
        </div>

        
        <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1">
               <label className="block text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wider">
                Hobby Name
              </label>
              <input 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400 font-medium"
                placeholder="เช่น การถ่ายภาพ, ต่อโมเดล..."
                value={form.name} 
                onChange={e => setForm({...form, name: e.target.value})} 
                required 
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wider">
                Priority Status
              </label>
              <select 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 font-medium appearance-none"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2364748b\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem' }}
                value={form.status} 
                onChange={e => setForm({...form, status: e.target.value as HobbyStatus})}
              >
                <option value={HobbyStatus.MAIN}>ความสนใจหลัก (MAIN)</option>
                <option value={HobbyStatus.SUB}>งานอดิเรกทั่วไป (SUB)</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wider">
              Description
            </label>
            <textarea 
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl min-h-[150px] outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400 font-medium leading-relaxed"
              placeholder="บอกเล่าเรื่องราวที่น่าสนใจเกี่ยวกับกิจกรรมนี้..."
              value={form.description} 
              onChange={e => setForm({...form, description: e.target.value})}
            />
          </div>
        </div>

    
        <div className="flex items-center justify-end gap-4 pb-12">
          <button 
            type="button" 
            onClick={() => router.back()}
            className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-100 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <Button 
            type="submit" 
            disabled={loading} 
            className="px-10 py-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:opacity-50"
          >
            {loading ? "Saving Changes..." : "Save Hobby Data"}
          </Button>
        </div>
      </form>
    </div>
  );
}