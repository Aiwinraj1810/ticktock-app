import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { mockTimesheets } from "@/lib/timesheet-data"
import type { Timesheet } from "@/types/timesheet"

// In-memory storage (in production, this would be a database)
const timesheets = [...mockTimesheets]

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    return NextResponse.json({ timesheets })
  } catch (error) {
    console.error("[v0] Error in GET /api/timesheets:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const newTimesheet: Timesheet = {
      id: Date.now().toString(),
      weekNumber: body.weekNumber,
      dateRange: body.dateRange,
      status: body.status,
      hoursLogged: body.hoursLogged || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    timesheets.push(newTimesheet)

    return NextResponse.json({ timesheet: newTimesheet }, { status: 201 })
  } catch (error) {
    console.error("[v0] Error in POST /api/timesheets:", error)
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}
