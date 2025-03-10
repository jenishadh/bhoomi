import Link from "next/link";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <MaxWidthWrapper className="flex min-h-screen flex-col">
      <header className="flex h-20 items-center">
        <Link href="/" className="font-mono text-lg font-bold">
          BHOOMI
        </Link>
      </header>
      <main className="flex flex-1 flex-col items-center py-10 md:py-20">{children}</main>
    </MaxWidthWrapper>
  );
}
