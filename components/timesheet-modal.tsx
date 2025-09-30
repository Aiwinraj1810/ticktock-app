"use client"

import { useState, useEffect } from "react"
import type { Timesheet, TimesheetStatus } from "@/types/timesheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { validateTimesheetForm, type ValidationErrors } from "@/lib/validation"

interface TimesheetModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "view" | "edit" | "create"
  timesheet: Timesheet | null
  onSave: (timesheet: Partial<Timesheet>) => void
}

export function TimesheetModal({ isOpen, onClose, mode, timesheet, onSave }: TimesheetModalProps) {
  const [formData, setFormData] = useState({
    weekNumber: timesheet?.weekNumber || 0,
    dateRange: timesheet?.dateRange || "",
    status: timesheet?.status || ("Incomplete" as TimesheetStatus),
    hoursLogged: timesheet?.hoursLogged || 0,
  })

  const [errors, setErrors] = useState<ValidationErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (timesheet) {
      setFormData({
        weekNumber: timesheet.weekNumber,
        dateRange: timesheet.dateRange,
        status: timesheet.status,
        hoursLogged: timesheet.hoursLogged || 0,
      })
    } else {
      setFormData({
        weekNumber: 0,
        dateRange: "",
        status: "Incomplete",
        hoursLogged: 0,
      })
    }
    setErrors({})
    setTouched({})
  }, [timesheet, isOpen])

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true })
    const validationErrors = validateTimesheetForm(formData)
    setErrors(validationErrors)
  }

  const handleSave = () => {
    // Mark all fields as touched
    setTouched({
      weekNumber: true,
      dateRange: true,
      status: true,
      hoursLogged: true,
    })

    const validationErrors = validateTimesheetForm(formData)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length > 0) {
      return
    }

    onSave({
      ...formData,
      id: timesheet?.id,
      updatedAt: new Date().toISOString(),
    })
    onClose()
  }

  const isReadOnly = mode === "view"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "view" && "View Timesheet"}
            {mode === "edit" && "Edit Timesheet"}
            {mode === "create" && "Create Timesheet"}
          </DialogTitle>
          <DialogDescription>
            {mode === "view" && "Timesheet details"}
            {mode === "edit" && "Update timesheet information"}
            {mode === "create" && "Add a new timesheet entry"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="weekNumber">
              Week Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="weekNumber"
              type="number"
              value={formData.weekNumber || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  weekNumber: Number.parseInt(e.target.value) || 0,
                })
              }
              onBlur={() => handleBlur("weekNumber")}
              disabled={isReadOnly}
              className={touched.weekNumber && errors.weekNumber ? "border-red-500" : ""}
            />
            {touched.weekNumber && errors.weekNumber && <p className="text-sm text-red-500">{errors.weekNumber}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateRange">
              Date Range <span className="text-red-500">*</span>
            </Label>
            <Input
              id="dateRange"
              type="text"
              placeholder="e.g., 1-5 Jan 2024"
              value={formData.dateRange}
              onChange={(e) => setFormData({ ...formData, dateRange: e.target.value })}
              onBlur={() => handleBlur("dateRange")}
              disabled={isReadOnly}
              className={touched.dateRange && errors.dateRange ? "border-red-500" : ""}
            />
            {touched.dateRange && errors.dateRange && <p className="text-sm text-red-500">{errors.dateRange}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => setFormData({ ...formData, status: value as TimesheetStatus })}
              disabled={isReadOnly}
            >
              <SelectTrigger id="status">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Incomplete">Incomplete</SelectItem>
                <SelectItem value="Missing">Missing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hoursLogged">Hours Logged</Label>
            <Input
              id="hoursLogged"
              type="number"
              value={formData.hoursLogged || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hoursLogged: Number.parseInt(e.target.value) || 0,
                })
              }
              onBlur={() => handleBlur("hoursLogged")}
              disabled={isReadOnly}
              className={touched.hoursLogged && errors.hoursLogged ? "border-red-500" : ""}
            />
            {touched.hoursLogged && errors.hoursLogged && <p className="text-sm text-red-500">{errors.hoursLogged}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {isReadOnly ? "Close" : "Cancel"}
          </Button>
          {!isReadOnly && (
            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
              {mode === "create" ? "Create" : "Save Changes"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
