"use client"

import { useState } from "react"
import type { Timesheet, TimesheetStatus } from "@/types/timesheet"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Edit, Plus, ChevronLeft, ChevronRight } from "lucide-react"

interface TimesheetTableProps {
  timesheets: Timesheet[]
  onView: (timesheet: Timesheet) => void
  onEdit: (timesheet: Timesheet) => void
  onCreate: () => void
}

const getStatusColor = (status: TimesheetStatus) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800 hover:bg-green-100"
    case "Incomplete":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
    case "Missing":
      return "bg-red-100 text-red-800 hover:bg-red-100"
  }
}

export function TimesheetTable({ timesheets, onView, onEdit, onCreate }: TimesheetTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const totalPages = Math.ceil(timesheets.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTimesheets = timesheets.slice(startIndex, endIndex)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Timesheets</h2>
        <Button onClick={onCreate} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Create Timesheet
        </Button>
      </div>

      <div className="border rounded-lg bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">Week #</TableHead>
              <TableHead>Date Range</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentTimesheets.map((timesheet) => (
              <TableRow key={timesheet.id}>
                <TableCell className="font-medium">Week {timesheet.weekNumber}</TableCell>
                <TableCell>{timesheet.dateRange}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(timesheet.status)}>
                    {timesheet.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" onClick={() => onView(timesheet)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onEdit(timesheet)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1} to {Math.min(endIndex, timesheets.length)} of {timesheets.length} entries
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            <span className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
