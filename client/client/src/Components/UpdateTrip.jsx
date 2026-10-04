import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../api/axios'
const UpdateTrip = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    startDate: '',
    endDate: '',
    description: '',
    destination: '',
    rating: '',
    coverImage: null, 
    photos: []      
  })
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await API.get(`/trip/${id}`)
        const trip = response.data.trip
        setFormData({
          title: trip.title || '',
          startDate: trip.startDate ? trip.startDate.substring(0, 10) : '',
          endDate: trip.endDate ? trip.endDate.substring(0, 10) : '',
          description: trip.description || '',
          destination: trip.destination || '',
          rating: trip.rating || '',
          coverImage: trip.coverImage || '',
          photos: trip.photos || []
        })
      } catch (error) {
        console.error('Error fetching trip data:', error)
      }
    }
    fetchTrip()
  }, [id])
  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "coverImage") {
      if (files && files[0]) {
        setFormData((prev) => ({
          ...prev,
          coverImage: files[0],
        }))
      }
      return
    }
    if (name === "photos") {
      if (files && files.length > 0) {
        setFormData((prev) => ({
          ...prev,
          photos: [
            ...prev.photos,
            ...Array.from(files),
          ],
        }))
      }
      return
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  const handleRemovePhoto = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, index) => index !== indexToRemove),
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = new FormData()
      data.append('title', formData.title)
      data.append('startDate', formData.startDate)
      data.append('endDate', formData.endDate)
      data.append('description', formData.description)
      data.append('destination', formData.destination)
      data.append('rating', formData.rating)
      if (formData.coverImage instanceof File) {
        data.append('coverImage', formData.coverImage)
      } else if (typeof formData.coverImage === 'string') {
        data.append('existingcoverImage', formData.coverImage)
      }
      formData.photos.forEach((photo) => {
        if (photo instanceof File) {
          data.append('photos', photo)
        } else if (typeof photo === 'string') {
          data.append('existingPhotos', photo)
        }
      })
      await API.put(`/trip/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      navigate('/dashboard')
    } catch (error) {
      console.error('Error updating trip:', error)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center p-4 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-indigo-600/30 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600/25 rounded-full blur-3xl animate-[bounce_6s_infinite] pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl animate-[ping_8s_infinite] pointer-events-none"></div>
      <div className="relative z-10 w-full max-w-md bg-slate-900/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8 transform transition-all duration-300 hover:border-white/20">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white tracking-tight">Update Trip</h2>
          <p className="text-sm text-slate-400 mt-1">Update the details of your trip</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Title
            </label>
            <input 
              type="text"
              placeholder="Enter title"
              value={formData.title}
              onChange={handleChange}
              name="title"
              className="w-full px-3.5 py-2.5 bg-slate-800/40 border border-slate-700/60 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:bg-slate-800/70 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all"
            />
          </div>
          <div className="grid grid-cols-2 gap-3"> 
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Start-Date
              </label>
              <input 
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                name="startDate"
                className="w-full px-3.5 py-2.5 bg-slate-800/40 border border-slate-700/60 rounded-lg text-sm text-slate-100 focus:outline-none focus:bg-slate-800/70 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                End-Date
              </label>
              <input 
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-800/40 border border-slate-700/60 rounded-lg text-sm text-slate-100 focus:outline-none focus:bg-slate-800/70 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all [color-scheme:dark]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Description
            </label>
            <textarea 
              rows={2}
              cols={19}
              placeholder="Add trip notes or description..."
              value={formData.description}
              onChange={handleChange}
              name="description"
              className="w-full px-3.5 py-2.5 bg-slate-800/40 border border-slate-700/60 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:bg-slate-800/70 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all resize-y"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Destination
            </label>
            <input
              type="text" 
              placeholder="Where are you traveling?"
              value={formData.destination}
              name="destination"
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 bg-slate-800/40 border border-slate-700/60 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:bg-slate-800/70 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Rating
            </label>
            <input 
              type="number"
              name="rating"
              min="1"
              max="5"
              value={formData.rating}
              onChange={handleChange} 
              className="w-full px-3.5 py-2.5 bg-slate-800/40 border border-slate-700/60 rounded-lg text-sm text-slate-100 focus:outline-none focus:bg-slate-800/70 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all"
            />
          </div>
          <div>
            <label htmlFor="coverImage" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Trip Image
            </label>
            <input
              type="file"
              id="coverImage"
              name="coverImage"
              onChange={handleChange}
              accept=".png,.jpg,.jpeg"
              className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-sm text-slate-300 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-indigo-500/15 file:text-indigo-400 file:font-medium hover:file:bg-indigo-500/25 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>
          <div>
            <label htmlFor="photos" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Additional Photos
            </label>
            <input
              type="file"
              id="photos"
              name="photos"
              multiple
              onChange={handleChange}
              accept=".png,.jpeg,.jpg"
              className="w-full px-3 py-2.5 bg-slate-800/50 border border-slate-700 rounded-xl text-sm text-slate-300 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-indigo-500/15 file:text-indigo-400 file:font-medium hover:file:bg-indigo-500/25 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
            {formData.photos.map((photo, index) => (
              <div key={index} className="relative group overflow-hidden rounded-xl border border-slate-700 bg-slate-800 shadow-md">
                <img 
                  src={typeof photo === 'string' ? photo : URL.createObjectURL(photo)} 
                  alt={photo.name || `photo-${index}`} 
                  className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <button 
                  type="button" 
                  onClick={() => handleRemovePhoto(index)}
                  className="absolute top-1 right-1 w-7 h-7 rounded-full bg-red-600 hover:bg-red-500 text-white flex items-center justify-center text-xs font-bold transition-all"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button 
            type="submit"
            disabled={loading}
            className="w-full text-center mt-2 py-3 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg shadow-indigo-600/30 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Updating..." : "Submit"}
          </button>
        </form>
      </div>
    </div> 
  )
}

export default UpdateTrip