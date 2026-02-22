"use client";
import React, { use } from 'react';
import ContractForm from "../../components/ContractForm";

interface EditPageProps {
  params: Promise<{ id: string }>;
}

export default function EditContractPage({ params }: EditPageProps) {
  
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  return (
    <div className="container mx-auto py-6">
      
      <ContractForm id={id} />
    </div>
  );
}
