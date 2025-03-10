import Link from "next/link";

import { CardWrapper } from "@/components/card-wrapper";

import { LoginForm } from "@/app/(auth)/login/form";

export default function LoginPage() {
  return (
    <section className="flex flex-1 flex-col items-center">
      <CardWrapper title="Sign in to your account" footer={<CardFooter />}>
        <LoginForm />
      </CardWrapper>
    </section>
  );
}

function CardFooter() {
  return (
    <div className="mt-4 text-center text-sm">
      Don&apos;t have an account?{" "}
      <Link href="/register" className="underline underline-offset-4">
        Create account
      </Link>
    </div>
  );
}
