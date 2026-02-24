// "use client";

// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   Github, Mail, Phone, Facebook, Instagram, MapPin,
//    GraduationCap,  CheckCircle2, X, User,
//   MessageCircle, Linkedin, Zap,  Globe, ArrowUpRight
// } from 'lucide-react';
// import { 
//   MainProfile, Contract, Hobby, Education, 
//   SoftSkill, Technical, Project 
// } from '@/app/cms/lib/types';
// import Image from 'next/image';
// import Link from 'next/link';

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
//   return <i className={`${iconClass} text-2xl md:text-5xl`}></i>;
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
//         <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-7xl">
//             <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-6 md:px-10 py-4 rounded-[2rem] flex items-center justify-between shadow-2xl">
                
//                 <div className="flex items-center gap-2">
//                     <div className="w-3 h-3 bg-sky-500 rounded-full animate-pulse" />
//                     <span className="font-black italic uppercase tracking-tighter text-lg md:text-xl">
//                         My <span className="text-sky-500">Portfolio.</span>
//                     </span>
//                 </div>

                
//                 <Link href="/login"> 
//                     <motion.div 
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-full font-black text-[10px] md:text-xs uppercase italic tracking-widest hover:bg-sky-500 transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer"
//                     >
//                         <User size={14} strokeWidth={3} />
//                         <span>Login</span>
//                     </motion.div>
//                 </Link>
//             </div>
//         </nav>
      
      
      
//         <section className="min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center p-4 md:p-6 text-center relative pt-28 sm:pt-36 md:pt-40">
//             <motion.div 
//                 initial={{ opacity: 0, y: 30 }} 
//                 animate={{ opacity: 1, y: 0 }} 
//                 transition={{ duration: 1 }} 
//                 className="relative mb-6 md:mb-12"
//             >
                
//                 <div className="w-40 h-40 sm:w-64 sm:h-64 md:w-[22rem] md:h-[22rem] rounded-[2.5rem] md:rounded-[5rem] border-[8px] md:border-[15px] border-white/5 overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
//                     {profile?.image_url && (
//                         <Image 
//                             src={profile.image_url as string} 
//                             alt="Profile" 
//                             fill 
//                             priority
//                             className="object-cover scale-110" 
//                         />
//                     )}
//                 </div>
//                 <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-sky-500 text-black px-4 md:px-10 py-1.5 md:py-3 rounded-xl md:rounded-3xl font-black text-[9px] md:text-xs tracking-[0.2em] md:tracking-[0.4em] uppercase shadow-[0_0_30px_rgba(14,165,233,0.4)] whitespace-nowrap">
//                     {profile?.role}
//                 </div>
//             </motion.div>

//             <motion.h1 
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ delay: 0.5, duration: 0.8 }}
//                 className="text-4xl sm:text-6xl md:text-[7.5rem] lg:text-[11rem] font-black tracking-tighter italic uppercase leading-[0.8] mb-4"
//             >
//                 {profile?.firstname} <br/>
//                 <span className="text-slate-600 transition-colors duration-500 hover:text-slate-400">
//                     {profile?.lastname}
//                 </span>
//             </motion.h1>
//         </section>
      
//       <section className="py-ุ md:py-20 text-center max-w-4xl mx-auto px-6">
//           <p className="text-white/40 text-lg md:text-3xl italic leading-relaxed">&quot;{profile?.description}&quot;</p>
//       </section>

      
//       <section className="py-12 md:py-20 px-4 md:px-6">
//         <div className="max-w-7xl mx-auto bg-white/5 backdrop-blur-3xl rounded-[3rem] md:rounded-[5rem] border border-white/10 p-8 md:p-16 relative overflow-hidden">
//           <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-400 mb-10 md:mb-20 text-center italic">Contact Headquarters</h2>
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-20">
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

//       <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-24 md:space-y-40 lg:space-y-60 pb-20 md:pb-40">
         
//          <section>
//             <h2 className="text-4xl md:text-6xl font-black mb-10 md:mb-20 italic uppercase tracking-tighter">Favorite Hobbies.</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-6 md:mb-10">
//                {hobbies.slice(0, 2).map((hobby) => (
//                   <div key={hobby.id} className="relative group aspect-video rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-white/10 bg-black shadow-2xl hover:shadow-sky-500/20 transition-all duration-700">
//                     {hobby.image_url && (
//                     <Image src={hobby.image_url as string} alt={hobby.name} fill className="object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />
//                     )}
//                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 md:p-12 flex flex-col justify-end">
//                         <div className="p-3 bg-sky-500 w-fit rounded-xl mb-4 text-black shadow-[0_0_20px_rgba(14,165,233,0.5)]"><Globe size={24} /></div>
//                         <h3 className="text-3xl md:text-5xl font-black uppercase italic">{hobby.name}</h3>
//                         <p className="text-white/60 text-sm md:text-lg italic mt-2 line-clamp-2">{hobby.description}</p>
//                      </div>
//                   </div>
//                ))}
//             </div>
//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
//                {hobbies.slice(2).map((hobby) => (
//                   <div key={hobby.id} className="relative h-32 md:h-48 group rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/5 transition-all duration-500 hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.2)]">
//                      {hobby.image_url && ( <Image src={hobby.image_url as string} alt={hobby.name} fill className="object-cover opacity-20 group-hover:opacity-40 transition-opacity" /> )}
//                      <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
//                         <span className="font-black uppercase italic text-[10px] md:text-sm tracking-widest group-hover:text-sky-400 transition-colors">{hobby.name}</span>
//                      </div>
//                   </div>
//                ))}
//             </div>
//          </section>

