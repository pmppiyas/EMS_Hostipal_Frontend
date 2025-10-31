
import AiSuggest from '@/components/module/home/AiSuggest';
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="container min-h-[calc(100vh-70px)] flex flex-col p-12 md:flex-row items-center justify-between gap-10">

      <div className="flex-1 space-y-6">

        <h1 className="text-primary/70 block">Welcome to,<span className='block text-4xl lg:text-5xl font-bold text-primary'>EMS HOSPITAL</span></h1>
        <p className="text-muted-foreground max-w-md">
          Your trusted partner in emergency care. Get instant AI-powered suggestions and track your appointments.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <Button variant="default">Book Appointment</Button>
          <Button variant="outline">View Doctors</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6 text-left">
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-2xl font-bold text-primary">32+</p>
            <p className="text-sm text-muted-foreground">Doctors</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-2xl font-bold text-primary">120+</p>
            <p className="text-sm text-muted-foreground">Patients</p>
          </div>
          <div className="bg-card border border-border rounded-lg p-4">
            <p className="text-2xl font-bold text-primary">187+</p>
            <p className="text-sm text-muted-foreground">Appointments</p>
          </div>
        </div>
      </div>


      <AiSuggest />

    </section>
  );
}