"use client"

import DoctorsFormDialog from '@/components/module/admin/doctors/DoctorsFormDialog';
import ManagementPageHeader from '@/components/module/dashboard/ManagmentPageHeader';

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

const DoctorsHeader = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <div>

      <DoctorsFormDialog open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess} />

      <ManagementPageHeader title={"Doctors Management"} description="Manage Specialties information and details"
        actions={[
          {
            label: "Add Doctor",
            icon: Plus,
            onClick: () => setIsDialogOpen(true),
          }
        ]} />
    </div>
  );
};

export default DoctorsHeader;