"use client";

import { signupSchema } from "@/components/module/auth/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerPatient } from '@/services/auth/signup';
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      setLoading(true);
      const result = await registerPatient(data);

      if (result.success) {
        toast.success("Account created & logged in ✅");
        router.push("/");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Signup failed");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return (
    <Card className="w-full max-w-sm shadow-md">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your details to sign up</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" placeholder="John Doe" {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Button variant="outline" className="w-full">
          Sign up with Google
        </Button>

        <div className="text-sm">
          Already have an account?{" "}
          <Button variant="link" className="p-0">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
