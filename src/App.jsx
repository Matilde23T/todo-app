import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './Context/AuthContex'
import Home from './Pages/Home'
import MainLayout from './Components/Layout/MainLayout'
import Login from './Pages/Login'
import Dashboard from './Pages/Dashboard'
import DashboardItems from './Pages/DashboardItems'
import DashboardLayout from './Components/Layout/DashboardLayout'

function ProtectedRoute({children}){
  const {isAuthenticated, loading} = useAuth();

  if(loading){
    return(
      <div>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-200">

        </div>
      </div>
    )
  }

  return isAuthenticated ? children : 
  <Navigate to='/login' replace/>
}

function App() {
  
  return (
   <AuthProvider>

<Router>


<Routes>


  <Route path='/' element={<MainLayout/>}>
  <Route index element={<Home/>}/>
 </Route>

 <Route path='/login' element={<Login/>}/>
 
<Route path='/dashboard' element= 
{<ProtectedRoute>
  <DashboardLayout/>
</ProtectedRoute>}>

<Route index element={<Dashboard/>}/>



          </Route>


          <Route path='' element={<Navigate to='/' replace/>}/>



</Routes>




</Router>





   </AuthProvider>
  )
}

export default App
