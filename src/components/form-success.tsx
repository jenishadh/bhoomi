import { CircleCheck } from "lucide-react"

interface FormSuccessProps {
  message?: string
}

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) {
    return null
  }

  return (
    <div className="flex items-center gap-2 rounded-md bg-emerald-100 p-2.5 text-sm text-emerald-900">
      <CircleCheck className="size-4" />
      <p>{message}</p>
    </div>
  )
}
