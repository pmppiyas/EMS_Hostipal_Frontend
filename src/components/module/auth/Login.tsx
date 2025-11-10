"use client";

import { loginSchema } from '@/components/module/auth/schema';
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
import { loginUser } from '@/services/auth/login';
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { z } from "zod";



type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm({ redirect }: { redirect: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });


  const onSubmit = async (data: LoginFormData) => {

    try {
      setLoading(true);
      const login = await loginUser(data)

      if (login.success) {
        toast.success(login.message)
        router.push(redirect)
        // if (redirect) {
        //   router.push(redirect)
        // } else {
        //   router.push("/")
        // }
        // const authStatus = await getMe();
        // console.log(authStatus.user)
        // if (authStatus.isAuthenticated && authStatus.user) {
        //   const { role } = authStatus.user;
        //   console.log(Role.ADMIN === role);
        //   switch (role) {
        //     case Role.ADMIN:
        //       router.push("/dashboard/admin");
        //       break
        //     case Role.DOCTOR:
        //       router.push("/dashboard/doctor");
        //       break;
        //     case Role.PATIENT:
        //       router.push("/dashboard/patient")
        //       break;
        //     default:
        //       router.push("/")
        //       break;
        //   }
        // } else {
        //   toast.error("Failed to retrieve user's information.")
        // }
      } else {
        toast.error(login.message)
      }

    } catch (err) {
      toast.error("Login failed")
      console.log(err)
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  return (
    <Card className="w-full max-w-sm shadow-md">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>

      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input id="password" type="password" {...register("password")} />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        <Button variant="outline" className="w-full">
          Login with Google
        </Button>

        <div>
          <h5>Have no account?    <Button variant="link" className="p-0 self-start">
            <Link href="/signup">Sign Up</Link>
          </Button></h5>
        </div>
      </CardFooter>
    </Card>
  );
}