//         <section className="my-[120px] relative"> 
//             <div className="p-5 sm:p-8 md:p-12 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3rem] border border-white/10 w-full relative overflow-hidden group/box">
//                 <div className="absolute -top-24 -right-24 w-64 h-64 md:w-80 md:h-80 bg-sky-500/20 blur-[100px] rounded-full group-hover/box:bg-sky-500/30 transition-colors duration-1000" />
                
//                 <div className="flex items-center gap-4 md:gap-5 mb-8 md:mb-12 relative">
//                     <div className="p-2.5 md:p-3 bg-sky-500 rounded-xl border border-sky-400/50 shrink-0 shadow-[0_0_15px_rgba(14,165,233,0.4)]">
//                         <GraduationCap className="text-black w-6 h-6 md:w-10 md:h-10" />
//                     </div>
//                     <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none text-white">
//                         Academic Journey.
//                     </h2>
//                 </div>

//                 <div className="space-y-12 md:space-y-16 relative">
//                     <div className="absolute left-0 md:left-10 top-0 bottom-0 w-[1px] md:w-[2px] bg-gradient-to-b from-sky-500 via-sky-500/20 to-transparent" />
                    
//                     {educations.map((edu) => (
//                         <div key={edu.id} className="relative pl-8 md:pl-28 group">
//                             <div className="absolute left-[-4.5px] md:left-[35px] top-1.5 w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,1)] z-10 transition-transform group-hover:scale-150" />
                            
//                             <div className="flex flex-col gap-4 md:gap-6">
//                                 <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
//                                     <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 shrink-0 bg-white/10 rounded-xl md:rounded-[1.5rem] overflow-hidden border border-white/10 shadow-xl group-hover:border-sky-500/30 transition-all">
//                                         {edu.logo_url ? (
//                                             <Image src={edu.logo_url as string} alt={edu.name} fill className="object-contain p-2 md:p-3 transition-transform duration-700 group-hover:scale-110" />
//                                         ) : (
//                                             <div className="w-full h-full flex items-center justify-center opacity-20"><GraduationCap size={24} className="text-white"/></div>
//                                         )}
//                                     </div>

//                                     <div className="flex-1 min-w-0 space-y-2 md:space-y-3">
//                                         <div className="flex flex-wrap items-center gap-3">
//                                             <span className="inline-block text-sky-400 font-black tracking-[0.2em] text-[9px] md:text-xs uppercase bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
//                                             {new Date(edu.starttime).getFullYear()} — {edu.endtime ? new Date(edu.endtime).getFullYear() : 'PRESENT'}
//                                             </span>
//                                         </div>
//                                         <h4 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black uppercase italic leading-none text-white tracking-tighter group-hover:text-sky-400 transition-colors">
//                                             {edu.name}
//                                         </h4>
//                                         <p className="text-white/40 text-xs sm:text-base md:text-lg font-medium italic leading-tight max-w-xl">
//                                             {edu.faculty}
//                                         </p>
//                                     </div>
//                                 </div>

//                                 {edu.GPAX && (
//                                 <div className="relative self-start mt-1 sm:mt-2 group/gpax">
//                                     <div className="absolute inset-0 bg-sky-500 blur-[30px] opacity-0 group-hover/gpax:opacity-20 transition-opacity" />
//                                     <div className="relative flex items-baseline gap-2 md:gap-4">
//                                     <span className="text-5xl sm:text-6xl md:text-[6rem] lg:text-[7rem] font-black text-white italic tracking-tighter leading-none drop-shadow-[0_10px_20px_rgba(255,255,255,0.1)] group-hover/gpax:text-sky-500 transition-colors">
//                                         {edu.GPAX}
//                                     </span>
//                                     <div className="flex flex-col">
//                                         <span className="text-sky-400 font-black text-xs sm:text-sm md:text-xl italic leading-none">GPAX</span>
//                                         <span className="text-white/20 text-[7px] md:text-[10px] font-bold uppercase tracking-widest">Merit Limit</span>
//                                     </div>
//                                     </div>
//                                 </div>
//                                 )}
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </section>


        
//          <section className="relative my-[60px]"> 
            
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full -z-10" />

//             <div className="max-w-7xl mx-auto px-4">
               
//                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 relative">
//                   <div className="flex items-center gap-5">
//                      <div className="relative group">
//                         <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
//                         <div className="relative p-4 bg-emerald-500 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] transform -rotate-3 group-hover:rotate-0 transition-transform">
//                            <Zap className="text-black w-8 h-8 md:w-10 md:h-10" fill="currentColor"/>
//                         </div>
//                      </div>
//                      <div>
//                         <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tight text-white leading-none">
//                            Personal <span className="text-emerald-500">Skills.</span>
//                         </h2>
//                      </div>
//                   </div>
//                </div>

               
//                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
//                   {softSkills.map((skill) => (
//                     <div 
//                         key={skill.id} 
//                         className="group/item relative p-8 bg-white/[0.03] backdrop-blur-sm rounded-[2rem] border border-white/10 hover:border-emerald-500/50 transition-all duration-500 ease-out overflow-hidden"
//                     >
                        
