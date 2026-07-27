# MERN Job Portal

A full-stack Job Portal web application built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). The platform allows employers to post job openings and manage applicants, while candidates can search for jobs, apply online, upload resumes, and track application status.

---

## Features

### Authentication
- User Registration
- User Login
- JWT Authentication
- Password Encryption using bcrypt

### Candidate
- View Available Jobs
- Search Jobs
- Filter Jobs by Location and Job Type
- Apply for Jobs
- Track Application Status (ATS)
- Upload Resume (PDF)
- View Profile

### Employer
- Post New Jobs
- Update Job Details
- Delete Jobs
- View Posted Jobs
- View Applicants
- Update Applicant Status
  - Applied
  - Reviewing
  - Interview
  - Selected
  - Rejected

### Admin
- Admin Dashboard
- View Statistics
- Manage Users
- Manage Jobs

---

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- Multer

### Database
- MongoDB Atlas
- Mongoose

---

## Project Structure

```
JobPortal/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

---

### Backend Setup

```bash
cd server
npm install
npm run dev
```

---

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the **server** folder.

```
PORT=5000

MONGO_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_secret_key
```

---

## API Modules

### Authentication
- Register
- Login
- Profile
- Resume Upload

### Jobs
- Create Job
- Update Job
- Delete Job
- Get All Jobs
- Get Single Job

### Applications
- Apply Job
- My Applications
- Applicants List
- ATS Status Update

---

## Database Collections

- Users
- Jobs
- Applications
- Messages
- Logs

---

## ATS Status

Employers can update application status as:

- Applied
- Reviewing
- Interview
- Selected
- Rejected

Candidates can view the latest status in **My Applications**.

---

## Deployment

### Frontend

Vercel

### Backend

Render

### Database

MongoDB Atlas

---

## Future Enhancements

- Chat System
- Email Notifications
- Company Reviews
- Interview Scheduling
- Job Recommendations

---

## Author

**Buddala Bebisree**

---

## License

This project is developed for educational purposes.