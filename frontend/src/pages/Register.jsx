// import React, { useContext, useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import AuthContext from "../context/AuthContext";
// import ThemeContext from "../context/ThemeContext";
// import { loadJSON, saveJSON } from "../utils/storage";
// import toast from "react-hot-toast";

// import {
//   UserPlusIcon,
//   UserIcon,
//   AtSymbolIcon,
//   LockClosedIcon,
//   EyeIcon,
//   EyeSlashIcon,
// } from "@heroicons/react/24/outline";

// export default function Register() {
//   const navigate = useNavigate();
//   const { login, user } = useContext(AuthContext);
//   const { theme } = useContext(ThemeContext);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   // Auto-redirect when logged in
//   useEffect(() => {
//     if (user) navigate("/home");
//   }, [user, navigate]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       if (!form.name || !form.email || !form.password)
//         throw new Error("All fields are required.");

//       if (form.password.length < 6)
//         throw new Error("Password must be at least 6 characters.");

//       if (form.password !== form.confirmPassword)
//         throw new Error("Passwords do not match.");

//       // Check existing users
//       const allUsers = loadJSON("mra_users", []);
//       if (allUsers.find((u) => u.email === form.email))
//         throw new Error("This email is already registered.");

//       const newUser = {
//         id: Date.now().toString(),
//         name: form.name,
//         email: form.email,
//         password: form.password,
//       };

//       saveJSON("mra_users", [...allUsers, newUser]);

//       toast.success("Account created successfully!");

//       login(newUser); // Logs and redirects
//     } catch (err) {
//       setError(err.message);
//       toast.error(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /* THEME CLASSES */
//   const pageBg =
//     theme === "dark"
//       ? "bg-black text-white"
//       : "bg-gray-100 text-gray-900";

//   const cardBg =
//     theme === "dark"
//       ? "bg-gray-900/80 border-gray-700"
//       : "bg-white border-gray-200";

//   const iconColor = theme === "dark" ? "text-indigo-300" : "text-indigo-600";

//   const inputBg =
//     theme === "dark"
//       ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
//       : "bg-white border-gray-300 text-black placeholder-gray-500";

//   return (
//     <div
//       className={`min-h-screen flex items-center justify-center px-4 py-12 transition-colors duration-300 ${pageBg}`}
//     >
//       <div
//         className={`max-w-md w-full p-8 rounded-3xl shadow-xl border transition backdrop-blur-md ${cardBg}`}
//       >
//         <div className="text-center">
//           <UserPlusIcon className={`w-12 h-12 mx-auto ${iconColor}`} />
//           <h2 className="mt-4 text-3xl font-extrabold animate-pulse">
//             Create Your Account
//           </h2>
//           <p className="mt-2 text-sm opacity-70">Join us and start reviewing!</p>
//         </div>

//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//           {/* Name */}
//           <div className="relative">
//             <span className={`absolute left-4 top-3.5 ${iconColor}`}>
//               <UserIcon className="h-5 w-5" />
//             </span>
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={form.name}
//               onChange={(e) =>
//                 setForm({ ...form, name: e.target.value })
//               }
//               className={`w-full pl-12 p-3 rounded-xl focus:ring-4 focus:ring-indigo-500 transition ${inputBg}`}
//             />
//           </div>

//           {/* Email */}
//           <div className="relative">
//             <span className={`absolute left-4 top-3.5 ${iconColor}`}>
//               <AtSymbolIcon className="h-5 w-5" />
//             </span>
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={form.email}
//               onChange={(e) =>
//                 setForm({ ...form, email: e.target.value })
//               }
//               className={`w-full pl-12 p-3 rounded-xl focus:ring-4 focus:ring-indigo-500 transition ${inputBg}`}
//             />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <span className={`absolute left-4 top-3.5 ${iconColor}`}>
//               <LockClosedIcon className="h-5 w-5" />
//             </span>

//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={form.password}
//               onChange={(e) =>
//                 setForm({ ...form, password: e.target.value })
//               }
//               className={`w-full pl-12 pr-12 p-3 rounded-xl focus:ring-4 focus:ring-indigo-500 transition ${inputBg}`}
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

//           {/* Confirm Password */}
//           <div className="relative">
//             <span className={`absolute left-4 top-3.5 ${iconColor}`}>
//               <LockClosedIcon className="h-5 w-5" />
//             </span>

