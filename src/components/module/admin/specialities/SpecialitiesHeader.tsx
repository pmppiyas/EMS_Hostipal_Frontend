"use client"

import SpecialitiesFromDiolog from '@/components/module/admin/specialities/SpecialitiesFromDiolog';
import ManagementPageHeader from '@/components/module/dashboard/ManagmentPageHeader';
import { Plus } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';



const SpecialitiesHeader = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };
            return (
    <>
      <SpecialitiesFromDiolog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={handleSuccess}
      />


      <ManagementPageHeader
        title="Specialties Management"
        description="Manage Specialties information and details"
        actions={[
          {
            label: "Add Specialty",
            icon: Plus,
            onClick: () => setIsDialogOpen(true),
          },

        ]}

      />

    </>
  );
};

export default SpecialitiesHeader;