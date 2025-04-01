import { Metadata } from "next"

import { CardWrapper } from "@/components/auth/card-wrapper"
import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
}

export default function LoginPage() {
  return (
    <CardWrapper
      title="Login"
      description="Enter your credentials to login"
      linkLabel="Don't have an account? Sign up"
      linkHref="/register"
    >
      <LoginForm />
    </CardWrapper>
  )
}
