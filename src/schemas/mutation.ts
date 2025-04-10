import { z } from "zod"

export const mutationSchema = z.object({
  applicantName: z.string().min(1, "Full name is required"),
  applicantEmail: z.string().email("Invalid email address"),
  applicantPhoneNo: z
    .string()
    .min(7, "Phone number is too short")
    .max(15, "Phone number is too long"),
  applicantCitizenshipNo: z.string(),
  district: z.string().min(1, "District is required"),
  wardNumber: z.string().min(1, "Ward number is required"),
  applicantAddress: z.string().min(1, "Applicant address is required"),
  landParcelNumber: z.string().min(1, "Land parcel number is required"),
  landType: z.enum(["Residential", "Agricultural", "Commercial", "Other"]),
  ownershipType: z.enum(["Inherited", "Purchased", "Gifted", "Other"]),
  previousOwnerName: z.string().min(1, "Previous owner name is required"),
  reasonForMutation: z
    .string()
    .min(10, "Reason must be at least 10 characters"),
  dateOfTransfer: z.string().refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), {
    message: "Date must be in YYYY-MM-DD format",
  }),
  documents: z
    .array(z.string().url("Document must be a valid URL"))
    .min(1, "At least one document must be uploaded"),
})
