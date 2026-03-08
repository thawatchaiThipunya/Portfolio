"use client";
import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Mail, Phone, MapPin, Search } from 'lucide-react';
import { contractService } from '@/app/APIcont/services/contractService';
import { Contract } from '../lib/types';
import { Button } from '@/app/components/ui/button';

export default function ContractPage() {
  const [data, setData] = useState<Contract[]>([]);
  const [search, setSearch] = useState('');

  const loadData = () => contractService.getAll().then(setData);
  useEffect(() => { loadData(); }, []);

  const filtered = useMemo(() =>
    data.filter(item =>
      (item.gmail ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (item.phone ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (item.address ?? '').toLowerCase().includes(search.toLowerCase())
    ), [data, search]);

  const handleDelete = async (id: number) => {
    if (confirm("Delete this contract?")) {
      await contractService.delete(id);
      loadData();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-800">Contact Info</h1>
        <Link href="/cms/contract/create">
          <Button className="flex items-center gap-2"> Add New</Button>
        </Link>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="ค้นหาอีเมล เบอร์โทร หรือที่อยู่..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filtered.map(item => (
          <div key={item.id} className="bg-white p-6 rounded-xl border shadow-sm flex justify-between items-center">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-slate-700"><Mail size={16}/> {item.gmail || '-'}</div>
              <div className="flex items-center gap-2 text-slate-700"><Phone size={16}/> {item.phone || '-'}</div>
              <div className="flex items-center gap-2 text-slate-500 text-sm"><MapPin size={16}/> {item.address || '-'}</div>
            </div>
            <div className="flex gap-2">
              <Link href={`/cms/contract/${item.id}`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Pencil size={20}/></Link>
              <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={20}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}