"use client";

import React from "react";

import { Card, CardContent, CardHeader, CardFooter } from "./ui/card";
import AuthHeader from "./auth/AuthHeader";
import BackButton from "./auth/BackButton";

interface CardWrapperProps {
  children: React.ReactNode;
  label: string;
  title: string;
  backButtonHref: string;
  backButtonLabel: string;
}

const CardWrapper = ({
  children,
  label,
  title,
  backButtonHref,
  backButtonLabel,
}: CardWrapperProps) => {
  return (
    <Card className="shadow-md xl:w-1/4 md:w-1/2">
      <CardHeader>
        <AuthHeader label={label} title={title} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
