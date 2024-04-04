import React, { useState } from 'react'
import './NavBar.css'
import { Link, NavLink } from 'react-router-dom'

export const NavBar = () => {
	const [menuOpen, setMenuOpen] = useState(false)
	const [language, setLanguage] = useState('eng')

	const handleLanguageChange = (lang) => {
		setLanguage(lang)
		console.log(language)
	}

	return (
		<nav>
			<Link to='/' className='title'>
				Pesula
			</Link>
			<div className='menu' onClick={() => setMenuOpen(!menuOpen)}>
				<span></span>
				<span></span>
				<span></span>
			</div>
			<ul className={menuOpen ? 'open' : ''}>
				<li>
					<NavLink to='/services'>Kirjaudu</NavLink>
				</li>
				<li className='languagePicker' onClick={() => handleLanguageChange('rus')}>
					РУС
				</li>
				<li className='languagePicker' onClick={() => handleLanguageChange('fin')}>
					SUO
				</li>
				<li className='languagePicker' onClick={() => handleLanguageChange('eng')}>
					ENG
				</li>
			</ul>
		</nav>
	)
}
