"use client"

import DoctorsColumn from '@/components/module/admin/doctors/DoctorsColumn';
import ManagementTable from '@/components/module/dashboard/ManagementTable';
import { IDoctor, } from '@/types/doctor.interface';
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface IDoctorTableProps {
  doctors: IDoctor[];
}


const DoctorsTable = ({ doctors }: IDoctorTableProps) => {
  const router = useRouter();
  const [_, startTransition] = useTransition();
  const [deletingDoctor, setDeletingDoctor] = useState<IDoctor | null>(null);
  const [viewingDoctor, setViewingDoctor] = useState<IDoctor | null>(null);
  const [editingDoctor, setEditingDoctor] = useState<IDoctor | null>(null);



  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    })
  }

  const handleView = (doctor: IDoctor) => {
    setViewingDoctor(doctor)
  }

  const handleEdit = (doctor: IDoctor) => {
    setEditingDoctor(doctor)
  }

  const handleDelete = (doctor: IDoctor) => {
    setDeletingDoctor(doctor)
  }


  return (
    <>
      <ManagementTable data={doctors} columns={DoctorsColumn} getRowKey={(doctor) => doctor.id!} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} />
    </>
  );
};

export default DoctorsTable;