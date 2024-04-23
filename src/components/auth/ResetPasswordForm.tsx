"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { FaEyeSlash, FaEye } from "react-icons/fa";

import { NewForgotPassword } from "@/actions/auth-actions/new-forgotpassword";

import CardWrapper from "../CardWrapper";
import LoadingSpinner from "../LoadingSpinner";
import { Button } from "../ui/button";
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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PasswordResetFormSchema } from "@/form-schemas";

const ResetPasswordForm = () => {
  const router = useRouter();

  const { toast } = useToast();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(PasswordResetFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Check if token is valid and not expired
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  });

  const onSubmit = async (data: z.infer<typeof PasswordResetFormSchema>) => {
    setLoading(true);
    try {
      const response = await NewForgotPassword(token ?? "", data.password);
      if (response.error) {
        toast({
          title: "Reset Error",
          description: response.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Password Reset",
          description: "Your password has been reset successfully.",
        });
        router.push("/login");
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const { handleSubmit } = form;

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <CardWrapper
      title="Reset Your Password"
      label="Enter your new password below"
      backButtonHref=""
      backButtonLabel=""
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
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
                        disabled={loading}
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={showConfirmPassword ? "text" : "password"}
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute right-2 top-3"
                      >
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {loading ? <LoadingSpinner /> : "Reset Password"}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ResetPasswordForm;
