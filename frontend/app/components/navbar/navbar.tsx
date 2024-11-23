"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("Token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("Token");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <nav className="flex justify-between items-center h-16 bg-white shadow-sm w-full">
        <div className="flex items-center justify-around">
          <div className="ml-4 text-xl font-bold">Transaction</div>
        </div>
        <div>
          <div className="mr-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  window.location.href = "/signin";
                }}
                className="px-4 py-2  text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 rounded-md "
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