//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               placeholder="Confirm Password"
//               value={form.confirmPassword}
//               onChange={(e) =>
//                 setForm({ ...form, confirmPassword: e.target.value })
//               }
//               className={`w-full pl-12 pr-12 p-3 rounded-xl focus:ring-4 focus:ring-indigo-500 transition ${inputBg}`}
//             />

//             <button
//               type="button"
//               onClick={() =>
//                 setShowConfirmPassword(!showConfirmPassword)
//               }
//               className={`absolute right-4 top-3.5 ${iconColor}`}
//             >
//               {showConfirmPassword ? (
//                 <EyeSlashIcon className="h-5 w-5" />
//               ) : (
//                 <EyeIcon className="h-5 w-5" />
//               )}
//             </button>
//           </div>

//           {/* Error */}
//           {error && (
//             <p className="text-red-400 text-sm text-center">{error}</p>
//           )}

//           {/* Button */}
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
//                   d="M4 12a8 8 0 018-8V0C5.373 
//                   0 0 5.373 0 12h4zm2 5.291A7.962 
//                   7.962 0 014 12H0c0 3.042 1.135 
//                   5.824 3 7.938l3-2.647z"
//                 />
//               </svg>
//             ) : (
//               "Create Account"
//             )}
//           </button>
//         </form>

//         <p className="mt-8 text-center text-sm opacity-80">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="font-semibold text-indigo-400 hover:underline"
//           >
//             Login
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
// import API from "../api/api";
// import toast from "react-hot-toast";

// import {
//   UserPlusIcon,
//   UserIcon,
//   AtSymbolIcon,
//   LockClosedIcon,
//   EyeIcon,
//   EyeSlashIcon,
// } from "@heroicons/react/24/outline";

// export default function Register() {
//   const navigate = useNavigate();
//   const { login, user } = useContext(AuthContext);
//   const { theme } = useContext(ThemeContext);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   useEffect(() => {
//     if (user) navigate("/home");
//   }, [user, navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);

//     if (!form.name || !form.email || !form.password) {
//       toast.error("All fields are required");
//       setIsLoading(false);
//       return;
//     }

//     if (form.password.length < 6) {
//       toast.error("Password must be at least 6 characters");
//       setIsLoading(false);
//       return;
//     }

//     if (form.password !== form.confirmPassword) {
//       toast.error("Passwords do not match");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       // call backend
//       const res = await API.post("/api/auth/register", {
//         name: form.name,
//         email: form.email,
//         password: form.password,
//       });

//       toast.success("Account created!");

//       // backend returns: { user, token }
//       login(res.data);

//     } catch (err) {
//       const msg = err.response?.data?.message || "Registration failed";
//       toast.error(msg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const pageBg = theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-gray-900";
//   const cardBg = theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200";
//   const inputBg =
//     theme === "dark"
//       ? "bg-gray-800 border-gray-700 text-white"
//       : "bg-white border-gray-300 text-black";
//   const iconColor = theme === "dark" ? "text-indigo-300" : "text-indigo-600";

//   return (
//     <div className={`min-h-screen flex items-center justify-center px-4 py-12 ${pageBg}`}>
//       <div className={`max-w-md w-full p-8 rounded-3xl shadow-xl border ${cardBg}`}>
//         <div className="text-center">
//           <UserPlusIcon className={`w-12 h-12 mx-auto ${iconColor}`} />
//           <h2 className="mt-4 text-3xl font-extrabold">Create Your Account</h2>
//           <p className="mt-2 text-sm opacity-70">Join us and start reviewing!</p>
//         </div>

//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//           {/* Name */}
//           <div className="relative">
//             <UserIcon className={`absolute left-4 top-3.5 h-5 w-5 ${iconColor}`} />
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={form.name}
//               onChange={(e) => setForm({ ...form, name: e.target.value })}
//               className={`w-full pl-12 p-3 rounded-xl focus:ring-4 focus:ring-indigo-500 ${inputBg}`}
//             />
//           </div>

//           {/* Email */}
//           <div className="relative">
//             <AtSymbolIcon className={`absolute left-4 top-3.5 h-5 w-5 ${iconColor}`} />
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               className={`w-full pl-12 p-3 rounded-xl focus:ring-4 focus:ring-indigo-500 ${inputBg}`}
//             />
//           </div>

