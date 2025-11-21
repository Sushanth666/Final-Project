// import React, { useContext } from "react";
// import { Link, NavLink, useNavigate } from "react-router-dom";
// import AuthContext from '../context/AuthContext.jsx';
// import { Disclosure, Menu, Transition } from '@headlessui/react';
// import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from '@heroicons/react/24/outline';

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

// export default function Navbar({ theme = "light", setTheme }) {
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//   };

//   // Use the passed theme and setter here for toggle
//   const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

//   const getNavLinkClass = ({ isActive }) =>
//     classNames(
//       isActive
//         ? "bg-indigo-700 text-white"
//         : theme === "light"
//           ? "text-gray-700 hover:bg-gray-200"
//           : "text-gray-300 hover:bg-zinc-700",
//       "px-3 py-2 rounded-md text-sm font-medium"
//     );

//   const getMobileNavLinkClass = ({ isActive }) =>
//     classNames(
//       isActive
//         ? "bg-indigo-600 text-white"
//         : theme === "light"
//           ? "text-gray-700 hover:bg-gray-200"
//           : "text-gray-300 hover:bg-zinc-700",
//       "block px-3 py-2 rounded-md text-base font-medium"
//     );

//   const navbarBg = theme === "light" ? "bg-white/95" : "bg-black/95";
//   const navbarText = theme === "light" ? "text-gray-900" : "text-blue-400";
//   const borderPanel = theme === "light" ? "border-gray-200" : "border-gray-700";
//   const logoText = theme === "light" ? "text-gray-900" : "text-blue-600";
//   const menuDropdownBg = theme === "light" ? "bg-white" : "bg-zinc-900";
//   const menuDropdownText = theme === "light" ? "text-gray-900" : "text-white";
//   const borderDropdown = theme === "light" ? "border-gray-200" : "border-gray-700";

//   return (
    
//     <Disclosure as="nav" className="sticky top-0 z-40">
//       {({ open }) => (
//         <>
//           <div className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${navbarBg}`}>
//             <div className="relative flex h-16 items-center justify-between">
//               <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
//                 <Disclosure.Button className={classNames(
//                   "relative inline-flex items-center justify-center rounded-md p-2",
//                   theme === "light" ? "text-gray-400 hover:bg-gray-200" : "text-gray-300 hover:bg-zinc-800"
//                 )}>
//                   <span className="sr-only">Open main menu</span>
//                   {open
//                     ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                     : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
//                 </Disclosure.Button>
//               </div>

//               <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
//                 <Link
//                   to={user ? "/home" : "/"}
//                   className={classNames("flex shrink-0 items-center text-2xl font-bold animate-pulse relative", logoText)}
//                 >
//                   🎬 Movie Review
//                 </Link>
//               </div>

//               <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
//                 <div className={`hidden md:flex md:items-center md:space-x-4 md:mr-3 ${navbarText}`}>
//                   <NavLink to="/home" className={getNavLinkClass}>Home</NavLink>
//                   {!user && (
//                     <>
//                       <NavLink to="/login" className={getNavLinkClass}>Login</NavLink>
//                       <NavLink to="/register" className={getNavLinkClass}>Register</NavLink>
//                     </>
//                   )}
//                 </div>

//                 <button
//                   type="button"
//                   onClick={toggleTheme}
//                   className={classNames(
//                     "relative h-10 w-10 flex items-center justify-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500",
//                     theme === "light"
//                       ? "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
//                       : "bg-zinc-900 text-indigo-400 hover:bg-indigo-800"
//                   )}
//                   aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
//                 >
//                   <SunIcon className={classNames(
//                     "h-6 w-6 transition-transform duration-300 absolute",
//                     theme === "dark" ? "transform scale-0 rotate-90" : "transform scale-100 rotate-0"
//                   )} />
//                   <MoonIcon className={classNames(
//                     "h-6 w-6 transition-transform duration-300 absolute",
//                     theme === "dark" ? "transform scale-100 rotate-0" : "transform scale-0 -rotate-90"
//                   )} />
//                 </button>

//                 {user && (
//                   <Menu as="div" className="relative ml-3">
//                     <div>
//                       <Menu.Button className={classNames(
//                         "relative flex h-10 w-10 items-center justify-center rounded-full font-bold text-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2",
//                         theme === "light" ? "bg-indigo-600 text-white" : "bg-indigo-700 text-white"
//                       )}>
//                         <span className="sr-only">Open user menu</span>
//                         {user.name?.[0]?.toUpperCase() || user.username?.[0]?.toUpperCase() || "U"}
//                       </Menu.Button>
//                     </div>
//                     <Transition
//                       as={React.Fragment}
//                       enter="transition ease-out duration-100"
//                       enterFrom="transform opacity-0 scale-95"
//                       enterTo="transform opacity-100 scale-100"
//                       leave="transition ease-in duration-75"
//                       leaveFrom="transform opacity-100 scale-100"
//                       leaveTo="transform opacity-0 scale-95"
//                     >
//                       <Menu.Items className={classNames(
//                         "absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none",
//                         menuDropdownBg
//                       )}>
//                         <div className={`px-4 py-3 border-b ${borderDropdown}`}>
//                           <p className={classNames("text-sm font-medium truncate", menuDropdownText)}>
//                             {user.name || user.username}
//                           </p>
//                           <p className={classNames("text-sm truncate", theme === "light" ? "text-gray-500" : "text-gray-400")}>
//                             {user.email}
//                           </p>
//                         </div>
//                         <Menu.Item>
//                           {({ active }) => (
//                             <NavLink
//                               to="/dashboard"
//                               className={classNames(
//                                 active ? (theme === "light" ? "bg-gray-100" : "bg-zinc-700") : "",
//                                 "block px-4 py-2 text-sm",
//                                 menuDropdownText
//                               )}
//                             >
//                               Dashboard
//                             </NavLink>
//                           )}
//                         </Menu.Item>
//                         <Menu.Item>
//                           {({ active }) => (
//                             <button
//                               onClick={handleLogout}
//                               className={classNames(
//                                 active ? (theme === "light" ? "bg-gray-100" : "bg-zinc-700") : "",
//                                 "block w-full text-left px-4 py-2 text-sm",
//                                 theme === "light" ? "text-red-600" : "text-red-500"
//                               )}
//                             >
//                               Sign out
//                             </button>
//                           )}
//                         </Menu.Item>
//                       </Menu.Items>
//                     </Transition>
//                   </Menu>
//                 )}
//               </div>
//             </div>
//           </div>

