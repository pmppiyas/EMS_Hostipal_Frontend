import Hero from '@/components/module/home/hero';
import Review from '@/components/module/home/Review';
import Speciality from '@/components/module/home/Speciality';
import StepSection from '@/components/module/home/Steps';
import TopDoctors from '@/components/module/home/TopDoctor';


export default function Home() {
  return (
    <div className='flex flex-col items-center  justify-center  w-full mx-auto space-y-10'>
      <Hero />
      <Speciality />
      <TopDoctors />
      <StepSection />
      <Review />
    </div>
  );
}