//                         <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                        
//                         <div className="relative z-10 flex flex-col gap-8">
//                            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 group-hover/item:bg-emerald-500 group-hover/item:text-black transition-all duration-300 shadow-inner">
//                               <CheckCircle2 size={24} strokeWidth={3} />
//                            </div>
                           
//                            <div className="space-y-2">
//                               <span className="block text-xl font-black uppercase tracking-tighter text-white group-hover/item:translate-x-1 transition-transform">
//                                  {skill.name}
//                               </span>
//                               <div className="h-1 w-8 bg-emerald-500/30 group-hover/item:w-full transition-all duration-500" />
//                            </div>
//                         </div>
//                     </div>
//                   ))}
//                </div>
//             </div>
//          </section>

         
//          <section className="py-10 relative overflow-hidden">
//             <div className="relative mb-8 md:mb-32 px-4 py-0 md:py-0"> 
//                 <div className="relative flex justify-center items-center">
//                     {/* Background Stroke Text */}
//                     <h2 className="text-6xl sm:text-[10vw] lg:text-[11rem] font-black tracking-tighter text-center italic uppercase leading-none text-transparent select-none opacity-20 absolute"
//                         style={{ WebkitTextStroke: '2px rgba(14,165,233,0.2)' }}>
//                         Tech Universe.
//                     </h2>

                    
//                     <motion.h2 
//                         initial={{ opacity: 0, y: 20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true }}
                        
//                         className="text-6xl sm:text-[10vw] lg:text-[11rem] font-black tracking-tighter text-center italic uppercase leading-none bg-gradient-to-t from-sky-500 via-white to-white bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(14,165,233,0.5)] py-4"
//                     >
//                         Tech Universe.
//                     </motion.h2>
//                 </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
//                 {Object.entries(techByGroup).map(([group, items]) => (
//                 <div key={group} className="p-8 md:p-12 bg-white/5 backdrop-blur-sm rounded-[2.5rem] md:rounded-[4rem] border border-white/10 h-full hover:border-sky-500/30 transition-all duration-500">
//                     <h4 className="text-xl md:text-2xl font-black italic uppercase mb-8 md:mb-12 flex items-center gap-3">
//                       <span className="w-1.5 h-6 bg-sky-500 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.8)]" /> {group}
//                     </h4>
//                     <div className="grid grid-cols-3 gap-6 md:gap-8">
//                     {items.map((tech) => (
//                         <div key={tech.id} className="flex flex-col items-center gap-3 group/icon">
//                           <div className="w-16 h-16 md:w-24 md:h-24 bg-black/40 rounded-2xl md:rounded-3xl flex items-center justify-center border border-white/5 group-hover/icon:border-sky-500/50 group-hover/icon:bg-sky-500/5 transition-all duration-500">
//                               <TechIcon name={tech.name} />
//                           </div>
//                           <span className="text-[10px] font-black uppercase opacity-40 group-hover/icon:opacity-100 group-hover/icon:text-sky-400 text-center tracking-widest leading-tight transition-all">
//                               {tech.name}
//                           </span>
//                         </div>
//                     ))}
//                     </div>
//                 </div>
//                 ))}
//             </div>
//          </section>

//          <section className="py-20">
//             <div className="mb-20 md:mb-40 text-center px-4 relative">
//                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black italic uppercase opacity-[0.03] whitespace-nowrap select-none -z-10 tracking-tighter">
//                     THE PROJECTS
//                 </div>

//                 <motion.h2 
//                     initial={{ opacity: 0, y: 20 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     viewport={{ once: true }}
//                     className="text-5xl sm:text-[8vw] lg:text-[10rem] font-black italic uppercase leading-[0.85] tracking-tighter"
//                 >
//                     Project <br /> 
//                     <span className="text-slate-800 inline-block hover:text-sky-500 transition-colors duration-500 font-black">Portfolio</span>
//                 </motion.h2>
                
//                 <div className="flex justify-center mt-8">
//                     <div className="w-24 h-1.5 bg-sky-500 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.8)]" />
//                 </div>
//             </div>

//             <div className="space-y-32 md:space-y-48">
//                 {projects.map((project, idx) => (
//                 <div 
//                     key={project.id} 
//                     onClick={() => setSelectedProject(project)} 
//                     className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-20 items-center cursor-pointer group`}
//                 >
                    
