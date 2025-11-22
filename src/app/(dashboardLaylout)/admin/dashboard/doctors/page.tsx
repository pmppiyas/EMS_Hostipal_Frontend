
import DoctorsHeader from '@/components/module/admin/doctors/DoctorsHeader';
import DoctorsTable from '@/components/module/admin/doctors/DoctorsTable';
import { getDoctors } from '@/services/admin/doctor';


const DoctorsManagement = async () => {
  const res = await getDoctors();
  const doctors = res?.data?.data;
  return (
    <div>
      <DoctorsHeader />
      <DoctorsTable doctors={doctors} />
    </div>
  );
};

export default DoctorsManagement;