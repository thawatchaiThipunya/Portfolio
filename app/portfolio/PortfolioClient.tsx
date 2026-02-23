// "use client";

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Github, Mail, Phone, Facebook, Instagram, MapPin,
//    GraduationCap,  CheckCircle2, X, 
//   ArrowUpRight, User, 
//   MessageCircle, Linkedin, Zap,  Globe, 
// } from 'lucide-react';
// import { 
//   MainProfile, Contract, Hobby, Education, 
//   SoftSkill, Technical, Project 
// } from '@/app/cms/lib/types';
// import Image from 'next/image';

// interface PortfolioClientProps {
//   profile: MainProfile | null;
//   contracts: Contract | null;
//   hobbies: Hobby[];
//   educations: Education[];
//   softSkills: SoftSkill[];
//   technicals: Technical[];
//   projects: Project[];
// }

// const TechIcon = ({ name }: { name: string }) => {
//   const iconMap: Record<string, string> = {
//     "React": "devicon-react-original colored",
//     "Next.js": "devicon-nextjs-original-wordmark",
//     "Angular": "devicon-angularjs-plain colored",
//     "HTML": "devicon-html5-plain colored",
//     "CSS": "devicon-css3-plain colored",
//     "JavaScript": "devicon-javascript-plain colored",
//     "TypeScript": "devicon-typescript-plain colored",
//     "Tailwind": "devicon-tailwindcss-plain colored",
//     "Node.js": "devicon-nodejs-plain colored",
//     "PHP": "devicon-php-plain colored",
//     "MySQL": "devicon-mysql-plain colored",
//     "PostgreSQL": "devicon-postgresql-plain colored",
//     "Python": "devicon-python-plain colored",
//     "Docker": "devicon-docker-plain colored",
//     "Git": "devicon-git-plain colored",
//     "Figma": "devicon-figma-plain colored",
//   };
//   const iconClass = iconMap[name] || "devicon-chrome-plain";
//   return <i className={`${iconClass} text-3xl md:text-5xl`}></i>;
// };

// export default function PortfolioClient({ 
//   profile, contracts, hobbies, educations, softSkills, technicals, projects 
// }: PortfolioClientProps) {
  
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);

//   useEffect(() => {
//     const link = document.createElement('link');
//     link.rel = 'stylesheet';
//     link.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
//     document.head.appendChild(link);
//   }, []);

//   const techByGroup = (technicals || []).reduce((acc: Record<string, Technical[]>, tech) => {
//     const groupName = tech.category?.name || "Tools";
//     if (!acc[groupName]) acc[groupName] = [];
//     acc[groupName].push(tech);
//     return acc;
//   }, {});

//   return (
//     <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-sky-500/30 font-light overflow-x-hidden">
      
//       {/* 1. MAIN PROFILE (Full Screen Impression) */}
//       <section className="h-screen flex flex-col items-center justify-center p-6 text-center relative">
//         <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative mb-12">
//             <div className="w-72 h-72 md:w-[24rem] md:h-[24rem] rounded-[5rem] border-[20px] border-white/5 overflow-hidden shadow-2xl transition-all duration-700 hover:rotate-1 rotate-2">
//             {profile?.image_url && (
//                 <Image 
//                 src={profile.image_url} 
//                 alt="Profile" 
//                 fill 
//                 priority
//                 className="object-cover scale-110" 
//                 />
//             )}
//             </div>
//           <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-sky-500 text-black px-12 py-4 rounded-3xl font-black text-sm tracking-[0.4em] uppercase shadow-2xl">
//             {profile?.role}
//           </div>
//         </motion.div>
//         <h1 className="text-7xl md:text-[13rem] font-black tracking-[calc(-0.05em)] italic uppercase leading-[0.75] mb-4">
//           {profile?.firstname} <br/><span className="text-slate-500">{profile?.lastname}</span>
//         </h1>
        
        
//       </section>

//       <section className="py-20 text-center max-w-4xl mx-auto px-6">
//           <p className="text-white/40 text-xl md:text-3xl italic leading-relaxed">&quot;{profile?.description}&quot;</p>
//       </section>


//       <section className="py-20 px-6">
//         <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-3xl rounded-[5rem] border border-white/10 p-16 relative overflow-hidden">
//           <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-sky-400 mb-20 text-center italic">Contact Headquarters</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20">
//             <ContactBox icon={Phone} label="Phone" val={contracts?.phone ?? "N/A"} href={contracts?.phone ? `tel:${contracts.phone}` : undefined} />
//             <ContactBox icon={Mail} label="Email" val={contracts?.gmail ?? "N/A"} href={contracts?.gmail ? `mailto:${contracts.gmail}` : undefined} />
//             <ContactBox icon={Facebook} label="Facebook" val="ธวัชชัย ธิปัญญา" href={contracts?.facebook ?? undefined} />
//             <ContactBox icon={MessageCircle} label="Line" val="tawatchai23987" href={undefined} />
//             <ContactBox icon={Instagram} label="Instagram" val="unk_twt" href={contracts?.instagram ?? undefined} />
//             <ContactBox icon={Linkedin} label="LinkedIn" val="Thawatchai T." href={contracts?.linkedIn ??undefined} />
//             <ContactBox icon={Github} label="GitHub" val="t-thawatchai" href={contracts?.github ?? undefined} />
//             <ContactBox icon={MapPin} label="Address" val="Samut Prakan, TH" />
//           </div>
//         </div>
//       </section>

