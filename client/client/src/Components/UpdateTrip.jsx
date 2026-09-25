import  { useEffect, useState } from 'react'
import{ useNavigate, useParams} from 'react-router-dom'
import API from '../api/axios'
const UpdateTrip = () => {
  const {id}= useParams()
  const navigate= useNavigate()
  const[loading,setLoading]=useState(false)
    const[formData,setFormData]=useState({
      title:'',
      startDate:'',
      endDate:'',
      description:'',
      destination:'',
      rating:''
    })
useEffect(()=>{
     const update=async ()=>{
    try {
            const response = await API.get(`/trip/${id}`)
            const trip= response.data.trip
            setFormData({
              title:trip.title || '',
              startDate:trip.startDate
               ? trip.startDate.substring(0,10)
              : '' ,
              endDate:trip.endDate 
              ?trip.endDate.substring(0,10) 
              : '',
              description:trip.description || '',
              destination:trip.destination || '',
              rating:trip.rating || ''
            })
        }
    catch (error) {
        console.log(error)
    }
  }
    update()
},[id])
const handleChange = (e)=>{
setFormData({
  ...formData,
  [e.target.name]:e.target.value
})
}
 const handleSubmit=async (e)=>{
e.preventDefault()
 setLoading(true)
try {
   await API.put(`/trip/${id}`,formData)
  navigate('/dashboard')
} catch (error) {
  console.error(error)
}
finally{
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
            <div>
              <input 
                type="text"
                placeholder='Enter title'
                value={formData.title}
                onChange={handleChange}
                name='title'
                className="w-full px-3.5 py-2.5 bg-slate-800/40 border border-slate-700/60 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:bg-slate-800/70 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3"> 
            <div>
              <label htmlFor="" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                Start-Date
              </label>
              <input 
                type="date"
                value={formData.startDate}
                onChange={handleChange}
                name='startDate'
                className="w-full px-3.5 py-2.5 bg-slate-800/40 border border-slate-700/60 rounded-lg text-sm text-slate-100 focus:outline-none focus:bg-slate-800/70 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all [color-scheme:dark]"
              />
            </div>
            <div>
              <label htmlFor="" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
                End-Date
              </label>
              <input 
                type="date"
                name='endDate'
                value={formData.endDate}
                onChange={handleChange}
                     className="w-full px-3.5 py-2.5 bg-slate-800/40 border border-slate-700/60 rounded-lg text-sm text-slate-100 focus:outline-none focus:bg-slate-800/70 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all [color-scheme:dark]"
              />
            </div>
          </div>
          <div>
            <label htmlFor="" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Description
            </label>
            <div>
              <textarea 
                rows={2}
                cols={19}
                placeholder="Add trip notes or description..."
                value={formData.description}
                onChange={handleChange}
                name='description'
                className="w-full px-3.5 py-2.5 bg-slate-800/40 border border-slate-700/60 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:bg-slate-800/70 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all resize-y"
              />
            </div>
          </div>
          <div>
            <label htmlFor="" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Destination
            </label>
            <div>
              <input
                type="text" 
                placeholder="Where are you traveling?"
                value={formData.destination}
                name='destination'
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 bg-slate-800/40 border border-slate-700/60 rounded-lg text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:bg-slate-800/70 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all"
              />
            </div>
          </div>
          <div>
            <label htmlFor="" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1">
              Rating
            </label>
            <div>
              <input 
                type="number"
                name='rating'
                min='1'
                max='5'
                value={formData.rating}
                onChange={handleChange} 
                className="w-full px-3.5 py-2.5 bg-slate-800/40 border border-slate-700/60 rounded-lg text-sm text-slate-100 focus:outline-none focus:bg-slate-800/70 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition-all"
              />
            </div>
          </div>
          <button 
            type="submit"
            disabled={loading}
           
            className="w-full text-center mt-2 py-3 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold rounded-lg shadow-lg shadow-indigo-600/30 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          >
             {loading?"Update..":"Submit.." } 
           
          </button>
        </form>
      </div>
    </div> 
  )
}
export default UpdateTrip