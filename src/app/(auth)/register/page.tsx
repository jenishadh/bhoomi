import Link from "next/link";

import { CardWrapper } from "@/components/auth/card-wrapper";
import { RegisterForm } from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <section className="flex flex-1 flex-col items-center">
      <CardWrapper title="Create your account" footer={<CardFooter />}>
        <RegisterForm />
      </CardWrapper>
    </section>
  );
}

function CardFooter() {
  return (
    <div className="mt-4 text-center text-sm">
      Already have an account?{" "}
      <Link href="/login" className="underline underline-offset-4">
        Sign in
      </Link>
    </div>
  );
}
