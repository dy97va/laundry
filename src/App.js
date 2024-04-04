import logo from './logo.svg'
import './App.css'
import { NavBar } from './components/NavBar/NavBar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Body } from './components/Body/Body'

function App() {
	return (
		<BrowserRouter>
			<NavBar />
			<Body />
		</BrowserRouter>
	)
}

export default App
