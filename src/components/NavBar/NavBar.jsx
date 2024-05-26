import React, { useState } from 'react'
import './NavBar.css'
import { Link, NavLink } from 'react-router-dom'
import { LoginForm } from '../Authentification/Login/LoginForm'
import { SignUpForm } from '../Authentification/SignUp/SignUpForm'
import { GetUserUid, GetCurrentUser } from '../../Auth/AuthMethods'
import { PasswordResetForm } from '../Authentification/PasswordReset/PasswordResetForm'

export const NavBar = () => {
	const [menuOpen, setMenuOpen] = useState(false)
	const [loginFormOpen, setLoginFormOpen] = useState(false)
	const [signUpFormOpen, setSignUpFormOpen] = useState(false)
	const [passwordResetFormOpen, setPasswordResetFormOpen] = useState(false)
	const user = GetCurrentUser()

	const openLoginForm = () => {
		setLoginFormOpen(true)
		setSignUpFormOpen(false)
		setPasswordResetFormOpen(false)
	}

	const profileLink = (
		<>
			{user ? (
				<li>
					<NavLink onClick={() => setMenuOpen(!menuOpen)} to='/profile'>
						Profile
					</NavLink>
				</li>
			) : (
				<>
					<li>
						<a onClick={() => setLoginFormOpen(true)}>Login/Signup</a>
						{loginFormOpen && (
							<>
								<LoginForm
									onClose={() => setLoginFormOpen(!loginFormOpen)}
									showSignupForm={() => {
										setLoginFormOpen(!loginFormOpen)
										setSignUpFormOpen(!signUpFormOpen)
									}}
									showPasswordResetForm={() => {
										setLoginFormOpen(!loginFormOpen)
										setPasswordResetFormOpen(!passwordResetFormOpen)
									}}
								/>
							</>
						)}
						{passwordResetFormOpen && (
							<PasswordResetForm onClose={() => setPasswordResetFormOpen(!passwordResetFormOpen)} />
						)}
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
				</>
			)}
		</>
	)

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
				{profileLink}
			</ul>
		</nav>
	)
}
