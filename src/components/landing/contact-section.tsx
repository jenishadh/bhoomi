import { MaxWidthWrapper } from "@/components/max-width-wrapper"

export function ContactSection() {
  return (
    <section className="py-15">
      <MaxWidthWrapper className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-3xl font-semibold text-blue-800">
          Contact & Support
        </h2>
        <p className="text-pretty">
          For queries or support related to land records, please reach out to
          us:
        </p>
        <p className="text-lg">
          📞 01-1234567 (Mon–Fri, 10 AM – 4 PM) <br />
          ✉️{" "}
          <a href="mailto:support@landdept.gov.np" className="underline">
            support@landdept.gov.np
          </a>
        </p>
      </MaxWidthWrapper>
    </section>
  )
}
