# 📝 Web App for Managing Notes and Checklists

Hello! I'd like to share with you this project — a fully functional web application for creating and managing notes and checklists.

## 📌 What is this project about?

This project is built using **FastAPI** (backend) and **React.js** (frontend).  
It supports:
- Authentication (JWT)
- Filtering and sorting
- Pinning notes/checklists
- Full CRUD operations
- Responsive layout and clean UI

## 🎯 Why did I build this?

While exploring the popular tech stack for modern web development, I reviewed many open-source projects.  
I noticed that many simple repositories often lacked:
- Good modular structure
- Real-world features
- Clear full-stack implementation

So I built this project for **educational purposes** to serve as a reference for beginners who want to understand not just how to build such apps, but how to **structure** them cleanly and efficiently.

## 📚 Tech Stack

### Backend:
- FastAPI
- SQLAlchemy
- Pydantic
- PostgreSQL
- JWT (python-jose, passlib)
- Depends and more.

### Frontend:
- React
- React Router
- Axios
- Lucide Icons
- CSS (no Tailwind)

## 🧠 Key Concepts and Technologies

### 🎨 Frontend (React)
- SPA (Single Page Application)
- Context API for authentication
- Custom hooks
- Asynchronous API calls (async/await)
- CSS modules (no Tailwind)
- Routing via `react-router-dom`

