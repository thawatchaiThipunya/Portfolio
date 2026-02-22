"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { educationService } from '@/app/APIcont/services/educationService';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/Input';
import { X, Upload } from 'lucide-react';
import Image from 'next/image';

export default function EducationForm({ id }: { id?: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", GPAX: "", faculty: "", starttime: "", endtime: "" });
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [oldImageUrl, setOldImageUrl] = useState("");
  const [isImageDeleted, setIsImageDeleted] = useState(false); // เพิ่ม State เพื่อเช็คว่ามีการกดลบรูปเดิมไหม

  useEffect(() => {
    if (id) {
      educationService.getById(parseInt(id)).then(data => {
        setForm({
          name: data.name,
          GPAX: data.GPAX || "",
          faculty: data.faculty || "",
          starttime: data.starttime ? new Date(data.starttime).toISOString().split('T')[0] : "",
          endtime: data.endtime ? new Date(data.endtime).toISOString().split('T')[0] : ""
        });
        if (data.logo_url) {
          setPreview(data.logo_url);
          setOldImageUrl(data.logo_url);
        }
      });
    }
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      setIsImageDeleted(false); // ถ้าเลือกใหม่ ไม่ถือว่าลบ
    }
  };

  const cancelImage = () => {
    setImageFile(null);
    setPreview(""); // ล้าง preview ทิ้งเลย
    setIsImageDeleted(true); // มาร์คไว้ว่าต้องการลบรูปภาพนี้ออก
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      let finalLogoUrl = oldImageUrl;

      if (isImageDeleted) {
        finalLogoUrl = ""; // ถ้ากดกากบาท ให้ส่งค่าว่างไปที่ DB
      }

      if (imageFile) {
        finalLogoUrl = await educationService.uploadImage(imageFile);
      }

      const payload = { ...form, logo_url: finalLogoUrl };

      if (id) {
        await educationService.update(parseInt(id), payload);
      } else {
        await educationService.create(payload);
      }
      router.push('/cms/education');
      router.refresh();
    } catch {
      alert("Error saving data");
    } finally {
      setLoading(false);
    }
  };

  return (
    // เอา max-w-2xl ออกเพื่อให้เต็มความกว้างของ Parent Container
    <div className="w-full bg-white p-8 rounded-xl shadow-sm border">
      <h2 className="text-xl font-bold mb-6">{id ? "แก้ไขการศึกษา" : "เพิ่มการศึกษา"}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* ส่วนอัปโหลด Logo - ปรับขนาดให้แสดงชัดเจนขึ้น */}
        <div className="space-y-2">
          <label className="block text-sm font-bold text-slate-700">Institution Logo</label>
          <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-6 bg-slate-50 flex flex-col items-center justify-center min-h-[200px]">
            {preview ? (
              <div className="relative w-48 h-48 border rounded-lg bg-white shadow-sm overflow-hidden">
                <Image 
                    src={preview} 
                    alt="Preview" 
                    fill 
                    sizes="(max-width: 768px) 100vw, 192px" 
                    className="object-contain p-2" 
                />
                <button 
                  type="button" 
                  onClick={cancelImage} 
                  className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-colors"
                >
                  <X size={18}/>
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center cursor-pointer w-full py-10">
                <Upload className="text-slate-300 mb-2" size={48} />
                <span className="text-sm text-slate-500 font-medium">คลิกเพื่ออัปโหลดโลโก้</span>
                <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
              </label>
            )}
          </div>
        </div>

        {/* ปรับ Input ให้เรียงกันแบบ Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <Input label="ชื่อสถาบัน" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
          </div>
          
          <Input label="คณะ/สาขา" value={form.faculty} onChange={e => setForm({...form, faculty: e.target.value})} />
          <Input label="GPAX" value={form.GPAX} onChange={e => setForm({...form, GPAX: e.target.value})} />

          <Input label="วันที่เริ่มเรียน" type="date" value={form.starttime} onChange={e => setForm({...form, starttime: e.target.value})} required />
          <Input label="วันที่จบการศึกษา" type="date" value={form.endtime} onChange={e => setForm({...form, endtime: e.target.value})} />
        </div>

        <div className="flex gap-3 pt-6 border-t">
          <Button type="submit" disabled={loading} className="px-8">
            {loading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            ยกเลิก
          </Button>
        </div>
      </form>
    </div>
  );
}