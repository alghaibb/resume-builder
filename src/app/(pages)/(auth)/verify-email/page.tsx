import React, { Suspense } from "react";

import VerifyEmailForm from "../../../../components/auth/VerifyEmailForm";

import LoadingSpinner from "@/components/LoadingSpinner";

const VerifyEmailPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <VerifyEmailForm />
    </Suspense>
  );
};

export default VerifyEmailPage;
