"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { categoryService } from '@/app/APIcont/services/categoryService';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/Input';

interface CategoryFormProps {
  id?: string; 
}

export default function CategoryForm({ id }: CategoryFormProps) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      setLoading(true);
      categoryService.getById(parseInt(id))
        .then(data => setName(data.name))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await categoryService.update(parseInt(id), name);
      } else {
        await categoryService.create(name);
      }
      router.push('/cms/category');
      router.refresh();
    } catch {
      alert("เกิดข้อผิดพลาด");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md bg-white p-6 rounded-xl shadow-sm border">
      <h2 className="text-xl font-bold mb-6">{id ? "แก้ไขหมวดหมู่" : "เพิ่มหมวดหมู่ใหม่"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input 
          label="ชื่อ Category"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ระบุชื่อหมวดหมู่..."
          required
        />
        <div className="flex gap-2 pt-2">
          <Button type="submit" disabled={loading}>
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