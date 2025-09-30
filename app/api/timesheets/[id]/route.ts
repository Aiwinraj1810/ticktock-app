import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { mockTimesheets } from "@/lib/timesheet-data"

// In-memory storage (in production, this would be a database)
const timesheets = [...mockTimesheets]

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const timesheet = timesheets.find((t) => t.id === params.id)

    if (!timesheet) {
      return NextResponse.json({ error: "Timesheet not found" }, { status: 404 })
    }

    return NextResponse.json({ timesheet })
  } catch (error) {
    console.error("[v0] Error in GET /api/timesheets/[id]:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const index = timesheets.findIndex((t) => t.id === params.id)

    if (index === -1) {
      return NextResponse.json({ error: "Timesheet not found" }, { status: 404 })
    }

    timesheets[index] = {
      ...timesheets[index],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ timesheet: timesheets[index] })
  } catch (error) {
    console.error("[v0] Error in PUT /api/timesheets/[id]:", error)
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const index = timesheets.findIndex((t) => t.id === params.id)

    if (index === -1) {
      return NextResponse.json({ error: "Timesheet not found" }, { status: 404 })
    }

    timesheets.splice(index, 1)

    return NextResponse.json({ message: "Timesheet deleted" })
  } catch (error) {
    console.error("[v0] Error in DELETE /api/timesheets/[id]:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
