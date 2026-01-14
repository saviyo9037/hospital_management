import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import dashboardBg from "../assets/dashboard-bg.png";

export const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const menu = {
    admin: [
      { label: "Patients", to: "/patient" },
      { label: "Doctors", to: "/doctor" },
      { label: "Appointments", to: "/appointment" },
      { label: "Billing", to: "/billing" },
    ],
    doctor: [
      { label: "Appointments", to: "/appointment" },
      { label: "Billing", to: "/billing" },
    ],
    patient: [
      { label: "Appointments", to: "/appointment" },
      { label: "Billing", to: "/billing" },
    ],
  };

  const links = menu[user?.role] || [];

  return (
    <div
      className="min-h-screen flex bg-cover bg-center"
      style={{ backgroundImage: `url(${dashboardBg})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* SIDEBAR */}
      <aside className="relative z-10 w-64 bg-gray-900/90 backdrop-blur-md text-white flex flex-col">
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          HMS Dashboard
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {links.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-blue-600 hover:text-white transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* MAIN AREA */}
      <div className="relative z-10 flex-1 flex flex-col">
        {/* HEADER */}
        <header className="flex justify-between items-center px-8 py-4 bg-white/80 backdrop-blur-md shadow">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome,
            <span className="text-blue-600 ml-2">{user?.email}</span>
          </h1>
        </header>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto p-8">
          {/* STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <StatCard
              title="Total Patients"
              value="1,234"
              color="blue"
            />
            <StatCard
              title="Total Doctors"
              value="56"
              color="green"
            />
            <StatCard
              title="Pending Appointments"
              value="78"
              color="yellow"
            />
          </div>

          {/* RECENT ACTIVITY */}
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Recent Activity
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li>🧑 Patient John Doe registered</li>
              <li>👩‍⚕️ Dr. Jane Smith updated profile</li>
              <li>📅 New appointment scheduled (2025-11-15)</li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
};

/* Reusable stat card */
const StatCard = ({ title, value, color }) => (
  <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">
    <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
    <p className={`text-4xl font-bold text-${color}-600 mt-2`}>
      {value}
    </p>
  </div>
);
