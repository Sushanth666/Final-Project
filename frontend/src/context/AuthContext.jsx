// import React, { createContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();

//   // --- Updated, safer state initialization ---
//   const [user, setUser] = useState(() => {
//     const storedUser = localStorage.getItem('user');
//     localStorage.setItem("token", res.data.token);

//     // Check for null OR the bad "undefined" string
//     if (!storedUser || storedUser === 'undefined') {
//       localStorage.removeItem('user'); // Clean up bad data
//       return null;
//     }

//     // Use a try/catch in case the JSON is corrupted
//     try {
//       return JSON.parse(storedUser);
//     } catch (error) {
//       console.error("Failed to parse stored user:", error);
//       localStorage.removeItem('user'); // Clean up corrupted JSON
//       return null;
//     }
//   });

//   const login = (userData) => {
//     // Add a check to prevent saving 'undefined'
//     if (userData) {
//       localStorage.setItem('user', JSON.stringify(userData));
//       setUser(userData);
//       navigate('/home'); // Redirect to /home on login
//     } else {
//       console.error("Login called with undefined user data");
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('user');
//     setUser(null);
//     navigate('/'); // Redirect to login page on logout
//   };

//   const isAuthenticated = !!user;

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
// import React, { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(() => {
//     const stored = localStorage.getItem("user");
//     if (!stored) return null;
//     try {
//       return JSON.parse(stored);
//     } catch {
//       localStorage.removeItem("user");
//       return null;
//     }
//   });

//   const login = (data) => {
//     // Save token
//     if (data.token) {
//       localStorage.setItem("token", data.token);
//     }

//     // Save user
//     if (data.user) {
//       localStorage.setItem("user", JSON.stringify(data.user));
//       setUser(data.user);
//     }

//     navigate("/home");
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
// src/context/AuthContext.jsx
// import React, { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(() => {
//     try {
//       const raw = localStorage.getItem("user");
//       return raw && raw !== "undefined" ? JSON.parse(raw) : null;
//     } catch {
//       localStorage.removeItem("user");
//       return null;
//     }
//   });

//   const login = (payload) => {
//     // payload = { user: {...}, token: "..." }
//     if (payload?.token) localStorage.setItem("token", payload.token);
//     if (payload?.user) {
//       localStorage.setItem("user", JSON.stringify(payload.user));
//       setUser(payload.user);
//     }
//     navigate("/home");
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
// src/context/AuthContext.jsx
// import React, { createContext, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const navigate = useNavigate();

//   const [user, setUser] = useState(() => {
//     try {
//       const u = localStorage.getItem("user");
//       return u ? JSON.parse(u) : null;
//     } catch {
//       return null;
//     }
//   });

//   const login = ({ user, token }) => {
//     if (token) localStorage.setItem("token", token);
//     if (user) localStorage.setItem("user", JSON.stringify(user));
//     setUser(user);
//     navigate("/home");
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     setUser(null);
//     navigate("/");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
    navigate("/home");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
