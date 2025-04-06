import { MaxWidthWrapper } from "@/components/max-width-wrapper"

export function AboutSection() {
  return (
    <section className="bg-blue-50 py-15">
      <MaxWidthWrapper className="flex flex-col items-center justify-center gap-4">
        <h2 className="text-3xl font-semibold text-blue-700">
          About the Bhoomi Portal
        </h2>
        <p className="max-w-prose leading-relaxed text-pretty">
          The Bhoomi portal is an initiative of the Government designed to
          digitize land records and provide accessible services to citizens and
          landowners. This system aims to eliminate the need for manual
          interventions and ensures secure, real-time access to land information
          for all stakeholders.
        </p>
      </MaxWidthWrapper>
    </section>
  )
}
