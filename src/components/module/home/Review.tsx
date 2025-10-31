"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CustomHeader from '@/components/ui/CustomHeader';
import { Star } from "lucide-react";
import Image from "next/image";

const reviews = [
  {
    name: "Sadia Akter",
    comment:
      "The doctors were kind and professional. I felt truly cared for from the moment I arrived. The staff explained everything clearly and made me feel safe throughout my treatment.",
    rating: 5,
    image: "/reviewers/sadia.jpg",
  },
  {
    name: "Rafiul Islam",
    comment:
      "Clean environment and fast service. I was treated quickly and respectfully. The nurses were polite, and the doctors were efficient. EMS Hospital exceeded my expectations.",
    rating: 4,
    image: "/reviewers/rafiul.jpg",
  },
  {
    name: "Mitu Chowdhury",
    comment:
      "The AI symptom checker was surprisingly accurate. It helped me understand my condition before seeing the doctor. EMS is blending tech and care beautifully.",
    rating: 5,
    image: "/reviewers/mitu.jpg",
  },
  {
    name: "Farhan Kabir",
    comment:
      "I brought my father for cardiac care and was impressed. The team was skilled and empathetic. They kept us informed and treated him with dignity. EMS earned our trust.",
    rating: 5,
    image: "/reviewers/farhan.jpg",
  },
  {
    name: "Nusrat Alam",
    comment:
      "The pediatric team was amazing. My child felt safe and happy. Doctors explained everything clearly, and the nurses were gentle. EMS is perfect for families.",
    rating: 5,
    image: "/reviewers/nusrat.jpg",
  },
  {
    name: "Imran Hossain",
    comment:
      "I had a fracture and EMS handled it smoothly. Diagnosis, treatment, and recovery were all well-managed. The hospital was clean and staff were helpful.",
    rating: 4,
    image: "/reviewers/imran.jpg",
  },
  {
    name: "Shamima Sultana",
    comment:
      "Booking online was easy and fast. No waiting, and the doctor was ready. The staff were courteous and the service was smooth. EMS sets a new standard.",
    rating: 5,
    image: "/reviewers/shamima.jpg",
  },
  {
    name: "Tanvir Mahmud",
    comment:
      "The emergency team responded quickly and professionally. I was admitted within minutes and received excellent care. EMS truly lives up to its name.",
    rating: 5,
    image: "/reviewers/tanvir.jpg",
  },
];

export default function ReviewSection() {

  const duplicatedReviews = [...reviews, ...reviews, ...reviews];

  return (
    <section className="container">
      <CustomHeader title='Patient Reviews' />

      <div className="relative overflow-hidden p-6 md:p-10 lg:p-12 bg-linear-to-t from-primary/20 via-background to-secondary/20  ">
        <div className="flex gap-6 animate-marquee">
          {duplicatedReviews.map((review, index) => (
            <Card
              key={index}
              className="bg-card border border-border hover:shadow-md transition shrink-0 w-[calc(33.333%-1rem)] min-w-[300px]"
            >
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="w-12 h-12 relative rounded-full overflow-hidden border border-border shrink-0">
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <CardTitle className="text-base text-foreground">{review.name}</CardTitle>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${review.rating >= i + 1 ? "text-primary" : "text-muted"}`}
                        fill={review.rating >= i + 1 ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{review.comment}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 20s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}