import AdminNavbar from "../../components/AdminNavbar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <main className="p-8">{children}</main>
    </div>
  );
}
