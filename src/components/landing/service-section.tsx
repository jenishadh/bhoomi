import Link from "next/link"
import { Download, FilePlus2, FileText, SearchCheck } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"

const services = [
  {
    title: "View Record of Rights (RoR)",
    icon: FileText,
    href: "/search",
  },
  {
    title: "Apply for Mutation",
    icon: FilePlus2,
    href: "/mutation-form",
  },
  {
    title: "Check Application Status",
    icon: SearchCheck,
    href: "/search",
  },
  {
    title: "Download Land Certificates",
    icon: Download,
    href: "/search",
  },
]

export function ServicesSection() {
  return (
    <section className="py-15">
      <MaxWidthWrapper>
        <h2 className="mb-12 text-center text-3xl font-semibold text-blue-700">
          Citizen Services
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Card
              key={index}
              className="group border-rose-200 transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="flex flex-col items-center space-y-4 text-center">
                <service.icon className="h-10 w-10 text-blue-600 transition-transform group-hover:scale-105" />
                <h3 className="font-medium text-blue-900">{service.title}</h3>
              </CardContent>
              <CardFooter className="self-center">
                <Link
                  href={service.href}
                  className={cn(
                    buttonVariants({ size: "lg", variant: "secondary" })
                  )}
                >
                  Go to Service
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </MaxWidthWrapper>
    </section>
  )
}
