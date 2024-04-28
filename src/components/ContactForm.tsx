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
import CardWrapper from "./CardWrapper";
import LoadingSpinner from "./LoadingSpinner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ContactFormSchema } from "@/form-schemas";
import { submitContactForm } from "@/actions/contact-form-submissions";
import { Textarea } from "./ui/textarea";

const ContactForm = () => {
  const form = useForm({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit = async (data: z.infer<typeof ContactFormSchema>) => {
    setLoading(true);
    try {
      const res = await submitContactForm(data);
      if (res.error) {
        setErrorMessage(res.error);
      } else {
        setShowSuccessMessage(true);
        form.reset(); // Reset the form fields after successful submission
      }
    } catch (error) {
      setErrorMessage((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const { handleSubmit } = form;

  // If the form submission is successful, show a success message
  if (successMessage) {
    return (
      <div className="flex flex-col items-center justify-center h-screen space-y-4">
        <h2 className="text-2xl font-semibold">Thank you for your message!</h2>
        <p className="text-lg text-foreground">
          We will get back to you as soon as possible
        </p>
      </div>
    );
  }

  return (
    <CardWrapper
      title="Contact Us"
      label="Fill out the form below to reach out to us"
      backButtonHref="/"
      backButtonLabel="Back To Home"
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input {...field} type="name" disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Message</FormLabel>
                  <FormControl>
                    <Textarea {...field} disabled={loading} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {errorMessage && <FormMessage>{errorMessage}</FormMessage>}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <LoadingSpinner /> : "Send Message"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default ContactForm;
