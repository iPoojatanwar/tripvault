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
        const response = await API.get(
          `/users/${username}/profile`
        );
        setProfile(response.data);
      } catch (error) {
        console.error(
          error?.response?.data?.message ||
            error?.message ||
            "Failed to fetch profile"
        );
        setError(
          error?.response?.data?.message ||
            "Failed to load profile"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPublicProfile();
  }, [username]);
  if (loading) {
    return (
      <div className="min-h-screen bg-[#080b14] px-4 py-20 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mx-auto mb-5 h-10 w-10 animate-spin rounded-full border-4 border-slate-700 border-t-indigo-500" />
          <h2 className="text-lg font-semibold text-white">
            Loading profile...
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Preparing travel memories
          </p>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen bg-[#080b14] px-4 py-20 text-white">
        <div className="mx-auto max-w-md rounded-2xl border border-red-500/20 bg-slate-900 p-8 text-center shadow-xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-3xl">
            ⚠️
          </div>
          <h2 className="text-xl font-bold text-white">
            Profile not found
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {error}
          </p>

        </div>
      </div>
    );
  }
  if (!profile || !profile.user) {
    return (
      <div className="min-h-screen bg-[#080b14] px-4 py-20 text-white">
        <div className="mx-auto max-w-md text-center">

          <h2 className="text-xl font-bold">
            Profile not found
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            This profile does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080b14] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 rounded-2xl border border-white/10 bg-slate-900/80 p-6 shadow-xl shadow-black/20 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                      <div className="flex-1">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
               <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
                    Traveller Profile
                  </p>
                  <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
                    {profile.user.name}
                  </h1>
                  <p className="mt-1 text-sm font-medium text-indigo-400">
                    @{profile.user.username}
                  </p>
                </div>
                <div className="w-fit rounded-xl border border-slate-700 bg-slate-800/70 px-5 py-3">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
                    Travel Memories
                  </p>
                  <p className="mt-1 text-xl font-bold text-white">
                    {profile.trips?.length || 0}
                    <span className="ml-1 text-sm font-medium text-slate-400">
                      {profile.trips?.length === 1
                        ? "Trip"
                        : "Trips"}
                    </span>
                  </p>
                </div>
              </div>
             <p className="mt-5 max-w-2xl text-sm leading-6 text-slate-400">
                {profile.user.bio ||
                  "No bio added yet."}
              </p>
           </div>
          </div>
        </div>
        <div>
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-white">
                Travel Memories
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {profile.user.name}'s journey
              </p>
            </div>
            <span className="rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-xs font-semibold text-slate-400">
              {profile.trips?.length || 0} Trips
            </span>
          </div>
          {!profile.trips ||
          profile.trips.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/70 px-6 py-20 text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-indigo-500/10 text-4xl">
                🗺️
              </div>
              <h3 className="text-xl font-bold text-white">
                No trips yet
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                {profile.user.name} hasn't added any travel memories yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {profile.trips.map((trip) => (
                <div
                  key={trip._id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-2xl hover:shadow-indigo-950/20"
                >
                  <div className="relative h-56 overflow-hidden bg-slate-800">
                    {trip.coverImage ? (
                      <img
                        src={trip.coverImage}
                        alt={trip.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900 text-5xl">
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <p className="text-xs font-semibold uppercase tracking-widest text-indigo-300">
                        {trip.destination}
                      </p>
                    </div>
                  </div>
                  {trip.photos && trip.photos.length > 0 && (
                    <div className="border-b border-white/5 bg-slate-950/70 p-2">
                      <div className="grid grid-cols-3 gap-2">
                        {trip.photos.map((photo, index) => (
                          <div
                            key={index}
                            className="group/photo relative aspect-square overflow-hidden rounded-lg bg-slate-800"
                          >
                            <img
                              src={photo}
                              alt={`${trip.title} photo ${index + 1}`}
                              className="h-full w-full object-cover transition duration-300 group-hover/photo:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 transition duration-300 group-hover/photo:bg-black/20" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="truncate text-xl font-bold text-white">
                      {trip.title}
                    </h3>
                    <div className="mt-4 rounded-xl border border-white/5 bg-slate-950/50 p-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        Destination
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-200">
                         {trip.destination}
                      </p>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-white/5 bg-slate-950/50 p-3">
                        <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                          Start Date
                        </p>
                       <p className="mt-1 text-sm font-semibold text-slate-200">
                          {trip.startDate}
                        </p>
                      </div>
                     <div className="rounded-xl border border-white/5 bg-slate-950/50 p-3">
                       <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                          End Date
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-200">
                          {trip.endDate}
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
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicProfile;
