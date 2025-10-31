import Hero from '@/components/module/home/hero';
import Speciality from '@/components/module/home/Speciality';
import TopDoctors from '@/components/module/home/TopDoctor';


export default function Home() {
  return (
    <div className='flex flex-col items-center  justify-center  w-full mx-auto space-y-12'>
      <Hero />
      <Speciality />
      <TopDoctors />
    </div>
  );
}
