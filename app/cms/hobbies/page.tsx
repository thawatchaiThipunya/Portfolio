"use client";
import { useEffect, useState } from 'react';
import { hobbyService } from '@/app/APIcont/services/hobbyService';
import { Button } from '@/app/components/ui/button';
import { Hobby, HobbyStatus } from '@/app/cms/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Trash2, Sparkles } from 'lucide-react';

export default function HobbyListPage() {
  const [hobbies, setHobbies] = useState<Hobby[]>([]);

  useEffect(() => {
    
    (async () => {
      try {
        const data = await hobbyService.getAll();
        setHobbies(data);
      } catch  {
        console.error("Failed to load hobbies");
      }
    })();
  }, []); 

  const handleDelete = async (id: number) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบรายการนี้? ข้อมูลจะถูกย้ายไปถังขยะ")) {
      try {
        await hobbyService.delete(id);
        
        const data = await hobbyService.getAll();
        setHobbies(data);
      } catch  {
        alert("เกิดข้อผิดพลาดในการลบข้อมูล");
      }
    }
  };

  return (
    <div className="p-8 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            My Hobbies 
          </h1>
          <p className="text-slate-500 mt-1">จัดการกิจกรรมและสิ่งที่น่าสนใจทั้งหมดของคุณ</p>
        </div>
        
        <Link href="/cms/hobbies/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 rounded-2xl shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 font-bold">
            Add New Hobby
          </Button>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {hobbies.map((hobby: Hobby) => (
          <div 
            key={hobby.id} 
            className="group bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col h-full"
          >
            <div className="relative h-56 w-full overflow-hidden">
              {hobby.image_url ? (
                <Image 
                  src={hobby.image_url} 
                  alt={hobby.name} 
                  fill 
                  unoptimized 
                  className="object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full bg-slate-100 text-slate-400 gap-2">
                  <Sparkles size={32} className="opacity-20" />
                  <span className="text-xs font-medium uppercase tracking-widest">No Image</span>
                </div>
              )}
              
                <div className="absolute top-4 left-4">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md transition-all duration-300 ${
                    hobby.status === HobbyStatus.MAIN 
                    ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 text-white ring-2 ring-white/50 shadow-orange-500/40 scale-110' 
                    : 'bg-slate-900/80 text-slate-200 border border-white/20'
                }`}>
                    {hobby.status === HobbyStatus.MAIN && (
                    <Sparkles size={10} className="inline-block mb-0.5 mr-1 animate-pulse" />
                    )}
                    {hobby.status}
                </span>
                </div>
            </div>

            <div className="p-6 flex flex-col flex-1">
              <div className="mb-4">
                <h3 className="font-black text-slate-900 text-xl mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {hobby.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 font-medium">
                  {hobby.description || "ไม่มีรายละเอียดเพิ่มเติมสำหรับกิจกรรมนี้"}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-slate-100/60">
                <div className="flex items-center gap-2">
                    <Link href={`/cms/hobbies/${hobby.id}`} className="flex-grow">
                    <button 
                        className="w-full h-10 flex items-center justify-center gap-2 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-all duration-300 shadow-sm active:scale-95"
                    >
                        <Edit size={14} />
                        <span>Edit Details</span>
                    </button>
                    </Link>

                    <button 
                    onClick={() => handleDelete(hobby.id)}
                    className="w-10 h-10 flex items-center justify-center bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all duration-300 active:scale-95 group/del"
                    title="Delete Hobby"
                    >
                    <Trash2 size={16} className="group-hover/del:rotate-12 transition-transform" />
                    </button>
                </div>
                </div>
            </div>
          </div>
        ))}
      </div>

      {hobbies.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
            <Plus size={40} className="opacity-20" />
          </div>
          <p className="text-lg font-bold">ยังไม่มีข้อมูลงานอดิเรก</p>
          <p className="text-sm">เริ่มสร้างโดยการกดปุ่ม Add Hobby ด้านบน</p>
        </div>
      )}
    </div>
  );
}