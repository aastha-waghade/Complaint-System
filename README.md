# 🚀 Ticket Management System

A simple and user-friendly **Ticket Management System** for submitting, tracking, and managing complaints efficiently.

The system allows users to submit complaints, receive a unique ticket ID, track the status of their tickets, and provides administrators with a dashboard to manage and update complaints.

---

## 📌 Features

### 📝 Submit Complaint

Users can submit a complaint by providing:

* Full Name
* Email
* Complaint Subject
* Detailed Description
* Priority

  * Low
  * Medium
  * High
* Supporting files such as images or PDF documents

After successful submission, the system generates a **unique Ticket ID**.

---

### 🔍 Track Ticket

Users can track their complaint using their **Ticket ID**.

The tracking section displays information such as:

* Ticket ID
* Complaint Status
* Name
* Email
* Subject
* Priority
* Created Date

Available ticket statuses:

* 🟡 Pending
* 🔵 In Progress
* 🟢 Resolved

---

### ⚙️ Admin Dashboard

The admin dashboard allows administrators to manage submitted complaints.

Admin features include:

* 🔐 Admin Login
* 📋 View all tickets
* 🔍 Search tickets
* Filter tickets by status
* Filter tickets by priority
* 🔄 Refresh ticket list
* Update ticket status
* Automatic priority sorting

Tickets are automatically sorted according to priority:

**High → Medium → Low**

---

### 📎 File Upload

Users can optionally attach supporting files to their complaints.

Supported file types:

* 🖼️ Images
* 📄 PDF

The frontend checks that the selected file is below **500 KB**.

---

## 🎨 User Interface

The project uses a modern dark/glassmorphism-inspired interface with:

* Gradient background
* Glass-effect cards
* Responsive design
* Animated tab switching
* Status badges
* Priority badges
* Loading indicators
* Mobile-friendly layout

---

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* Fetch API
* FileReader API

### Backend

The frontend communicates with a backend using a **Google Apps Script Web App API**.

The JavaScript sends requests to the backend for:

* Complaint submission
* Ticket tracking
* Admin authentication
* Fetching tickets
* Updating ticket status

---

## 📂 Project Structure

```text
Ticket-Management-System/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

### `index.html`

Contains the complete user interface, including:

* Submit Complaint section
* Track Ticket section
* Admin Login
* Admin Dashboard
* Search and filter controls
* File upload interface

### `style.css`

Contains all styling for:

* Layout
* Forms
* Buttons
* Tabs
* Ticket cards
* Status badges
* Priority badges
* Admin dashboard
* Responsive/mobile design

### `script.js`

Handles the application's functionality, including:

* Tab navigation
* Complaint submission
* API communication
* Ticket tracking
* Admin login
* Ticket loading
* Ticket searching
* Filtering
* Status updates
* Priority sorting
* File validation and preview

---

## 🔄 How the System Works

```text
                 ┌─────────────────────┐
                 │       User          │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Submit Complaint    │
                 │ Name / Email / etc. │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Backend API         │
                 │ Google Apps Script  │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Store Ticket Data   │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Generate Ticket ID  │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ User Tracks Ticket  │
                 └─────────────────────┘


                  ADMIN WORKFLOW

                 ┌─────────────────────┐
                 │    Admin Login      │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Admin Dashboard     │
                 └──────────┬──────────┘
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
          Search        Filter        Refresh
              │             │             │
              └─────────────┼─────────────┘
                            ▼
                 ┌─────────────────────┐
                 │ Manage Tickets     │
                 └──────────┬──────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │ Update Status      │
                 │ Pending            │
                 │ In Progress        │
                 │ Resolved           │
                 └─────────────────────┘
```

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Ticket-Management-System.git
```

### 2. Open the Project

```bash
cd Ticket-Management-System
```

### 3. Project Files

Make sure the project contains:

```text
index.html
style.css
script.js
```

### 4. Configure Backend

The application uses a Google Apps Script Web App as its backend.

In `script.js`, configure the backend API URL:

```javascript
const SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";
```

Replace the placeholder with your deployed Google Apps Script Web App URL.

### 5. Run the Project

You can open `index.html` directly in a browser or use **VS Code Live Server**.

For example:

```text
Right Click → Open with Live Server
```

---

## 🔌 API Actions

The frontend communicates with the backend using different actions.

| Action         | Purpose                        |
| -------------- | ------------------------------ |
| `submit`       | Submit a new complaint         |
| `track`        | Track a ticket using Ticket ID |
| `adminLogin`   | Authenticate administrator     |
| `getTickets`   | Retrieve tickets for dashboard |
| `updateStatus` | Change ticket status           |

---

## 🎫 Ticket Priority

Tickets are categorized into three priority levels:

| Priority  | Meaning                          |
| --------- | -------------------------------- |
| 🟢 Low    | Minor issue                      |
| 🟡 Medium | Normal issue requiring attention |
| 🔴 High   | Important or urgent issue        |

The admin dashboard displays high-priority tickets first.

---

## 📊 Ticket Status

| Status         | Description                                            |
| -------------- | ------------------------------------------------------ |
| 🟡 Pending     | Complaint has been submitted and is waiting for action |
| 🔵 In Progress | Complaint is currently being worked on                 |
| 🟢 Resolved    | Complaint has been successfully resolved               |

---

## 🔐 Admin Dashboard

The admin section is protected by a login screen.

```text
Admin Login
     │
     ▼
Authentication
     │
 ┌───┴────┐
 │        │
 ❌       ✅
 │        │
Error    Dashboard
          │
          ▼
     Manage Tickets
```

After successful authentication, the administrator can view and manage tickets.

---

## 📱 Responsive Design

The interface is designed to work on:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📱 Tablet

The layout automatically changes for smaller screens.

---

## ⚠️ Important Notes

* Keep the Google Apps Script Web App URL correctly configured in `script.js`.
* Files are limited to **500 KB per file** by the frontend validation.
* The current JavaScript file-selection logic reads the **first selected file** for submission, even though the HTML input allows multiple files.
* Admin credentials should be securely handled on the backend rather than exposed in frontend JavaScript.

---

## 🔮 Future Improvements

Possible improvements for future versions:

* [ ] User registration and login
* [ ] Email notification when a ticket is created
* [ ] Email notification when ticket status changes
* [ ] Multiple file upload support
* [ ] Ticket comments/replies
* [ ] Admin logout
* [ ] Admin role management
* [ ] Ticket analytics and charts
* [ ] Pagination for large numbers of tickets
* [ ] Dark/light theme switch
* [ ] Export tickets to Excel/PDF
* [ ] Better authentication and authorization
* [ ] Automatic ticket categorization using AI

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/new-feature
```

3. Make your changes
4. Commit your changes

```bash
git commit -m "Add new feature"
```

5. Push the branch

```bash
git push origin feature/new-feature
```

6. Create a Pull Request

---

## 📄 License

This project is created for **educational and project development purposes**.

You are free to modify and improve it according to your requirements.

---

## 👩‍💻 Author

**Aastha Waghade**

---

⭐ If you find this project useful, consider giving the repository a **star**!

# 🚀 Ticket Management System

**Submit complaints. Track tickets. Manage issues efficiently.**
