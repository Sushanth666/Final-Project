import React from 'react';
import { Link } from 'react-router-dom';

export default function ErrorPage() {
  return (
    // We use calc(100vh - 64px) to fill the screen *below* the 64px (h-16) navbar
    <div className="min-h-[calc(100vh-64px)] bg-linear-to-br from-[#0a001a] via-black to-[#1e0026] text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-9xl font-extrabold text-indigo-400">404</h1>
      <h2 className="mt-4 text-3xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-lg text-gray-400">Sorry, the page you're looking for doesn't exist.</p>
      <Link
        to="/home" // Link to your main "home" page
        className="mt-8 px-5 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-200 transform hover:scale-105"
      >
        Go Back Home
      </Link>
    </div>
  );
}