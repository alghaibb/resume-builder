import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-5 h-5 border-b-2 rounded-full border-primary-foreground animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