//           {/* Password */}
//           <div className="relative">
//             <LockClosedIcon className={`absolute left-4 top-3.5 h-5 w-5 ${iconColor}`} />

//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               className={`w-full pl-12 pr-12 p-3 rounded-xl focus:ring-4 focus:ring-indigo-500 ${inputBg}`}
//             />

//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className={`absolute right-4 top-3.5 ${iconColor}`}
//             >
//               {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
//             </button>
//           </div>

//           {/* Confirm Password */}
//           <div className="relative">
//             <LockClosedIcon className={`absolute left-4 top-3.5 h-5 w-5 ${iconColor}`} />

//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               placeholder="Confirm Password"
//               value={form.confirmPassword}
//               onChange={(e) =>
//                 setForm({ ...form, confirmPassword: e.target.value })
//               }
//               className={`w-full pl-12 pr-12 p-3 rounded-xl focus:ring-4 focus:ring-indigo-500 ${inputBg}`}
//             />

//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className={`absolute right-4 top-3.5 ${iconColor}`}
//             >
//               {showConfirmPassword ? (
//                 <EyeSlashIcon className="h-5 w-5" />
//               ) : (
//                 <EyeIcon className="h-5 w-5" />
//               )}
//             </button>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full py-3 rounded-xl text-white font-bold shadow-lg hover:scale-105 transition
//               ${theme === "dark" ? "bg-indigo-700" : "bg-indigo-600"}`}
//           >
//             {isLoading ? "Creating..." : "Create Account"}
//           </button>
//         </form>

//         <p className="mt-8 text-center text-sm opacity-80">
//           Already have an account?{" "}
//           <Link to="/login" className="font-semibold text-indigo-400 hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import AuthContext from "../context/AuthContext";
// import ThemeContext from "../context/ThemeContext";
// import toast from "react-hot-toast";
// import API from "../api/api";

// export default function Register() {
//   const { login, user } = useContext(AuthContext);
//   const { theme } = useContext(ThemeContext);
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (user) navigate("/home");
//   }, [user]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       const res = await API.post("/api/auth/register", form);

//       login({
//         user: res.data.user,
//         token: res.data.token,
//       });

//       toast.success("Account created");
//     } catch (err) {
//       const msg = err?.response?.data?.message || "Register failed";
//       setError(msg);
//       toast.error(msg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center px-4">
//       <div className="max-w-md w-full p-8 rounded-xl shadow bg-white">
//         <h2 className="text-3xl font-bold text-center">Create Account</h2>

//         <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Full Name"
//             value={form.name}
//             onChange={(e) =>
//               setForm({ ...form, name: e.target.value })
//             }
//             className="w-full p-3 border rounded-lg"
//           />