//                     <div className="w-full lg:w-[60%] aspect-video overflow-hidden relative rounded-[2rem] md:rounded-[3rem] border border-white/5 shadow-2xl transition-all duration-700 group-hover:border-sky-500/30">
//                         {project.image_url && (
//                             <Image 
//                                 src={project.image_url as string} 
//                                 alt={project.title} 
//                                 fill 
//                                 className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" 
//                             />
//                         )}
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
//                             <div className="bg-white text-black px-6 py-3 rounded-full font-black text-xs uppercase italic tracking-[0.2em] transform translate-y-4 group-hover:translate-y-0 transition-transform">
//                                 View Project
//                             </div>
//                         </div>
//                     </div>

                    
//                     <div className={`w-full lg:w-[40%] p-2 space-y-4 md:space-y-6 ${idx % 2 === 0 ? 'text-left' : 'lg:text-right lg:items-end flex flex-col'}`}>
//                         <div className="text-sky-500 font-black italic text-xs md:text-sm tracking-[0.3em] flex items-center gap-3">
//                             <span className="w-6 h-[1px] bg-sky-500" /> 0{idx + 1} / {projects.length}
//                         </div>
                        
                        
//                         <h3 className="text-4xl md:text-5xl lg:text-5xl font-black italic uppercase leading-none tracking-tighter group-hover:text-sky-400 transition-colors duration-300">
//                             {project.title}
//                         </h3>
                        
                        
//                         <p className="text-white/40 italic text-base md:text-lg font-light leading-relaxed max-w-md line-clamp-3">
//                             &quot;{project.content}&quot;
//                         </p>

//                         <div className="pt-2 flex gap-4">
//                             <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-sky-500 group-hover:border-sky-500 group-hover:text-black transition-all duration-300">
//                                 <ArrowUpRight size={18} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 ))}
//             </div>
//         </section>
//       </div>

      
//       <footer className="py-20 md:py-40 px-6 border-t border-white/5 bg-black/60 text-center relative overflow-hidden">
//           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-30" />
//           <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 md:mb-24">
//              <a href={contracts?.github ?? "#"} target="_blank" className="w-full sm:w-auto px-12 md:px-16 py-6 md:py-8 bg-white/5 rounded-full border border-white/10 font-black uppercase italic text-xs md:text-sm tracking-widest transition-all hover:bg-white hover:text-black hover:scale-110">
//                 GitHub
//              </a>
//              <a href={`mailto:${contracts?.gmail ?? ""}`} className="w-full sm:w-auto px-12 md:px-16 py-6 md:py-8 bg-sky-500 text-black rounded-full font-black uppercase italic text-xs md:text-sm tracking-widest transition-all hover:bg-white hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:scale-110">
//                 Send Email
//              </a>
//           </div>
//       </footer>

      
//       <AnimatePresence>
//         {selectedProject && (
//           <motion.div 
//             initial={{ opacity: 0 }} 
//             animate={{ opacity: 1 }} 
//             exit={{ opacity: 0 }} 
//             className="fixed inset-0 z-[300] bg-[#020617]/98 backdrop-blur-3xl overflow-y-auto"
//           >
//             <button 
//               onClick={() => setSelectedProject(null)} 
//               className="fixed top-6 right-6 md:top-10 md:right-10 p-4 bg-white/10 text-white rounded-full z-[400] hover:bg-sky-500 hover:text-black transition-all border border-white/10 shadow-2xl"
//             >
//               <X size={24} className="md:w-10 md:h-10" />
//             </button>

//             <div className="max-w-6xl mx-auto p-6 md:p-20 pt-24 md:pt-32">
//               <motion.div className="relative w-full aspect-video rounded-[2.5rem] md:rounded-[4rem] overflow-hidden mb-12 md:mb-20 border border-white/10 shadow-2xl">
//                 {selectedProject.image_url && <Image src={selectedProject.image_url} alt={selectedProject.title} fill className="object-cover" />}
//               </motion.div>

//               <div className="mb-12 md:mb-20">
//                 <h2 className="text-5xl sm:text-7xl md:text-[8rem] font-black italic uppercase leading-[0.85] tracking-tighter text-white mb-6">
//                   {selectedProject.title}
//                 </h2>
//                 <div className="flex flex-wrap gap-4 text-sky-400 font-black italic uppercase tracking-widest text-xs md:text-sm">
//                   <span>{selectedProject.company}</span>
//                   <span className="text-white/20">/</span>
//                   <span>{selectedProject.position}</span>
//                 </div>
//                 <div className="w-24 h-1.5 bg-sky-500 mt-8 shadow-[0_0_15px_rgba(14,165,233,0.8)]" />
//               </div>

//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-20">
//                 <div className="lg:col-span-2 space-y-16">
//                   <div className="space-y-4">
//                       <h4 className="text-white/30 font-black uppercase tracking-widest text-[10px]">Overview</h4>
//                       <p className="text-xl md:text-3xl font-light italic text-white/70 leading-relaxed">
//                         {selectedProject.content}
//                       </p>
//                   </div>
//                   <div className="space-y-4">
//                       <h4 className="text-sky-500 font-black uppercase tracking-widest text-[10px]">Key Tasks</h4>
//                       <p className="text-lg md:text-xl font-light text-white/60 leading-relaxed whitespace-pre-line border-l-2 border-sky-500/30 pl-8">
//                         {selectedProject.tasks}
//                       </p>
//                   </div>
//                   {(selectedProject.problems || selectedProject.solutions) && (
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 p-8 md:p-12 bg-white/5 rounded-[3rem] border border-white/10 relative overflow-hidden group">
//                         <div className="space-y-4 relative">
//                           <h4 className="text-red-400 font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
//                             <span className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)]" /> The Problem
//                           </h4>
//                           <p className="text-white/60 italic text-base md:text-lg leading-relaxed">{selectedProject.problems}</p>
//                         </div>
//                         <div className="space-y-4 relative">
//                           <h4 className="text-emerald-400 font-black uppercase tracking-widest text-[10px] flex items-center gap-2">
//                             <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" /> The Solution
//                           </h4>
//                           <p className="text-white/60 italic text-base md:text-lg leading-relaxed">{selectedProject.solutions}</p>
//                         </div>
//                       </div>
//                   )}
//                 </div>

