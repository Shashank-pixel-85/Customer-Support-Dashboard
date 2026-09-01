# Customer Support Dashboard

A responsive customer support dashboard built with **React + Vite** and integrated with the **DummyJSON REST API** using Axios.

The project demonstrates REST API integration, CRUD operations, search, combined filtering, pagination, form handling and validation, reusable components, and API state management.

## Live Demo

- **Deployed Application:** Add your Vercel/Netlify URL here
- **GitHub Repository:** Add your GitHub repository URL here

## Features

- Support ticket list with customer and assigned-agent information
- Search by customer name, ticket subject, or ticket ID
- Combined status and priority filters
- Ticket details modal
- Create ticket using POST
- Update ticket using PATCH
- Delete ticket using DELETE with confirmation
- Pagination with 10 tickets per page
- Dashboard summary cards
- Customer and agent data loaded from DummyJSON Users API
- Assigned-agent dropdown populated from API data
- Client-side form validation
- Loading, error, empty-result, and success states
- Responsive desktop, tablet, and mobile layouts
- Clean SaaS-style UI
- React Icons for interface actions

## Tech Stack

- React
- Vite
- JavaScript
- Axios
- React Hooks
- React Icons
- CSS
- DummyJSON REST API

## API

Base URL:

```text
https://dummyjson.com
```

### Endpoints Used

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/todos` | Retrieve ticket data |
| GET | `/users?limit=0` | Retrieve customer/agent user data |
| POST | `/todos/add` | Create a ticket |
| PATCH | `/todos/:id` | Update a ticket |
| DELETE | `/todos/:id` | Delete a ticket |

DummyJSON is used as a mock REST API. Its mutation endpoints simulate successful POST/PATCH/DELETE operations rather than providing a permanent database for frontend-created records. The application therefore maintains created/updated/deleted ticket state in React for the current session.

## Project Structure

```text
customer-support-dashboard/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── components/
│   │   ├── FilterBar.jsx
│   │   ├── Pagination.jsx
│   │   ├── SearchBar.jsx
│   │   ├── SummaryCards.jsx
│   │   ├── TicketDetails.jsx
│   │   ├── TicketForm.jsx
│   │   └── TicketTable.jsx
│   │
│   ├── pages/
│   │   └── Dashboard.jsx
|   |   |__ TicketDetails.jsx
│   │
│   ├── services/
│   │   └── ticketApi.js
│   │
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── README.md
└── vite.config.js
```

## Component Responsibilities

### Dashboard

`Dashboard.jsx` is the main application page. It manages:

- Ticket state
- Agent state
- Search state
- Status and priority filters
- Pagination
- Selected ticket
- Create/edit form state
- Loading and error states
- CRUD operations
- Success messages

### TicketTable

Displays the ticket list in a responsive, horizontally scrollable table and provides View, Edit, and Delete actions.

### TicketForm

A reusable form for both creating and editing tickets.

It handles:

- Controlled inputs
- Validation
- Customer information
- Ticket details
- Priority
- Status
- Assigned agent
- Submission state

### TicketDetails

Displays complete information about the selected ticket in a modal.

### SearchBar

Provides dynamic search by:

- Customer name
- Ticket subject
- Ticket ID

### FilterBar

Provides combined filters for:

- Status
- Priority

### Pagination

Handles page navigation for the filtered ticket list.

### SummaryCards

Calculates and displays:

- Total Tickets
- Open Tickets
- In Progress
- Resolved
- High Priority

### ticketApi

Contains the Axios instance and all REST API functions, keeping API communication separate from UI components.

## Data Mapping

DummyJSON's `/todos` endpoint does not provide all fields required by the assignment.

The application therefore maps the available API data into the ticket model:

- `todo` → ticket subject
- `completed` → resolved/open state
- `userId` → customer lookup in `/users`
- priority → derived from ticket ID for demonstration
- description → generated from the ticket subject because DummyJSON does not provide a ticket description
- assigned agent → selected from real users returned by `/users`
- created/updated dates → generated for the dashboard display

This keeps the UI aligned with the assignment while using the provided mock API.

## Search and Filtering

Search is performed dynamically against:

```text
Customer Name
Ticket Subject
Ticket ID
```

The result is then filtered by the selected:

```text
Status
Priority
```

Both filters can be active at the same time.

Example:

```text
Search: login
Status: Open
Priority: High
```

Only tickets matching all active conditions are displayed.

## Pagination

The dashboard displays 10 tickets per page.

Pagination is applied after search and filtering:

```text
All tickets
    ↓
Search
    ↓
Status/Priority filters
    ↓
Pagination
    ↓
Displayed tickets
```

The page resets to page 1 whenever the search or filters change.

## CRUD Flow

### Read

```text
GET /todos
GET /users?limit=0
        ↓
Map API data
        ↓
Display dashboard
```

### Create

```text
Fill form
    ↓
Validate
    ↓
POST /todos/add
    ↓
Add ticket to dashboard state
```

### Update

```text
Edit ticket
    ↓
Validate
    ↓
PATCH /todos/:id
    ↓
Update dashboard state
```

### Delete

```text
Click Delete
    ↓
Confirmation
    ↓
DELETE /todos/:id
    ↓
Remove ticket from dashboard state
```

## Form Validation

The form validates all required fields:

- Customer Name
- Customer Email
- Subject
- Description
- Priority
- Status
- Assigned Agent

Customer email is also checked using an email-format validation rule.

## API State Management

The dashboard handles:

### Loading

A loading state is displayed while the initial API requests are being processed.

### API Error

If the API request fails, a user-friendly error message and retry button are displayed.

### Empty Results

If search/filter results are empty, the dashboard displays an appropriate empty state.

### Success

Create, update, and delete operations display confirmation messages.

## Responsive Design

The UI is designed for:

- Desktop
- Laptop
- Tablet
- Mobile

Responsive behavior includes:

- Summary cards adapting to available width
- Search and filters stacking on smaller screens
- Full-width mobile create button
- Responsive forms and modals
- Horizontally scrollable ticket table on small screens
- Pagination wrapping on narrow screens
- Mobile-friendly modal sizing

## Installation

Install dependencies:

```bash
npm install
```

## Development

Start the Vite development server:

```bash
npm run dev
```

## Lint

Run ESLint:

```bash
npm run lint
```

## Production Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Deployment

The application can be deployed to Vercel or Netlify.

### Build Command

```text
npm run build
```

### Output Directory

```text
dist
```

## Learning Outcomes

This project demonstrates practical understanding of:

- REST API integration
- HTTP GET
- HTTP POST
- HTTP PATCH
- HTTP DELETE
- Axios
- Async/Await
- React Hooks
- React state management
- Search and filtering
- Pagination
- CRUD operations
- Form handling
- Form validation
- Loading and error handling
- Empty states
- Reusable components
- Service-layer architecture
- Responsive frontend development

## Author

**Shashank Hiremath**

Frontend Development Assignment
