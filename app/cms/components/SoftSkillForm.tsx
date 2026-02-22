"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { softSkillService } from '@/app/APIcont/services/softSkillService';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/Input';

interface SoftSkillFormProps {
  id?: string; 
}

export default function SoftSkillForm({ id }: SoftSkillFormProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      setLoading(true);
      softSkillService.getById(parseInt(id))
        .then(data => setName(data.name))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await softSkillService.update(parseInt(id), name);
      } else {
        await softSkillService.create(name);
      }
      router.push('/cms/personal');
      router.refresh();
    } catch {
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 mt-10">
      <div className="mb-8">
        <h2 className="text-2xl font-black text-slate-900">{id ? "แก้ไข Soft Skill" : "เพิ่ม Soft Skill ใหม่"}</h2>
        <p className="text-slate-500 text-sm mt-1">ระบุทักษะที่คุณต้องการนำเสนอในหน้า Profile</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input 
          label="ชื่อ Soft Skill"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="เช่น Critical Thinking, Leadership..."
          required
        />
        <div className="flex gap-4 pt-4">
          <Button type="submit" disabled={loading} className="flex-1 py-7 bg-slate-900 hover:bg-indigo-600 rounded-2xl font-bold transition-all shadow-lg shadow-slate-200">
            {loading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.back()} className="px-10 py-7 rounded-2xl font-bold">
            ยกเลิก
          </Button>
        </div>
      </form>
    </div>
  );
}