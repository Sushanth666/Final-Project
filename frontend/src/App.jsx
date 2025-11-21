// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route,RouterProvider,createBrowserRouter } from "react-router-dom";
// import { AuthProvider } from './context/AuthContext.jsx';
// import Layout from './components/Layout.jsx';
// import Home from './pages/Home.jsx';
// import Login from './pages/Login.jsx';
// import Register from './pages/Register.jsx';
// import Dashboard from './pages/Dashboard.jsx';
// import MovieDetail from './pages/MovieDetail.jsx';
// import ErrorPage from './pages/ErrorPage.jsx';
// import Navbar from './components/Navbar.jsx';
// import { Toaster } from 'react-hot-toast';
// import Settings from "./pages/Settings.jsx";

// // Layout component including Navbar with theme toggle
// function AppLayout({ theme, setTheme, children }) {
//   return (
//     <AuthProvider>
//       {/* <Navbar theme={theme} setTheme={setTheme} /> */}
//       <Layout theme={theme} setTheme={setTheme}>
//         {children}
//       </Layout>
//       <Toaster position="top-center" />
//     </AuthProvider>
//   );
// }

// const router = (theme, setTheme) => createBrowserRouter([
//   {
//     path: '/',
//     element: <AppLayout theme={theme} setTheme={setTheme} />,
//     children: [
//       { index: true, element: <Login theme={theme} /> },
//       { path: 'home', element: <Home theme={theme} /> },
//       { path: 'login', element: <Login theme={theme} /> },
//       { path: 'register', element: <Register theme={theme} /> },
//       { path: 'dashboard', element: <Dashboard theme={theme} /> },
//       { path: 'movie/:id', element: <MovieDetail theme={theme} /> },
//       { path: '*', element: <ErrorPage theme={theme} /> },
//     ],
//   },
// ]);

// export default function App() {
//   const [theme, setTheme] = useState(() => localStorage.getItem('mra_theme') || 'light');

//   useEffect(() => {
//     if (theme === 'dark') {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//     localStorage.setItem('mra_theme', theme);
//   }, [theme]);

//   return (
//     <div className={theme === 'dark' ? 'dark' : 'light'}>
//       <RouterProvider router={router(theme, setTheme)} />
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";
import Layout from "./components/Layout.jsx";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import Settings from "./pages/Settings.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import { Toaster } from "react-hot-toast";

// layout wrapper
function AppLayout({ theme, setTheme }) {
  return (
    <AuthProvider>
      <Layout theme={theme} setTheme={setTheme} />
      <Toaster position="top-center" />
    </AuthProvider>
  );
}

export default function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("mra_theme") || "light"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("mra_theme", theme);
  }, [theme]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout theme={theme} setTheme={setTheme} />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Login /> },
        { path: "home", element: <Home /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "dashboard", element: <Dashboard /> },

        // FIX: Add settings route correctly here
        { path: "settings", element: <Settings /> },

        { path: "movie/:id", element: <MovieDetail /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