//       <div className="max-w-7xl mx-auto px-6 space-y-60 pb-40">
         
         
//          <section>
//             <h2 className="text-6xl font-black mb-20 italic uppercase tracking-tighter">Favorite Hobbies.</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
//                {hobbies.slice(0, 2).map((hobby) => (
//                   <div key={hobby.id} className="relative group aspect-video rounded-[4rem] overflow-hidden border border-white/10 bg-black transition-all duration-500 hover:shadow-[0_0_60px_rgba(14,165,233,0.25)] hover:border-sky-500/50">
//                     {hobby.image_url && (
//                     <Image 
//                         src={hobby.image_url} 
//                         alt={hobby.name} 
//                         fill 
//                         className="object-cover opacity-50 group-hover:opacity-80 transition-all duration-700 group-hover:scale-105" 
//                     />
//                     )}
//                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 flex flex-col justify-end">
//                         <div className="p-4 bg-sky-500 w-fit rounded-2xl mb-6 text-black shadow-2xl group-hover:scale-110 transition-transform">
//                            <Globe size={32} />
//                         </div>
//                         <h3 className="text-5xl font-black uppercase italic">{hobby.name}</h3>
//                         <p className="text-white/60 text-lg italic mt-4 max-w-md">{hobby.description}</p>
//                      </div>
//                   </div>
//                ))}
//             </div>
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//                {hobbies.slice(2).map((hobby) => (
//                   <div key={hobby.id} className="relative h-48 group rounded-[2.5rem] overflow-hidden border border-white/5 transition-all hover:border-sky-500/50">
//                      {hobby.image_url && (
//                         <Image 
//                             src={hobby.image_url} 
//                             alt={hobby.name} 
//                             fill 
//                             className="object-cover opacity-20 group-hover:opacity-60 transition-all" 
//                         />
//                         )}
//                      <div className="absolute inset-0 flex items-center justify-center p-6 text-center bg-black/40 group-hover:bg-transparent transition-all">
//                         <span className="font-black uppercase italic text-sm tracking-widest">{hobby.name}</span>
//                      </div>
//                   </div>
//                ))}
//             </div>
//          </section>

         
//          <section className="py-20">
//         <div className="p-8 md:p-20 bg-white/5 backdrop-blur-3xl rounded-[5rem] border border-white/10 w-full relative overflow-hidden">
//             <div className="absolute -top-24 -right-24 w-96 h-96 bg-sky-500/10 blur-[100px] rounded-full" />
            
//             <div className="flex items-center gap-6 mb-24">
//             <div className="p-4 bg-sky-500/20 rounded-3xl border border-sky-500/50">
//                 <GraduationCap className="text-sky-400" size={48} />
//             </div>
//             <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter">Academic Journey.</h2>
//             </div>

//             <div className="space-y-24 relative">
//             <div className="absolute left-0 md:left-12 top-0 bottom-0 w-[2px] bg-gradient-to-b from-sky-500/50 via-sky-500/20 to-transparent" />

//             {educations.map((edu) => (
//                 <div key={edu.id} className="relative pl-12 md:pl-32 group">
//                 <div className="absolute left-[-5px] md:left-[43px] top-2 w-3 h-3 rounded-full bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,1)] group-hover:scale-150 transition-transform" />

//                 {/* ปรับเป็น flex-col ทั้งหมดเพื่อให้เกรดลงมาอยู่ข้างล่าง */}
//                 <div className="flex flex-col gap-10">
                    
//                     <div className="flex flex-col md:flex-row md:items-center gap-10">
//                     {/* 1. Logo Section (เช็คชื่อตัวแปร edu.image_url ให้ชัวร์นะครับ) */}
//                     <div className="relative w-24 h-24 md:w-32 md:h-32 shrink-0 bg-white/10 rounded-[2rem] border border-white/10 overflow-hidden group-hover:border-sky-500/50 transition-colors">
//                         {edu.logo_url ? (
//                         <Image 
//                             src={edu.logo_url as string} 
//                             alt={edu.name} 
//                             fill 
//                             className="object-contain p-4 group-hover:scale-110 transition-transform duration-500" 
//                         />
//                         ) : (
//                         <div className="w-full h-full flex items-center justify-center opacity-20">
//                             <GraduationCap size={40} />
//                         </div>
//                         )}
//                     </div>

//                     {/* 2. Info Section */}
//                     <div className="flex-1 space-y-4">
//                         <span className="text-sky-400 font-black tracking-[0.3em] text-sm uppercase">
//                         {new Date(edu.starttime).getFullYear()} — {edu.endtime ? new Date(edu.endtime).getFullYear() : 'PRESENT'}
//                         </span>
//                         <h4 className="text-4xl md:text-6xl font-black uppercase italic leading-none group-hover:text-white transition-colors">
//                         {edu.name}
//                         </h4>
//                         <p className="text-white/40 text-xl md:text-2xl font-medium italic">
//                         {edu.faculty}
//                         </p>
//                     </div>
//                     </div>

//                     {/* 3. GPAX Section (ขยับมาอยู่ล่างสุด และทำให้เด่นขึ้น) */}
//                     {edu.GPAX && (
//                     <div className="relative self-start md:ml-0">
//                         <div className="absolute inset-0 bg-sky-500 blur-[40px] opacity-10 group-hover:opacity-30 transition-opacity" />
//                         <div className="relative flex items-baseline gap-4">
//                         <span className="text-6xl md:text-8xl font-black text-white italic tracking-tighter drop-shadow-2xl">
//                             {edu.GPAX}
//                         </span>
//                         <div className="flex flex-col">
//                             <span className="text-sky-400 font-black text-xl italic leading-none">GPAX</span>
//                             <span className="text-white/20 text-xs font-bold uppercase tracking-widest">Score</span>
//                         </div>
//                         </div>
//                     </div>
//                     )}
//                 </div>
//                 </div>
//             ))}
//             </div>
//         </div>
//         </section>

