import { z } from "zod"

export const sessionSchema = z.object({
  id: z.string(),
  role: z.enum(["USER", "ADMIN"]),
})
