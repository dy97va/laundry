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
	const user = GetCurrentUser()

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
						<div className='LoginNavBar' onClick={() => setLoginFormOpen(!loginFormOpen)}>
							Login/Signup
						</div>
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
			</ul>
		</nav>
	)
}
