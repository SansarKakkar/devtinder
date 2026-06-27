# Link-Up

Backend API for **Link-Up** — a developer networking platform where you discover profiles, send connection requests, match on mutual interest, and chat in real time.

**Frontend:** [link-up-web](https://github.com/SansarKakkar/devtinder-web)

![Link-Up architecture](./docs/screenshots/architecture.svg)

## Features

- User signup, login, and logout with JWT cookie authentication
- Profile viewing and editing
- Paginated discover feed (excludes yourself, connections, and pending/ignored users)
- Send connection requests (`interested` / `ignored`)
- Review incoming requests (`accepted` / `rejected`)
- View accepted connections
- Real-time chat with Socket.IO
- MongoDB persistence with Mongoose

## Tech Stack

| Layer | Tools |
| ----- | ----- |
| Runtime | Node.js, Express 5 |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcrypt |
| Real-time | Socket.IO |
| Validation | validator |

## Project Structure

```
src/
├── app.js
├── config/database.js
├── middleware/auth.js
├── models/
├── routes/
│   ├── auth.js
│   ├── profile.js
│   ├── request.js
│   ├── user.js
│   └── chat.js
└── utils/
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
git clone https://github.com/SansarKakkar/devtinder.git
cd devtinder
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
DB_CONNECTION_SECRET=mongodb://127.0.0.1:27017/link-up
```

### Run

```bash
npm run dev   # development with nodemon
npm start     # production
```

Server runs at **http://localhost:3000**

## API Routes

### Auth

| Method | Route | Description |
| ------ | ----- | ----------- |
| POST | `/signup` | Register a new user |
| POST | `/login` | Login and set JWT cookie |
| POST | `/logout` | Clear auth cookie |

### Profile

| Method | Route | Auth | Description |
| ------ | ----- | ---- | ----------- |
| GET | `/profile` | Yes | Get logged-in user |
| PATCH | `/profile/edit` | Yes | Update profile |

### Feed & Users

| Method | Route | Auth | Description |
| ------ | ----- | ---- | ----------- |
| GET | `/feed?page=1&limit=10` | Yes | Paginated discover feed |
| GET | `/user/requests/received` | Yes | Incoming connection requests |
| GET | `/user/connections` | Yes | Accepted connections |

### Connection Requests

| Method | Route | Auth | Description |
| ------ | ----- | ---- | ----------- |
| POST | `/Request/send/:status/:toUserId` | Yes | Send request |
| POST | `/Request/review/:status/:requestId` | Yes | Accept or reject request |

### Chat

| Method | Route | Auth | Description |
| ------ | ----- | ---- | ----------- |
| GET | `/chat/:targetUserId` | Yes | Get or create chat thread |

## Frontend Integration

The [link-up-web](https://github.com/SansarKakkar/devtinder-web) client connects to:

- **Local:** `http://localhost:3000`
- **Production:** `/api` (via reverse proxy)

CORS is configured for `http://localhost:5173` during development.

## Author

**Sansar Kakkar**

## License

ISC
