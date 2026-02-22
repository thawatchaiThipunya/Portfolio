"use client";
import { useEffect, useState } from 'react';
import { projectService } from '@/app/APIcont/services/projectService';
import { Edit, Trash2, Briefcase } from 'lucide-react';
import { Project } from '@/app/cms/lib/types';
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectListPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    
    (async () => {
      try {
        const data = await projectService.getAll();
        setProjects(data);
      } catch {
        console.error("Failed to fetch projects");
      }
    })();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("ต้องการลบโปรเจกต์นี้ใช่หรือไม่?")) {
      try {
        await projectService.delete(id);
        
        const data = await projectService.getAll();
        setProjects(data);
      } catch {
        alert("ลบข้อมูลไม่สำเร็จ");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Projects</h1>
          <p className="text-slate-500 font-medium">ผลงานและประสบการณ์การทำงานทั้งหมด</p>
        </div>
        <Link href="/cms/project/create">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-slate-900 text-white px-6 py-4 rounded-2xl font-black transition-all shadow-lg shadow-blue-100">
            ADD NEW PROJECT
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: Project) => (
          <div key={project.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl transition-all group">
            <div className="relative h-48 w-full bg-slate-100">
              {project.image_url && (
                <Image src={project.image_url} alt={project.title} fill className="object-cover" />
              )}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-600">
                {project.employmentType}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-2 uppercase tracking-tight">
                <Briefcase size={14} /> {project.company}
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-2 line-clamp-1">{project.title}</h3>
              <p className="text-slate-500 text-sm line-clamp-2 mb-6 font-medium leading-relaxed">
                {project.content}
              </p>

              <div className="flex gap-2">
                <Link href={`/cms/project/${project.id}`} className="flex-1">
                  <button className="w-full h-11 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 text-slate-600 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                    <Edit size={16}/> Edit
                  </button>
                </Link>
                <button 
                  onClick={() => handleDelete(project.id)}
                  className="w-11 h-11 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl transition-all flex items-center justify-center"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}