"use client"

import { useState } from "react"

import { updateStatus } from "@/actions/mutation"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { UserRecords } from "@/app/(protected)/dashboard/admin/applications/columns"

import DetailCard from "./detail-card"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"

type ApplicationStatus = "PENDING" | "PROCESSING" | "APPROVED" | "REJECTED"

export function ViewDetails({ record }: { record: UserRecords }) {
  const [status, setStatus] = useState<ApplicationStatus>(
    record.applicationStatus
  )
  const [isUpdating, setIsUpdating] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")

  const handleStatusUpdate = async () => {
    setIsUpdating(true)
    setSuccess("")
    setError("")
    const response = await updateStatus(record.id, status)
    if (response?.success) {
      setSuccess(response.success)
    }
    if (response?.error) {
      setError(response.error)
    }
    setIsUpdating(false)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full px-2 py-1.5 text-left">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] min-w-7/12 overflow-auto">
        <DialogHeader>
          <DialogTitle>Land Details</DialogTitle>
          <DialogDescription>Below are the record details:</DialogDescription>
        </DialogHeader>
        <DetailCard {...record} />

        <FormSuccess message={success} />
        <FormError message={error} />

        <DialogFooter className="mt-4 pt-4">
          <div className="flex w-full items-center gap-4">
            <div className="flex-1">
              <p className="mb-2 text-sm font-medium">
                Update Application Status
              </p>
              <Select
                value={status}
                onValueChange={(value) => setStatus(value as ApplicationStatus)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="PROCESSING">Processing</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={handleStatusUpdate}
              disabled={isUpdating || status === record.applicationStatus}
              className="self-end"
            >
              {isUpdating ? "Updating..." : "Update Status"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
