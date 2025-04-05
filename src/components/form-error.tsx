import { TriangleAlert } from "lucide-react"

interface FormErrorProps {
  message?: string
}

export function FormError({ message }: FormErrorProps) {
  if (!message) {
    return null
  }

  return (
    <div className="flex items-center gap-2 rounded-md bg-red-100 p-2.5 text-sm text-red-900">
      <TriangleAlert className="size-4" />
      <p>{message}</p>
    </div>
  )
}
