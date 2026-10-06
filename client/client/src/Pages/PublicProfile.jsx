import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";

const PublicProfile = () => {
  const { username } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPublicProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await API.get(`/users/${username}/profile`);
        setProfile(response.data);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.response?.data?.error ||
            "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPublicProfile();
  }, [username]);

  const handleImageError = (e) => {
    e.currentTarget.style.display = "none";
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#080b14] px-4 py-20 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />
          <h2 className="text-lg font-semibold">
            Loading profile...
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Preparing travel memories
          </p>
        </div>
      </main>
    );
  }

  if (error || !profile?.user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#080b14] px-4 py-10 text-white">
        <div className="w-full max-w-md rounded-2xl border border-red-500/20 bg-slate-900 p-8 text-center shadow-xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-3xl">
            ⚠️
          </div>

          <h2 className="text-xl font-bold">
            Profile not found
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {error || "This profile does not exist."}
          </p>
        </div>
      </main>
    );
  }

  const trips = profile.trips || [];

  return (
    <main className="min-h-screen bg-[#080b14] px-4 py-6 text-white sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="mb-10 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 shadow-xl shadow-black/20 backdrop-blur-xl">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">
                  Traveller Profile
                </p>

                <h1 className="mt-2 truncate text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {profile.user.name || "Traveler"}
                </h1>

                <p className="mt-1 text-sm font-semibold text-indigo-400">
                  @{profile.user.username}
                </p>

                <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-400">
                  {profile.user.bio || "No bio added yet."}
                </p>
              </div>

              <div className="w-fit shrink-0 rounded-2xl border border-slate-700 bg-slate-800/70 px-6 py-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Travel Memories
                </p>

                <p className="mt-1 text-2xl font-bold text-white">
                  {trips.length}
                  <span className="ml-1 text-sm font-medium text-slate-400">
                    {trips.length === 1 ? "Trip" : "Trips"}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Travel Memories
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {profile.user.name || "Traveler"}'s journey
              </p>
            </div>

            <span className="w-fit rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-400">
              {trips.length} {trips.length === 1 ? "Trip" : "Trips"}
            </span>
          </div>

          {trips.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/70 px-6 py-20 text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-500/10 text-4xl">
                🗺️
              </div>

              <h3 className="text-xl font-bold text-white">
                No trips yet
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {profile.user.name || "This traveler"} hasn't added
                any travel memories yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {trips.map((trip) => (
                <article
                  key={trip._id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-950/20"
                >
                  <div className="relative h-56 overflow-hidden bg-slate-800">
                    {trip.coverImage ? (
                      <img
                        src={trip.coverImage}
                        alt={trip.title || "Travel memory"}
                        onError={handleImageError}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-indigo-500/10 to-purple-500/10 text-5xl">
                        🗺️
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                    <div className="absolute left-4 top-4">
                      <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                        Travel Memory
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-indigo-300">
                        {trip.destination || "Unknown Destination"}
                      </p>

                      <h3 className="truncate text-2xl font-bold text-white">
                        {trip.title || "Untitled Trip"}
                      </h3>
                    </div>
                  </div>

                  {trip.photos?.length > 0 && (
                    <div className="border-b border-white/5 bg-slate-950/70 p-2">
                      <div className="grid grid-cols-3 gap-2">
                        {trip.photos.slice(0, 3).map((photo, index) => (
                          <div
                            key={index}
                            className="group/photo aspect-square overflow-hidden rounded-lg bg-slate-800"
                          >
                            <img
                              src={photo}
                              alt={`${trip.title || "Trip"} photo ${index + 1}`}
                              onError={handleImageError}
                              className="h-full w-full object-cover transition duration-300 group-hover/photo:scale-110"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="p-5">
                    <div className="rounded-xl border border-white/5 bg-slate-950/50 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        Destination
                      </p>

                      <p className="mt-1 text-sm font-semibold text-slate-200">
                        {trip.destination || "Not available"}
                      </p>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-white/5 bg-slate-950/50 p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                          Start Date
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-200">
                          {trip.startDate || "Not available"}
                        </p>
                      </div>

                      <div className="rounded-xl border border-white/5 bg-slate-950/50 p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                          End Date
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-200">
                          {trip.endDate || "Not available"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between rounded-xl border border-amber-500/10 bg-amber-500/5 px-4 py-3">
                      <div>
                        <p className="text-xs font-medium text-slate-500">
                          Rating
                        </p>

                        <p className="mt-0.5 text-[11px] text-slate-600">
                          Overall experience
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
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
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default PublicProfile;