//          {/* 5. PERSONAL SKILL (Mega Card Style) */}
//          <section className="py-20">
//             <div className="p-20 bg-emerald-500/5 rounded-[5rem] border border-emerald-500/10">
//                <div className="flex items-center gap-6 mb-24">
//                   <Zap className="text-emerald-400" size={64} />
//                   <h2 className="text-6xl font-black italic uppercase tracking-tighter">Personal Skill.</h2>
//                </div>
//                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//                   {softSkills.map((skill) => (
//                     <div key={skill.id} className="group relative p-10 bg-black/40 rounded-[3rem] border border-white/5 transition-all hover:bg-emerald-500 hover:-translate-y-2">
//                       <div className="relative z-10 flex flex-col gap-6 group-hover:text-black transition-colors">
//                          <CheckCircle2 size={40} className="text-emerald-400 group-hover:text-black" />
//                          <span className="text-xl font-black uppercase tracking-widest leading-none">{skill.name}</span>
//                       </div>
//                       <User size={120} className="absolute -bottom-4 -right-4 text-black opacity-5 group-hover:opacity-20 transition-all" />
//                     </div>
//                   ))}
//                </div>
//             </div>
//          </section>

         
//          <section className="py-40 relative overflow-hidden">
            
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-sky-500/10 blur-[120px] rounded-full -z-10" />

            
//             <div className="relative group cursor-default mb-32">
                
//                 <h2 className="text-7xl md:text-[12rem] font-black tracking-tighter text-center absolute inset-0 italic uppercase opacity-20 blur-2xl group-hover:opacity-40 group-hover:text-sky-400 transition-all duration-700">
//                 Tech Universe.
//                 </h2>
                
                
//                 <h2 className="text-7xl md:text-[12rem] font-black tracking-tighter text-center italic uppercase leading-none text-transparent select-none"
//                     style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
//                 Tech Universe.
//                 </h2>

                
//                 <motion.h2 
//                 initial={{ y: 20, opacity: 0 }}
//                 whileInView={{ y: 0, opacity: 1 }}
//                 viewport={{ once: true }}
//                 className="text-7xl md:text-[12rem] font-black tracking-tighter text-center italic uppercase leading-none absolute inset-0 bg-gradient-to-t from-sky-500 via-white to-white bg-clip-text text-transparent drop-shadow-2xl"
//                 >
//                 Tech Universe.
//                 </motion.h2>

                
//             </div>

            
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
//                 {Object.entries(techByGroup).map(([group, items]) => (
//                 <motion.div 
//                     key={group}
//                     whileHover={{ y: -10 }}
//                     className="p-12 bg-gradient-to-br from-white/[0.07] to-transparent rounded-[4rem] border border-white/10 hover:border-sky-500/50 transition-all group relative overflow-hidden"
//                 >
                    
//                     <div className="absolute inset-0 bg-sky-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
//                     <div className="flex items-center gap-4 mb-12">
//                     <div className="w-1.5 h-8 bg-sky-500 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.5)]" />
//                     <h4 className="text-2xl font-black italic uppercase tracking-tighter text-white">{group}</h4>
//                     </div>

//                     <div className="grid grid-cols-3 gap-8 relative z-10">
//                     {items.map((tech) => (
//                         <div key={tech.id} className="flex flex-col items-center gap-4 group/item">
//                         <div className="w-20 h-20 bg-black/40 rounded-3xl flex items-center justify-center border border-white/5 group-hover/item:border-sky-500 group-hover/item:bg-sky-500/10 group-hover/item:shadow-[0_0_20px_rgba(14,165,233,0.3)] transition-all duration-500">
//                             <TechIcon name={tech.name} />
//                         </div>
//                         <span className="text-[10px] font-black uppercase opacity-20 group-hover/item:opacity-100 group-hover/item:text-sky-400 transition-all text-center tracking-widest leading-tight">
//                             {tech.name}
//                         </span>
//                         </div>
//                     ))}
//                     </div>
//                 </motion.div>
//                 ))}
//             </div>
//             </section>

//          {/* 7. PROJECTS */}
//          <section className="py-40">
            
//             <div className="mb-60 relative">
//                 <motion.div 
//                 initial={{ opacity: 0, y: 50 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 1 }}
//                 className="text-center"
//                 >
//                 <h2 className="text-8xl md:text-[12rem] font-black italic uppercase tracking-[calc(-0.05em)] leading-none relative z-10">
//                     Project <br />
//                     <span className="text-transparent" style={{ WebkitTextStroke: '2px rgba(255, 255, 255, 0.1)' }}>
//                     Portfolio
//                     </span>
//                 </h2>
//                 </motion.div>
//             </div>

            
//             <div className="space-y-60">
//                 {projects.map((project, idx) => (
//                 <div 
//                     key={project.id} 
//                     onClick={() => setSelectedProject(project)}
//                     className={`flex flex-col ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-0 items-center cursor-pointer group`}
//                 >
                    
