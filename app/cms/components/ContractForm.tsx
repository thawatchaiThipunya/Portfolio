"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { contractService } from '@/app/APIcont/services/contractService';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/Input';
import { Contract } from '../lib/types';

export default function ContractForm({ id }: { id?: string }) {
  const [form, setForm] = useState<Partial<Contract>>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (id) {
      contractService.getById(parseInt(id)).then(setForm);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await contractService.update(parseInt(id), form);
      } else {
        await contractService.create(form);
      }
      router.push('/cms/contract');
      router.refresh();
    } catch {
      alert("Error saving data");
    } finally {
      setLoading(false);
    }
  };

  // ระบุเฉพาะฟิลด์ที่เป็น string แน่นอนเพื่อเลี่ยงปัญหา Date type mismatch
  const fields: { name: keyof Omit<Contract, 'id' | 'createdAt' | 'updatedAt' | 'deletedAt'>; label: string; type: string }[] = [
    { name: 'gmail', label: 'Email', type: 'email' },
    { name: 'phone', label: 'Phone', type: 'text' },
    { name: 'facebook', label: 'Facebook URL', type: 'text' },
    { name: 'line', label: 'Line ID', type: 'text' },
    { name: 'instagram', label: 'Instagram', type: 'text' },
    { name: 'x', label: 'X (Twitter)', type: 'text' },
    { name: 'linkedIn', label: 'LinkedIn', type: 'text' },
    { name: 'github', label: 'GitHub', type: 'text' },
    { name: 'address', label: 'Address', type: 'text' },
  ];

  return (
    <div className="bg-white p-8 rounded-xl shadow-sm border">
      <h2 className="text-xl font-bold mb-6">{id ? "Edit Contract" : "Create Contract"}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map((f) => (
          <Input
            key={f.name}
            label={f.label}
            type={f.type}
            // ใช้ String() เพื่อแปลงค่าจาก Contract (ซึ่งอาจมี Date) ให้เป็น string เสมอสำหรับ Input
            value={form[f.name] ? String(form[f.name]) : ""}
            onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
          />
        ))}
        <div className="md:col-span-2 flex gap-2 pt-4">
          <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save Contract"}</Button>
          <Button type="button" variant="secondary" onClick={() => router.back()}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}