//           <Disclosure.Panel className={`md:hidden border-t ${borderPanel} ${navbarBg}`}>
//             <div className="space-y-1 px-2 pb-3 pt-2">
//               <NavLink to="/home" className={getMobileNavLinkClass}>Home</NavLink>
//               {user ? (
//                 <>
//                   <NavLink to="/dashboard" className={getMobileNavLinkClass}>Dashboard</NavLink>
//                   <button
//                     onClick={handleLogout}
//                     className={classNames(
//                       "block w-full text-left px-3 py-2 rounded-md text-base font-medium",
//                       theme === "light" ? "text-red-600 hover:bg-gray-200" : "text-red-500 hover:bg-zinc-700"
//                     )}
//                   >
//                     Sign out
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <NavLink to="/login" className={getMobileNavLinkClass}>Login</NavLink>
//                   <NavLink to="/register" className={getMobileNavLinkClass}>Register</NavLink>
//                 </>
//               )}
//             </div>
//           </Disclosure.Panel>
//         </>
//       )}
//     </Disclosure>
//   );
// }
import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";
import ThemeContext from "../context/ThemeContext.jsx";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon, SunIcon, MoonIcon } from "@heroicons/react/24/outline";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const navbarBg = theme === "light" ? "bg-white/90" : "bg-black/90";
  const textColor = theme === "light" ? "text-gray-900" : "text-white";

  return (
    <Disclosure as="nav" className={`sticky top-0 z-40 shadow ${navbarBg}`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 flex h-16 items-center justify-between">

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Disclosure.Button className="p-2 rounded-md bg-gray-200 dark:bg-zinc-800">
                {open ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </Disclosure.Button>
            </div>

            {/* Logo */}
            <Link to={user ? "/home" : "/"} className={`font-bold text-2xl ${textColor}`}>
              🎬 Movie Review
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4">

              <NavLink
                to="/home"
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 rounded-md text-sm",
                    isActive
                      ? "bg-indigo-600 text-white"
                      : theme === "light"
                        ? "text-gray-700 hover:bg-gray-200"
                        : "text-gray-300 hover:bg-zinc-700"
                  )
                }
              >
                Home
              </NavLink>

              {!user && (
                <>
                  <NavLink to="/login" className="px-3 py-2 rounded-md text-sm">
                    Login
                  </NavLink>
                  <NavLink to="/register" className="px-3 py-2 rounded-md text-sm">
                    Register
                  </NavLink>
                </>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-white dark:bg-indigo-600 border-2"
              >
                {theme === "dark" ? <SunIcon className="w-6 border-l-amber-400" /> : <MoonIcon className="w-6" />}
              </button>

              {/* Profile Menu */}
                {user && (
  <Menu as="div" className="relative">
    <Menu.Button
      className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white"
      style={{
        backgroundColor: "#4f46e5", // solid indigo circle
        fontSize: "1.25rem",
      }}
    >
      {(user?.name?.[0] || user?.email?.[0] || "U").toUpperCase()}
    </Menu.Button>


                  <Transition>
                    <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-2">
                      <Menu.Item>
                        {() => (
                          <button
                            className="w-full text-left px-3 py-2 hover:bg-indigo-600 text-white rounded-md dark:"
                            onClick={() => navigate("/dashboard")}
                          >
                            Dashboard
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {() => (
                          <button
                            onClick={logout}
                            className="w-full text-left px-3 py-2 text-red-500 hover:bg-red-500 hover:text-white rounded-md"
                          >
                            Logout
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}
            </div>
          </div>

          {/* Mobile Menu Panel */}
          <Disclosure.Panel className="md:hidden px-4 pb-4 space-y-2">
            <NavLink to="/home" className="block px-3 py-2 rounded-md ">Home</NavLink>

            {!user && (
              <>
                <NavLink to="/login" className="block px-3 py-2 rounded-md">Login</NavLink>
                <NavLink to="/register" className="block px-3 py-2 rounded-md">Register</NavLink>
              </>
            )}

            {user && (
              <button
                onClick={() => navigate("/dashboard")}
                className="block w-full text-left px-3 py-2 rounded-md"
              >
                Dashboard
              </button>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
