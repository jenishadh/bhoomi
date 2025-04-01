import { Metadata } from "next"

import { CardWrapper } from "@/components/auth/card-wrapper"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create an account to get started.",
}

export default function RegisterPage() {
  return (
    <CardWrapper
      title="Create an account"
      description="Enter details to create your account"
      linkLabel="Already have an account? Sign in"
      linkHref="/login"
    >
      <RegisterForm />
    </CardWrapper>
  )
}
