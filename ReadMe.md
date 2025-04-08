# Assignment 4: Therapist Client Management System

## Introduction

Completing a simple system for a user to manage therapists, clients and sessions.

Backend deployment:
https://cs230-lab3-backend.vercel.app/

Frontend deployment:
https://full-stack-music-application.vercel.app/# Full-Stack Music Application

## Task Description

### Part 1: React (Frontend Development) (20%)

**Home Page (5%)**:

- Create a React app with separate pages for the Therapist, Client and Session Pages
- Use React Router and add buttons to the home page to navigate between each of the pages.

**Therapist Page (5%)**:

- Design and implement a dashboard displaying all therapists in a tabular format.
- Display all the information about them from the model in a tidy fashion.
- Enable user to perform CRUD operations (Create, Read, Update, Delete) on therapists directly from the dashboard.

**Client Page (5%)**:

- Design and implement a dashboard displaying all clients in a tabular format.
- Display all the information about them from the model in a tidy fashion.
- Enable user to perform CRUD operations (Create, Read, Update, Delete) on clients directly from the dashboard.

**Session Page (5%)**:

- Design and implement a dashboard displaying all sessions in a tabular format.
- Display all the information about them from the model in a tidy fashion.
- Enable user to perform CRUD operations (Create, Read, Update, Delete) on sessions directly from the dashboard.

### Part 2: Express / Node.js (Backend Development) (40%)

Making a server that processes requests the user makes on the UI, perform the correct command, and return the correct data from the database.

**Express Server (10%)**:

- Set up an Express server to handle incoming requests from the frontend.
- Implement routes and controllers for therapists, clients and sessions.

**Routes / Controllers (30%)**:

- Define routes and corresponding controllers to handle CRUD operations for therapists.
- Define routes and corresponding controllers to handle CRUD operations for clients.
- Define routes and corresponding controllers to handle CRUD operations for sessions.

### Part 3: SQL (Database) (20%)

**Models (20%)**:
- Design database tables to store therapist, clients and sessions information.
- Clients should have a name, email, phone number.
- Therapists should have a title, name, email, location, years of practice and availability (TAKING CLIENTS/NOT TAKING CLIENTS).
- Sessions should have a therapist (use key from other database), client (use key from other database), regularity of appointments (WEEKLY/MONTHLY), notes, date and length.

### Part 4: Porject Structure (20%)



```
frontend/                  # Frontend root directory
├── public/                # Static public assets
│   └── index.html         # HTML template
├── src/                   # Source code directory
│   ├── pages/             # React page components
│   │   ├── Client.js      # Client page component
│   │   ├── Home.js        # Home page component
│   │   ├── Session.js     # Session page component
│   │   └── Therapist.js   # Therapist page component
│   ├── App.js             # Main React component with routing logic
│   └── index.js           # React entry point
├── .gitignore             # Files and folders ignored by Git
├── package.json           # Project metadata and frontend dependencies
├── package-lock.json      # Locked versions of dependencies
└── README.md              # Project documentation
```

```
backend/                   # Backend root directory
├── controllers/           # Request handling logic
│   ├── clientController.js    # Controller for client-related operations
│   ├── sessionController.js   # Controller for session-related operations
│   └── therapistController.js # Controller for therapist-related operations
├── routes/                # Express route definitions
│   ├── clientRoutes.js        # Routes for client APIs
│   ├── sessionRoutes.js       # Routes for session APIs
│   └── therapistRoutes.js     # Routes for therapist APIs
├── node_modules/          # Installed backend dependencies
├── .env                   # Environment variable configuration
├── db.js                  # Database connection logic
├── package.json           # Backend project metadata and dependencies
├── package-lock.json      # Locked backend dependency versions
└── server.js              # Express server entry point
```

```
└── model.sql              # SQL schema definitions
```