//                     <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-[16/10] overflow-hidden relative border-y border-white/5 md:border-none">
//                     {project.image_url && (
//                         <Image 
//                         src={project.image_url as string} 
//                         alt={project.title} 
//                         fill 
//                         className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-[1.5s] ease-out" 
//                         />
//                     )}
                    
//                     <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-transparent opacity-60 md:block hidden" />
                    
                    
//                     <div className="absolute inset-0 bg-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
//                         <motion.div 
//                         whileHover={{ scale: 1.1 }}
//                         className="bg-white text-black px-8 py-4 rounded-full font-black uppercase italic tracking-widest flex items-center gap-3 shadow-2xl"
//                         >
//                         View Project <ArrowUpRight size={20}/>
//                         </motion.div>
//                     </div>
//                     </div>

                    
//                     <div className={`w-full md:w-1/2 p-6 md:p-20 space-y-6 ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right md:flex md:flex-col md:items-end'}`}>
//                     <div className="flex items-center gap-4 text-sky-500 font-black italic tracking-widest text-sm mb-4">
//                         <span className="w-8 h-[2px] bg-sky-500" />
//                         0{idx + 1} / {projects.length}
//                     </div>
                    
                    
//                     <h3 className="text-5xl md:text-6xl font-black italic uppercase leading-none group-hover:text-sky-400 transition-colors duration-500">
//                         {project.title}
//                     </h3>
                    
//                     <p className="text-white/30 italic text-lg md:text-xl leading-relaxed max-w-xl">
//                         &quot;{project.content}&quot;
//                     </p>

//                     <div className="pt-8">
//                         <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-sky-500 group-hover:bg-sky-500 transition-all">
//                             <ArrowUpRight size={24} className="group-hover:text-black" />
//                         </div>
//                     </div>
//                     </div>
//                 </div>
//                 ))}
//             </div>
//             </section>

//       </div>

//       {/* 8. FOOTER (With Big Actions) */}
//       <footer className="py-40 px-6 border-t border-white/5 bg-black/60 relative">
//           <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 justify-center items-center mb-24">
//              <a href={contracts?.github ?? "#"} target="_blank" className="w-full md:w-auto px-16 py-8 bg-white/5 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all font-black uppercase italic tracking-[0.2em] flex items-center justify-center gap-4 group">
//                 <Github className="group-hover:scale-125 transition-transform" /> GitHub
//              </a>
//              <a href={`mailto:${contracts?.gmail ?? ""}`} className="w-full md:w-auto px-16 py-8 bg-white text-black rounded-full border border-white hover:bg-transparent hover:text-white transition-all font-black uppercase italic tracking-[0.2em] flex items-center justify-center gap-4 group">
//                 <Mail className="group-hover:scale-125 transition-transform" /> Send Email
//              </a>
//           </div>
//           <p className="text-center text-[10px] font-black uppercase tracking-[2em] opacity-10">
//              © 2026 {profile?.firstname} {profile?.lastname} — STAY FOCUSED
//           </p>
//       </footer>

//       {/* PROJECT MODAL */}
//       <AnimatePresence>
//         {selectedProject && (
//           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-black/95 backdrop-blur-3xl overflow-y-auto p-6 md:p-20">
//             <button onClick={() => setSelectedProject(null)} className="fixed top-10 right-10 p-6 bg-white/10 rounded-full hover:bg-white hover:text-black transition-all z-[400]"><X size={40}/></button>
//             <div className="max-w-6xl mx-auto pt-20">
//               <div className="relative w-full aspect-video rounded-[4rem] mb-20 shadow-2xl border border-white/10 overflow-hidden">
//                 {selectedProject.image_url && (
//                     <Image 
//                     src={selectedProject.image_url} 
//                     alt={selectedProject.title} 
//                     fill 
//                     className="object-cover" 
//                     />
//                 )}
//               </div>
//               <h2 className="text-6xl md:text-[8rem] font-black italic uppercase tracking-tighter leading-none mb-10">{selectedProject.title}</h2>
//               <div className="h-2 w-40 bg-sky-500 mb-10" />
//               <p className="text-3xl font-light italic text-white/60 leading-relaxed mb-20">{selectedProject.content}</p>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//     </div>
//   );
// }

// // SHARED COMPONENTS
// function ContactBox({ icon: Icon, label, val, href }: { icon: React.ElementType, label: string, val: string, href?: string }) {
//   const content = (
//     <div className="flex flex-col items-center text-center group cursor-pointer">
//       <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mb-6 border border-white/5 group-hover:bg-sky-500 group-hover:text-black transition-all group-hover:rotate-6">
//         {/* เรียกใช้แบบ Component และส่งค่า size เข้าไปตรงๆ */}
//         <Icon size={32} />
//       </div>
//       <span className="text-[10px] font-black uppercase tracking-widest text-white/20 mb-2 group-hover:text-sky-400">{label}</span>
//       <span className="text-sm font-bold text-white/60 italic truncate w-full">{val}</span>
//     </div>
//   );
//   return href ? <a href={href} target="_blank" className="w-full">{content}</a> : <div className="w-full">{content}</div>;
// }

"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, Mail, Phone, Facebook, Instagram, MapPin,
   GraduationCap,  CheckCircle2, X, 
  MessageCircle, Linkedin, Zap,  Globe, ArrowUpRight
} from 'lucide-react';
import { 
  MainProfile, Contract, Hobby, Education, 
  SoftSkill, Technical, Project 
} from '@/app/cms/lib/types';
import Image from 'next/image';

