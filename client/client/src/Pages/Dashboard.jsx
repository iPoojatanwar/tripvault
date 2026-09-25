import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await API.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    getUser();
  }, []);
  useEffect(() => {
    const getTrips = async () => {
      try {
        const response = await API.get("/trip/allTrips");
        setTrips(response.data.trips || []);
      } catch (error) {
        console.error("Error fetching trips:", error);
      } finally {
        setLoading(false);
      }
    };
    getTrips();
  }, []);
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex items-center justify-between border-b border-slate-800 pb-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-widest text-indigo-400">
              TripVault
            </p>
            {user && (
              <>
                <h1 className="mt-1 text-2xl font-bold text-white">
                  Welcome, {user.user.name} 👋
                </h1>
                <p className="mt-1 text-sm text-slate-400">
                  {user.user.email}
                </p>
              </>
            )}
          </div>
          <button
            onClick={logOut}
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-5 py-2.5 text-sm font-semibold text-red-400 transition duration-200 hover:border-red-500 hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>
        </header>
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">
              My Trips
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Explore your travel memories
            </p>
          </div>
          <Link
            to="/tripForm"
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition duration-200 hover:bg-indigo-500"
          >
            + Create Trip
          </Link>
        </div>
        {loading ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-16 text-center">
            <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500"></div>
            <h3 className="text-xl font-semibold text-white">
              Loading trips...
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Please wait while we fetch your trips.
            </p>
          </div>
        ) : trips.length === 0 ? (
          <div className="rounded-2xl border border-slate-800 bg-slate-900 px-6 py-16 text-center">
            <div className="mb-4 text-4xl">
              🗺️
            </div>
            <h3 className="text-xl font-semibold text-white">
              No trips yet
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Start creating your first travel memory.
            </p>
            <Link
              to="/tripForm"
              className="mt-6 inline-block rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition duration-200 hover:bg-indigo-500"
            >
              Create Your First Trip
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {trips.map((trip) => (
              <div
                key={trip._id}
                className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/50"
              >
                <div className="border-b border-slate-800 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-5 py-5">
                  <p className="mb-1 text-xs font-medium uppercase tracking-widest text-indigo-400">
                    Trip Details
                  </p>
                  <h3 className="truncate text-xl font-bold text-white">
                    Trip of {trip.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-indigo-300">
                    {trip.destination}
                  </p>
                </div>
                <div className="p-5">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium text-slate-500">
                        Start Date
                      </span>
                      <span className="text-right text-sm font-semibold text-slate-200">
                        {trip.startDate}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-sm font-medium text-slate-500">
                        End Date
                      </span>
                      <span className="text-right text-sm font-semibold text-slate-200">
                        {trip.endDate}
                      </span>
                    </div>
                    <div className="border-t border-slate-800 pt-4">
                      <p className="mb-2 text-sm font-medium text-slate-500">
                        Description
                      </p>
                      <p className="line-clamp-2 text-sm leading-6 text-slate-300">
                        {trip.description || "No description available."}
                      </p>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/50 px-4 py-3">
                      <span className="text-sm font-medium text-slate-400">
                        Rating
                      </span>
                      <span className="flex items-center gap-1.5 text-sm font-bold text-amber-400">
                        <span>★</span>
                        {trip.rating || "N/A"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 flex gap-3 border-t border-slate-800 pt-5">
                    <Link
                      to={`/tripCard/${trip._id}`}
                      className="flex-1 rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-2.5 text-center text-sm font-semibold text-green-400 transition duration-200 hover:border-green-500 hover:bg-green-500 hover:text-white"
                    >
                      View
                    </Link>
                    <Link
                      to={`/updateTrip/${trip._id}`}
                      className="flex-1 rounded-xl bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition duration-200 hover:bg-indigo-500"
                    >
                      Update
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
