"use client";
import { useEffect, useState, useMemo } from 'react';
import { projectService } from '@/app/APIcont/services/projectService';
import { Edit, Trash2, Briefcase, Search } from 'lucide-react';
import { Project } from '@/app/cms/lib/types';
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectListPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('');

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

  const filtered = useMemo(() =>
    projects.filter(p => {
      const matchSearch =
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        (p.company ?? '').toLowerCase().includes(search.toLowerCase());
      const matchType = filterType ? p.employmentType === filterType : true;
      return matchSearch && matchType;
    }), [projects, search, filterType]);

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
      <div className="flex justify-between items-center mb-6">
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

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาชื่อโปรเจกต์ หรือบริษัท..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white"
          />
        </div>
        <select
          value={filterType}
          onChange={e => setFilterType(e.target.value)}
          className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white text-slate-600"
        >
          <option value="">ทุกประเภท</option>
          <option value="Full-time">Full-time</option>
          <option value="Contract">Contract</option>
          <option value="Internship">Internship</option>
          <option value="Freelance">Freelance</option>
          <option value="Co-operative">Co-operative</option>
          <option value="Thesis">Thesis</option>
        </select>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          <p className="text-xl font-black text-slate-900">ไม่พบโปรเจกต์</p>
          <p className="text-sm font-medium">ลองเปลี่ยนคำค้นหาหรือตัวกรอง</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project: Project) => (
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