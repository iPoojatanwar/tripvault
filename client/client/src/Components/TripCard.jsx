import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/axios";

const TripCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get(`/trip/${id}`);
        setTrip(response.data.trip);
      } catch (err) {
        const message =
          err.response?.data?.message ||
          err.response?.data?.error ||
          "Failed to load trip.";

        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this trip? This action cannot be undone."
    );

    if (!confirmed || deleting) return;

    try {
      setDeleting(true);

      await API.delete(`/trip/${id}`);

      toast.success("Trip deleted successfully!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Failed to delete trip.";

      toast.error(message);
      setDeleting(false);
    }
  };

  const handleImageError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src =
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80";
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080b14] px-4 text-white">
        <div className="text-center">
          <div className="mx-auto mb-5 h-11 w-11 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />
          <h2 className="text-lg font-semibold">Loading trip...</h2>
          <p className="mt-2 text-sm text-slate-500">
            Preparing your travel memory
          </p>
        </div>
      </main>
    );
  }

  if (error || !trip) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080b14] px-4 text-white">
        <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-slate-900 p-8 text-center shadow-xl shadow-black/20">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-3xl">
            ⚠️
          </div>

          <h2 className="text-xl font-bold">Trip not found</h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {error || "This trip does not exist or is no longer available."}
          </p>

          <Link
            to="/dashboard"
            className="mt-6 inline-flex rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
          >
            Back to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#080b14] px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900/70 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-indigo-500/30 hover:bg-indigo-500/10 hover:text-indigo-400"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <article className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl shadow-black/30">
          <div className="relative h-64 overflow-hidden bg-slate-800 sm:h-80">
            {trip.coverImage ? (
              <img
                src={trip.coverImage}
                alt={trip.title || "Travel memory"}
                onError={handleImageError}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-br from-indigo-500/10 to-purple-500/10 text-6xl">
                🗺️
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

            <div className="absolute left-5 top-5">
              <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                Travel Memory
              </span>
            </div>

            <div className="absolute bottom-5 left-5 right-5">
              <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">
                {trip.destination || "Unknown Destination"}
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {trip.title || "Untitled Trip"}
              </h1>
            </div>
          </div>

          <div className="p-5 sm:p-7">
            {trip.photos?.length > 0 && (
              <section className="mb-7">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-slate-300">
                    Trip Photos
                  </h2>

                  <span className="text-xs text-slate-500">
                    {trip.photos.length}{" "}
                    {trip.photos.length === 1 ? "Photo" : "Photos"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {trip.photos.map((photo, index) => (
                    <div
                      key={index}
                      className="group aspect-square overflow-hidden rounded-xl border border-white/5 bg-slate-800"
                    >
                      <img
                        src={photo}
                        alt={`${trip.title || "Trip"} photo ${index + 1}`}
                        onError={handleImageError}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/5 bg-slate-950/50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Destination
                </p>

                <p className="mt-1.5 text-sm font-semibold text-indigo-300">
                  {trip.destination || "Not available"}
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-slate-950/50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Start Date
                </p>

                <p className="mt-1.5 text-sm font-semibold text-slate-200">
                  {trip.startDate
                    ? new Date(trip.startDate).toLocaleDateString()
                    : "Not available"}
                </p>
              </div>

              <div className="rounded-xl border border-white/5 bg-slate-950/50 p-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  End Date
                </p>

                <p className="mt-1.5 text-sm font-semibold text-slate-200">
                  {trip.endDate
                    ? new Date(trip.endDate).toLocaleDateString()
                    : "Not available"}
                </p>
              </div>
            </section>

            <section className="mt-6 rounded-xl border border-white/5 bg-slate-950/50 p-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
                Description
              </p>

              <p className="text-sm leading-7 text-slate-300">
                {trip.description || "No description available."}
              </p>
            </section>

            <section className="mt-3 flex items-center justify-between rounded-xl border border-amber-500/10 bg-amber-500/5 px-4 py-4">
              <div>
                <p className="text-sm font-semibold text-slate-300">
                  Overall Rating
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Your experience on this trip
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-xl text-amber-400">★</span>

                <span className="text-lg font-bold text-amber-400">
                  {trip.rating || "N/A"}
                </span>

                <span className="text-xs text-slate-500">/ 5</span>
              </div>
            </section>

            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-white/5 pt-6 sm:flex-row sm:justify-end">
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="rounded-xl border border-red-500/30 bg-red-500/10 px-6 py-3 text-sm font-semibold text-red-400 transition hover:border-red-500 hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {deleting ? "Deleting..." : "Delete Trip"}
              </button>

              <Link
                to="/dashboard"
                className="rounded-xl border border-slate-700 bg-slate-800/70 px-6 py-3 text-center text-sm font-semibold text-slate-300 transition hover:border-indigo-500/40 hover:bg-indigo-500/10 hover:text-indigo-400"
              >
                View All Trips
              </Link>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
};

export default TripCard;
