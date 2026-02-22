"use client";
import { useEffect, useState } from 'react';
import { technicalService } from '@/app/APIcont/services/technicalService';
import { Button } from '@/app/components/ui/button';
import { Technical } from '@/app/cms/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Trash2, Code2, Layers } from 'lucide-react';

export default function TechnicalListPage() {
  const [technicals, setTechnicals] = useState<Technical[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const data = await technicalService.getAll();
      setTechnicals(data);
    } catch {
      console.error("Failed to load technicals");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบรายการนี้? ข้อมูลจะถูกย้ายไปถังขยะ")) {
      try {
        await technicalService.delete(id);
        // Optimistic UI: กรองออกทันทีไม่ต้องรอโหลดใหม่
        setTechnicals(prev => prev.filter(item => item.id !== id));
      } catch {
        alert("เกิดข้อผิดพลาดในการลบข้อมูล");
      }
    }
  };

  return (
    <div className="p-8 bg-slate-50/50 min-h-screen">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            Technical Skills
          </h1>
          <p className="text-slate-500 mt-1">จัดการคลังทักษะและเทคโนโลยีที่คุณเชี่ยวชาญ</p>
        </div>
        
        <Link href="/cms/technical/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 rounded-2xl shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 font-bold">
            <Plus size={20} />
            Add New Skill
          </Button>
        </Link>
      </div>

      {/* Grid Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {technicals.map((tech: Technical) => (
          <div 
            key={tech.id} 
            className="group bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col h-full p-4"
          >
            {/* Visual Section: โชว์ Logo ขนาดกำลังดี */}
            <div className="relative h-48 w-full rounded-[2rem] bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-50">
              {tech.logo ? (
                <div className="relative w-24 h-24 transition-transform duration-500 group-hover:scale-110">
                  <Image 
                    src={tech.logo} 
                    alt={tech.name} 
                    fill 
                    unoptimized 
                    className="object-contain" 
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-300 gap-2">
                  <Code2 size={48} className="opacity-20" />
                  <span className="text-[10px] font-black uppercase tracking-widest">No Logo</span>
                </div>
              )}

              {/* Category Tag: แปะไว้มุมบน */}
              <div className="absolute top-4 right-4">
                <span className="px-3 py-1 bg-white/80 backdrop-blur-md border border-slate-100 rounded-full text-[10px] font-black text-slate-600 uppercase tracking-widest shadow-sm">
                   {tech.category?.name || 'General'}
                </span>
              </div>
            </div>

            {/* Info Section */}
            <div className="p-4 flex flex-col flex-1 text-center">
              <h3 className="font-black text-slate-900 text-xl mb-6 group-hover:text-blue-600 transition-colors">
                {tech.name}
              </h3>

              <div className="mt-auto">
                <div className="flex items-center gap-2">
                    <Link href={`/cms/technical/${tech.id}`} className="flex-grow">
                      <button 
                          className="w-full h-11 flex items-center justify-center gap-2 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-blue-600 transition-all duration-300 shadow-sm active:scale-95"
                      >
                          <Edit size={14} />
                          <span>Edit Skill</span>
                      </button>
                    </Link>

                    <button 
                      onClick={() => handleDelete(tech.id)}
                      className="w-11 h-11 flex items-center justify-center bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all duration-300 active:scale-95 group/del"
                      title="Delete Skill"
                    >
                      <Trash2 size={18} className="group-hover/del:rotate-12 transition-transform" />
                    </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {!loading && technicals.length === 0 && (
        <div className="flex flex-col items-center justify-center py-32 text-slate-400">
          <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <Layers size={40} className="opacity-20" />
          </div>
          <p className="text-xl font-black text-slate-900">ยังไม่มีข้อมูล Skill</p>
          <p className="text-sm font-medium">เริ่มบันทึกทักษะของคุณโดยการกดปุ่ม Add New Skill</p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center py-40">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}
    </div>
  );
}