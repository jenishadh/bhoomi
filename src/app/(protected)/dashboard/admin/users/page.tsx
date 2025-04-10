import React from "react"

import { getAllUsers } from "@/data/user"

import { columns } from "./columns"
import { DataTable } from "./data-table"

export default async function UsersPage() {
  const data = await getAllUsers()
  return (
    <div className="mx-auto px-10 py-5">
      <h1 className="mb-6 text-3xl font-bold tracking-tight">User Records</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
