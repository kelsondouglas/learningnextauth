import React from "react";
import CardWrapper from "./card-wrapper";

const LoginForm = () => {
  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account?"
      showSocial
    >
      LoginForm
    </CardWrapper>
  );
};

export default LoginForm;
