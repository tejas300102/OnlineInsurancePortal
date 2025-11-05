// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import AdminNavbar from "../admin/AdminNavbar";

// export default function AdminDashboard() {
//   const navigate = useNavigate();
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!token) {
//       alert("Unauthorized access!");
//       navigate("/login");
//     }
//   }, [token, navigate]);

//   const stats = [
//     { title: "Total Users", value: "120", color: "bg-blue-100 text-blue-800" },
//     {
//       title: "Active Policies",
//       value: "45",
//       color: "bg-green-100 text-green-800",
//     },
//     {
//       title: "Pending Claims",
//       value: "8",
//       color: "bg-yellow-100 text-yellow-800",
//     },
//   ];

//   const cards = [
//     {
//       title: "👤 Manage Users",
//       desc: "View and manage all registered users.",
//       path: "/admin/users",
//     },
//     {
//       title: "📄 Manage Policies",
//       desc: "Add, update, or remove insurance policies.",
//       path: "/add-policy",
//     },
//     {
//       title: "💰 Manage Claims",
//       desc: "Review and process user claims efficiently.",
//       path: "/admin/claims",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100">
//       {/* Admin Navbar */}
//       <AdminNavbar />

//       {/* Main Content */}
//       <div className="p-8">
//         <h1 className="text-3xl font-semibold text-gray-800 mb-6">
//           Welcome, Admin 👋
//         </h1>

//         {/* Stats Section */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//           {stats.map((item, i) => (
//             <div
//               key={i}
//               className={`p-6 rounded-lg shadow-md ${item.color} text-center`}
//             >
//               <h2 className="text-xl font-semibold">{item.title}</h2>
//               <p className="text-3xl font-bold mt-2">{item.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* Management Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {cards.map((card, i) => (
//             <div
//               key={i}
//               onClick={() => navigate(card.path)}
//               className="bg-white p-6 rounded-lg shadow hover:shadow-lg cursor-pointer transition transform hover:-translate-y-1"
//             >
//               <h2 className="text-lg font-semibold text-gray-700 mb-2">
//                 {card.title}
//               </h2>
//               <p className="text-gray-500 text-sm">{card.desc}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../admin/AdminNavbar";
import axios from "axios";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!token) {
      alert("Unauthorized access!");
      navigate("/login");
    } else {
      fetchStats();
    }
  }, [token, navigate]);

  const fetchStats = async () => {
    try {
      const res = await axios.get(
        "http://localhost:7000/admin/dashboard-stats",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const cards = [
    {
      title: "👤 Manage Users",
      desc: "View and manage all registered users.",
      path: "/admin/users",
    },
    {
      title: "📄 Manage Policies",
      desc: "Add, update, or remove insurance policies.",
      path: "/add-policy",
    },
    {
      title: "💰 Manage Claims",
      desc: "Review and process user claims efficiently.",
      path: "/admin/claims",
    },
  ];

  if (!stats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          Welcome, Admin 👋
        </h1>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="p-6 rounded-lg shadow-md bg-blue-100 text-blue-800 text-center">
            <h2 className="text-xl font-semibold">Total Users</h2>
            <p className="text-3xl font-bold mt-2">{stats.total_users}</p>
          </div>
          <div className="p-6 rounded-lg shadow-md bg-green-100 text-green-800 text-center">
            <h2 className="text-xl font-semibold">Active Policies</h2>
            <p className="text-3xl font-bold mt-2">{stats.active_policies}</p>
          </div>
          <div className="p-6 rounded-lg shadow-md bg-yellow-100 text-yellow-800 text-center">
            <h2 className="text-xl font-semibold">Pending Claims</h2>
            <p className="text-3xl font-bold mt-2">{stats.pending_claims}</p>
          </div>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <div
              key={i}
              onClick={() => navigate(card.path)}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg cursor-pointer transition transform hover:-translate-y-1"
            >
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                {card.title}
              </h2>
              <p className="text-gray-500 text-sm">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
