
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomHeader from '@/components/ui/CustomHeader';
import { BrainCog, CalendarCheck, Handshake } from "lucide-react";

const steps = [
  {
    title: "Find a Doctor",
    description: "Browse our top specialists or use the AI symptom checker to get matched instantly.",
    icon: BrainCog,
  },
  {
    title: "Book Appointment",
    description: "Choose your preferred doctor and time slot. Booking is fast and easy.",
    icon: CalendarCheck,
  },
  {
    title: "Meet & Consult",
    description: "Visit EMS Hospital and meet your doctor for personalized care and treatment.",
    icon: Handshake,
  },
];

export default function StepSection() {
  return (
    <section className="container ">
      <CustomHeader title='How It Works' />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6  p-6 md:p-10 lg:p-12">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <Card key={index} className="bg-card border border-border hover:shadow-md transition">
              <CardHeader className="flex flex-col items-center space-y-2">
                <Icon className="w-10 h-10 text-primary" />
                <CardTitle className="text-lg text-foreground text-center">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">{step.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}