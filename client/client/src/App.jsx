import Register from './Pages/Register'
import './App.css'
import {Toaster} from 'react-hot-toast'
import { Login } from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import  { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import ProtectedRoute from './Components/ProtectedRoute'
import TripForm from './Components/TripForm'
import TripCard from './Components/TripCard'
import UpdateTrip from './Components/UpdateTrip'
function App() {
  return (
    <>
   <BrowserRouter>
  
  
    <Routes>
    <Route path="/" element={<Navigate to="/login" />} />
    <Route path='/login' element={<Login/>}/>
    <Route  element={<ProtectedRoute/>}>
    <Route path='/dashboard' element={<Dashboard/>}/>
    </Route>
    <Route path='/tripForm' element={<TripForm/>}/>
     <Route path='/tripCard/:id' element={<TripCard/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/updateTrip/:id' element={<UpdateTrip/>}/>
   </Routes> 
   </BrowserRouter>
    </>
  )
}

export default App
