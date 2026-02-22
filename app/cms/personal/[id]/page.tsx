"use client";
import { use } from 'react';
import SoftSkillForm from '../../components/SoftSkillForm';

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default function EditCategoryPage({ params }: EditPageProps) {
  
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  return (
    <div className="container mx-auto py-6">
      
      < SoftSkillForm id={id} />
    </div>
  );
}