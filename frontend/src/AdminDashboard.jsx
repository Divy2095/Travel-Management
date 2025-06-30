import React from "react";

const AdminDashboard = () => {
  return (
    <div>
      <header className="fixed top-0 w-full bg-white shadow-md z-50 flex justify-between items-center px-10 py-4">
        <div className="text-2xl font-bold text-amber-500">GoTravel Admin</div>
        <nav className="flex gap-6 text-gray-700 font-medium">
          <a href="#trips" className="hover:text-amber-500">
            Trips
          </a>
          <a href="#drivers" className="hover:text-amber-500">
            Drivers
          </a>
          <a href="#vehicles" className="hover:text-amber-500">
            Vehicles
          </a>
          <a href="#reviews" className="hover:text-amber-500">
            Reviews
          </a>
        </nav>
      </header>

      <main>
        <div>
            <button>
                New Trip
            </button>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
