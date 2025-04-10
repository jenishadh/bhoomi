import { z } from "zod"

export const mutationSchema = z.object({
  applicantName: z.string().min(1, "Full name is required"),
  applicantEmail: z.string().email("Invalid email address"),
  applicantPhoneNo: z.string({ message: "Phone number is required" }),
  applicantCitizenshipNo: z.string(),
  landDistrict: z.string().min(1, "District is required"),
  landCity: z.string().min(1, "City is required"),
  landWardNumber: z.string().min(1, "Ward number is required"),
  landParcelNumber: z.string().min(1, "Land parcel number is required"),
  landType: z.enum(["Residential", "Agricultural", "Commercial", "Other"]),
  ownershipType: z.enum(["Inherited", "Purchased", "Gifted", "Other"]),
  previousOwnerName: z.string().min(1, "Previous owner name is required"),
  reasonForMutation: z
    .string()
    .min(10, "Reason must be at least 10 characters"),
  dateOfTransfer: z.coerce.date(),
})
