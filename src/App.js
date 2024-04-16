import logo from './logo.svg'
import './App.css'
import { NavBar } from './components/NavBar/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Main } from './Pages/Main/Main'
import { SignUpForm } from './components/Login/SignUpForm'
import { Profile } from './Pages/Profile/Profile'

export const App = () => {
	return (
		<BrowserRouter>
			<NavBar />
			<Routes>
				<Route path='/' element={<Main />} />
				<Route path='/profile' element={<Profile />} />
			</Routes>
		</BrowserRouter>
	)
}
