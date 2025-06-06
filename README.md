# Adwrap

**Adwrap** is a full-stack platform for managing outdoor media inventory like billboards and street poles. It allows users to create, manage, and visualize media assets and their availability, with support for face-level tracking and route breakdowns.

This monorepo consists of:

- 🧠 **Backend**: A Node.js REST API with PostgreSQL, for media and workspace management.  
- 🌐 **Frontend**: A responsive Next.js app for interacting with and managing media visually.

## 📦 Project Structure
```bash
/adwrap
├── backend/        # Media Items API (Node.js + PostgreSQL)
├── frontend/       # Web Client (Next.js + Tailwind CSS + ShadCN)
├
└── README.md       # You're here
```

## 🚀 Getting Started

### Prerequisites

- Node.js (used 24.1.0)
- PostgreSQL
- Docker (optional but recommended)
- Yarn / npm (used 11.3.0)

```bash
git clone https://github.com/your-username/adwrap.git
cd adwrap
```

## 🛠 Backend (Media Items API)

```bash
cd backend
npm install
cp .env.example .env
npm run migrate:dev
npm run start
```

To seed database run :
```bash
npm run seed
```

See [backend/README.md](backend/README.md) for full API docs and Docker support.


## 💻 Frontend 
```bash
cd frontend
npm install
npm run dev
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.


## TODO: Add validations, unit tests, authentication
