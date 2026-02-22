"use client";
import React, { useState } from 'react';
import { 
  Database, User, Cpu, BookOpen, 
  Briefcase, Heart, Contact, LayoutDashboard, LogOut, ChevronLeft, ChevronRight 
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import axiosInstance from '@/lib/axios';

export default function CMSLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  
  const menuItems = [
    { name: 'Category', icon: <Database size={20}/>, href: '/cms/category' },
    { name: 'Contract', icon: <Contact size={20}/>, href: '/cms/contract' },
    { name: 'Education', icon: <BookOpen size={20}/>, href: '/cms/education' },
    { name: 'Hobby & Interest', icon: <Heart size={20}/>, href: '/cms/hobbies' },
    { name: 'Main Profile', icon: <LayoutDashboard size={20}/>, href: '/cms/mainprofile' },
    { name: 'Project', icon: <Briefcase size={20}/>, href: '/cms/project' },
    { name: 'Soft Skill', icon: <User size={20}/>, href: '/cms/personal' },
    { name: 'Technical Skill', icon: <Cpu size={20}/>, href: '/cms/technical' },
  ].sort((a, b) => a.name.localeCompare(b.name)); 

const handleLogout = async () => {
    try {

      await axiosInstance.post('/auth/logout'); 
    } catch (error) {
      console.error("Logout failed", error);
    } finally {

      router.push('/login');
      router.refresh(); 
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className={`bg-slate-900 text-white transition-all duration-300 flex flex-col sticky top-0 h-screen ${isCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-4 flex justify-between items-center border-b border-slate-700 h-16 shrink-0">
          {!isCollapsed && <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">MY CMS</span>}
          <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1.5 hover:bg-slate-800 rounded-md transition-colors">
            {isCollapsed ? <ChevronRight size={20}/> : <ChevronLeft size={20}/>}
          </button>
        </div>

        <nav className="flex-1 mt-4 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.name} href={item.href} 
                className={`flex items-center p-4 transition-all duration-200 group ${isActive ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800/50 text-slate-400 hover:text-white'}`}>
                <div className={`${isActive ? 'text-white' : 'group-hover:text-white transition-transform group-hover:scale-110'}`}>{item.icon}</div>
                {!isCollapsed && <span className="ml-4 font-medium whitespace-nowrap">{item.name}</span>}
              </Link>
            );
          })}
        </nav>


        <button 
          onClick={handleLogout}
          className="p-4 flex items-center bg-slate-900 hover:bg-red-950/50 text-red-400 hover:text-red-300 transition-all border-t border-slate-800 shrink-0"
        >
          <LogOut size={20}/>
          {!isCollapsed && <span className="ml-4 font-medium">Logout</span>}
        </button>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-8 sticky top-0 z-10">
          <h2 className="text-sm font-bold text-slate-500 uppercase tracking-[0.2em]">
            Dashboard <span className="text-slate-300 mx-2">/</span> 
            <span className="text-slate-800">{menuItems.find(item => item.href === pathname)?.name || 'Overview'}</span>
          </h2>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}