interface PortfolioClientProps {
  profile: MainProfile | null;
  contracts: Contract | null;
  hobbies: Hobby[];
  educations: Education[];
  softSkills: SoftSkill[];
  technicals: Technical[];
  projects: Project[];
}

const TechIcon = ({ name }: { name: string }) => {
  const iconMap: Record<string, string> = {
    "React": "devicon-react-original colored",
    "Next.js": "devicon-nextjs-original-wordmark",
    "Angular": "devicon-angularjs-plain colored",
    "HTML": "devicon-html5-plain colored",
    "CSS": "devicon-css3-plain colored",
    "JavaScript": "devicon-javascript-plain colored",
    "TypeScript": "devicon-typescript-plain colored",
    "Tailwind": "devicon-tailwindcss-plain colored",
    "Node.js": "devicon-nodejs-plain colored",
    "PHP": "devicon-php-plain colored",
    "MySQL": "devicon-mysql-plain colored",
    "PostgreSQL": "devicon-postgresql-plain colored",
    "Python": "devicon-python-plain colored",
    "Docker": "devicon-docker-plain colored",
    "Git": "devicon-git-plain colored",
    "Figma": "devicon-figma-plain colored",
  };
  const iconClass = iconMap[name] || "devicon-chrome-plain";
  return <i className={`${iconClass} text-2xl md:text-5xl`}></i>;
};

