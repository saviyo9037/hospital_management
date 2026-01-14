import React from "react";
import { Link } from "react-router-dom";
import homeBg from "../assets/home-bg.png";

const Home = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* HERO SECTION WITH BACKGROUND IMAGE */}
      <section
        className="relative min-h-screen flex items-center justify-center text-white px-4"
        style={{
          backgroundImage: `url(${homeBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            Welcome to the <span className="text-yellow-300">Hospital</span>{" "}
            Management System
          </h1>

          <p className="text-xl sm:text-2xl mb-10 max-w-4xl mx-auto opacity-90">
            Streamlining healthcare operations for better patient care and
            efficient administration.
          </p>

          <Link
            to="/auth"
            className="inline-block bg-white text-blue-600 px-10 py-4 rounded-full text-xl font-bold shadow-2xl transition-all duration-300 hover:scale-110"
          >
            Get Started
          </Link>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold text-center text-gray-800 mb-16">
            Key Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${item.bg} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2`}
              >
                <div className={`text-${item.color}-600 mb-6`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-center leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-10">
            About Our System
          </h2>

          <p className="text-xl text-gray-700 max-w-5xl mx-auto leading-relaxed">
            Our Hospital Management System provides a complete digital solution
            for hospitals and clinics. From appointments to billing, we help
            healthcare providers deliver quality care efficiently.
          </p>

          <div className="mt-12 flex justify-center gap-12">
            <Stat number="10,000+" label="Patients Served" color="blue" />
            <Stat number="500+" label="Doctors" color="green" />
            <Stat number="50+" label="Hospitals" color="purple" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              Hospital Management System
            </h3>
            <p className="text-gray-400">
              Revolutionizing healthcare through technology.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/auth" className="text-gray-400 hover:text-white">
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-400 hover:text-white"
                >
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-400">info@hospitalms.com</p>
            <p className="text-gray-400">+1 (555) 123-4567</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          © {new Date().getFullYear()} Hospital Management System
        </div>
      </footer>
    </div>
  );
};

/* Helpers */
const Stat = ({ number, label, color }) => (
  <div className="text-center">
    <div className={`text-4xl font-bold text-${color}-600`}>
      {number}
    </div>
    <div className="text-gray-600">{label}</div>
  </div>
);

const features = [
  {
    title: "Appointment Management",
    desc: "Schedule and manage patient appointments easily.",
    bg: "from-blue-50 to-blue-100",
    color: "blue",
    icon: "📅",
  },
  {
    title: "Patient Records",
    desc: "Secure storage of medical histories.",
    bg: "from-green-50 to-green-100",
    color: "green",
    icon: "📋",
  },
  {
    title: "Doctor Profiles",
    desc: "Manage doctor specialties and availability.",
    bg: "from-red-50 to-red-100",
    color: "red",
    icon: "👨‍⚕️",
  },
  {
    title: "Billing & Payments",
    desc: "Accurate invoices and payment tracking.",
    bg: "from-yellow-50 to-yellow-100",
    color: "yellow",
    icon: "💳",
  },
];

export default Home;
