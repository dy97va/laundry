import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { NavBar } from './components/NavBar/NavBar'
import { Main } from './Pages/Main/Main'
import { Profile } from './Pages/Profile/Profile'
import { AdminPanel } from './Pages/AdminPanel/AdminPanel'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

export const App = () => {
	return (
		<BrowserRouter basename='/'>
			<NavBar />
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='profile' element={<Profile />} />
				<Route element={<ProtectedRoute />}>
					<Route path='admin-panel' element={<AdminPanel />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
