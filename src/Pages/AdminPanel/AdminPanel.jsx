import React, { useState } from 'react'
import './AdminPanel.css'
import { UserList } from '../../components/UserList/UserList'
import { AddressList } from '../../components/AddressList/AddressList'

export const AdminPanel = () => {
	const [adminMenu, setAdminMenu] = useState('users')

	return (
		<div className='adminPanelBody'>
			<div className='adminMenuPicker'>
				<button className={adminMenu === 'users' ? 'active' : ''} onClick={() => setAdminMenu('users')}>
					Users
				</button>
				<button className={adminMenu === 'addresses' ? 'active' : ''} onClick={() => setAdminMenu('addresses')}>
					Addresses
				</button>
				<div className={`indicator ${adminMenu}`} />
			</div>
			{adminMenu === 'users' && <UserList />}
			{adminMenu === 'addresses' && <AddressList />}
		</div>
	)
}
