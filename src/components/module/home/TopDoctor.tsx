import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import CustomHeader from '@/components/ui/CustomHeader';
import { Star } from "lucide-react";
import Image from "next/image";

const doctors = [
  {
    name: "Dr. Ayesha Rahman",
    specialty: "Cardiologist",
    image: "/doctors/ayesha.jpg",
    rating: 4.8,
  },
  {
    name: "Dr. Tanvir Islam",
    specialty: "Neurologist",
    image: "/doctors/tanvir.jpg",
    rating: 4.6,
  },
  {
    name: "Dr. Nusrat Jahan",
    specialty: "Pediatrician",
    image: "/doctors/nusrat.jpg",
    rating: 4.9,
  },
  {
    name: "Dr. Mahmud Hasan",
    specialty: "Orthopedic Surgeon",
    image: "/doctors/mahmud.jpg",
    rating: 4.7,
  },
];

export default function TopDoctors() {
  return (
    <section className="container">
      <CustomHeader title="Our Top Rated Doctors" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 md:p-10 lg:p-12">
        {doctors.map((doctor, index) => (
          <Card key={index} className="bg-card border border-border hover:shadow-md transition">
            <CardHeader className="flex flex-col items-center space-y-2">
              <div className="w-20 h-20 relative rounded-full overflow-hidden border border-border">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardTitle className="text-lg text-foreground text-center">
                {doctor.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{doctor.specialty}</p>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${doctor.rating >= i + 1 ? "text-primary" : doctor.rating >= i + 0.5 ? "text-primary/70" : "text-muted"
                      }`}
                    fill={doctor.rating >= i + 1 ? "currentColor" : doctor.rating >= i + 0.5 ? "currentColor" : "none"}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">{doctor.rating.toFixed(1)}</span>
              </div>
            </CardHeader>
            <CardContent />
            <CardFooter className="flex justify-center">
              <Button variant="outline" size="sm">View Profile</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}