"use client"

import type React from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, LoaderCircle } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { mutation } from "@/actions/mutation"
import { mutationSchema } from "@/schemas/mutation"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"

type MutationFormValues = z.infer<typeof mutationSchema>

export function LandMutationForm() {
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const form = useForm<MutationFormValues>({
    resolver: zodResolver(mutationSchema),
    defaultValues: {
      applicantName: "",
      applicantEmail: "",
      applicantPhoneNo: "",
      applicantCitizenshipNo: "",
      landDistrict: "",
      landCity: "",
      landWardNumber: "",
      landParcelNumber: "",
      landType: "Residential",
      ownershipType: "Purchased",
      previousOwnerName: "",
      reasonForMutation: "",
      dateOfTransfer: new Date(),
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(values: MutationFormValues) {
    setSuccess("")
    setError("")
    const response = await mutation(values)
    if (response?.success) {
      setSuccess(response.success)
    }
    if (response?.error) {
      setError(response.error)
    }
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>
              Provide your personal details for the application.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="applicantName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="applicantEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john.doe@example.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="applicantPhoneNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="+977 9853647134" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="applicantCitizenshipNo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Citizenship Number *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your citizenship number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Land Details</CardTitle>
            <CardDescription>
              Provide information about the land for mutation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="landDistrict"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>District *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter district" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="landCity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City/Municipality *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="landWardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ward Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter ward number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="landParcelNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Land Parcel Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter parcel number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="landType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Land Type *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select land type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Residential">Residential</SelectItem>
                      <SelectItem value="Agricultural">Agricultural</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ownership Information</CardTitle>
            <CardDescription>
              Provide details about the ownership transfer.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="ownershipType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ownership Type *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select ownership type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Inherited">Inherited</SelectItem>
                      <SelectItem value="Purchased">Purchased</SelectItem>
                      <SelectItem value="Gifted">Gifted</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="previousOwnerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Previous Owner Name *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter previous owner's name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateOfTransfer"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of Transfer *</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={`w-full justify-start text-left font-normal ${
                            !field.value ? "text-muted-foreground" : ""
                          }`}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value
                            ? format(new Date(field.value), "PPP")
                            : "Select date"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) => {
                          if (date) {
                            field.onChange(format(date, "yyyy-MM-dd"))
                          }
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reasonForMutation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Mutation *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Explain the reason for land mutation (minimum 10 characters)"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Provide a detailed explanation for the land mutation
                    request.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <p>
              All the related document must be sent to the government office by
              applicant via mail.
            </p>
          </CardContent>
        </Card>

        <FormSuccess message={success} />
        <FormError message={error} />

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? <LoaderCircle /> : "Submit Application"}
        </Button>
      </form>
    </Form>
  )
}
