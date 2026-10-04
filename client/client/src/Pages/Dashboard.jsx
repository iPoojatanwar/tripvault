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
    <div className="min-h-screen bg-[#080b14] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 rounded-2xl border border-white/10 bg-slate-900/70 px-5 py-5 shadow-2xl shadow-black/20 backdrop-blur-xl sm:px-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-400">
                  TripVault
                </p>
                {user && (
                  <>
                    <h1 className="mt-1 text-xl font-bold text-white sm:text-2xl">
                      Welcome back, {user.user.name} 👋
                    </h1>
                    <p className="mt-0.5 text-sm text-slate-400">
                      {user.user.email}
                    </p>
                  </>
                )}
              </div>
            </div>
          <div className="flex items-center gap-3">
  {user && (
    <Link
      to={`/profile/${user.user.username}`}
      className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500"
    >
      My Profile
    </Link>
  )}
  <button
    onClick={logOut}
    className="rounded-xl border border-white/10 bg-slate-800/70 px-5 py-2.5 text-sm font-semibold text-slate-300 hover:bg-red-500/10 hover:text-red-400"
  >
    Logout
  </button>
</div>
          </div>
        </header>
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight text-white">
                My Trips
              </h2>
              <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-3 py-1 text-xs font-bold text-indigo-400">
                {trips.length}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-400">
              Manage and revisit your favorite travel memories
            </p>
          </div>
          <Link
            to="/tripForm"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-500 hover:shadow-indigo-600/30"
          >
            <span className="text-lg">+</span>
            Create New Trip
          </Link>
        </div>
        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 px-6 py-24 text-center shadow-xl">
            <div className="mx-auto mb-5 h-11 w-11 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />
            <h3 className="text-xl font-semibold text-white">
              Loading your trips
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Preparing your travel memories...
            </p>
          </div>
        ) : trips.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/70 px-6 py-24 text-center">
            <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 text-4xl">
              🗺️
            </div>
            <h3 className="text-2xl font-bold text-white">
              Your journey starts here
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
              You haven't created any trips yet. Start building your personal
              collection of travel memories.
            </p>
            <Link
              to="/tripForm"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
            >
              <span className="text-lg">+</span>
              Create Your First Trip
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-3">
            {trips.map((trip) => (
              <div
                key={trip._id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1.5 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-950/30"
              >
                <div className="relative h-56 overflow-hidden bg-slate-800">
                  <img
                    src={trip.coverImage}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute left-4 top-4">
                    <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                      Travel Memory
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="mb-1 text-xs font-medium uppercase tracking-widest text-indigo-300">
                      {trip.destination}
                    </p>
                    <h3 className="truncate text-2xl font-bold text-white">
                      {trip.title}
                    </h3>
                  </div>
                </div>
                <div className="p-5">
                  <div className="mb-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/5 bg-slate-950/60 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        Start Date
                      </p>
                      <p className="mt-1.5 text-sm font-semibold text-slate-200">
                        {trip.startDate}
                      </p>
                    </div>
                    <div className="rounded-xl border border-white/5 bg-slate-950/60 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        End Date
                      </p>
                      <p className="mt-1.5 text-sm font-semibold text-slate-200">
                        {trip.endDate}
                      </p>
                    </div>
                  </div>
                  <div className="mb-5">
                    <div className="mb-2 flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Description
                      </p>
                      <span className="text-xs text-slate-600">
                        Trip
                      </span>
                    </div>
                    <p className="line-clamp-2 text-sm leading-6 text-slate-300">
                      {trip.description || "No description available."}
                    </p>
                  </div>
                  <div className="mb-5 flex items-center justify-between rounded-xl border border-amber-500/10 bg-amber-500/5 px-4 py-3">
                    <div>
                      <p className="text-xs font-medium text-slate-500">
                        Your Rating
                      </p>
                      <p className="mt-0.5 text-xs text-slate-600">
                        Overall experience
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-lg text-amber-400">
                        ★
                      </span>
                      <span className="text-sm font-bold text-amber-400">
                        {trip.rating || "N/A"}
                      </span>
                      <span className="text-xs text-slate-600">
                        / 5
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 border-t border-white/5 pt-5">
                    <Link
                      to={`/tripCard/${trip._id}`}
                      className="rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-2.5 text-center text-sm font-semibold text-slate-300 transition-all duration-200 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400"
                    >
                      View Trip
                    </Link>
                    <Link
                      to={`/updateTrip/${trip._id}`}
                      className="rounded-xl bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-500"
                    >
                      Update Trip
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

