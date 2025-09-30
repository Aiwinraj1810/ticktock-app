"use client"

import { useState, useMemo } from "react"
import type { Timesheet, TimesheetStatus } from "@/types/timesheet"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Eye,
  Edit,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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

export function TimesheetTable({
  timesheets,
  onView,
  onEdit,
  onCreate,
}: TimesheetTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState<TimesheetStatus | "All">("All")
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")

  const itemsPerPage = 5

  // Apply filters
  const filteredTimesheets = useMemo(() => {
    return timesheets.filter((t) => {
      // Status filter
      if (statusFilter !== "All" && t.status !== statusFilter) return false

      // Date filter (assuming timesheet.dateRange like "2025-09-01 to 2025-09-07")
      if (dateFrom || dateTo) {
        const [start, end] = t.dateRange.split(" to ").map((d) => new Date(d))
        if (dateFrom && new Date(dateFrom) > end) return false
        if (dateTo && new Date(dateTo) < start) return false
      }
      return true
    })
  }, [timesheets, statusFilter, dateFrom, dateTo])

  const totalPages = Math.ceil(filteredTimesheets.length / itemsPerPage) || 1
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTimesheets = filteredTimesheets.slice(startIndex, endIndex)

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Timesheets</h2>
        <Button onClick={onCreate} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" />
          Create Timesheet
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">From</label>
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-40"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">To</label>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-40"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Status</label>
          <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
              <SelectItem value="Incomplete">Incomplete</SelectItem>
              <SelectItem value="Missing">Missing</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
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
            {currentTimesheets.length > 0 ? (
              currentTimesheets.map((timesheet) => (
                <TableRow key={timesheet.id}>
                  <TableCell className="font-medium">
                    Week {timesheet.weekNumber}
                  </TableCell>
                  <TableCell>{timesheet.dateRange}</TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getStatusColor(timesheet.status)}
                    >
                      {timesheet.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(timesheet)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(timesheet)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-500">
                  No timesheets found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredTimesheets.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Showing {startIndex + 1} to{" "}
            {Math.min(endIndex, filteredTimesheets.length)} of{" "}
            {filteredTimesheets.length} entries
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