export default function PortfolioClient({ 
  profile, contracts, hobbies, educations, softSkills, technicals, projects 
}: PortfolioClientProps) {
  
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
    document.head.appendChild(link);
  }, []);

  const techByGroup = (technicals || []).reduce((acc: Record<string, Technical[]>, tech) => {
    const groupName = tech.category?.name || "Tools";
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(tech);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-sky-500/30 font-light overflow-x-hidden">
      
      
      <section className="min-h-[40vh] md:h-screen flex flex-col items-center justify-center p-4 md:p-6 text-center relative">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative mb-8 md:mb-12">
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-[24rem] md:h-[24rem] rounded-[3rem] md:rounded-[5rem] border-[10px] md:border-[20px] border-white/5 overflow-hidden shadow-2xl rotate-2">
            {profile?.image_url && (
                <Image 
                src={profile.image_url as string} 
                alt="Profile" 
                fill 
                priority
                className="object-cover scale-110" 
                />
            )}
            </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-sky-500 text-black px-6 md:px-12 py-2 md:py-4 rounded-2xl md:rounded-3xl font-black text-[10px] md:text-sm tracking-[0.2em] md:tracking-[0.4em] uppercase shadow-2xl whitespace-nowrap">
            {profile?.role}
          </div>
        </motion.div>
        <h1 className="text-5xl sm:text-7xl md:text-[10rem] lg:text-[13rem] font-black tracking-tighter italic uppercase leading-[0.8] mb-4">
          {profile?.firstname} <br/><span className="text-slate-600">{profile?.lastname}</span>
        </h1>
      </section>

      
      <section className="py-ุ md:py-20 text-center max-w-4xl mx-auto px-6">
          <p className="text-white/40 text-lg md:text-3xl italic leading-relaxed">&quot;{profile?.description}&quot;</p>
      </section>

      
      <section className="py-12 md:py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-3xl rounded-[3rem] md:rounded-[5rem] border border-white/10 p-8 md:p-16 relative overflow-hidden">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400 mb-10 md:mb-20 text-center italic">Contact Headquarters</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-20">
            <ContactBox icon={Phone} label="Phone" val={contracts?.phone ?? "N/A"} href={contracts?.phone ? `tel:${contracts.phone}` : undefined} />
            <ContactBox icon={Mail} label="Email" val={contracts?.gmail ?? "N/A"} href={contracts?.gmail ? `mailto:${contracts.gmail}` : undefined} />
            <ContactBox icon={Facebook} label="Facebook" val="ธวัชชัย ธิปัญญา" href={contracts?.facebook ?? undefined} />
            <ContactBox icon={MessageCircle} label="Line" val="tawatchai23987" href={undefined} />
            <ContactBox icon={Instagram} label="Instagram" val="unk_twt" href={contracts?.instagram ?? undefined} />
            <ContactBox icon={Linkedin} label="LinkedIn" val="Thawatchai T." href={contracts?.linkedIn ??undefined} />
            <ContactBox icon={Github} label="GitHub" val="t-thawatchai" href={contracts?.github ?? undefined} />
            <ContactBox icon={MapPin} label="Address" val="Samut Prakan, TH" />
          </div>
        </div>
      </section>

      
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-24 md:space-y-40 lg:space-y-60 pb-20 md:pb-40">
         
         
         <section>
            <h2 className="text-4xl md:text-6xl font-black mb-10 md:mb-20 italic uppercase tracking-tighter">Favorite Hobbies.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-6 md:mb-10">
               {hobbies.slice(0, 2).map((hobby) => (
                  <div key={hobby.id} className="relative group aspect-video rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-white/10 bg-black">
                    {hobby.image_url && (
                    <Image src={hobby.image_url as string} alt={hobby.name} fill className="object-cover opacity-50 group-hover:opacity-80 transition-all duration-700" />
                    )}
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 md:p-12 flex flex-col justify-end">
                        <div className="p-3 bg-sky-500 w-fit rounded-xl mb-4 text-black"><Globe size={24} /></div>
                        <h3 className="text-3xl md:text-5xl font-black uppercase italic">{hobby.name}</h3>
                        <p className="text-white/60 text-sm md:text-lg italic mt-2 line-clamp-2">{hobby.description}</p>
                     </div>
                  </div>
               ))}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
               {hobbies.slice(2).map((hobby) => (
                  <div key={hobby.id} className="relative h-32 md:h-48 group rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/5">
                     {hobby.image_url && ( <Image src={hobby.image_url as string} alt={hobby.name} fill className="object-cover opacity-20" /> )}
                     <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                        <span className="font-black uppercase italic text-[10px] md:text-sm tracking-widest">{hobby.name}</span>
                     </div>
                  </div>
               ))}
            </div>
         </section>

         <section>
            <div className="p-5 sm:p-10 md:p-20 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[5rem] border border-white/10 w-full relative overflow-hidden">
                <div className="absolute -top-24 -right-24 w-64 h-64 md:w-96 md:h-96 bg-sky-500/10 blur-[100px] rounded-full" />
                
                <div className="flex items-center gap-4 md:gap-6 mb-12 md:mb-24">
                <div className="p-3 md:p-4 bg-sky-500/20 rounded-2xl border border-sky-500/50 shrink-0">
                    <GraduationCap className="text-sky-400 w-8 h-8 md:w-12 md:h-12" />
                </div>
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                    Academic Journey.
                </h2>
                </div>

                <div className="space-y-16 md:space-y-32 relative">
                <div className="absolute left-0 md:left-12 top-0 bottom-0 w-[1px] md:w-[2px] bg-gradient-to-b from-sky-500/50 via-sky-500/20 to-transparent" />
                
                {educations.map((edu) => (
                    <div key={edu.id} className="relative pl-7 md:pl-32 group">
                        <div className="absolute left-[-4.5px] md:left-[43px] top-2 w-2.5 h-2.5 md:w-4 md:h-4 rounded-full bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,1)] z-10" />
                        
                        <div className="flex flex-col gap-6 md:gap-10">
                            
                            <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10">
                            
                            
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 shrink-0 bg-white/10 rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-white/10">
                                {edu.logo_url ? (
                                    <Image src={edu.logo_url as string} alt={edu.name} fill className="object-contain p-2 md:p-4" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center opacity-20"><GraduationCap size={32}/></div>
                                )}
                            </div>

                            
                            <div className="flex-1 min-w-0 space-y-3 md:space-y-5">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="inline-block text-sky-400 font-black tracking-[0.2em] text-[10px] md:text-sm uppercase bg-sky-500/5 px-3 py-1 rounded-full border border-sky-500/10">
                                    {new Date(edu.starttime).getFullYear()} — {edu.endtime ? new Date(edu.endtime).getFullYear() : 'PRESENT'}
                                    </span>
                                </div>
                                
                                <div className="flex-1 min-w-0 space-y-3 md:space-y-5">
                                    <h4 className="text-2xl sm:text-[2.5rem] md:text-6xl font-black uppercase italic leading-[1.1] md:leading-[0.9] text-white tracking-tighter break-normal overflow-wrap-normal">
                                    {edu.name}
                                    </h4>
                                    
                                    <p className="text-white/40 text-sm sm:text-xl md:text-2xl font-medium italic leading-relaxed max-w-2xl">
                                    {edu.faculty}
                                    </p>
                                </div>
                            </div>
                            </div>

                            {/* GPAX Section - ปรับเยื้องสำหรับ Tablet */}
                            {edu.GPAX && (
                            <div className="relative self-start mt-2 sm:mt-4">
                                <div className="absolute inset-0 bg-sky-500 blur-[30px] opacity-10" />
                                <div className="relative flex items-baseline gap-2 md:gap-5">
                                <span className="text-5xl sm:text-6xl md:text-[8rem] lg:text-[9rem] font-black text-white italic tracking-tighter leading-none drop-shadow-2xl">
                                    {edu.GPAX}
                                </span>
                                <div className="flex flex-col">
                                    <span className="text-sky-400 font-black text-xs sm:text-sm md:text-2xl italic leading-none">GPAX</span>
                                    <span className="text-white/10 text-[6px] md:text-xs font-bold uppercase tracking-widest">Cumulative</span>
                                </div>
                                </div>
                            </div>
                            )}
                        </div>
                    </div>
                ))}
                </div>
            </div>
            </section>

         {/* 5. SKILLS - Responsive Grid */}
         <section>
            <div className="p-8 md:p-20 bg-emerald-500/5 rounded-[3rem] md:rounded-[5rem] border border-emerald-500/10">
               <div className="flex items-center gap-4 md:gap-6 mb-12 md:mb-24">
                  <Zap className="text-emerald-400 w-8 h-8 md:w-16 md:h-16"/>
                  <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Personal Skill.</h2>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                  {softSkills.map((skill) => (
                    <div key={skill.id} className="group relative p-8 md:p-10 bg-black/40 rounded-3xl md:rounded-[3rem] border border-white/5 transition-all hover:bg-emerald-500">
                      <div className="relative z-10 flex flex-col gap-4 md:gap-6 group-hover:text-black transition-colors">
                         <CheckCircle2 size={32} className="text-emerald-400 group-hover:text-black" />
                         <span className="text-lg md:text-xl font-black uppercase tracking-widest">{skill.name}</span>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
         </section>

         {/* 6. TECH - Responsive Layout */}
         <section className="py-12 relative overflow-hidden">
            <div className="relative mb-16 md:mb-32 px-4 overflow-hidden">
                <div className="relative flex justify-center items-center">
                    
                    {/* - text-5xl: สำหรับมือถือ
                    - sm:text-[8vw]: สำหรับ iPad (จะค่อยๆ ขยายตามหน้าจอ ไม่ชนขอบ)
                    - lg:text-[10rem]: สำหรับ PC หน้าจอใหญ่
                    */}
                    <h2 className="text-5xl sm:text-[8vw] lg:text-[10rem] font-black tracking-tighter text-center italic uppercase leading-none text-transparent select-none opacity-20"
                        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.1)' }}>
                        Tech Universe.
                    </h2>

                    <motion.h2 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-5xl sm:text-[8vw] lg:text-[10rem] font-black tracking-tighter text-center italic uppercase leading-none absolute inset-0 bg-gradient-to-t from-sky-500 to-white bg-clip-text text-transparent"
                    >
                        Tech Universe.
                    </motion.h2>

                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {Object.entries(techByGroup).map(([group, items]) => (
                <div key={group} className="p-8 md:p-12 bg-white/5 rounded-[2.5rem] md:rounded-[4rem] border border-white/10 h-full">
                    <h4 className="text-xl md:text-2xl font-black italic uppercase mb-8 md:mb-12 flex items-center gap-3">
                    <span className="w-1 h-6 bg-sky-500 rounded-full" /> {group}
                    </h4>
                    <div className="grid grid-cols-3 gap-6 md:gap-8">
                    {items.map((tech) => (
                        <div key={tech.id} className="flex flex-col items-center gap-3">
                        <div className="w-14 h-14 md:w-20 md:h-20 bg-black/40 rounded-2xl flex items-center justify-center border border-white/5">
                            <TechIcon name={tech.name} />
                        </div>
                        <span className="text-[8px] md:text-[10px] font-black uppercase opacity-40 text-center tracking-widest leading-tight">
                            {tech.name}
                        </span>
                        </div>
                    ))}
                    </div>
                </div>
                ))}
            </div>
         </section>

         {/* 7. PROJECTS - 50/50 Responsive */}
         <section>
            <div className="mb-20 md:mb-40 text-center px-4 relative">
                {/* เพิ่ม Background Text จางๆ ให้ดูอลังการแบบพระเอก */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black italic uppercase opacity-[0.02] whitespace-nowrap select-none -z-10">
                    THE PROJECTS
                </div>

                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-6xl sm:text-[10vw] lg:text-[12rem] font-black italic uppercase leading-[0.85] tracking-tighter"
                >
                    Selected <br /> 
                    <span className="text-slate-800 inline-block">Portfolio</span>
                </motion.h2>
                
                {/* เส้นขีดตกแต่งให้ดูเป็นงานดีไซน์มากขึ้น */}
                <div className="flex justify-center mt-8">
                    <div className="w-20 h-1 bg-sky-500 rounded-full" />
                </div>
            </div>

            <div className="space-y-24 md:space-y-60">
                {projects.map((project, idx) => (
                <div key={project.id} onClick={() => setSelectedProject(project)} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-0 items-center cursor-pointer group`}>
                    <div className="w-full lg:w-1/2 aspect-video md:aspect-[16/10] overflow-hidden relative rounded-3xl lg:rounded-none">
                      {project.image_url && <Image src={project.image_url as string} alt={project.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />}
                      <div className="absolute inset-0 bg-sky-500/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <div className="bg-white text-black px-6 py-3 rounded-full font-black text-xs uppercase italic tracking-widest">View Project</div>
                      </div>
                    </div>
                    <div className={`w-full lg:w-1/2 p-6 lg:p-20 space-y-4 md:space-y-6 ${idx % 2 === 0 ? 'text-left' : 'lg:text-right lg:items-end flex flex-col'}`}>
                      <div className="text-sky-500 font-black italic text-xs md:text-sm tracking-widest">0{idx + 1} / {projects.length}</div>
                      <h3 className="text-4xl md:text-6xl font-black italic uppercase leading-none">{project.title}</h3>
                      <p className="text-white/30 italic text-base md:text-xl line-clamp-3 md:line-clamp-none">&quot;{project.content}&quot;</p>
                    </div>
                </div>
                ))}
            </div>
         </section>

      </div>

      {/* 8. FOOTER - Responsive Grid */}
      <footer className="py-20 md:py-40 px-6 border-t border-white/5 bg-black/60 text-center">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 md:mb-24">
             <a href={contracts?.github ?? "#"} target="_blank" className="w-full sm:w-auto px-10 md:px-16 py-6 md:py-8 bg-white/5 rounded-full border border-white/10 font-black uppercase italic text-xs md:text-sm tracking-widest transition-all hover:bg-white hover:text-black">
                GitHub
             </a>
             <a href={`mailto:${contracts?.gmail ?? ""}`} className="w-full sm:w-auto px-10 md:px-16 py-6 md:py-8 bg-white text-black rounded-full font-black uppercase italic text-xs md:text-sm tracking-widest transition-all hover:bg-transparent hover:text-white border border-white">
                Send Email
             </a>
          </div>
          <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[1em] md:tracking-[2em] opacity-10">
             © 2026 {profile?.firstname} {profile?.lastname}
          </p>
      </footer>

      {/* MODAL - Full Responsive */}
<AnimatePresence>
  {selectedProject && (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      className="fixed inset-0 z-[300] bg-[#020617]/98 backdrop-blur-3xl overflow-y-auto"
    >
      {/*ปุ่มปิด */}
      <button 
        onClick={() => setSelectedProject(null)} 
        className="fixed top-6 right-6 md:top-10 md:right-10 p-4 bg-white/10 text-white rounded-full z-[400] hover:bg-sky-500 hover:text-black transition-all border border-white/10 shadow-2xl"
      >
        <X size={24} className="md:w-10 md:h-10" />
      </button>

      <div className="max-w-6xl mx-auto p-6 md:p-20 pt-24 md:pt-32">
  
  {/* 1. Project Image - เหมือนเดิม */}
  <motion.div className="relative w-full aspect-video rounded-[2rem] md:rounded-[4rem] overflow-hidden mb-12 md:mb-20 border border-white/5">
    {selectedProject.image_url && <Image src={selectedProject.image_url} alt={selectedProject.title} fill className="object-cover" />}
  </motion.div>

  {/* 2. Project Title - ย้ายออกมาไว้นอก Grid เพื่อให้กางได้เต็มที่ ไม่ทับกับ Tech Stack */}
  <div className="mb-12 md:mb-20">
    <h2 className="text-4xl sm:text-6xl md:text-[8rem] font-black italic uppercase leading-[0.85] tracking-tighter text-white mb-6 break-words">
      {selectedProject.title}
    </h2>
    <div className="flex flex-wrap gap-4 text-sky-400 font-black italic uppercase tracking-widest text-xs md:text-sm">
      <span>{selectedProject.company}</span>
      <span className="text-white/20">/</span>
      <span>{selectedProject.position}</span>
    </div>
    <div className="w-24 h-1 bg-sky-500 mt-8" />
  </div>

{/* 3. Grid Content */}
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-20">
    
    {/* ฝั่งซ้าย: Overview, Tasks, Problems & Solutions (2/3) */}
    <div className="lg:col-span-2 space-y-16">
       
       {/* Section: Overview */}
       <div className="space-y-4">
          <h4 className="text-white/30 font-black uppercase tracking-widest text-[10px]">Overview</h4>
          <p className="text-xl md:text-2xl font-light italic text-white/70 leading-relaxed">
            {selectedProject.content}
          </p>
       </div>

       {/* Section: Key Tasks */}
       <div className="space-y-4">
          <h4 className="text-sky-500 font-black uppercase tracking-widest text-[10px]">Key Tasks</h4>
          <p className="text-lg md:text-xl font-light text-white/60 leading-relaxed whitespace-pre-line border-l border-white/10 pl-6">
            {selectedProject.tasks}
          </p>
       </div>

       {/* Section: Problems & Solutions - กลับมาแล้วครับ! */}
       {(selectedProject.problems || selectedProject.solutions) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 p-8 md:p-12 bg-white/5 rounded-[2.5rem] md:rounded-[3.5rem] border border-white/10 relative overflow-hidden group">
            {/* ตกแต่งพื้นหลังนิดหน่อยให้ดูเด่น */}
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Zap size={40} className="text-sky-500" />
            </div>

            <div className="space-y-4 relative">
              <h4 className="text-red-400 font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" /> The Problem
              </h4>
              <p className="text-white/60 italic text-base md:text-lg leading-relaxed">
                {selectedProject.problems || "No problems specified."}
              </p>
            </div>

            <div className="space-y-4 relative">
              <h4 className="text-emerald-400 font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> The Solution
              </h4>
              <p className="text-white/60 italic text-base md:text-lg leading-relaxed">
                {selectedProject.solutions || "No solutions specified."}
              </p>
            </div>
          </div>
       )}
    </div>

    {/* ฝั่งขวา: Tech & Links (1/3) - เหมือนเดิม */}
    <div className="space-y-10">
      <div className="space-y-6">
        <h4 className="text-white/30 font-black uppercase tracking-widest text-[10px]">Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {["React", "Next.js", "Tailwind"].map((t) => (
            <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-sky-400">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-white/30 font-black uppercase tracking-widest text-[10px]">Project Assets</h4>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase opacity-40">
            GitHub Repository <Github size={16} />
          </div>
          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase opacity-40">
            Live Preview <ArrowUpRight size={16} />
          </div>
        </div>
      </div>
      
      <div className="pt-8 border-t border-white/5 grid grid-cols-2 gap-4 text-[10px] font-black uppercase tracking-widest italic">
        <div className="text-white/20 uppercase">Type</div>
        <div className="text-white/80 text-right">{selectedProject.employmentType}</div>
        <div className="text-white/20 uppercase">Status</div>
        <div className="text-sky-500 text-right">{selectedProject.status}</div>
      </div>
    </div>
  </div>

  <div className="h-40" />
</div>
    </motion.div>
  )}
</AnimatePresence>

    </div>
  );
}

function ContactBox({ icon: Icon, label, val, href }: { icon: React.ElementType, label: string, val: string, href?: string }) {
  const content = (
    <div className="flex flex-col items-center text-center group cursor-pointer">
      <div className="w-14 h-14 md:w-20 md:h-20 bg-white/5 rounded-2xl md:rounded-[2rem] flex items-center justify-center mb-4 border border-white/5 group-hover:bg-sky-500 transition-all">
        <Icon size={24} className="md:w-8 md:h-8" />
      </div>
      <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/20 mb-1">{label}</span>
      <span className="text-[10px] md:text-sm font-bold text-white/60 italic truncate w-full px-2">{val}</span>
    </div>
  );
  return href ? <a href={href} target="_blank" className="w-full">{content}</a> : <div className="w-full">{content}</div>;
}