import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
// Changed the import path to use the '@' alias,
// which is a common convention for the 'src' directory.
import AuthContext from '@/context/AuthContext.jsx';

/**
 * This component checks if a user is logged in.
 * If they are, it renders the 'children' (the page).
 * If they are NOT, it redirects them to the login page ('/').
 */
export default function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    // User is not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  // User is authenticated, render the requested page
  return children;
}