//                 <div className="space-y-10">
//                   <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 space-y-8">
//                     <div className="space-y-4">
//                       <h4 className="text-white/30 font-black uppercase tracking-widest text-[10px]">Tech Stack</h4>
//                       <div className="flex flex-wrap gap-2">
//                         {["React", "Next.js", "Tailwind"].map((t) => (
//                           <span key={t} className="px-4 py-2 bg-sky-500/10 border border-sky-500/20 rounded-xl text-[10px] font-bold text-sky-400 uppercase tracking-widest">
//                             {t}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="pt-8 border-t border-white/10 grid grid-cols-2 gap-4 text-[10px] font-black uppercase tracking-widest italic">
//                       <div className="text-white/20">Type</div>
//                       <div className="text-white/80 text-right">{selectedProject.employmentType}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="h-40" />
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// function ContactBox({ icon: Icon, label, val, href }: { icon: React.ElementType, label: string, val: string, href?: string }) {
//   const content = (
//     <div className="flex flex-col items-center text-center group cursor-pointer">
//       <div className="w-14 h-14 md:w-20 md:h-20 bg-white/5 rounded-2xl md:rounded-[2rem] flex items-center justify-center mb-4 border border-white/5 group-hover:bg-sky-500 group-hover:border-sky-400 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all duration-500">
//         <Icon size={24} className="md:w-8 md:h-8 group-hover:text-black transition-colors" />
//       </div>
//       <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/20 mb-1 group-hover:text-sky-500 transition-colors">{label}</span>
//       <span className="text-[10px] md:text-sm font-bold text-white/60 italic truncate w-full px-2 group-hover:text-white transition-colors">{val}</span>
//     </div>
//   );
//   return href ? <a href={href} target="_blank" className="w-full">{content}</a> : <div className="w-full">{content}</div>;
// }




