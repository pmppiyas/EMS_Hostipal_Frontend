
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomHeader from '@/components/ui/CustomHeader';
import {
  Baby,
  Bone,
  Brain,
  Eye,
  HeartPulse,
  Stethoscope,
  Syringe,
} from "lucide-react";

const specialities = [
  { name: "Cardiology", icon: HeartPulse },
  { name: "Neurology", icon: Brain },
  { name: "Orthopedics", icon: Bone },
  { name: "General Medicine", icon: Stethoscope },
  { name: "Vaccination", icon: Syringe },
  { name: "Pediatrics", icon: Baby },
  { name: "Ophthalmology", icon: Eye },
];

export default function Speciality() {
  return (
    <section className="container ">

      <CustomHeader title='Our Specialities' />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 md:p-10 lg:p-12">
        {specialities.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card
              key={index}
              className="bg-card border border-border text-center hover:shadow-md transition"
            >
              <CardHeader className="flex flex-col items-center justify-center space-y-2">
                <Icon className="w-10 h-10 text-primary" />
                <CardTitle className="text-base text-foreground">
                  {item.name}
                </CardTitle>
              </CardHeader>
              <CardContent></CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
