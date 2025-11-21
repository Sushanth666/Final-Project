🎬 Movie Review App (MERN)

A simple movie review platform where users can explore movies, view detailed information, submit reviews, and manage their favorites. Built with the MERN stack and optimized for clean UI and smooth user flow.

⭐ Features

User registration and login with JWT

View all movies with thumbnails

Movie detail page with:

Description

Year

Genres

Rating (10-point scale)

YouTube trailer (embed)

Add and remove favorites

Dashboard showing favorite movies

Add reviews for each movie

🖼️ Screenshots

Replace the dummy image URLs with your own GitHub image links.

Home Page

Movie Detail

Dashboard (Favorites)

Login Page

🧰 Tech Stack

Frontend:
React, React Router, Context API, Axios

Backend:
Node.js, Express, MongoDB, JWT

📁 Folder Structure
project/
│
├── backend/
│   ├── routes/
│   │   ├── auth.js
│   │   ├── movies.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   ├── models/
│   ├── server.js
│
└── frontend/
    ├── src/
        ├── pages/
        ├── components/
        ├── context/
        ├── data/

🔧 Installation and Setup
Clone repository
git clone <your-repo-url>
cd project

Backend setup
cd backend
npm install

Frontend setup
cd ../frontend
npm install

🔑 Environment Variables

Create .env inside backend:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

▶️ Running the Project
Start backend
cd backend
npm start

Start frontend
cd frontend
npm run dev


Frontend → http://localhost:5173

Backend → http://localhost:5000

🔗 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register user
POST	/api/auth/login	Login user
Movies
Method	Endpoint	Description
GET	/api/movies	Get all movies
GET	/api/movies/:id	Get movie details
Reviews
Method	Endpoint	Description
POST	/api/movies/:id/reviews	Submit review
🐞 Common Issues

movies is not defined
You’re mapping on a value that hasn’t loaded. Fix by checking your fetch or import.

401 Unauthorized
Ensure JWT is added in headers:

Authorization: Bearer <token>


CORS errors
Make sure your backend has:

app.use(cors());

🚀 Future Enhancements

Search and filtering

Pagination

User profile page

Improved rating system
