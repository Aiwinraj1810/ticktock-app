# ticktock - Timesheet Management Application

A professional timesheet management web application built with Next.js, TypeScript, and TailwindCSS.

## Features

- **Authentication**: Secure login with NextAuth.js
- **Dashboard**: View and manage timesheet entries
- **CRUD Operations**: Create, read, update, and delete timesheets
- **Pagination**: Table pagination with 5 entries per page
- **Form Validation**: Client-side validation with error states
- **Responsive Design**: Mobile and desktop optimized
- **Testing**: Jest and React Testing Library tests

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **Authentication**: NextAuth.js
- **UI Components**: shadcn/ui
- **Testing**: Jest, React Testing Library
- **State Management**: React Hooks

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
\`\`\`bash
git clone <repository-url>
cd ticktock
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Demo Credentials

- **Email**: user@example.com
- **Password**: password123

## Project Structure

\`\`\`
ticktock/
├── app/
│   ├── api/
│   │   ├── auth/          # NextAuth API routes
│   │   └── timesheets/    # Timesheet API endpoints
│   ├── dashboard/         # Dashboard page
│   ├── login/             # Login page
│   └── layout.tsx         # Root layout
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── dashboard-header.tsx
│   ├── timesheet-table.tsx
│   └── timesheet-modal.tsx
├── lib/
│   ├── auth.ts            # NextAuth configuration
│   ├── validation.ts      # Form validation logic
│   └── timesheet-data.ts  # Mock data
├── types/
│   └── timesheet.ts       # TypeScript types
└── __tests__/             # Test files
\`\`\`

## Features in Detail

### Authentication
- NextAuth.js with credentials provider
- Session-based authentication with JWT
- Protected routes with middleware
- Secure logout functionality

### Dashboard
- Paginated table view (5 entries per page)
- Status badges (Completed, Incomplete, Missing)
- View, Edit, and Create actions
- Real-time data updates

### Form Validation
- Required field validation
- Week number range validation (1-53)
- Hours logged validation (0-168)
- Date range format validation
- Real-time error feedback

### API Routes
- GET /api/timesheets - Fetch all timesheets
- POST /api/timesheets - Create new timesheet
- GET /api/timesheets/[id] - Fetch single timesheet
- PUT /api/timesheets/[id] - Update timesheet
- DELETE /api/timesheets/[id] - Delete timesheet

### Testing
Run tests with:
\`\`\`bash
npm test
\`\`\`

## Design

The application follows a clean, modern design with:
- **Primary Color**: Blue (#2563eb / Tailwind blue-600)
- **Background**: White and light gray
- **Typography**: Geist Sans font family
- **Layout**: Split-panel login, clean dashboard interface

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Deploy with one click

The app is optimized for Vercel deployment with automatic environment variable handling.

## Assumptions & Notes

- **Data Storage**: Currently uses in-memory storage. In production, integrate with a database (PostgreSQL, MongoDB, etc.)
- **Authentication**: Uses dummy credentials for demo purposes. In production, integrate with a real user database
- **Validation**: Client-side validation is implemented. Server-side validation should be added for production
- **Time Tracking**: The app manages weekly timesheets. Additional features like daily time tracking could be added
- **Permissions**: Currently single-user. Multi-user support with role-based access control could be added

## Time Spent

Approximately 3-4 hours for:
- Project setup and configuration
- Authentication implementation
- UI/UX design and components
- API routes and data management
- Form validation
- Testing setup
- Documentation

## Future Enhancements

- Database integration (Supabase, Neon, etc.)
- Real user authentication with email verification
- Export timesheets to PDF/CSV
- Time tracking analytics and reports
- Multi-user support with teams
- Mobile app version
- Dark mode support

## License

MIT

## Contact

For questions or support, please open an issue in the repository.
\`\`\`
