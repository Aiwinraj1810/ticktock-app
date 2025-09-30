export type TimesheetStatus = "Completed" | "Incomplete" | "Missing"

export interface Timesheet {
  id: string
  weekNumber: number
  dateRange: string
  status: TimesheetStatus
  hoursLogged?: number
  createdAt: string
  updatedAt: string
}
