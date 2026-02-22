"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { technicalService } from '@/app/APIcont/services/technicalService';
import { categoryService } from '@/app/APIcont/services/categoryService';
import { Button } from '@/app/components/ui/button';
import { X, Code2 } from 'lucide-react'; 
import Image from 'next/image';
import { Category } from '../lib/types'; 

export default function TechnicalForm({ id }: { id?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  
  // ปรับ Field ให้ตรงกับ Technical Interface
  const [form, setForm] = useState({
    name: "",
    logo: "",
    categoryId: ""
  });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [oldLogoUrl, setOldLogoUrl] = useState("");
  const [isImageDeleted, setIsImageDeleted] = useState(false);

  useEffect(() => {
    // Load Categories สำหรับ Dropdown
    categoryService.getAll().then(setCategories);

    if (id && id !== "new") {
      technicalService.getById(parseInt(id)).then(data => {
        setForm({
          name: data.name,
          logo: data.logo || "",
          categoryId: String(data.categoryId)
        });
        if (data.logo) {
          setPreview(data.logo);
          setOldLogoUrl(data.logo);
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
      let finalLogoUrl = oldLogoUrl;
      if (isImageDeleted) finalLogoUrl = ""; 
      
      // ถ้ามีการเลือกไฟล์ใหม่ ให้อัปโหลดก่อน
      if (imageFile) {
        finalLogoUrl = await technicalService.uploadImage(imageFile);
      }

      const payload = { 
        ...form, 
        logo: finalLogoUrl,
        categoryId: Number(form.categoryId) 
      };

      if (id && id !== "new") {
        await technicalService.update(parseInt(id), payload);
      } else {
        await technicalService.create(payload);
      }
      router.push('/cms/technical');
      router.refresh();
    } catch { 
      alert("Error saving technical data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          {id && id !== "new" ? "Edit Technical Skill" : "Create New Skill"}
        </h2>
        <p className="text-slate-500 mt-1">จัดการทักษะเครื่องมือและหมวดหมู่เทคโนโลยีของคุณ</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* ส่วนอัปโหลด Logo (โครงสร้างเดียวกับ Hobby) */}
        <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100">
          <label className="block text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">
            Skill Logo / Icon
          </label>
          <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-4 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-300 transition-all group flex flex-col items-center justify-center min-h-[250px]">
            {preview ? (
              <div className="relative w-40 h-40 rounded-xl overflow-hidden drop-shadow-sm bg-white p-4">
                <Image 
                    src={preview} 
                    alt="Preview" 
                    fill 
                    unoptimized
                    className="object-contain" 
                />
                <button 
                  type="button" 
                  onClick={cancelImage} 
                  className="absolute top-0 right-0 p-1.5 bg-red-500 text-white rounded-full shadow-lg transition-all z-10 hover:scale-110"
                >
                  <X size={16}/>
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center cursor-pointer w-full py-10">
                <div className="p-4 bg-white rounded-full shadow-sm mb-4 group-hover:scale-110 transition-transform">
                  <Code2 className="text-blue-500" size={32} />
                </div>
                <span className="text-base text-slate-900 font-semibold">Upload Skill Icon</span>
                <span className="text-sm text-slate-400 mt-1 font-normal">SVG, PNG or WebP recommended</span>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            )}
          </div>
        </div>

        {/* ส่วนข้อมูล Skill */}
        <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-100 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-1">
               <label className="block text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wider">
                Skill Name
              </label>
              <input 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400 font-medium"
                placeholder="เช่น React, Next.js, PostgreSQL"
                value={form.name} 
                onChange={e => setForm({...form, name: e.target.value})} 
                required 
              />
            </div>

            <div className="md:col-span-1">
              <label className="block text-sm font-semibold text-slate-900 mb-2 uppercase tracking-wider">
                Category
              </label>
              <select 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 font-medium appearance-none"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2364748b\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.25rem' }}
                value={form.categoryId} 
                onChange={e => setForm({...form, categoryId: e.target.value})}
                required
              >
                <option value="">เลือกหมวดหมู่</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ปุ่ม Action */}
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
            {loading ? "Saving Changes..." : "Save Technical Data"}
          </Button>
        </div>
      </form>
    </div>
  );
}