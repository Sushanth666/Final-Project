import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx'; // Adjust path if different

export default function Layout({ theme, setTheme }) {
  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <main>
        <Outlet />
      </main>
    </>
  );
}
// import React, { useContext } from "react";
// import { Outlet } from "react-router-dom";
// import Navbar from "./Navbar.jsx";
// import ThemeContext from "../context/ThemeContext";

// export default function Layout() {
//   const { theme } = useContext(ThemeContext);

//   return (
//     <div className={theme === "dark" ? "bg-black text-white" : "bg-white text-black"}>
//       <Navbar />
//       <main className="pt-4 pb-10 min-h-screen">
//         <Outlet />
//       </main>
//     </div>
//   );
// }
