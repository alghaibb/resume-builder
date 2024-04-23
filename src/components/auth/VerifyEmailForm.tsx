"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

import { NewVerification } from "@/actions/auth-actions/new-verification";

import CardWrapper from "../CardWrapper";
import LoadingSpinner from "../LoadingSpinner";
import { Button } from "../ui/button";

const VerifyEmailForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    setLoading(true); // Set loading when starting the verification process
    // Verify the user's email
    if (!token) {
      setError("Invalid token");
      setLoading(false); // Stop loading if there is no token
      return;
    }

    NewVerification(token)
      .then((data) => {
        setLoading(false); // Stop loading when the verification response is received
        if (data.success) {
          setSuccess(true);
        } else if (data.error) {
          setError(data.error);
        }
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    if (token && !success && !error) {
      onSubmit(); // Automatically trigger verification on component mount if there's a token
    }
  }, [token, onSubmit, success, error]);

  return (
    <CardWrapper
      title="Verify Your Account"
      label="Click the button below to verify your email address"
      backButtonHref="/login"
      backButtonLabel="Back To Login"
    >
      <div className="flex items-center justify-center w-full p-4">
        {loading ? (
          <LoadingSpinner />
        ) : success ? (
          <div>
            <p className="mb-4 text-lg text-center text-green-600">
              Email successfully verified. You can now login.
            </p>
          </div>
        ) : (
          <div>
            {error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <Button onClick={onSubmit}>Verify Email</Button>
            )}
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

export default VerifyEmailForm;
