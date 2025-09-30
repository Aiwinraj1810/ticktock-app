import { describe, it, expect, jest } from "@jest/globals"
import { render, screen, fireEvent } from "@testing-library/react"
import { TimesheetTable } from "@/components/timesheet-table"
import type { Timesheet } from "@/types/timesheet"

const mockTimesheets: Timesheet[] = [
  {
    id: "1",
    weekNumber: 1,
    dateRange: "1-5 Jan 2024",
    status: "Completed",
    hoursLogged: 40,
    createdAt: "2024-01-05T17:00:00Z",
    updatedAt: "2024-01-05T17:00:00Z",
  },
  {
    id: "2",
    weekNumber: 2,
    dateRange: "8-12 Jan 2024",
    status: "Incomplete",
    hoursLogged: 25,
    createdAt: "2024-01-12T17:00:00Z",
    updatedAt: "2024-01-12T17:00:00Z",
  },
]

describe("TimesheetTable", () => {
  it("should render timesheet data", () => {
    const mockOnView = jest.fn()
    const mockOnEdit = jest.fn()
    const mockOnCreate = jest.fn()

    render(
      <TimesheetTable timesheets={mockTimesheets} onView={mockOnView} onEdit={mockOnEdit} onCreate={mockOnCreate} />,
    )

    expect(screen.getByText("Week 1")).toBeInTheDocument()
    expect(screen.getByText("1-5 Jan 2024")).toBeInTheDocument()
    expect(screen.getByText("Completed")).toBeInTheDocument()
  })

  it("should call onCreate when create button is clicked", () => {
    const mockOnView = jest.fn()
    const mockOnEdit = jest.fn()
    const mockOnCreate = jest.fn()

    render(
      <TimesheetTable timesheets={mockTimesheets} onView={mockOnView} onEdit={mockOnEdit} onCreate={mockOnCreate} />,
    )

    const createButton = screen.getByText("Create Timesheet")
    fireEvent.click(createButton)

    expect(mockOnCreate).toHaveBeenCalledTimes(1)
  })

  it("should display correct status badges", () => {
    const mockOnView = jest.fn()
    const mockOnEdit = jest.fn()
    const mockOnCreate = jest.fn()

    render(
      <TimesheetTable timesheets={mockTimesheets} onView={mockOnView} onEdit={mockOnEdit} onCreate={mockOnCreate} />,
    )

    const completedBadge = screen.getByText("Completed")
    const incompleteBadge = screen.getByText("Incomplete")

    expect(completedBadge).toBeInTheDocument()
    expect(incompleteBadge).toBeInTheDocument()
  })
})
