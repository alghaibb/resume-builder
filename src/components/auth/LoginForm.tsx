"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { FaEyeSlash, FaEye } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "../ui/use-toast";
import CardWrapper from "../CardWrapper";

import { login } from "@/actions/auth-actions/login";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginFormSchema } from "@/form-schemas";
import LoadingSpinner from "../LoadingSpinner";
import Link from "next/link";

const CreateAccountForm = () => {
  const { toast } = useToast();
 
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });


  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    setLoading(true);
    try {
      const res = await login(data);
      setLoading(false);
      if (res && res.error) {
        toast({
          title: "Login Error",
          description: res.error,
          variant: "destructive",
        });
      } else {
        // Redirect to the home page
        router.push("/");
      }
    } catch (error) {
      setLoading(false);
      console.error("Login failed:", error);
      toast({
        title: "Network Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <CardWrapper
      label="Login To Your Account"
      title="Login"
      backButtonHref="/create-account"
      backButtonLabel="Don't have an account?"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-2 top-3"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="link">
              <Link href="/forgot-password">Forgot Password?</Link>
            </Button>
          </div>
          <Button type="submit" className="w-full">
            {loading ? <LoadingSpinner /> : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default CreateAccountForm;
