import { useState } from 'react'
import API from '../api/axios'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
const TripForm = () => {
const navigate = useNavigate()
const [formData ,setFormData]=useState({
    title:'',
    startDate:'',
    endDate:'',
    description:'',
    destination:'',
    rating:5,
    coverImage: null,
  photos:[],
})
const[loading , setLoading]=useState(false)
const handleChange=(e)=>{
  const {name,files,value}=e.target
 setFormData({ 
    ...formData,
    [name]: name==='photos'?Array.from(files):files?files[0]:value
})}
const handleSubmit= async (e)=>{
e.preventDefault()
setLoading(true)
try {
  const data= new FormData()
 data.append("title", formData.title);
data.append("startDate", formData.startDate);
data.append("endDate", formData.endDate);
data.append("description", formData.description);
data.append("destination", formData.destination);
data.append("rating", formData.rating);
  if(formData.coverImage){
    data.append("coverImage",formData.coverImage)
  }
  if(formData.photos && formData.photos.length>0){
   formData.photos.forEach((photos)=>{
 data.append('photos',photos)
   })
  }
   await API.post("/trip/",data,{ 
    headers:{
"Content-Type":"multipart/form-data",
    }
   }) 
   toast.success("Trip created successfully")
   navigate('/dashboard')
} catch (error) {
    const err=error.response.data.message
    toast.error(err) 
}
finally{
    setLoading(false)
}
}
  return (
  <div className="relative min-h-screen bg-slate-950 flex items-center justify-center p-4 overflow-hidden">
    <Toaster />
    <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
    <div className="relative z-10 w-full max-w-2xl bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-6 md:p-8">
      <div className="mb-7 text-center">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          Create New Trip
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Fill in the details for your upcoming adventure
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label
            htmlFor="title"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter trip title"
            value={formData.title}
            onChange={handleChange}
            name="title"
            required
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="startDate"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
            >
              Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={formData.startDate}
              onChange={handleChange}
              name="startDate"
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-sm text-slate-100 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 [color-scheme:dark]"
            />
          </div>
          <div>
            <label
              htmlFor="endDate"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
            >
              End Date
            </label>
            <input
              type="date"
              id="endDate"
              value={formData.endDate}
              onChange={handleChange}
              name="endDate"
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-sm text-slate-100 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 [color-scheme:dark]"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            rows={4}
            placeholder="Add trip notes or description..."
            value={formData.description}
            onChange={handleChange}
            name="description"
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 outline-none resize-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <div>
          <label
            htmlFor="destination"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
          >
            Destination
          </label>
          <input
            type="text"
            id="destination"
            placeholder="Where are you traveling?"
            value={formData.destination}
            name="destination"
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-sm text-slate-100 placeholder-slate-500 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <div>
          <label
            htmlFor="rating"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
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
            className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-sm text-slate-100 outline-none transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
        <div className="border-t border-slate-800 pt-5">
          <h3 className="text-base font-semibold text-white mb-1">
            Trip Images
          </h3>
          <p className="text-xs text-slate-500 mb-5">
            Upload a cover image and photos from your journey.
          </p>
          <div className="space-y-5">
            <div>
              <label
                htmlFor="coverImage"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
              >
                Cover Image
              </label>
              <input
                type="file"
                name="coverImage"
                onChange={handleChange}
                id="coverImage"
                accept=".png, .jpeg, .jpg"
                className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-sm text-slate-300 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-indigo-500/15 file:text-indigo-400 file:font-medium hover:file:bg-indigo-500/25 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="photos"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2"
              >
                Trip Photos
              </label>
              <input
                type="file"
                name="photos"
                multiple
                onChange={handleChange}
                id="photos"
                accept=".png, .jpeg, .jpg"
                className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-sm text-slate-300 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-indigo-500/15 file:text-indigo-400 file:font-medium hover:file:bg-indigo-500/25 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
              />
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
                {formData.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="relative group overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-md"
                  >
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={photo.name}
                      className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <button
                    type='button'
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          photos: prev.photos.filter(
                            (_, photoIndex) => photoIndex !== index
                          )
                        }));
                      }}
                      className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-red-500/90 hover:bg-red-600 text-white text-xs font-bold opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-lg"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Submitting..." : "Submit Trip"}
        </button>
      </form>
    </div>
  </div>
);
}
export default TripForm