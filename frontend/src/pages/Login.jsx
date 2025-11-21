// import React, { useContext, useState, useEffect } from "react";
// import AuthContext from "../context/AuthContext";
// import ThemeContext from "../context/ThemeContext";
// import { useNavigate, Link } from "react-router-dom";
// import { loadJSON } from "../utils/storage";
// import toast from "react-hot-toast";
// import {
//   AtSymbolIcon,
//   LockClosedIcon,
//   EyeIcon,
//   EyeSlashIcon,
//   ArrowRightOnRectangleIcon,
// } from "@heroicons/react/24/outline";

// export default function Login() {
//   const { login, user } = useContext(AuthContext);
//   const { theme } = useContext(ThemeContext);
//   const navigate = useNavigate();

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   // Redirect when already logged in
//   useEffect(() => {
//     if (user) navigate("/home");
//   }, [user, navigate]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     if (form.password.length < 6) {
//       setError("Password must be at least 6 characters");
//       toast.error("Password must be at least 6 characters");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       const allUsers = loadJSON("mra_users", []);
//       const found = allUsers.find((u) => u.email === form.email);

//       if (!found) throw new Error("No user found with this email.");
//       if (found.password !== form.password)
//         throw new Error("Incorrect password. Please try again.");

//       toast.success("Login successful!");
//       login(found);
//     } catch (err) {
//       setError(err.message);
//       toast.error(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /* THEME-BASED CLASSES */
//   const pageBg =
//     theme === "dark"
//       ? "bg-black text-white"
//       : "bg-gray-100 text-gray-900";

//   const cardBg =
//     theme === "dark"
//       ? "bg-gray-900/80 border-gray-700"
//       : "bg-white border-gray-200";

//   const inputBg =
//     theme === "dark"
//       ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
//       : "bg-white border-gray-300 text-black placeholder-gray-500";

//   const iconColor = theme === "dark" ? "text-indigo-300" : "text-indigo-500";

//   return (
//     <div className={`min-h-screen flex items-center justify-center px-4 py-12 transition-colors duration-300 ${pageBg}`}>
//       <div className={`max-w-md w-full p-8 rounded-3xl shadow-xl border transition ${cardBg}`}>
//         <div className="text-center">
//           <ArrowRightOnRectangleIcon
//             className={`w-12 h-12 mx-auto ${iconColor}`}
//           />
//           <h2 className="mt-4 text-3xl font-extrabold animate-pulse">
//             Welcome Back
//           </h2>
//           <p className="mt-2 text-sm opacity-70">Sign in to continue.</p>
//         </div>

//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//           {/* EMAIL */}
//           <div className="relative">
//             <span className={`absolute left-4 top-3.5 pointer-events-none ${iconColor}`}>
//               <AtSymbolIcon className="h-5 w-5" />
//             </span>
//             <input
//               type="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               required
//               className={`w-full pl-12 p-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500 transition ${inputBg}`}
//             />
//           </div>

//           {/* PASSWORD */}
//           <div className="relative">
//             <span className={`absolute left-4 top-3.5 pointer-events-none ${iconColor}`}>
//               <LockClosedIcon className="h-5 w-5" />
//             </span>

//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={form.password}
//               onChange={(e) =>
//                 setForm({ ...form, password: e.target.value })
//               }
//               required
//               className={`w-full pl-12 pr-12 p-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500 transition ${inputBg}`}
//             />

//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className={`absolute right-4 top-3.5 ${iconColor}`}
//             >
//               {showPassword ? (
//                 <EyeSlashIcon className="h-5 w-5" />
//               ) : (
//                 <EyeIcon className="h-5 w-5" />
//               )}
//             </button>
//           </div>

//           {/* ERROR */}
//           {error && (
//             <p className="text-red-400 text-sm text-center">{error}</p>
//           )}

//           {/* LOGIN BUTTON */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full py-3 rounded-xl text-white font-bold shadow-lg transform transition hover:scale-105 ${
//               theme === "dark"
//                 ? "bg-indigo-700 hover:bg-indigo-800"
//                 : "bg-indigo-600 hover:bg-indigo-700"
//             }`}
//           >
//             {isLoading ? (
//               <svg
//                 className="animate-spin h-5 w-5 mx-auto"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 />
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 
//                 1.135 5.824 3 7.938l3-2.647z"
//                 />
//               </svg>
//             ) : (
//               "Login"
//             )}
//           </button>
//         </form>

//         <p className="mt-8 text-center text-sm opacity-80">
//           Don't have an account?{" "}
//           <Link
//             to="/register"
//             className="font-semibold text-indigo-400 hover:underline"
//           >
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
// import React, { useContext, useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import AuthContext from "../context/AuthContext";
// import ThemeContext from "../context/ThemeContext";
// import toast from "react-hot-toast";
// import API from "../api/api";

// import {
//   AtSymbolIcon,
//   LockClosedIcon,
//   EyeIcon,
//   EyeSlashIcon,
//   ArrowRightOnRectangleIcon,
// } from "@heroicons/react/24/outline";

