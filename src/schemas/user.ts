import { z } from "zod"

import { emailSchema } from "@/schemas/auth"

export const userInfoSchema = z.object({
  name: z.string(),
  email: emailSchema,
  image: z.string().nullable(),
  role: z.enum(["USER", "ADMIN"]),
})
