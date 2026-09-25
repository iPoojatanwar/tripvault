import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";
const TripCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await API.get(`/trip/${id}`);
        setTrip(response.data.trip);
      } catch (error) {
        console.error(
          error.response?.data?.message || "Failed to fetch trip"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchTrip();
  }, [id]);
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this trip?"
    );
    if (!confirmed) return;
    try {
      await API.delete(`/trip/${id}`);
      navigate("/dashboard");
    } catch (error) {
      console.error(
        error.response?.data?.message || "Failed to delete trip"
      );
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading trip...
      </div>
    );
  }
  if (!trip) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Trip not found.
      </div>
    );
  }
  return (
    <div className="min-h-screen w-full bg-slate-950 px-4 py-10 flex items-center justify-center">
      <div className="w-full max-w-lg">
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl shadow-black/30">
          <div className="border-b border-slate-800 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-6 py-5">
            <p className="mb-1 text-xs font-medium uppercase tracking-widest text-indigo-400">
              Trip Details
            </p>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              Trip of {trip.title}
            </h1>
          </div>
          <div className="p-6">
            <div className="space-y-5">
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm font-medium text-slate-400">
                  Start Date
                </span>
                <span className="text-right text-sm font-semibold text-slate-100">
                  {trip.startDate
                    ? new Date(trip.startDate).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm font-medium text-slate-400">
                  End Date
                </span>
                <span className="text-right text-sm font-semibold text-slate-100">
                  {trip.endDate
                    ? new Date(trip.endDate).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm font-medium text-slate-400">
                  Destination
                </span>
                <span className="text-right text-sm font-semibold text-indigo-300">
                  {trip.destination}
                </span>
              </div>
              <div className="border-t border-slate-800 pt-5">
                <p className="mb-2 text-sm font-medium text-slate-400">
                  Description
                </p>
                <p className="text-sm leading-6 text-slate-300">
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
            <div className="mt-7 flex gap-3 border-t border-slate-800 pt-6">
              <button
                onClick={handleDelete}
                className="flex-1 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 transition-all duration-200 hover:border-red-500 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500/40"
              >
                Delete
              </button>
              <Link
                to="/dashboard"
                className="flex-1 rounded-xl bg-indigo-600 px-4 py-2.5 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-500 hover:shadow-indigo-500/30 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              >
                View All
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
