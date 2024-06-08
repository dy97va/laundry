import React, { useState, useEffect } from 'react'
import { auth, db } from '../../../firebase/firebase'
import { fetchAddressList } from '../../../Firestore/FirestoreMethods'
import './SignUpForm.css'

export const SignUpForm = ({ showLoginForm, onClose }) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [room, setRoom] = useState('')
	const [userAddress, setUserAddress] = useState('')
	const [addressList, setAddressList] = useState([])

	const handleSignUp = async (event) => {
		event.preventDefault()
		try {
			const userCredentials = await auth
				.createUserWithEmailAndPassword(email, password)
				.then((credentials) => {
					db.collection('users').doc(credentials.user.uid).set({
						email: email,
						name: name,
						userAddress: userAddress,
						room: room,
						role: 'user',
					})
				})
				.then(() => {
					userCredentials.user.sendEmailVerification()
					onClose()
				})
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchAddressList()
			.then((addresses) => setAddressList(addresses))
			.catch((error) => console.log(error))
	}, [])

	return (
		<div className='modalBackdrop'>
			<div className='signUpForm'>
				<div className='closeButtonContainer'>
					<button className='signUpFormButton' onClick={onClose}>
						close
					</button>
				</div>
				<h1>Sign Up</h1>
				<form className='form' onSubmit={handleSignUp}>
					<label>Name</label>
					<input
						type='text'
						className='form-control'
						required
						value={name}
						onChange={(event) => setName(event.target.value)}
					/>
					<label>Address</label>
					<select
						className='signupSelect'
						required
						value={userAddress}
						onChange={(event) => setUserAddress(event.target.value)}>
						<option value=''>Select an address</option>
						{addressList.map((address) => (
							<option key={address.id} value={address.id}>
								{address.id}
							</option>
						))}
					</select>
					<label>Room</label>
					<input
						type='text'
						className='form-control'
						required
						value={room}
						onChange={(event) => setRoom(event.target.value)}
					/>
					<label>Email</label>
					<input
						type='email'
						className='form-control'
						required
						value={email}
						onChange={(event) => setEmail(event.target.value)}
					/>
					<label>Password</label>
					<input
						type='password'
						className='form-control'
						required
						value={password}
						onChange={(event) => setPassword(event.target.value)}
					/>
					<div className='btn-box'>
						<button className='signUpFormButton' type='submit'>
							SIGN UP
						</button>
					</div>
				</form>
				<p>
					Already have an account?{' '}
					<button className='linkButton' onClick={showLoginForm}>
						Login
					</button>
				</p>
			</div>
		</div>
	)
}
