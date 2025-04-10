import React from "react"

import { getAllRecords } from "@/data/mutation"

import { columns } from "./columns"
import { DataTable } from "./data-table"

export default async function RecordsPage() {
  const data = await getAllRecords()
  return (
    <div className="mx-auto px-10 py-5">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">
        All Mutation Records
      </h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
