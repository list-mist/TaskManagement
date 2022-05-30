import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from 'src/contexts/AuthContextProvider';


export default function RequireNotAuth() {

  const {isAuthenticated} = React.useContext(AuthContext)
  if(isAuthenticated === null){
      return <div>Loading...</div>
  }
  if(isAuthenticated === true){
    <Navigate to="/categories"/>
  }
  return (
     <Outlet/>
  )
}
