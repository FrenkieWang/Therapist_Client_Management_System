# Assignment 4: Therapist Client Management System

## Introduction

In this application, you will be asked to create a simple system for a user to manage therapists, clients and sessions.

### Task 1: React (Frontend Development) (20%)

#### Requirements:

- **Home Page (5%)**:

- Create a React app with separate pages for the Therapist, Client and Session Pages
- Use React Router and add buttons to the home page to navigate between each of the pages.

- **Therapist Page (5%)**:

- Design and implement a dashboard displaying all therapists in a tabular format.
- Display all the information about them from the model in a tidy fashion..
- Enable user to perform CRUD operations (Create, Read, Update, Delete) on therapists directly from the dashboard.

- **Client Page (5%)**:

- Design and implement a dashboard displaying all clients in a tabular format.
- Display all the information about them from the model in a tidy fashion..
- Enable user to perform CRUD operations (Create, Read, Update, Delete) on clients directly from the dashboard.

- **Session Page (5%)**:

- Design and implement a dashboard displaying all sessions in a tabular format.
- Display all the information about them from the model in a tidy fashion..
- Enable user to perform CRUD operations (Create, Read, Update, Delete) on sessions directly from the dashboard.

### Task 2: Express / Node.js / SQL (60%)

You will be required to make a server that processes requests the user makes on the UI, perform the correct command, and return the correct data from the database.

#### Requirements:

- **Express Server (10%)**:

- Set up an Express server to handle incoming requests from the frontend.
- Implement routes and controllers for therapists, clients and sessions.

- **Routes / Controllers (30%)**:

- Define routes and corresponding controllers to handle CRUD operations for therapists.
- Define routes and corresponding controllers to handle CRUD operations for clients.
- Define routes and corresponding controllers to handle CRUD operations for sessions.

- **Models (20%)**:
- Design database tables to store therapist, clients and sessions information.
- Clients should have a name, email, phone number and regularity of appointments (WEEKLY/MONTHLY).
- Therapists should have a title, name, email, location, years of practice and availability (TAKING CLIENTS/NOT TAKING CLIENTS).
- Sessions should have a therapist (use key from other database), client (use key from other database), notes, date and length.

### Task 3: Demonstrator Explanation (20%)

Students will be asked two questions regarding the assignment and key concepts used in the project. Each question is worth 10% of the assignment.

## Deliverables

Submit a .ZIP file to Moodle containing the following items:

- frontend
- backend
- screenshot.jpg (Screenshot of the home page)

Exclude the `node_modules` folder from both.

## Extra Notes

Students are encouraged to seek assistance from demonstrators for clarification or questions regarding the assignment.

## Project Structure

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