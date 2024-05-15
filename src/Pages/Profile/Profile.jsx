import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserReservationList } from '../../components/UserReservationList/UserReservationList'
import { GetUserUid, Logout } from '../../Auth/AuthMethods'
import './Profile.css'

export const Profile = () => {
	const navigate = useNavigate()
	const uid = GetUserUid()

	const handleLogOut = () => {
		Logout()
		navigate('/')
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
