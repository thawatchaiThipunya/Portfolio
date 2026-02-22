"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Hash } from 'lucide-react';
import { softSkillService } from '@/app/APIcont/services/softSkillService';
import { SoftSkill } from '../lib/types';
import { Button } from '@/app/components/ui/button';

export default function SoftSkillPage() {
  const [data, setData] = useState<SoftSkill[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const res = await softSkillService.getAll();
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleDelete = async (id: number) => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบทักษะนี้?")) {
      await softSkillService.delete(id);
      loadData();
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Soft Skills</h1>
          <p className="text-slate-500">จัดการทักษะส่วนตัวและความสามารถเสริม</p>
        </div>
        <Link href="/cms/personal/create">
          <Button className="bg-indigo-600 hover:bg-indigo-700 rounded-2xl gap-2 px-6 py-6 shadow-lg shadow-indigo-100 font-bold transition-all hover:scale-105 active:scale-95">
            Add New Personal Skill
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50/50 text-slate-400 text-[10px] font-black uppercase tracking-widest">
            <tr>
              <th className="px-8 py-5 w-24">ID</th>
              <th className="px-8 py-5">ชื่อทักษะ</th>
              <th className="px-8 py-5 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr><td colSpan={3} className="p-20 text-center text-slate-400 font-medium">กำลังโหลดข้อมูล...</td></tr>
            ) : data.length === 0 ? (
                <tr><td colSpan={3} className="p-20 text-center text-slate-400 font-medium">ยังไม่มีข้อมูล Soft Skill</td></tr>
            ) : data.map(item => (
              <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-8 py-5 text-slate-400 font-mono text-sm">#{item.id}</td>
                <td className="px-8 py-5">
                   <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-500">
                        <Hash size={14} />
                      </div>
                      <span className="font-bold text-slate-700">{item.name}</span>
                   </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Link href={`/cms/personal/${item.id}`}>
                      <button className="p-2.5 text-blue-500 hover:bg-blue-50 rounded-xl transition-all active:scale-90">
                        <Pencil size={18}/>
                      </button>
                    </Link>
                    <button onClick={() => handleDelete(item.id)} className="p-2.5 text-rose-500 hover:bg-rose-50 rounded-xl transition-all active:scale-90">
                      <Trash2 size={18}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}