import React, { useEffect, useState } from 'react'
import { fetchUserList, updateUser, deleteUser } from '../../Firestore/FirestoreMethods' // Import the updateUser function
import './UserList.css'

export const UserList = () => {
	const [userList, setUserList] = useState([])
	const [editingUser, setEditingUser] = useState(null)
	const [updatedUser, setUpdatedUser] = useState({})

	useEffect(() => {
		fetchUsers()
	}, [])

	const fetchUsers = async () => {
		try {
			const users = await fetchUserList()
			setUserList(users)
		} catch (error) {
			console.log(error)
		}
	}

	const handleEditClick = (user) => {
		setEditingUser(user.id)
		setUpdatedUser(user.data)
	}

	const handleSaveClick = async (userId) => {
		try {
			await updateUser(userId, updatedUser)
			setEditingUser(null)
			fetchUsers() // Refresh the user list after saving
		} catch (error) {
			console.log(error)
		}
	}

	const handleChange = (e) => {
		const { name, value } = e.target
		setUpdatedUser((prev) => ({
			...prev,
			[name]: value,
		}))
	}

	const handleDeleteClick = async (userId) => {
		try {
			await deleteUser(userId)
			fetchUsers() // Refresh the user list after deletion
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className='userListField'>
			<div className='userListHeading'>
				<div className='userListTile'>Name:</div>
				<div className='userListTile'>Address:</div>
				<div className='userListTile'>Email:</div>
				<div className='userListTile'>Role:</div>
			</div>
			{userList.map((user) => (
				<div className='userListContainer' key={user.id}>
					<div className='userListItem'>
						{editingUser === user.id ? (
							<>
								<div className='userListTile'>
									<input type='text' name='name' value={updatedUser.name} onChange={handleChange} />
								</div>
								<div className='userListTile'>
									<input type='text' name='userAddress' value={updatedUser.userAddress} onChange={handleChange} />
									<input type='text' name='room' value={updatedUser.room} onChange={handleChange} />
								</div>
								<div className='userListTile'>{user.data.email}</div>
								<div className='userListTile'>
									<select name='role' value={updatedUser.role} onChange={handleChange}>
										<option value='user'>user</option>
										<option value='admin'>admin</option>
									</select>
								</div>
								<div className='userListTileButtons'>
									<button className='userlistButton' onClick={() => handleSaveClick(user.id)}>
										Save
									</button>
									<button className='userlistButton' onClick={() => handleDeleteClick(user.id)}>
										Delete
									</button>
									<button className='userlistButton' onClick={() => setEditingUser(null)}>
										Cancel
									</button>
								</div>
							</>
						) : (
							<>
								<div className='userListTile'>{user.data.name}</div>
								<div className='userListTile'>
									{user.data.userAddress} {user.data.room}
								</div>
								<div className='userListTile'>{user.data.email}</div>
								<div className='userListTile'>{user.data.role}</div>
								<div className='userListTileButtons'>
									<button className='userlistButton' onClick={() => handleEditClick(user)}>
										Edit
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			))}
		</div>
	)
}
