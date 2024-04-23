"use client";

import React, { useState } from "react";

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
import LoadingSpinner from "../LoadingSpinner";
import CardWrapper from "../CardWrapper";

import { forgotPassword } from "@/actions/auth-actions/forgot-password";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ForgotPasswordFormSchema } from "@/form-schemas";
import { useToast } from "../ui/use-toast";

const ForgotPasswordForm = () => {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: z.infer<typeof ForgotPasswordFormSchema>) => {
    setLoading(true);
    try {
      const res = await forgotPassword(data);
      setLoading(false);
      if (res && res.error) {
        toast({
          title: "Forgot Password Error",
          description: res.error,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Reset Link Sent",
          description: "A password reset link has been sent to your email",
        });
      }
    } catch (error) {
      setLoading(false);
      console.error("Forgot password failed:", error);
      toast({
        title: "Network Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const { handleSubmit } = form;

  return (
    <CardWrapper
      title="Forgot Password"
      label="Enter your email address to send a password reset link"
      backButtonLabel="Remembered your password?"
      backButtonHref="/login"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <LoadingSpinner /> : "Send Reset Link"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ForgotPasswordForm;