"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, Mail, Phone, Facebook, Instagram, MapPin,
   GraduationCap,  CheckCircle2, X, User,
  MessageCircle, Linkedin, Zap,  Globe, ArrowUpRight
} from 'lucide-react';
import { 
  MainProfile, Contract, Hobby, Education, 
  SoftSkill, Technical, Project 
} from '@/app/cms/lib/types';
import Image from 'next/image';
import Link from 'next/link';

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
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // โหลด Devicon CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
    document.head.appendChild(link);

    // Setup Intersection Observer สำหรับเปลี่ยนสี Nav
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px', // ให้ทำงานเมื่อ section เข้ามากลางจอ
        threshold: 0
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
            }
        });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const sections = ['home', 'contact', 'experience', 'skills', 'projects'];
    
    sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        const offset = 100; // เผื่อระยะหัวของ nav
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
  };

  const techByGroup = (technicals || []).reduce((acc: Record<string, Technical[]>, tech) => {
    const groupName = tech.category?.name || "Tools";
    if (!acc[groupName]) acc[groupName] = [];
    acc[groupName].push(tech);
    return acc;
  }, {});

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'Contact', id: 'contact' },
    { name: 'Education', id: 'experience' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-sky-500/30 font-light overflow-x-hidden">
        {/* Navigation Bar */}
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-7xl">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-6 md:px-10 py-4 rounded-[2rem] flex items-center justify-between shadow-2xl">
                
                <div className="flex items-center gap-2 cursor-pointer group" onClick={() => scrollToSection('home')}>
                    <div className="w-3 h-3 bg-sky-500 rounded-full animate-pulse group-hover:scale-125 transition-transform" />
                    <span className="font-black italic uppercase tracking-tighter text-lg md:text-xl">
                        My <span className="text-sky-500">Portfolio.</span>
                    </span>
                </div>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-8">
                    {navItems.map((item) => (
                        <button 
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            className={`text-[10px] font-black uppercase tracking-widest italic transition-all duration-300 hover:text-sky-400 ${activeSection === item.id ? 'text-sky-500 scale-110' : 'text-slate-400'}`}
                        >
                            {item.name}
                        </button>
                    ))}
                </div>

                <Link href="/login"> 
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-6 py-2.5 bg-white text-black rounded-full font-black text-[10px] md:text-xs uppercase italic tracking-widest hover:bg-sky-500 transition-colors duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer"
                    >
                        <User size={14} strokeWidth={3} />
                        <span className="hidden sm:inline">Login</span>
                    </motion.div>
                </Link>
            </div>
        </nav>
      
        {/* Section: Home */}
        <section id="home" className="min-h-[90vh] md:min-h-screen flex flex-col items-center justify-center p-4 md:p-6 text-center relative pt-28 sm:pt-36 md:pt-40">
            <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 1 }} 
                className="relative mb-6 md:mb-12"
            >
                <div className="w-40 h-40 sm:w-64 sm:h-64 md:w-[22rem] md:h-[22rem] rounded-[2.5rem] md:rounded-[5rem] border-[8px] md:border-[15px] border-white/5 overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-700">
                    {profile?.image_url && (
                        <Image src={profile.image_url as string} alt="Profile" fill priority className="object-cover scale-110" />
                    )}
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-sky-500 text-black px-4 md:px-10 py-1.5 md:py-3 rounded-xl md:rounded-3xl font-black text-[9px] md:text-xs tracking-[0.2em] md:tracking-[0.4em] uppercase shadow-[0_0_30px_rgba(14,165,233,0.4)] whitespace-nowrap">
                    {profile?.role}
                </div>
            </motion.div>

            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-4xl sm:text-6xl md:text-[7.5rem] lg:text-[11rem] font-black tracking-tighter italic uppercase leading-[0.8] mb-4"
            >
                {profile?.firstname} <br/>
                <span className="text-slate-600 transition-colors duration-500 hover:text-slate-400">
                    {profile?.lastname}
                </span>
            </motion.h1>

            <section className="py-8 md:py-20 text-center max-w-4xl mx-auto px-6">
                <p className="text-white/40 text-lg md:text-3xl italic leading-relaxed">&quot;{profile?.description}&quot;</p>
            </section>
        </section>
      
        {/* Section: Contact */}
        <section id="contact" className="py-12 md:py-20 px-4 md:px-6">
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
            {/* Section: Hobbies */}
            <section>
                <h2 className="text-4xl md:text-6xl font-black mb-10 md:mb-20 italic uppercase tracking-tighter">Favorite Hobbies.</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-6 md:mb-10">
                    {hobbies.slice(0, 2).map((hobby) => (
                        <div key={hobby.id} className="relative group aspect-video rounded-[2rem] md:rounded-[4rem] overflow-hidden border border-white/10 bg-black shadow-2xl hover:shadow-sky-500/20 transition-all duration-700">
                            {hobby.image_url && <Image src={hobby.image_url as string} alt={hobby.name} fill className="object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700" />}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 md:p-12 flex flex-col justify-end">
                                <div className="p-3 bg-sky-500 w-fit rounded-xl mb-4 text-black shadow-[0_0_20px_rgba(14,165,233,0.5)]"><Globe size={24} /></div>
                                <h3 className="text-3xl md:text-5xl font-black uppercase italic">{hobby.name}</h3>
                                <p className="text-white/60 text-sm md:text-lg italic mt-2 line-clamp-2">{hobby.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
                    {hobbies.slice(2).map((hobby) => (
                        <div key={hobby.id} className="relative h-32 md:h-48 group rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/5 transition-all duration-500 hover:border-sky-500/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.2)]">
                            {hobby.image_url && <Image src={hobby.image_url as string} alt={hobby.name} fill className="object-cover opacity-20 group-hover:opacity-40 transition-opacity" />}
                            <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                                <span className="font-black uppercase italic text-[10px] md:text-sm tracking-widest group-hover:text-sky-400 transition-colors">{hobby.name}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section: Experience (Education) */}
            <section id="experience" className="relative pt-20"> 
                <div className="p-5 sm:p-8 md:p-12 bg-white/5 backdrop-blur-3xl rounded-[2.5rem] md:rounded-[3rem] border border-white/10 w-full relative overflow-hidden group/box">
                    <div className="absolute -top-24 -right-24 w-64 h-64 md:w-80 md:h-80 bg-sky-500/20 blur-[100px] rounded-full group-hover/box:bg-sky-500/30 transition-colors duration-1000" />
                    
                    <div className="flex items-center gap-4 md:gap-5 mb-8 md:mb-12 relative">
                        <div className="p-2.5 md:p-3 bg-sky-500 rounded-xl border border-sky-400/50 shrink-0 shadow-[0_0_15px_rgba(14,165,233,0.4)]">
                            <GraduationCap className="text-black w-6 h-6 md:w-10 md:h-10" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none text-white">
                            Academic Journey.
                        </h2>
                    </div>

                    <div className="space-y-12 md:space-y-16 relative">
                        <div className="absolute left-0 md:left-10 top-0 bottom-0 w-[1px] md:w-[2px] bg-gradient-to-b from-sky-500 via-sky-500/20 to-transparent" />
                        
                        {educations.map((edu) => (
                            <div key={edu.id} className="relative pl-8 md:pl-28 group">
                                <div className="absolute left-[-4.5px] md:left-[35px] top-1.5 w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-sky-500 shadow-[0_0_15px_rgba(14,165,233,1)] z-10 transition-transform group-hover:scale-150" />
                                <div className="flex flex-col gap-4 md:gap-6">
                                    <div className="flex flex-col lg:flex-row lg:items-start gap-4 lg:gap-8">
                                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-24 md:h-24 shrink-0 bg-white/10 rounded-xl md:rounded-[1.5rem] overflow-hidden border border-white/10 shadow-xl group-hover:border-sky-500/30 transition-all">
                                            {edu.logo_url ? <Image src={edu.logo_url as string} alt={edu.name} fill className="object-contain p-2 md:p-3 transition-transform duration-700 group-hover:scale-110" /> : <div className="w-full h-full flex items-center justify-center opacity-20"><GraduationCap size={24} className="text-white"/></div>}
                                        </div>
                                        <div className="flex-1 min-w-0 space-y-2 md:space-y-3">
                                            <span className="inline-block text-sky-400 font-black tracking-[0.2em] text-[9px] md:text-xs uppercase bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
                                                {new Date(edu.starttime).getFullYear()} — {edu.endtime ? new Date(edu.endtime).getFullYear() : 'PRESENT'}
                                            </span>
                                            <h4 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-black uppercase italic leading-none text-white tracking-tighter group-hover:text-sky-400 transition-colors">{edu.name}</h4>
                                            <p className="text-white/40 text-xs sm:text-base md:text-lg font-medium italic leading-tight max-w-xl">{edu.faculty}</p>
                                        </div>
                                    </div>
                                    {edu.GPAX && (
                                        <div className="relative self-start mt-1 sm:mt-2 group/gpax">
                                            <div className="relative flex items-baseline gap-2 md:gap-4">
                                                <span className="text-5xl sm:text-6xl md:text-[6rem] lg:text-[7rem] font-black text-white italic tracking-tighter leading-none group-hover/gpax:text-sky-500 transition-colors">{edu.GPAX}</span>
                                                <div className="flex flex-col">
                                                    <span className="text-sky-400 font-black text-xs sm:text-sm md:text-xl italic leading-none">GPAX</span>
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

            {/* Section: Skills */}
            <section id="skills" className="relative pt-20"> 
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full -z-10" />
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 relative">
                        <div className="flex items-center gap-5">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-emerald-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
                                <div className="relative p-4 bg-emerald-500 rounded-2xl shadow-[0_0_30px_rgba(16,185,129,0.3)] transform -rotate-3 group-hover:rotate-0 transition-transform">
                                    <Zap className="text-black w-8 h-8 md:w-10 md:h-10" fill="currentColor"/>
                                </div>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tight text-white leading-none">
                                Personal <span className="text-emerald-500">Skills.</span>
                            </h2>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
                        {softSkills.map((skill) => (
                            <div key={skill.id} className="group/item relative p-8 bg-white/[0.03] backdrop-blur-sm rounded-[2rem] border border-white/10 hover:border-emerald-500/50 transition-all duration-500 ease-out overflow-hidden">
                                <div className="relative z-10 flex flex-col gap-8">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 group-hover/item:bg-emerald-500 group-hover/item:text-black transition-all duration-300 shadow-inner">
                                        <CheckCircle2 size={24} strokeWidth={3} />
                                    </div>
                                    <div className="space-y-2">
                                        <span className="block text-xl font-black uppercase tracking-tighter text-white transition-transform">{skill.name}</span>
                                        <div className="h-1 w-8 bg-emerald-500/30 group-hover/item:w-full transition-all duration-500" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tech Stack Part */}
                <div className="mt-40 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    {Object.entries(techByGroup).map(([group, items]) => (
                        <div key={group} className="p-8 md:p-12 bg-white/5 backdrop-blur-sm rounded-[2.5rem] md:rounded-[4rem] border border-white/10 h-full hover:border-sky-500/30 transition-all duration-500">
                            <h4 className="text-xl md:text-2xl font-black italic uppercase mb-8 md:mb-12 flex items-center gap-3">
                                <span className="w-1.5 h-6 bg-sky-500 rounded-full shadow-[0_0_10px_rgba(14,165,233,0.8)]" /> {group}
                            </h4>
                            <div className="grid grid-cols-3 gap-6 md:gap-8">
                                {items.map((tech) => (
                                    <div key={tech.id} className="flex flex-col items-center gap-3 group/icon">
                                        <div className="w-16 h-16 md:w-24 md:h-24 bg-black/40 rounded-2xl md:rounded-3xl flex items-center justify-center border border-white/5 group-hover/icon:border-sky-500/50 group-hover/icon:bg-sky-500/5 transition-all duration-500">
                                            <TechIcon name={tech.name} />
                                        </div>
                                        <span className="text-[10px] font-black uppercase opacity-40 group-hover/icon:opacity-100 group-hover/icon:text-sky-400 text-center tracking-widest leading-tight transition-all">{tech.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section: Projects */}
            <section id="projects" className="py-20">
                <div className="mb-20 md:mb-40 text-center px-4 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-black italic uppercase opacity-[0.03] whitespace-nowrap select-none -z-10 tracking-tighter">THE PROJECTS</div>
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl sm:text-[8vw] lg:text-[10rem] font-black italic uppercase leading-[0.85] tracking-tighter">
                        Project <br /> <span className="text-slate-800 inline-block hover:text-sky-500 transition-colors duration-500 font-black">Portfolio</span>
                    </motion.h2>
                    <div className="flex justify-center mt-8"><div className="w-24 h-1.5 bg-sky-500 rounded-full shadow-[0_0_15px_rgba(14,165,233,0.8)]" /></div>
                </div>

                <div className="space-y-32 md:space-y-48">
                    {projects.map((project, idx) => (
                        <div key={project.id} onClick={() => setSelectedProject(project)} className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-20 items-center cursor-pointer group`}>
                            <div className="w-full lg:w-[60%] aspect-video overflow-hidden relative rounded-[2rem] md:rounded-[3rem] border border-white/5 shadow-2xl transition-all duration-700 group-hover:border-sky-500/30">
                                {project.image_url && <Image src={project.image_url as string} alt={project.title} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100" />}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                                    <div className="bg-white text-black px-6 py-3 rounded-full font-black text-xs uppercase italic tracking-[0.2em] transform translate-y-4 group-hover:translate-y-0 transition-transform">View Project</div>
                                </div>
                            </div>
                            <div className={`w-full lg:w-[40%] p-2 space-y-4 md:space-y-6 ${idx % 2 === 0 ? 'text-left' : 'lg:text-right lg:items-end flex flex-col'}`}>
                                <div className="text-sky-500 font-black italic text-xs md:text-sm tracking-[0.3em] flex items-center gap-3"><span className="w-6 h-[1px] bg-sky-500" /> 0{idx + 1} / {projects.length}</div>
                                <h3 className="text-4xl md:text-5xl lg:text-5xl font-black italic uppercase leading-none tracking-tighter group-hover:text-sky-400 transition-colors duration-300">{project.title}</h3>
                                <p className="text-white/40 italic text-base md:text-lg font-light leading-relaxed max-w-md line-clamp-3">&quot;{project.content}&quot;</p>
                                <div className="pt-2 flex gap-4"><div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-sky-500 group-hover:border-sky-500 group-hover:text-black transition-all duration-300"><ArrowUpRight size={18} /></div></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>

        {/* Footer */}
        <footer className="py-20 md:py-40 px-6 border-t border-white/5 bg-black/60 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-30" />
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 md:mb-24">
                <a href={contracts?.github ?? "#"} target="_blank" className="w-full sm:w-auto px-12 md:px-16 py-6 md:py-8 bg-white/5 rounded-full border border-white/10 font-black uppercase italic text-xs md:text-sm tracking-widest transition-all hover:bg-white hover:text-black hover:scale-110">GitHub</a>
                <a href={`mailto:${contracts?.gmail ?? ""}`} className="w-full sm:w-auto px-12 md:px-16 py-6 md:py-8 bg-sky-500 text-black rounded-full font-black uppercase italic text-xs md:text-sm tracking-widest transition-all hover:bg-white hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] hover:scale-110">Send Email</a>
            </div>
        </footer>

        {/* Modal: Project Details */}
        <AnimatePresence>
            {selectedProject && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[300] bg-[#020617]/98 backdrop-blur-3xl overflow-y-auto">
                    <button onClick={() => setSelectedProject(null)} className="fixed top-6 right-6 md:top-10 md:right-10 p-4 bg-white/10 text-white rounded-full z-[400] hover:bg-sky-500 hover:text-black transition-all border border-white/10 shadow-2xl">
                        <X size={24} className="md:w-10 md:h-10" />
                    </button>
                    <div className="max-w-6xl mx-auto p-6 md:p-20 pt-24 md:pt-32">
                        <motion.div className="relative w-full aspect-video rounded-[2.5rem] md:rounded-[4rem] overflow-hidden mb-12 md:mb-20 border border-white/10 shadow-2xl">
                            {selectedProject.image_url && <Image src={selectedProject.image_url} alt={selectedProject.title} fill className="object-cover" />}
                        </motion.div>
                        <div className="mb-12 md:mb-20">
                            <h2 className="text-5xl sm:text-7xl md:text-[8rem] font-black italic uppercase leading-[0.85] tracking-tighter text-white mb-6">{selectedProject.title}</h2>
                            <div className="flex flex-wrap gap-4 text-sky-400 font-black italic uppercase tracking-widest text-xs md:text-sm">
                                <span>{selectedProject.company}</span>
                                <span className="text-white/20">/</span>
                                <span>{selectedProject.position}</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-20 pb-20">
                            <div className="lg:col-span-2 space-y-16">
                                <div className="space-y-4">
                                    <h4 className="text-white/30 font-black uppercase tracking-widest text-[10px]">Overview</h4>
                                    <p className="text-xl md:text-3xl font-light italic text-white/70 leading-relaxed">{selectedProject.content}</p>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-sky-500 font-black uppercase tracking-widest text-[10px]">Key Tasks</h4>
                                    <p className="text-lg md:text-xl font-light text-white/60 leading-relaxed whitespace-pre-line border-l-2 border-sky-500/30 pl-8">{selectedProject.tasks}</p>
                                </div>
                            </div>
                            <div className="space-y-10">
                                <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10 space-y-8">
                                    <div className="space-y-4">
                                        <h4 className="text-white/30 font-black uppercase tracking-widest text-[10px]">Type</h4>
                                        <div className="text-white/80 font-bold uppercase">{selectedProject.employmentType}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
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
      <div className="w-14 h-14 md:w-20 md:h-20 bg-white/5 rounded-2xl md:rounded-[2rem] flex items-center justify-center mb-4 border border-white/5 group-hover:bg-sky-500 group-hover:border-sky-400 group-hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all duration-500">
        <Icon size={24} className="md:w-8 md:h-8 group-hover:text-black transition-colors" />
      </div>
      <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-white/20 mb-1 group-hover:text-sky-500 transition-colors">{label}</span>
      <span className="text-[10px] md:text-sm font-bold text-white/60 italic truncate w-full px-2 group-hover:text-white transition-colors">{val}</span>
    </div>
  );
  return href ? <a href={href} target="_blank" className="w-full">{content}</a> : <div className="w-full">{content}</div>;
}