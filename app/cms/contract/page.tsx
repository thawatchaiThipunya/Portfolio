"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Pencil, Trash2, Mail, Phone, MapPin } from 'lucide-react';
import { contractService } from '@/app/APIcont/services/contractService';
import { Contract } from '../lib/types';
import { Button } from '@/app/components/ui/button';

export default function ContractPage() {
  const [data, setData] = useState<Contract[]>([]);

  const loadData = () => contractService.getAll().then(setData);
  useEffect(() => { loadData(); }, []);

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

      <div className="grid grid-cols-1 gap-4">
        {data.map(item => (
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