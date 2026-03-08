"use client";
import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Search } from 'lucide-react';
import { categoryService } from '@/app/APIcont/services/categoryService';
import { Category } from '../lib/types';
import { Button } from '@/app/components/ui/button';

export default function CategoryPage() {
  const [data, setData] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    try {
      const res = await categoryService.getAll();
      setData(res);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const filtered = useMemo(() =>
    data.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    ), [data, search]);

  const handleDelete = async (id: number) => {
    if (confirm("คุณแน่ใจหรือไม่ว่าต้องการลบหมวดหมู่นี้?")) {
      await categoryService.delete(id);
      loadData();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Category</h1>
        <Link href="/cms/category/create">
          <Button className="flex items-center gap-2">
             Add New
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="ค้นหาหมวดหมู่..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white"
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-slate-600 text-xs font-bold uppercase">
            <tr>
              <th className="px-6 py-4 w-20">ID</th>
              <th className="px-6 py-4">ชื่อหมวดหมู่</th>
              <th className="px-6 py-4 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={3} className="p-10 text-center">กำลังโหลด...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan={3} className="p-10 text-center text-slate-400">ไม่พบข้อมูล</td></tr>
            ) : filtered.map(item => (
              <tr key={item.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 text-slate-500">#{item.id}</td>
                <td className="px-6 py-4 font-medium text-slate-700">{item.name}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-2">
                    <Link href={`/cms/category/${item.id}`}>
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Pencil size={18}/>
                      </button>
                    </Link>
                    <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
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
