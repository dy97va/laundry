import React from 'react'
import { auth } from '../../firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { UserReservationList } from '../../components/UserReservationList/UserReservationList'
import { GetUserUid } from '../../Auth/AuthMethods'
import './Profile.css'

export const Profile = () => {
	const navigate = useNavigate()
	const uid = GetUserUid()
	const handleLogOut = async () => {
		try {
			await auth.signOut().then(() => {
				navigate('/')
			})
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='profileBody'>
			<UserReservationList uid={uid} />
			<div className='logoutButtonContainer'>
				<button className='logoutButton' onClick={handleLogOut}>
					Log out
				</button>
			</div>
		</div>
	)
}