//           <input
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={(e) =>
//               setForm({ ...form, email: e.target.value })
//             }
//             className="w-full p-3 border rounded-lg"
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={form.password}
//             onChange={(e) =>
//               setForm({ ...form, password: e.target.value })
//             }
//             className="w-full p-3 border rounded-lg"
//           />

//           {error && (
//             <p className="text-red-500 text-sm text-center">{error}</p>
//           )}

//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full bg-indigo-600 text-white py-3 rounded-lg"
//           >
//             {isLoading ? "Loading..." : "Register"}
//           </button>
//         </form>

//         <p className="mt-6 text-center">
//           Already have an account?{" "}
//           <Link to="/login" className="text-indigo-600">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
// src/pages/Register.jsx
// import React, { useState, useContext, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import AuthContext from "../context/AuthContext";
// import ThemeContext from "../context/ThemeContext";
// import toast from "react-hot-toast";
// import API from "../api/api";

// import {
//   UserPlusIcon,
//   AtSymbolIcon,
//   LockClosedIcon,
//   EyeIcon,
//   EyeSlashIcon,
// } from "@heroicons/react/24/outline";

// export default function Register() {
//   const { user } = useContext(AuthContext);
//   const { theme } = useContext(ThemeContext);
//   const navigate = useNavigate();

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (user) navigate("/home");
//   }, [user]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     if (form.password !== form.confirmPassword) {
//       setError("Passwords do not match");
//       toast.error("Passwords do not match");
//       setIsLoading(false);
//       return;
//     }

//     try {
//       await API.post("/api/auth/register", {
//         email: form.email,
//         password: form.password,
//       });

//       toast.success("Account created! Login now.");
//       navigate("/login");
//     } catch (err) {
//       const msg = err?.response?.data?.message || "Registration failed";
//       setError(msg);
//       toast.error(msg);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /** Theme classes (same as Login page) **/
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
//     <div
//       className={`min-h-screen flex items-center justify-center px-4 py-12 transition-colors duration-300 ${pageBg}`}
//     >
//       <div
//         className={`max-w-md w-full p-8 rounded-3xl shadow-xl border transition ${cardBg}`}
//       >
//         {/* HEADER */}
//         <div className="text-center">
//           <UserPlusIcon className={`w-12 h-12 mx-auto ${iconColor}`} />
//           <h2 className="mt-4 text-3xl font-extrabold animate-pulse">
//             Create an Account
//           </h2>
//           <p className="mt-2 text-sm opacity-70">
//             Join and start reviewing movies.
//           </p>
//         </div>

//         {/* FORM */}
//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {/* Email */}
//           <div className="relative">
//             <span className={`absolute left-4 top-3.5 pointer-events-none ${iconColor}`}>
//               <AtSymbolIcon className="h-5 w-5" />
//             </span>

//             <input
//               type="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               className={`w-full pl-12 p-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500 transition ${inputBg}`}
//               required
//             />
//           </div>

//           {/* Password */}
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
//               className={`w-full pl-12 pr-12 p-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500 transition ${inputBg}`}
//               required
//             />

//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className={`absolute right-4 top-3.5 ${iconColor}`}
//             >
//               {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
//             </button>
//           </div>

//           {/* Confirm Password */}
//           <div className="relative">
//             <span className={`absolute left-4 top-3.5 pointer-events-none ${iconColor}`}>
//               <LockClosedIcon className="h-5 w-5" />
//             </span>

//             <input
//               type={showConfirm ? "text" : "password"}
//               placeholder="Confirm Password"
//               value={form.confirmPassword}
//               onChange={(e) =>
//                 setForm({ ...form, confirmPassword: e.target.value })
//               }
//               className={`w-full pl-12 pr-12 p-3 rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-500 transition ${inputBg}`}
//               required
//             />

//             <button
//               type="button"
//               onClick={() => setShowConfirm(!showConfirm)}
//               className={`absolute right-4 top-3.5 ${iconColor}`}
//             >
//               {showConfirm ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
//             </button>
//           </div>

//           {/* Error */}
//           {error && (
//             <p className="text-red-400 text-sm text-center">{error}</p>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`w-full py-3 rounded-xl text-white font-bold shadow-lg transform transition hover:scale-105 ${
//               theme === "dark"
//                 ? "bg-indigo-700 hover:bg-indigo-800"
//                 : "bg-indigo-600 hover:bg-indigo-700"
//             }`}
//           >
//             {isLoading ? "Creating..." : "Create Account"}
//           </button>
//         </form>

//         {/* Footer Link */}
//         <p className="mt-8 text-center text-sm opacity-80">
//           Already registered?{" "}
//           <Link to="/login" className="font-semibold text-indigo-400 hover:underline">
//             Login
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
//   UserPlusIcon,
//   UserIcon,
//   AtSymbolIcon,
//   LockClosedIcon,
//   EyeIcon,
//   EyeSlashIcon,
// } from "@heroicons/react/24/outline";

// export default function Register() {
//   const navigate = useNavigate();
//   const { login, user } = useContext(AuthContext);
//   const { theme } = useContext(ThemeContext);

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (user) navigate("/home");
//   }, [user]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     if (!form.email || !form.password)
//       return setError("All fields are required.");

//     if (form.password.length < 6)
//       return setError("Password must be at least 6 characters.");

//     if (form.password !== form.confirmPassword)
//       return setError("Passwords do not match.");

//    const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError("");
//   setIsLoading(true);

//   try {
//     const res = await API.post("/api/auth/register", form);

//     login({
//       user: res.data.user,
//       token: res.data.token,
//     });

//     toast.success("Account created");
//   } catch (err) {
//     const msg = err?.response?.data?.message || "Registration failed";
//     toast.error(msg);
//     setError(msg);
//   } finally {
//     setIsLoading(false);
//   }
// }
//   };

//   const pageBg = theme === "dark" ? "bg-black text-white" : "bg-gray-100 text-gray-900";
//   const cardBg = theme === "dark" ? "bg-gray-900/80 border-gray-700" : "bg-white border-gray-200";
//   const inputBg = theme === "dark" ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-300 text-black";
//   const iconColor = theme === "dark" ? "text-indigo-300" : "text-indigo-600";

//   return (
//     <div className={`min-h-screen flex items-center justify-center px-4 py-12 ${pageBg}`}>
//       <div className={`max-w-md w-full p-8 rounded-3xl shadow-xl border ${cardBg}`}>

//         <div className="text-center">
//           <UserPlusIcon className={`w-12 h-12 mx-auto ${iconColor}`} />
//           <h2 className="mt-4 text-3xl font-extrabold animate-pulse">
//             Create an Account
//           </h2>
//           <p className="mt-2 text-sm opacity-70">Join and start reviewing!</p>
//         </div>

//         <form onSubmit={handleSubmit} className="mt-8 space-y-6">

//           {/* EMAIL */}
//           <div className="relative">
//             <span className={`absolute left-4 top-3.5 ${iconColor}`}>
//               <AtSymbolIcon className="h-5 w-5" />
//             </span>
//             <input
//               type="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               className={`w-full pl-12 p-3 rounded-xl border ${inputBg}`}
//             />
//           </div>

//           {/* PASSWORD */}
//           <div className="relative">
//             <span className={`absolute left-4 top-3.5 ${iconColor}`}>
//               <LockClosedIcon className="h-5 w-5" />
//             </span>
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Password"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               className={`w-full pl-12 pr-12 p-3 rounded-xl border ${inputBg}`}
//             />
//             <button type="button" onClick={() => setShowPassword(!showPassword)} className={`absolute right-4 top-3.5 ${iconColor}`}>
//               {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
//             </button>
//           </div>

//           {/* CONFIRM PASSWORD */}
//           <div className="relative">
//             <span className={`absolute left-4 top-3.5 ${iconColor}`}>
//               <LockClosedIcon className="h-5 w-5" />
//             </span>
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               placeholder="Confirm Password"
//               value={form.confirmPassword}
//               onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
//               className={`w-full pl-12 pr-12 p-3 rounded-xl border ${inputBg}`}
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className={`absolute right-4 top-3.5 ${iconColor}`}
//             >
//               {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
//             </button>
//           </div>

//           {error && <p className="text-red-400 text-sm text-center">{error}</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 rounded-xl text-white font-bold bg-indigo-600 hover:bg-indigo-700"
//           >
//             {loading ? "Creating..." : "Register"}
//           </button>

//         </form>

//         <p className="mt-8 text-center text-sm opacity-80">
//           Already have an account?{" "}
//           <Link to="/login" className="text-indigo-400 hover:underline">Login</Link>
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
  UserPlusIcon,
  UserIcon,
  AtSymbolIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

export default function Register() {
  const navigate = useNavigate();
  const { login, user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) navigate("/home");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const res = await API.post("/api/auth/register", form);

      login({
        user: res.data.user,
        token: res.data.token,
      });

      toast.success("Account created");
    } catch (err) {
      const msg = err?.response?.data?.message || "Registration failed";
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
          <UserPlusIcon className={`w-12 h-12 mx-auto ${iconColor}`} />
          <h2 className="mt-4 text-3xl font-extrabold animate-pulse">Create Account</h2>
          <p className="mt-2 text-sm opacity-70">Join and start reviewing movies.</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

          {/* NAME */}
          <div className="relative">
            <span className={`absolute left-4 top-3.5 ${iconColor}`}>
              <UserIcon className="h-5 w-5" />
            </span>
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className={`w-full pl-12 p-3 rounded-xl border ${inputBg}`}
            />
          </div>

          {/* EMAIL */}
          <div className="relative">
            <span className={`absolute left-4 top-3.5 ${iconColor}`}>
              <AtSymbolIcon className="h-5 w-5" />
            </span>
            <input
              type="email"
              placeholder="Email Address"
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

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <span className={`absolute left-4 top-3.5 ${iconColor}`}>
              <LockClosedIcon className="h-5 w-5" />
            </span>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              required
              className={`w-full pl-12 pr-12 p-3 rounded-xl border ${inputBg}`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className={`absolute right-4 top-3.5 ${iconColor}`}
            >
              {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
            </button>
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          {/* BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl text-white font-bold bg-indigo-600 hover:bg-indigo-700"
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>

        </form>

        <p className="mt-8 text-center text-sm opacity-80">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}
