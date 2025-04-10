"use client"

import { ClipboardCheck, Home, User } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface DetailCardProps {
  id: string
  applicantName: string
  applicantEmail: string
  applicantPhoneNo: string
  applicantCitizenshipNo: string
  landDistrict: string
  landCity: string
  landWardNumber: string
  landParcelNumber: string
  landType: string
  ownershipType: string
  previousOwnerName: string
  reasonForMutation: string
  dateOfTransfer: string
  applicationStatus: string
  appliedBy: string
  createdAt: string
}

export default function DetailCard({
  id,
  applicantName,
  applicantEmail,
  applicantPhoneNo,
  applicantCitizenshipNo,
  landDistrict,
  landCity,
  landWardNumber,
  landParcelNumber,
  landType,
  ownershipType,
  previousOwnerName,
  reasonForMutation,
  dateOfTransfer,
  applicationStatus,
  appliedBy,
  createdAt,
}: DetailCardProps) {
  // Format dates to be more readable
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  // Get status color based on application status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-500"
      case "rejected":
        return "bg-red-500"
      case "pending":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl">Land Application</CardTitle>
          <Badge className={`${getStatusColor(applicationStatus)} text-white`}>
            {applicationStatus}
          </Badge>
        </div>
        <CardDescription>Application ID: {id}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Applicant Information */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <User className="text-muted-foreground h-5 w-5" />
            <h3 className="text-lg font-semibold">Applicant Information</h3>
          </div>
          <Separator />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-sm">Name</p>
              <p className="font-medium">{applicantName}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Email</p>
              <p className="font-medium">{applicantEmail}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Phone Number</p>
              <p className="font-medium">{applicantPhoneNo}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">
                Citizenship Number
              </p>
              <p className="font-medium">{applicantCitizenshipNo}</p>
            </div>
          </div>
        </div>

        {/* Land Information */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Home className="text-muted-foreground h-5 w-5" />
            <h3 className="text-lg font-semibold">Land Information</h3>
          </div>
          <Separator />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-sm">District</p>
              <p className="font-medium">{landDistrict}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">City</p>
              <p className="font-medium">{landCity}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Ward Number</p>
              <p className="font-medium">{landWardNumber}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Parcel Number</p>
              <p className="font-medium">{landParcelNumber}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Land Type</p>
              <p className="font-medium">{landType}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Ownership Type</p>
              <p className="font-medium">{ownershipType}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-muted-foreground text-sm">Previous Owner</p>
              <p className="font-medium">{previousOwnerName}</p>
            </div>
          </div>
        </div>

        {/* Application Details */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <ClipboardCheck className="text-muted-foreground h-5 w-5" />
            <h3 className="text-lg font-semibold">Application Details</h3>
          </div>
          <Separator />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-sm">Date of Transfer</p>
              <p className="font-medium">{formatDate(dateOfTransfer)}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Application Date</p>
              <p className="font-medium">{formatDate(createdAt)}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-muted-foreground text-sm">
                Reason for Mutation
              </p>
              <p className="font-medium">{reasonForMutation}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-muted-foreground text-sm">Applied By</p>
              <p className="font-medium">{appliedBy}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
