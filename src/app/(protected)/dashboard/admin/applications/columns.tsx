"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ViewDetails } from "@/components/view-details"

export type UserRecords = {
  id: string
  applicantName: string
  applicantEmail: string
  applicantPhoneNo: string
  applicantCitizenshipNo: string
  landDistrict: string
  landCity: string
  landWardNumber: string
  landParcelNumber: string
  landType: "Residential" | "Agricultural" | "Commercial" | "Other"
  ownershipType: "Inherited" | "Purchased" | "Gifted" | "Other"
  previousOwnerName: string
  reasonForMutation: string
  dateOfTransfer: string
  applicationStatus: "PENDING" | "APPROVED" | "REJECTED"
  appliedBy: string
  appliedById: string

  createdAt: string
}

export const columns: ColumnDef<UserRecords>[] = [
  {
    accessorKey: "landParcelNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Land Parcel Number
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("landParcelNumber")}</div>,
  },
  {
    accessorKey: "landType",
    header: "Land Type",
  },
  {
    accessorKey: "ownershipType",
    header: "Ownership Type",
  },
  {
    accessorKey: "applicantName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Current Owner
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("applicantName")}</div>,
  },
  {
    accessorKey: "previousOwnerName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Previous Owner
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div>{row.getValue("previousOwnerName")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const record = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <ViewDetails record={record} />
            </DropdownMenuItem>
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