// export default function Login() {
//   const { login, user } = useContext(AuthContext);
//   const { theme } = useContext(ThemeContext);
//   const navigate = useNavigate();

//   const [form, setForm] = useState({ email: "", password: "" });
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (user) navigate("/home");
//   }, [user]);

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError("");
//   setIsLoading(true);

//   try {
//     const res = await API.post("/api/auth/login", form);

//     login({
//       user: res.data.user,
//       token: res.data.token,
//     });

//     toast.success("Login successful");
//   } catch (err) {
//     const msg = err?.response?.data?.message || "Login failed";
//     toast.error(msg);
//     setError(msg);
//   } finally {
//     setIsLoading(false);
//   }
// };


//   const pageBg = theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-gray-900";
//   const cardBg = theme === "dark" ? "bg-gray-900/80 border-gray-700" : "bg-white border-gray-200";
//   const inputBg = theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-black";
//   const iconColor = theme === "dark" ? "text-indigo-300" : "text-indigo-500";

//   return (
//     <div className={`min-h-screen flex items-center justify-center px-4 py-12 ${pageBg}`}>
//       <div className={`max-w-md w-full p-8 rounded-3xl shadow-xl border ${cardBg}`}>

//         <div className="text-center">
//           <ArrowRightOnRectangleIcon className={`w-12 h-12 mx-auto ${iconColor}`} />
//           <h2 className="mt-4 text-3xl font-extrabold animate-pulse">Welcome Back</h2>
//           <p className="mt-2 text-sm opacity-70">Sign in to continue.</p>
//         </div>

//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">

//           {/* EMAIL FIELD */}
//           <div className="relative">
//             <span className={`absolute left-4 top-3.5 ${iconColor}`}>
//               <AtSymbolIcon className="h-5 w-5" />
//             </span>
//             <input
//               type="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               required
//               className={`w-full pl-12 p-3 rounded-xl border ${inputBg}`}
//             />
//           </div>

//           {/* PASSWORD FIELD */}
//           <div className="relative">
//             <span className={`absolute left-4 top-3.5 ${iconColor}`}>
//               <LockClosedIcon className="h-5 w-5" />
//             </span>
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               required
//               className={`w-full pl-12 pr-12 p-3 rounded-xl border ${inputBg}`}
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className={`absolute right-4 top-3.5 ${iconColor}`}
//             >
//               {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
//             </button>
//           </div>

//           {/* ERROR */}
//           {error && <p className="text-red-400 text-sm text-center">{error}</p>}

//           {/* LOGIN BUTTON */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full py-3 rounded-xl text-white font-bold bg-indigo-600 hover:bg-indigo-700"
//           >
//             {isLoading ? "Loading..." : "Login"}
//           </button>

//         </form>

//         <p className="mt-8 text-center text-sm opacity-80">
//           Don't have an account?{" "}
//           <Link to="/register" className="text-indigo-400 hover:underline">
//             Register
//           </Link>
//         </p>

//       </div>
//     </div>
//   );
// }
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ThemeContext from "../context/ThemeContext";
import toast from "react-hot-toast";
import API from "../api/api";

import {
  AtSymbolIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";

export default function Login() {
  const { login, user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) navigate("/home");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await API.post("/api/auth/login", form);

      login({
        user: res.data.user,
        token: res.data.token,
      });

      toast.success("Login successful");
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed";
      toast.error(msg);
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const pageBg = theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-gray-900";
  const cardBg = theme === "dark" ? "bg-gray-900/80 border-gray-700" : "bg-white border-gray-200";
  const inputBg =
    theme === "dark"
      ? "bg-gray-800 border-gray-700 text-white"
      : "bg-white border-gray-300 text-black";
  const iconColor = theme === "dark" ? "text-indigo-300" : "text-indigo-500";

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 py-12 ${pageBg}`}>
      <div className={`max-w-md w-full p-8 rounded-3xl shadow-xl border ${cardBg}`}>

        <div className="text-center">
          <ArrowRightOnRectangleIcon className={`w-12 h-12 mx-auto ${iconColor}`} />
          <h2 className="mt-4 text-3xl font-extrabold animate-pulse">Welcome Back</h2>
          <p className="mt-2 text-sm opacity-70">Sign in to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

          {/* EMAIL */}
          <div className="relative">
            <span className={`absolute left-4 top-3.5 ${iconColor}`}>
              <AtSymbolIcon className="h-5 w-5" />
            </span>
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className={`w-full pl-12 p-3 rounded-xl border ${inputBg}`}
            />
          </div>

          {/* PASSWORD */}
          <div className="relative">
            <span className={`absolute left-4 top-3.5 ${iconColor}`}>
              <LockClosedIcon className="h-5 w-5" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className={`w-full pl-12 pr-12 p-3 rounded-xl border ${inputBg}`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute right-4 top-3.5 ${iconColor}`}
            >
              {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl text-white font-bold bg-indigo-600 hover:bg-indigo-700"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>

        </form>

        <p className="mt-8 text-center text-sm opacity-80">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
