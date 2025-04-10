import { LandMutationForm } from "@/components/land-mutation-form"

export default function LandMutationPage() {
  return (
    <div className="mx-auto px-10 py-5">
      <h1 className="mb-6 text-3xl font-bold">Land Mutation Application</h1>
      <p className="text-muted-foreground mb-8">
        Complete the form below to apply for land mutation.
      </p>
      <LandMutationForm />
    </div>
  )
}