**Resources**:
- [React Documentation](https://reactjs.org/docs/getting-started.html)  
- [React Router](https://reactrouter.com/en/main)  
- [Axios](https://axios-http.com/)

### ⚙️ Backend (FastAPI)
- Modular routing
- CRUD logic separated via `crud/`
- Dependency injection system
- Swagger/OpenAPI documentation
- JWT authentication system

**Resources**:
- [FastAPI Docs](https://fastapi.tiangolo.com/)  
- [FastAPI User Guide](https://fastapi.tiangolo.com/tutorial/)

### 🧵 Async Programming
- All routes use `async def`
- `await` for DB queries and I/O
- Highly performant under load

## 📁 Project Structure

```plaintext
project-root/
├── .env                        # Environment variables
├── 📁 backend/                 # Backend (FastAPI)
│   ├── 📁 app/
│   │   ├── 📁 api/             # All API routes
│   │   │   ├── auth.py             # Authentication and registration
│   │   │   ├── notes.py            # Note management
│   │   │   ├── checklists.py       # Checklist management
│   │   │   └── common.py           # Shared functionality
│   │   ├── 📁 core/            # Configuration and initialization
│   │   │   ├── config.py           # Settings from .env file
│   │   │   └── security.py         # Token and password hashing
│   │   ├── 📁 db/              # Database and models
│   │   │   ├── base.py             # Base from declarative_base
│   │   │   ├── database.py         # Database connection
│   │   │   └── models.py           # SQLAlchemy models
│   │   ├── 📁 schemas/         # Pydantic schemas
│   │   │   ├── user.py
│   │   │   ├── note.py
│   │   │   ├── checklist.py
│   │   │   └── common.py
│   │   ├── 📁 crud/            # CRUD business logic
│   │   │   ├── user.py
│   │   │   ├── note.py
│   │   │   └── checklist.py
│   │   ├── 📁 dependencies/    # Depends-based injections
│   │   │   └── auth.py
│   │   ├── main.py                 # FastAPI application entry point
│   │   └── initdb.py              # Initialize DB and create default user
│   └── requirements.txt      # Python dependencies
│
├── 📁 frontend/               # Frontend (React.js)
│   ├── 📁 public/
│   │   └── index.html              # Main HTML file
│   ├── 📁 src/
│   │   ├── 📁 api/
│   │   │   └── axiosClient.js      # Axios config and API requests
│   │   ├── 📁 components/
│   │   │   ├── HeaderBar.jsx       # Top control panel
│   │   │   ├── HeaderBar.css
│   │   │   ├── NoteCard.js         # Note preview card
│   │   │   ├── ChecklistCard.js    # Checklist preview card
│   │   │   └── Card.css
│   │   ├── 📁 context/
│   │   │   └── AuthContext.jsx     # Auth context provider
│   │   ├── 📁 hooks/
│   │   │   └── useAuth.jsx         # Auth-related custom hook
│   │   ├── 📁 pages/
│   │   │   ├── LoginPage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── DashboardPage.jsx
│   │   │   ├── AddNotePage.jsx
│   │   │   ├── AddChecklistPage.jsx
│   │   │   ├── ViewNotePage.jsx
│   │   │   ├── ViewChecklistPage.jsx
│   │   │   ├── AuthPages.css
│   │   │   ├── ChecklistPage.css
│   │   │   ├── NotePage.css
│   │   │   └── DashboardPage.css
│   │   ├── 📁 utils/
│   │   │   └── auth.js             # Token utilities
│   │   ├── App.js
│   │   ├── main.jsx
│   │   ├── router.jsx              # React Router setup
│   │   ├── index.jsx
│   │   └── index.css
│   ├── package.json
│   └── package-lock.json
```

## 🚀 Functions

- 📌 Notes & Checklists (add/edit/delete)
- ✅ Checklist items support
- 📍 Pinning (up to 15 pinned items per user)
- 🔎 Filtering & Sorting (by date or title)
- 🧭 Full-text search
- 👤 JWT-based authentication
- 💡 Responsive layout

## 🖼️ Project Screenshots

> 📸 *See actual screenshots in the repository:*
#### Interactive API docs (Swagger)
![Interactive API docs (Swagger)](https://github.com/wettigo/full-stack-fastapi-react-postgres/blob/ad77297d4015af107ced6e86a750e134d354aef6/img/docs.jpg?raw=true)
#### Interactive API docs (Swagger)
![Login page](https://github.com/wettigo/full-stack-fastapi-react-postgres/blob/ad77297d4015af107ced6e86a750e134d354aef6/img/login.jpg?raw=true)
#### Registration page
![Registration page](https://github.com/wettigo/full-stack-fastapi-react-postgres/blob/ad77297d4015af107ced6e86a750e134d354aef6/img/registration.jpg?raw=true)
#### Empty dashboard view
![Empty dashboard view](https://github.com/wettigo/full-stack-fastapi-react-postgres/blob/ad77297d4015af107ced6e86a750e134d354aef6/img/dashboard.jpg?raw=true)
#### Add note page
![Add note page](https://github.com/wettigo/full-stack-fastapi-react-postgres/blob/ad77297d4015af107ced6e86a750e134d354aef6/img/add_note.jpg?raw=true)
#### Add checklist page
![Add checklist page](https://github.com/wettigo/full-stack-fastapi-react-postgres/blob/ad77297d4015af107ced6e86a750e134d354aef6/img/add_checklist.jpg?raw=true)
#### View note with full features
![View note with full features](https://github.com/wettigo/full-stack-fastapi-react-postgres/blob/ad77297d4015af107ced6e86a750e134d354aef6/img/view_note.jpg?raw=true)
#### View checklist with full features
![View checklist with full features](https://github.com/wettigo/full-stack-fastapi-react-postgres/blob/ad77297d4015af107ced6e86a750e134d354aef6/img/view_checklist.jpg?raw=true)
#### Full dashboard view
![Full dashboard view](https://github.com/wettigo/full-stack-fastapi-react-postgres/blob/ad77297d4015af107ced6e86a750e134d354aef6/img/dashboard_full.jpg?raw=true)
#### Profile popup
![Profile popup](https://github.com/wettigo/full-stack-fastapi-react-postgres/blob/ad77297d4015af107ced6e86a750e134d354aef6/img/profile.jpg?raw=true)

## 🛠️ Installation and Launch

### 📥 Clone the Repository

```bash
git clone https://github.com/wettigo/full-stack-fastapi-react-postgres.git
cd full-stack-fastapi-react-postgres
```

### 🛠️ Backend (FastAPI)

Go to the folder with the backend part of the project and creates a virtual environment in the "venv" folder:

```bash
cd backend
python -m venv venv
```

Activates the virtual environment:
```bash
venv\Scripts\activate
pip install -r requirements.txt
```

Installs all dependencies from the requirements.txt file:
```bash
pip install -r requirements.txt
```

### ⚙️ Create .env file and set DATABASE_URL

Go to the folder with the backend part of the project and initialize the database and create a test user:

```bash
cd full-stack-fastapi-react-postgres
python -m backend.app.initdb
```

Run the server:
```bash
uvicorn app.main:app --reload
```
- Backend: http://127.0.0.1:8000

## 🌐 Frontend (React)

Go to the frontend folder and installs all dependencies from package.json:
```bash
cd frontend
npm install
```

Run the frontend:
```bash
npm run dev
```

- Frontend: http://127.0.0.1:3000

## 🔐 Test Login

- Username: test
- Password: test123

## 📦 Notes
- All data is stored in PostgreSQL.
- Validation with Pydantic.
- UI built with classic CSS (not Tailwind).

## ⏳ Project Status
This project is not yet complete. Development is ongoing and future versions will include improvements and new features.