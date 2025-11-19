import SpecialitiesHeader from '@/components/module/admin/specialities/SpecialitiesHeader';
import SpecialitiesTable from '@/components/module/admin/specialities/SpecialitiesTable';
import { getSpecialities } from '@/services/admin/specialities';

export default async function SpecialitiesManagement() {
  const specialities = await getSpecialities();
  return (
    <div>
      <SpecialitiesHeader />
      <SpecialitiesTable specialities={specialities.data} />

    </div>
  )
}

