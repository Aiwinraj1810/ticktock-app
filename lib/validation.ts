import type { TimesheetStatus } from "@/types/timesheet"

export interface TimesheetFormData {
  weekNumber: number
  dateRange: string
  status: TimesheetStatus
  hoursLogged: number
}

export interface ValidationErrors {
  [key: string]: string
}

export function validateTimesheetForm(data: TimesheetFormData): ValidationErrors {
  const errors: ValidationErrors = {}

  // Week number validation
  if (!data.weekNumber || data.weekNumber < 1 || data.weekNumber > 53) {
    errors.weekNumber = "Week number must be between 1 and 53"
  }

  // Date range validation
  if (!data.dateRange || data.dateRange.trim().length === 0) {
    errors.dateRange = "Date range is required"
  } else if (data.dateRange.trim().length < 5) {
    errors.dateRange = "Please enter a valid date range (e.g., 1-5 Jan 2024)"
  }

  // Hours logged validation
  if (data.hoursLogged < 0) {
    errors.hoursLogged = "Hours cannot be negative"
  } else if (data.hoursLogged > 168) {
    errors.hoursLogged = "Hours cannot exceed 168 (24 hours × 7 days)"
  }

  // Status validation
  const validStatuses: TimesheetStatus[] = ["Completed", "Incomplete", "Missing"]
  if (!validStatuses.includes(data.status)) {
    errors.status = "Invalid status"
  }

  return errors
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): boolean {
  return password.length >= 8
}
