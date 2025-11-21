// import React, { useContext, useState } from "react";
// import AuthContext from "../context/AuthContext";
// import ThemeContext from "../context/ThemeContext";
// import API from "../api/api";

// export default function Settings() {
//   const { user, setUser } = useContext(AuthContext);
//   const { theme } = useContext(ThemeContext);

//   const [name, setName] = useState(user?.name || "");
//   const [photo, setPhoto] = useState(user?.photo || "");
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState("");

//   const bg = theme === "dark" ? "bg-black text-white" : "bg-white text-black";

//   async function saveProfile() {
//     if (!name.trim()) {
//       setMsg("Name cannot be empty.");
//       return;
//     }

//     try {
//       setLoading(true);

//       const res = await API.put("/api/auth/update-profile", {
//         name,
//         photo,
//       });

//       setUser(res.data.user);
//       setMsg("Profile updated successfully.");
//     } catch (err) {
//       setMsg(err.response?.data?.message || "Failed to update profile.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className={`min-h-screen p-8 ${bg}`}>
//       <div className="max-w-xl mx-auto p-6 border rounded-xl shadow-lg">
//         <h1 className="text-2xl font-bold mb-4">Edit Profile</h1>

//         {msg && <div className="mb-4 text-indigo-400">{msg}</div>}

//         <label className="block mb-3 text-sm">Name</label>
//         <input
//           className="w-full p-3 border rounded mb-4 text-black dark:text-white"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />

//         <label className="block mb-3 text-sm">Profile Photo URL</label>
//         <input
//           className="w-full p-3 border rounded mb-4 text-black "
//           value={photo}
//           onChange={(e) => setPhoto(e.target.value)}
//         />

//         {photo && (
//           <img
//             src={photo}
//             className="w-32 h-32 object-cover rounded-full mb-4"
//           />
//         )}

//         <button
//           onClick={saveProfile}
//           disabled={loading}
//           className="px-4 py-2 bg-indigo-600 text-white rounded"
//         >
//           {loading ? "Saving..." : "Save Changes"}
//         </button>
//       </div>
//     </div>
//   );
// }
import React, { useContext, useState, useRef } from "react";
import AuthContext from "../context/AuthContext";
import ThemeContext from "../context/ThemeContext";

export default function Settings() {
  const { user, setUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [name, setName] = useState(user?.name || "");
  const [photoPreview, setPhotoPreview] = useState(user?.photo || "");
  const [rawPhoto, setRawPhoto] = useState(null);
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const fileRef = useRef(null);

  const isDark = theme === "dark";
  const pageBg = isDark ? "bg-black text-white" : "bg-gray-100 text-black";
  const cardBg = isDark ? "bg-[#111] border-gray-800" : "bg-white border-gray-200";

  // convert file → base64
  const readFileAsBase64 = (file) =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const base64 = await readFileAsBase64(file);
    setRawPhoto(base64);
    setPhotoPreview(base64);
  };

  const saveProfile = () => {
    if (!name.trim()) {
      setMsg("Name cannot be empty.");
      return;
    }

    setSaving(true);

    const updatedUser = {
      ...user,
      name,
      photo: rawPhoto || user.photo,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);

    setTimeout(() => {
      setMsg("Profile updated successfully.");
      setSaving(false);
    }, 600);
  };

  return (
    <div className={`min-h-screen p-8 transition-all duration-300 ${pageBg}`}>
      <div
        className={`
          max-w-xl mx-auto p-8 rounded-3xl border shadow-2xl 
          ${cardBg}
          backdrop-blur-xl
          transform transition-all duration-500 animate-fadeSlide
        `}
        style={{
          animation: "fadeSlide .6s ease-out",
        }}
      >
        <style>
          {`
            @keyframes fadeSlide {
              from {opacity:0; transform:translateY(20px);}
              to   {opacity:1; transform:translateY(0);}
            }
          `}
        </style>

        <h1 className="text-3xl font-bold mb-6 text-center tracking-wide">
          Account Settings
        </h1>

        {msg && (
          <div className="mb-4 px-4 py-2 rounded-lg text-sm bg-green-600/20 text-green-400 border border-green-700/50">
            {msg}
          </div>
        )}

        {/* Name */}
        <label className="block mb-2 text-sm opacity-80">Full Name</label>
        <input
          className={`w-full p-3 rounded-xl border mb-6 shadow-sm 
            ${isDark ? "bg-black/40 border-gray-700 text-white" : "bg-gray-100 text-black"}
          `}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Profile Photo + Upload */}
        <label className="block mb-3 text-sm opacity-80">Profile Photo</label>

        <div className="flex items-center gap-6 mb-6">
          {/* Avatar */}
          <div
            className="
              w-32 h-32 rounded-full overflow-hidden shadow-xl relative
              transition-all duration-300 hover:scale-105 hover:shadow-2xl
            "
          >
            {photoPreview ? (
              <img
                src={photoPreview}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-300 text-gray-600">
                No Photo
              </div>
            )}
          </div>

          {/* Upload button */}
          <button
            onClick={() => fileRef.current.click()}
            className="
              px-4 py-3 rounded-xl font-semibold text-sm 
              bg-indigo-600 text-white shadow-md 
              hover:bg-indigo-700 hover:shadow-lg 
              transition-all duration-300
            "
          >
            Upload New Photo
          </button>

          <input
            type="file"
            ref={fileRef}
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
        </div>

        {/* Save button */}
        <button
          onClick={saveProfile}
          disabled={saving}
          className={`
            w-full py-3 rounded-xl font-bold mt-4
            shadow-lg transition-all duration-300
            ${saving ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"}
            text-white
          `}
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
