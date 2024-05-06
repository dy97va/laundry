import React, { useEffect, useState } from 'react'
// import { GetCurrentUser } from '../../Auth/AuthMethods'
import { db } from '../../firebase/firebase'
import firebase from 'firebase/compat/app'
import 'firebase/firestore'
import './AdminPanel.css'

export const AdminPanel = () => {
	// const user = GetCurrentUser()

	const [addressList, setAddressList] = useState([])
	const [newAddressFormOpen, setNewAddressFormOpen] = useState(false)
	const [address, setAddress] = useState('')
	const [newMachine, setNewMachine] = useState('')

	const handleToggleNewMachineForm = (addressId) => {
		setAddressList((prevAddressList) =>
			prevAddressList.map((address) =>
				address.id === addressId ? { ...address, newMachineFormOpen: !address.newMachineFormOpen } : address
			)
		)
	}

	const handleToggleMachineList = (addressId) => {
		console.log('Toggling machine list for address:', addressId)
		setAddressList((prevAddressList) =>
			prevAddressList.map((address) =>
				address.id === addressId ? { ...address, machineListOpen: !address.machineListOpen } : { ...address }
			)
		)
	}

	const handleDeleteAddress = async (addressId) => {
		try {
			await db.collection('addresses').doc(addressId).delete()
			fetchAddressList()
		} catch (error) {
			console.log(error)
		}
	}

	const handleDeleteMachine = async (addressId, machine) => {
		try {
			await db
				.collection('addresses')
				.doc(addressId)
				.update({
					machines: firebase.firestore.FieldValue.arrayRemove(machine),
				})
			fetchAddressList()
		} catch (error) {
			console.log(error)
		}
	}

	const fetchAddressList = async () => {
		try {
			const addressRef = await db.collection('addresses').get()
			const addresses = []
			addressRef.forEach((doc) => {
				addresses.push({ id: doc.id, data: doc.data() })
			})
			setAddressList(addresses)
			console.log(addresses)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		fetchAddressList()
	}, [])

	const handleAddNewAddress = async (event) => {
		try {
			event.preventDefault()

			if (!address.trim()) {
				console.log('Address is empty. Please provide a valid address.')
				return
			}

			await db.collection('addresses').doc(address).set({})

			console.log(`Empty address document created with ID: ${address}`)
			setAddress('')
			fetchAddressList()
		} catch (error) {
			console.error('Error creating empty address document: ', error)
		}
	}

	const handleAddNewMachine = async (addressId, newMachineData, event) => {
		try {
			await db
				.collection('addresses')
				.doc(addressId)
				.update({
					machines: firebase.firestore.FieldValue.arrayUnion(newMachineData),
				})

			setNewMachine('')
			fetchAddressList()
		} catch (error) {
			console.error('Error adding new machine: ', error)
		}
	}

	return (
		<div className='adminPanelBody'>
			<div>
				<div>
					{addressList.map((address) => (
						<div key={address.id}>
							<div className='addressField'>
								<div onClick={() => handleToggleMachineList(address.id)}>
									{address.machineListOpen ? '↓' : '→'}
									{address.id}
								</div>
								<button onClick={() => handleDeleteAddress(address.id)}>delete</button>
							</div>
							{address.data.machines && address.machineListOpen && (
								<div>
									{Object.values(address.data.machines).map((machine) => (
										<div className='machineField'>
											<div key={machine}>{machine}</div>
											<button onClick={() => handleDeleteMachine(address.id, machine)}>delete</button>
										</div>
									))}
								</div>
							)}
							{!address.newMachineFormOpen && address.machineListOpen && (
								<div className='machineField' onClick={() => handleToggleNewMachineForm(address.id)}>
									<div>new machine</div>
									<div>+</div>
								</div>
							)}
							{address.newMachineFormOpen && (
								<div className='newForm'>
									<form onSubmit={(event) => handleAddNewMachine(address.id, newMachine, event)}>
										<input type='text' value={newMachine} onChange={(event) => setNewMachine(event.target.value)} />
										<button type='submit'>Save</button>
									</form>
									<button onClick={() => handleToggleNewMachineForm(address.id)}>close</button>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
			<div>
				<div className='addressField' onClick={() => setNewAddressFormOpen(true)}>
					<div>Add New Address</div>
					<button>+</button>
				</div>
				{newAddressFormOpen && (
					<div className='newForm'>
						<form autoComplete='off' onSubmit={handleAddNewAddress}>
							<input type='text' value={address} onChange={(event) => setAddress(event.target.value)} />
							<button type='submit'>Save</button>
						</form>
						<button onClick={() => setNewAddressFormOpen(false)}>cancel</button>
					</div>
				)}
			</div>
		</div>
	)
}
