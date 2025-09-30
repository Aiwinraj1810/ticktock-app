import { describe, it, expect } from "@jest/globals"
import { validateTimesheetForm, validateEmail, validatePassword } from "@/lib/validation"
import type { TimesheetStatus } from "@/types/timesheet"

describe("Timesheet Validation", () => {
  describe("validateTimesheetForm", () => {
    it("should pass validation for valid data", () => {
      const validData = {
        weekNumber: 1,
        dateRange: "1-5 Jan 2024",
        status: "Completed" as TimesheetStatus,
        hoursLogged: 40,
      }

      const errors = validateTimesheetForm(validData)
      expect(Object.keys(errors).length).toBe(0)
    })

    it("should fail validation for invalid week number", () => {
      const invalidData = {
        weekNumber: 0,
        dateRange: "1-5 Jan 2024",
        status: "Completed" as TimesheetStatus,
        hoursLogged: 40,
      }

      const errors = validateTimesheetForm(invalidData)
      expect(errors.weekNumber).toBeDefined()
    })

    it("should fail validation for empty date range", () => {
      const invalidData = {
        weekNumber: 1,
        dateRange: "",
        status: "Completed" as TimesheetStatus,
        hoursLogged: 40,
      }

      const errors = validateTimesheetForm(invalidData)
      expect(errors.dateRange).toBeDefined()
    })

    it("should fail validation for negative hours", () => {
      const invalidData = {
        weekNumber: 1,
        dateRange: "1-5 Jan 2024",
        status: "Completed" as TimesheetStatus,
        hoursLogged: -5,
      }

      const errors = validateTimesheetForm(invalidData)
      expect(errors.hoursLogged).toBeDefined()
    })

    it("should fail validation for hours exceeding 168", () => {
      const invalidData = {
        weekNumber: 1,
        dateRange: "1-5 Jan 2024",
        status: "Completed" as TimesheetStatus,
        hoursLogged: 200,
      }

      const errors = validateTimesheetForm(invalidData)
      expect(errors.hoursLogged).toBeDefined()
    })
  })

  describe("validateEmail", () => {
    it("should validate correct email addresses", () => {
      expect(validateEmail("user@example.com")).toBe(true)
      expect(validateEmail("test.user@domain.co.uk")).toBe(true)
    })

    it("should reject invalid email addresses", () => {
      expect(validateEmail("invalid")).toBe(false)
      expect(validateEmail("invalid@")).toBe(false)
      expect(validateEmail("@domain.com")).toBe(false)
    })
  })

  describe("validatePassword", () => {
    it("should validate passwords with 8 or more characters", () => {
      expect(validatePassword("password123")).toBe(true)
      expect(validatePassword("12345678")).toBe(true)
    })

    it("should reject passwords with less than 8 characters", () => {
      expect(validatePassword("pass")).toBe(false)
      expect(validatePassword("1234567")).toBe(false)
    })
  })
})
