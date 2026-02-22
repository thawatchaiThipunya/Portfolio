"use client";
import React, { use } from 'react';
import ProjectForm from "@/app/cms/components/ProjectForm";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default function EditEducationPage({ params }: EditPageProps) {
  
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  return (
    <div className="container mx-auto py-6">
      
      <ProjectForm id={id} />
    </div>
  );
}