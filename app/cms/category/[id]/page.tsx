"use client";
import React, { use } from 'react';
import CategoryForm from "../../components/CategoryForm";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default function EditCategoryPage({ params }: EditPageProps) {
  
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  return (
    <div className="container mx-auto py-6">
      
      <CategoryForm id={id} />
    </div>
  );
}