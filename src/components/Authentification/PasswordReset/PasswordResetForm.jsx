import React, { useState } from 'react'
import { PasswordReset } from '../../../Auth/AuthMethods'
import './PasswordResetForm.css'

export const PasswordResetForm = ({ onClose }) => {
	const [email, setEmail] = useState('')

	const handlePasswordReset = (event) => {
		event.preventDefault()
		PasswordReset(email)
	}

	return (
		<>
			<div className='modalBackdrop'>
				<div className='PasswordResetForm'>
					<form className='form' autoComplete='false' onSubmit={handlePasswordReset}>
						<label> Enter your email</label>
						<input
							type='email'
							className='form-control'
							required
							value={email}
							onChange={(event) => setEmail(event.target.value)}></input>
						<div className='buttonWrapper'>
							<button onClick={onClose}> cancel </button>
							<button type='submit'> send password reset link </button>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
