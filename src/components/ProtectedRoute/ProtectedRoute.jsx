import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { GetCurrentUser } from '../../Auth/AuthMethods'

const ProtectedRoute = ({ children }) => {
	const user = GetCurrentUser()

	if (user === null) {
		return <div>Loading...</div> // or any other loading indicator
	}

	return user && user.role === 'admin' ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRoute
