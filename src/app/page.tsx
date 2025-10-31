import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <p className='text-xl '>Hello Piyas</p>
      <h2 className="text-4xl ">This is Next JS 16.0</h2>
      <Button variant={"default"} >Click me</Button>
    </div>
  );
}
