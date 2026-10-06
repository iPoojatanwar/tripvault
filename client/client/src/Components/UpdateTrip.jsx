import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api/axios";

const UpdateTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    description: "",
    destination: "",
    rating: "",
    coverImage: null,
    photos: [],
  });

  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await API.get(`/trip/${id}`);
        const trip = response.data.trip;

        setFormData({
          title: trip.title || "",
          startDate: trip.startDate
            ? trip.startDate.substring(0, 10)
            : "",
          endDate: trip.endDate
            ? trip.endDate.substring(0, 10)
            : "",
          description: trip.description || "",
          destination: trip.destination || "",
          rating: trip.rating || "",
          coverImage: trip.coverImage || "",
          photos: trip.photos || [],
        });
      } catch (error) {
        console.error("Error fetching trip data:", error);
      }
    };

    fetchTrip();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "coverImage") {
      if (files && files[0]) {
        setFormData((prev) => ({
          ...prev,
          coverImage: files[0],
        }));
      }
      return;
    }

    if (name === "photos") {
      if (files && files.length > 0) {
        setFormData((prev) => ({
          ...prev,
          photos: [...prev.photos, ...Array.from(files)],
        }));
      }
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRemovePhoto = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();

      data.append("title", formData.title);
      data.append("startDate", formData.startDate);
      data.append("endDate", formData.endDate);
      data.append("description", formData.description);
      data.append("destination", formData.destination);
      data.append("rating", formData.rating);

      if (formData.coverImage instanceof File) {
        data.append("coverImage", formData.coverImage);
      } else if (typeof formData.coverImage === "string") {
        data.append("existingcoverImage", formData.coverImage);
      }

      formData.photos.forEach((photo) => {
        if (photo instanceof File) {
          data.append("photos", photo);
        } else if (typeof photo === "string") {
          data.append("existingPhotos", photo);
        }
      });

      await API.put(`/trip/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating trip:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-4">
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 animate-pulse rounded-full bg-indigo-600/30 blur-3xl" />

      <div className="pointer-events-none absolute bottom-1/4 right-1/4 h-80 w-80 animate-[bounce_6s_infinite] rounded-full bg-purple-600/25 blur-3xl" />

      <div className="pointer-events-none absolute right-1/3 top-1/3 h-64 w-64 animate-[ping_8s_infinite] rounded-full bg-blue-600/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-white/20">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Update Trip
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Update the details of your trip
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Title
            </label>

            <input
              type="text"
              placeholder="Enter title"
              value={formData.title}
              onChange={handleChange}
              name="title"
              className="w-full rounded-lg border border-slate-700/60 bg-slate-800/40 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-all focus:border-indigo-500 focus:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                Start-Date
              </label>

              <input
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                name="startDate"
                className="w-full rounded-lg border border-slate-700/60 bg-slate-800/40 px-3.5 py-2.5 text-sm text-slate-100 transition-all focus:border-indigo-500 focus:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 [color-scheme:dark]"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                End-Date
              </label>

              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700/60 bg-slate-800/40 px-3.5 py-2.5 text-sm text-slate-100 transition-all focus:border-indigo-500 focus:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 [color-scheme:dark]"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Description
            </label>

            <textarea
              rows={2}
              cols={19}
              placeholder="Add trip notes or description..."
              value={formData.description}
              onChange={handleChange}
              name="description"
              className="w-full resize-y rounded-lg border border-slate-700/60 bg-slate-800/40 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-all focus:border-indigo-500 focus:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Destination
            </label>

            <input
              type="text"
              placeholder="Where are you traveling?"
              value={formData.destination}
              name="destination"
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700/60 bg-slate-800/40 px-3.5 py-2.5 text-sm text-slate-100 placeholder-slate-500 transition-all focus:border-indigo-500 focus:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Rating
            </label>

            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              value={formData.rating}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-700/60 bg-slate-800/40 px-3.5 py-2.5 text-sm text-slate-100 transition-all focus:border-indigo-500 focus:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
            />
          </div>

          <div>
            <label
              htmlFor="coverImage"
              className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-300"
            >
              Trip Image
            </label>

            <input
              type="file"
              id="coverImage"
              name="coverImage"
              onChange={handleChange}
              accept=".png,.jpg,.jpeg"
              className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-3 py-2.5 text-sm text-slate-300 transition-all file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-500/15 file:px-3 file:py-1.5 file:font-medium file:text-indigo-400 hover:file:bg-indigo-500/25 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div>
            <label
              htmlFor="photos"
              className="mb-1 block text-xs font-semibold uppercase tracking-wider text-slate-300"
            >
              Additional Photos
            </label>

            <input
              type="file"
              id="photos"
              name="photos"
              multiple
              onChange={handleChange}
              accept=".png,.jpeg,.jpg"
              className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-3 py-2.5 text-sm text-slate-300 transition-all file:mr-4 file:rounded-lg file:border-0 file:bg-indigo-500/15 file:px-3 file:py-1.5 file:font-medium file:text-indigo-400 hover:file:bg-indigo-500/25 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {formData.photos.map((photo, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-md"
              >
                <img
                  src={
                    typeof photo === "string"
                      ? photo
                      : URL.createObjectURL(photo)
                  }
                  alt={photo.name || `photo-${index}`}
                  className="h-24 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                <button
                  type="button"
                  onClick={() => handleRemovePhoto(index)}
                  className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white transition-all hover:bg-red-500"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full rounded-lg bg-indigo-600 py-3 text-center font-semibold text-white shadow-lg shadow-indigo-600/30 transition-all duration-150 hover:bg-indigo-500 active:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Updating..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTrip;
