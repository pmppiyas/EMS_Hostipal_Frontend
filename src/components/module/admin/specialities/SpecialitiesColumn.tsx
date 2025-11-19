import { IColumn } from '@/components/module/dashboard/ManagementTable';
import { ISpecilities } from '@/types/specialities';
import Image from "next/image";



export const specialitiesColumn: IColumn<ISpecilities>[] = [
  {
    header: "Icon",
    accessor: (speciality) => (
      <Image
        src={speciality.icon as string}
        alt={speciality.title}
        width={40}
        height={40}
        className="rounded-full"
      />
    ),
  },
  {
    header: "Title",
    accessor: (speciality) => speciality.title,
  },

];