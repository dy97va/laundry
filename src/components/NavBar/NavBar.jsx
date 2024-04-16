import React, { useState } from 'react'
import './NavBar.css'
import { Link, NavLink } from 'react-router-dom'
import { LoginForm } from '../Login/LoginForm'
import { SignUpForm } from '../Login/SignUpForm'
import { GetUserUid, GetCurrentUser } from '../../Auth/AuthMethods'

export const NavBar = () => {
	const [menuOpen, setMenuOpen] = useState(false)
	const [loginFormOpen, setLoginFormOpen] = useState(false)
	const [signUpFormOpen, setSignUpFormOpen] = useState(false)
	const [language, setLanguage] = useState('eng')
	const user = GetCurrentUser()

	const handleLanguageChange = (lang) => {
		setLanguage(lang)
	}

	const openLoginForm = () => {
		setLoginFormOpen(true)
		setSignUpFormOpen(false)
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
					<NavLink onClick={() => setMenuOpen(!menuOpen)} to='/'>
						Schedule
					</NavLink>
				</li>
				<li>
					{!user && (
						<li>
							<div onClick={() => setLoginFormOpen(!loginFormOpen)}>Login/Signup</div>
						</li>
					)}

					{loginFormOpen && (
						<>
							<LoginForm
								onClose={() => setLoginFormOpen(!loginFormOpen)}
								showSignupForm={() => {
									setLoginFormOpen(!loginFormOpen)
									setSignUpFormOpen(!signUpFormOpen)
								}}
							/>
						</>
					)}
				</li>
				<li>
					{signUpFormOpen && (
						<>
							<SignUpForm
								onClose={() => setSignUpFormOpen(!signUpFormOpen)}
								showLoginForm={() => {
									setLoginFormOpen(!loginFormOpen)
									setSignUpFormOpen(!signUpFormOpen)
								}}
							/>
						</>
					)}
				</li>
				<li>
					{user && (
						<NavLink onClick={() => setMenuOpen(!menuOpen)} to='/profile'>
							Profile
						</NavLink>
					)}
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
