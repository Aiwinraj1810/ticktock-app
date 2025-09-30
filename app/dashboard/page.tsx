"use client"

import { useState, useEffect } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { TimesheetTable } from "@/components/timesheet-table"
import { TimesheetModal } from "@/components/timesheet-modal"
import type { Timesheet } from "@/types/timesheet"
import { useToast } from "@/hooks/use-toast"

export default function DashboardPage() {
  const [timesheets, setTimesheets] = useState<Timesheet[]>([])
  const [selectedTimesheet, setSelectedTimesheet] = useState<Timesheet | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">("view")
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchTimesheets()
  }, [])

  const fetchTimesheets = async () => {
    try {
      const response = await fetch("/api/timesheets")
      if (response.ok) {
        const data = await response.json()
        setTimesheets(data.timesheets)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load timesheets",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleView = (timesheet: Timesheet) => {
    setSelectedTimesheet(timesheet)
    setModalMode("view")
    setIsModalOpen(true)
  }

  const handleEdit = (timesheet: Timesheet) => {
    setSelectedTimesheet(timesheet)
    setModalMode("edit")
    setIsModalOpen(true)
  }

  const handleCreate = () => {
    setSelectedTimesheet(null)
    setModalMode("create")
    setIsModalOpen(true)
  }

  const handleSave = async (timesheetData: Partial<Timesheet>) => {
    try {
      if (modalMode === "create") {
        const response = await fetch("/api/timesheets", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(timesheetData),
        })

        if (response.ok) {
          toast({
            title: "Success",
            description: "Timesheet created successfully",
          })
          fetchTimesheets()
        }
      } else if (modalMode === "edit" && timesheetData.id) {
        const response = await fetch(`/api/timesheets/${timesheetData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(timesheetData),
        })

        if (response.ok) {
          toast({
            title: "Success",
            description: "Timesheet updated successfully",
          })
          fetchTimesheets()
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save timesheet",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <main className="p-6 max-w-7xl mx-auto">
          <div className="text-center py-12">Loading...</div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="p-6 max-w-7xl mx-auto">
        <TimesheetTable timesheets={timesheets} onView={handleView} onEdit={handleEdit} onCreate={handleCreate} />
      </main>

      <TimesheetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mode={modalMode}
        timesheet={selectedTimesheet}
        onSave={handleSave}
      />
    </div>
  )
}
