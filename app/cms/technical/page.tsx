"use client";
import { useEffect, useState, useMemo, useCallback } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  rectSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { technicalService } from '@/app/APIcont/services/technicalService';
import { Button } from '@/app/components/ui/button';
import { Technical } from '@/app/cms/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, Trash2, Code2, Layers, Search, GripVertical } from 'lucide-react';

function TechSkeleton() {
  return (
    <div className="bg-white border border-slate-100 rounded-[2.5rem] p-4 animate-pulse">
      <div className="h-48 w-full rounded-[2rem] bg-slate-100 mb-4" />
      <div className="px-4 space-y-4">
        <div className="h-5 w-2/3 mx-auto bg-slate-100 rounded-full" />
        <div className="h-11 w-full bg-slate-100 rounded-xl" />
      </div>
    </div>
  );
}

function TechCard({
  tech,
  onDelete,
  isDragging = false,
}: {
  tech: Technical;
  onDelete: (id: number) => void;
  isDragging?: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging: isSortableDragging } =
    useSortable({ id: tech.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm flex flex-col h-full p-4 transition-all duration-300 ${
        isDragging
          ? 'shadow-2xl shadow-blue-500/20 rotate-2 scale-105'
          : 'hover:shadow-2xl hover:shadow-blue-500/10'
      }`}
    >
      <div className="relative h-48 w-full rounded-[2rem] bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-50">
        {tech.logo ? (
          <div className="relative w-24 h-24 transition-transform duration-500 group-hover:scale-110">
            <Image src={tech.logo} alt={tech.name} fill unoptimized className="object-contain" />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-slate-300 gap-2">
            <Code2 size={48} className="opacity-20" />
            <span className="text-[10px] font-black uppercase tracking-widest">No Logo</span>
          </div>
        )}
        <button
          {...listeners}
          {...attributes}
          className="absolute top-3 left-3 w-8 h-8 flex items-center justify-center bg-black/50 backdrop-blur-md rounded-xl text-white/80 hover:bg-black/70 hover:text-white transition-all cursor-grab active:cursor-grabbing touch-none"
          title="ลากเพื่อจัดเรียง"
        >
          <GripVertical size={15} />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1 text-center">
        <h3 className="font-black text-slate-900 text-xl mb-6 group-hover:text-blue-600 transition-colors">
          {tech.name}
        </h3>
        <div className="mt-auto flex items-center gap-2">
          <Link href={`/cms/technical/${tech.id}`} className="flex-grow">
            <button className="w-full h-11 flex items-center justify-center gap-2 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-blue-600 transition-all duration-300 shadow-sm active:scale-95">
              <Edit size={14} /><span>Edit Skill</span>
            </button>
          </Link>
          <button
            onClick={() => onDelete(tech.id)}
            className="w-11 h-11 flex items-center justify-center bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all duration-300 active:scale-95 group/del"
            title="Delete Skill"
          >
            <Trash2 size={18} className="group-hover/del:rotate-12 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function TechnicalListPage() {
  const [technicals, setTechnicals] = useState<Technical[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [activeId, setActiveId] = useState<number | null>(null);

  const load = useCallback(async () => {
    try {
      const data = await technicalService.getAll();
      setTechnicals(data);
    } catch {
      console.error("Failed to load technicals");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const categories = useMemo(() =>
    [...new Set(technicals.map(t => t.category?.name).filter(Boolean))],
    [technicals]);

  const isSearching = search !== '' || filterCategory !== '';

  const filtered = useMemo(() =>
    technicals.filter(t => {
      const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
      const matchCat = filterCategory ? t.category?.name === filterCategory : true;
      return matchSearch && matchCat;
    }), [technicals, search, filterCategory]);

  const grouped = useMemo(() => {
    const map = new Map<string, Technical[]>();
    for (const t of filtered) {
      const cat = t.category?.name ?? 'Uncategorized';
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(t);
    }
    return map;
  }, [filtered]);

  const handleDelete = async (id: number) => {
    if (confirm("คุณแน่ใจหรือไม่ที่จะลบรายการนี้?")) {
      try {
        await technicalService.delete(id);
        setTechnicals(prev => prev.filter(item => item.id !== id));
      } catch {
        alert("เกิดข้อผิดพลาดในการลบข้อมูล");
      }
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as number);
  };

  const handleDragEnd = async (categoryName: string, event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const list = grouped.get(categoryName) ?? [];
    const oldIndex = list.findIndex(t => t.id === active.id);
    const newIndex = list.findIndex(t => t.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;

    // Reorder within this category and assign sequential sortOrder
    const reordered = arrayMove(list, oldIndex, newIndex).map((t, i) => ({
      ...t,
      sortOrder: i,
    }));
    const reorderedMap = new Map(reordered.map(t => [t.id, t]));

    // Update the technicals array: patch sortOrder values AND re-sort the array
    // so the display order matches the new sortOrder without needing a page refresh
    setTechnicals(prev =>
      prev
        .map(t => reorderedMap.get(t.id) ?? t)
        .sort((a, b) => {
          if (a.categoryId !== b.categoryId) return a.categoryId - b.categoryId;
          return a.sortOrder - b.sortOrder;
        })
    );

    setSaving(true);
    try {
      await technicalService.reorder(reordered.map(t => ({ id: t.id, sortOrder: t.sortOrder })));
    } catch {
      alert("บันทึกลำดับไม่สำเร็จ");
      load();
    } finally {
      setSaving(false);
    }
  };

  const activeTech = activeId ? technicals.find(t => t.id === activeId) : null;

  return (
    <div className="p-8 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Technical Skills</h1>
          <p className="text-slate-500 mt-1">จัดการคลังทักษะและเทคโนโลยีที่คุณเชี่ยวชาญ</p>
        </div>
        <div className="flex items-center gap-3">
          {saving && (
            <span className="text-xs font-bold text-blue-500 animate-pulse">กำลังบันทึก...</span>
          )}
          <Link href="/cms/technical/new">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-6 rounded-2xl shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 font-bold">
              <Plus size={20} />
              Add New Skill
            </Button>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาชื่อทักษะ..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white"
          />
        </div>
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="px-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-400 bg-white text-slate-600"
        >
          <option value="">ทุกหมวดหมู่</option>
          {categories.map(cat => (
            <option key={cat} value={cat!}>{cat}</option>
          ))}
        </select>
      </div>

      {!isSearching && !loading && technicals.length > 1 && (
        <div className="max-w-7xl mx-auto flex items-center gap-2 mb-6 text-xs text-slate-400 font-medium">
          <GripVertical size={14} />
          <span>ลากที่ไอคอน ⠿ เพื่อจัดลำดับภายในแต่ละหมวดหมู่</span>
        </div>
      )}

      {loading && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => <TechSkeleton key={i} />)}
        </div>
      )}

      {!loading && (
        <div className="max-w-7xl mx-auto space-y-10">
          {grouped.size === 0 && (
            <div className="flex flex-col items-center justify-center py-32 text-slate-400">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <Layers size={40} className="opacity-20" />
              </div>
              <p className="text-xl font-black text-slate-900">ไม่พบข้อมูล Skill</p>
              <p className="text-sm font-medium">ลองเปลี่ยนคำค้นหาหรือตัวกรอง</p>
            </div>
          )}

          {Array.from(grouped.entries()).map(([categoryName, items]) => (
            <div key={categoryName}>
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-lg font-black text-slate-800">{categoryName}</h2>
                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
                  {items.length} ทักษะ
                </span>
              </div>

              {isSearching ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {items.map(tech => (
                    <div key={tech.id} className="group bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col h-full p-4">
                      <div className="relative h-48 w-full rounded-[2rem] bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-50">
                        {tech.logo ? (
                          <div className="relative w-24 h-24 transition-transform duration-500 group-hover:scale-110">
                            <Image src={tech.logo} alt={tech.name} fill unoptimized className="object-contain" />
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center text-slate-300 gap-2">
                            <Code2 size={48} className="opacity-20" />
                          </div>
                        )}
                      </div>
                      <div className="p-4 flex flex-col flex-1 text-center">
                        <h3 className="font-black text-slate-900 text-xl mb-6 group-hover:text-blue-600 transition-colors">{tech.name}</h3>
                        <div className="mt-auto flex items-center gap-2">
                          <Link href={`/cms/technical/${tech.id}`} className="flex-grow">
                            <button className="w-full h-11 flex items-center justify-center gap-2 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-blue-600 transition-all duration-300 shadow-sm active:scale-95">
                              <Edit size={14} /><span>Edit Skill</span>
                            </button>
                          </Link>
                          <button onClick={() => handleDelete(tech.id)} className="w-11 h-11 flex items-center justify-center bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all duration-300 active:scale-95">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={handleDragStart}
                  onDragEnd={e => handleDragEnd(categoryName, e)}
                >
                  <SortableContext items={items.map(t => t.id)} strategy={rectSortingStrategy}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {items.map(tech => (
                        <TechCard key={tech.id} tech={tech} onDelete={handleDelete} />
                      ))}
                    </div>
                  </SortableContext>
                  <DragOverlay>
                    {activeTech && activeTech.category?.name === categoryName && (
                      <TechCard tech={activeTech} onDelete={handleDelete} isDragging />
                    )}
                  </DragOverlay>
                </DndContext>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
