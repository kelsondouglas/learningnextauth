import CardWrapper from "@/components/auth/card-wrapper";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import React from "react";

const ErrorPage = () => {
  return (
    <CardWrapper
      headerLabel="Oops, something went wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Return to login"
    >
      <div className="flex items-center justify-center w-full">
        <ExclamationTriangleIcon className="text-destructive" />
      </div>
    </CardWrapper>
  );
};

export default ErrorPage;
