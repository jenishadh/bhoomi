import React from "react"

import { getAllApplications } from "@/data/mutation"

import { columns } from "./columns"
import { DataTable } from "./data-table"

export default async function ApplicationPage() {
  const data = await getAllApplications()
  return (
    <div className="mx-auto px-10 py-5">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">
        All Mutation Records
      </h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
