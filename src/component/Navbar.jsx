import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-2xl flex items-center justify-center">
              <span className="text-white text-2xl font-bold">🌡️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">LuckyOne</h1>
              <p className="text-[10px] text-gray-500 -mt-1">IoT Dashboard</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className={`font-medium transition-colors ${
                location.pathname === "/"
                  ? "text-blue-600 border-b-2 border-blue-600 pb-4"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Dashboard
            </Link>

            <Link
              to="/add-device"
              className={`font-medium transition-colors ${
                location.pathname === "/add-device"
                  ? "text-blue-600 border-b-2 border-blue-600 pb-4"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Add Device
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <div className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              Connected
            </div>

            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold cursor-pointer hover:bg-gray-300 transition">
              F
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;