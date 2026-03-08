"use client";
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Pencil, Trash2, GraduationCap, Search } from 'lucide-react';
import { educationService } from '@/app/APIcont/services/educationService';
import { Education } from '../lib/types';
import { Button } from '@/app/components/ui/button';

export default function EducationPage() {
  const [data, setData] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await educationService.getAll();
      setData(res);
    } catch (error) {
      console.error("Failed to load education:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filtered = useMemo(() =>
    data.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.faculty ?? '').toLowerCase().includes(search.toLowerCase())
    ), [data, search]);

  const handleDelete = async (id: number) => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลการศึกษานี้?")) {
      try {
        await educationService.delete(id);
        loadData();
      } catch { 
        alert("ลบไม่สำเร็จ");
      }
    }
  };

  
  const formatDate = (date: string | Date | null | undefined) => {
    if (!date) return 'ปัจจุบัน';
    try {
      return new Date(date).toLocaleDateString('th-TH', { 
        year: 'numeric', 
        month: 'short' 
      });
    } catch {
      return 'รูปแบบวันที่ผิดพลาด';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Education History</h1>
        <Link href="/cms/education/create">
          <Button className="flex items-center gap-2">
            Add Education
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="ค้นหาสถาบัน หรือสาขาวิชา..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 text-slate-600 text-xs font-bold uppercase">
            <tr>
              <th className="px-6 py-4">Institution</th>
              <th className="px-6 py-4">GPAX / Faculty</th>
              <th className="px-6 py-4">Period</th>
              <th className="px-6 py-4 text-center">Manage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-slate-400">กำลังโหลดข้อมูล...</td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-slate-400">ไม่พบข้อมูล</td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 flex-shrink-0 border rounded-lg bg-slate-50 overflow-hidden flex items-center justify-center">
                        {item.logo_url ? (
                            <Image 
                              src={item.logo_url} 
                              alt={item.name} 
                              fill 
                              sizes="48px"
                              className="object-contain p-1"
                            />
                        ) : (
                          <GraduationCap className="text-slate-300" size={24} />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-700 leading-tight">{item.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-semibold text-blue-600">GPAX: {item.GPAX || 'N/A'}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.faculty || 'ไม่ระบุสาขา'}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 whitespace-nowrap">
                    
                    {formatDate(item.starttime)} - {formatDate(item.endtime)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <Link href={`/cms/education/${item.id}`}>
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="แก้ไข">
                          <Pencil size={18} />
                        </button>
                      </Link>
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="ลบ"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}