
import { useEffect, useState } from "react";
import axios from "axios";
import { Users, Mail, Phone, MapPin, Calendar } from "lucide-react";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Admin not logged in");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:7000/admin/getusers", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-blue-600 mb-4"></div>
          <p className="text-slate-600 font-medium">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md">
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800">All Users</h2>
          </div>
          <p className="text-slate-600 ml-14">
            Total users:{" "}
            <span className="font-semibold text-slate-800">{users.length}</span>
          </p>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead>
                <tr className="bg-gradient-to-right from-slate-50 to-slate-100">
                  <th className="py-4 px-6 text-left text-lg font-semibold text-slate-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="py-4 px-6 text-left text-lg font-semibold text-slate-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="py-4 px-6 text-left text-lg font-semibold text-slate-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="py-4 px-6 text-left text-lg font-semibold text-slate-600 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="py-4 px-6 text-left text-lg font-semibold text-slate-600 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="py-4 px-6 text-left text-lg font-semibold text-slate-600 uppercase tracking-wider">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr
                    key={user.user_id}
                    className="hover:bg-slate-50 transition-colors duration-150"
                  >
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-lg font-semibold text-blue-600">
                            {user.user_id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-lg font-medium text-slate-900">
                        {user.name}
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-lg text-slate-600">
                        <Mail className="w-4 h-4 text-slate-400" />
                        {user.email}
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-lg text-slate-600">
                        <Phone className="w-4 h-4 text-slate-400" />
                        {user.phone}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2 text-lg text-slate-600">
                        <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
                        <span className="line-clamp-2">{user.address}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-lg text-slate-600">
                        <Calendar className="w-4 h-4 text-slate-400" />
                        {user.created_at}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {users.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow-lg border border-slate-200">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-600 font-medium">No users found</p>
          </div>
        )}
      </div>
    </div>
  );
}
