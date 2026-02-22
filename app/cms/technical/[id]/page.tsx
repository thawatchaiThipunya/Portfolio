"use client";
import { use } from 'react';
import TechnicalForm from '../../components/TechnicalForm';

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default function EditCategoryPage({ params }: EditPageProps) {
  
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  return (
    <div className="container mx-auto py-6">
      
      < TechnicalForm id={id} />
    </div>
  );
}