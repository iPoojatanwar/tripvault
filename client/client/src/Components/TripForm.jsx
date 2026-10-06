import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const TripForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    startDate: "",
    endDate: "",
    description: "",
    destination: "",
    rating: 5,
    coverImage: null,
    photos: [],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, files, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "photos"
          ? Array.from(files)
          : files
          ? files[0]
          : value,
    });
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

      if (formData.coverImage) {
        data.append("coverImage", formData.coverImage);
      }

      if (formData.photos && formData.photos.length > 0) {
        formData.photos.forEach((photos) => {
          data.append("photos", photos);
        });
      }

      await API.post("/trip/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Trip created successfully");
      navigate("/dashboard");
    } catch (error) {
      const err = error.response.data.message;
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-10">
      <Toaster />

      <div className="mx-auto w-full max-w-2xl">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl sm:p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-white">
              Create New Trip
            </h2>

            <p className="mt-2 text-sm text-slate-400">
              Add details about your travel experience
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Trip Title
              </label>

              <input
                type="text"
                id="title"
                name="title"
                placeholder="Enter trip title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="startDate"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  Start Date
                </label>

                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 [color-scheme:dark]"
                />
              </div>

              <div>
                <label
                  htmlFor="endDate"
                  className="mb-2 block text-sm font-medium text-slate-300"
                >
                  End Date
                </label>

                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 [color-scheme:dark]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="destination"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Destination
              </label>

              <input
                type="text"
                id="destination"
                name="destination"
                placeholder="Where are you traveling?"
                value={formData.destination}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Description
              </label>

              <textarea
                id="description"
                name="description"
                rows={4}
                placeholder="Add trip notes or description..."
                value={formData.description}
                onChange={handleChange}
                className="w-full resize-none rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div>
              <label
                htmlFor="rating"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Rating
              </label>

              <input
                type="number"
                id="rating"
                name="rating"
                min="1"
                max="5"
                value={formData.rating}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-sm text-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>

            <div className="border-t border-slate-800 pt-6">
              <h3 className="text-lg font-semibold text-white">
                Trip Images
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Upload a cover image and additional trip photos.
              </p>

              <div className="mt-5 space-y-5">
                <div>
                  <label
                    htmlFor="coverImage"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Cover Image
                  </label>

                  <input
                    type="file"
                    name="coverImage"
                    id="coverImage"
                    accept=".png, .jpeg, .jpg"
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-300 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:file:bg-indigo-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="photos"
                    className="mb-2 block text-sm font-medium text-slate-300"
                  >
                    Trip Photos
                  </label>

                  <input
                    type="file"
                    name="photos"
                    id="photos"
                    multiple
                    accept=".png, .jpeg, .jpg"
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2.5 text-sm text-slate-300 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-3 file:py-1.5 file:text-sm file:font-medium file:text-white hover:file:bg-indigo-500"
                  />

                  {formData.photos.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                      {formData.photos.map((photo, index) => (
                        <div
                          key={index}
                          className="group relative overflow-hidden rounded-lg border border-slate-700 bg-slate-800"
                        >
                          <img
                            src={URL.createObjectURL(photo)}
                            alt={photo.name}
                            className="h-24 w-full object-cover"
                          />

                          <button
                            type="button"
                            onClick={() => {
                              setFormData((prev) => ({
                                ...prev,
                                photos: prev.photos.filter(
                                  (_, photoIndex) =>
                                    photoIndex !== index
                                ),
                              }));
                            }}
                            className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-sm font-bold text-white opacity-0 transition group-hover:opacity-100 hover:bg-red-600"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-indigo-600 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Trip"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TripForm;