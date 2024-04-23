import React, { Suspense } from "react";

import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

import LoadingSpinner from "@/components/LoadingSpinner";

const ResetPasswordPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ResetPasswordForm />
    </Suspense>
  );
};

export default ResetPasswordPage;
