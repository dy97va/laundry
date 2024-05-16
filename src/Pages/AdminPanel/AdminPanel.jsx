import React, { useEffect, useState } from 'react'
import {
	fetchAddressList,
	deleteAddress,
	deleteMachine,
	addNewAddress,
	addNewMachine,
} from '../../Firestore/FirestoreMethods'
import './AdminPanel.css'
import { ConfirmationModal } from '../../components/ConfirmationModal/ConfirmationModal'

export const AdminPanel = () => {
	const [addressList, setAddressList] = useState([])
	const [newAddress, setNewAddress] = useState('')
	const [newMachine, setNewMachine] = useState('')
	const [newAddressFormOpen, setNewAddressFormOpen] = useState(false)
	const [addressConfirmationModalOpen, setAddressConfirmationModalOpen] = useState(false)
	const [machineConfirmationModalOpen, setMachineConfirmationModalOpen] = useState(false)
	const [deletingAddressId, setDeletingAddressID] = useState('')
	const [machineToDelete, setMachineToDelete] = useState('')

	useEffect(() => {
		fetchAddressData()
	}, [])

	const fetchAddressData = async () => {
		try {
			const addresses = await fetchAddressList()
			setAddressList(addresses)
		} catch (error) {
			console.error('Error fetching address data: ', error)
		}
	}

	const confirmAddressDeletion = (id) => {
		setDeletingAddressID(id)
		setAddressConfirmationModalOpen(true)
	}

	const confirmMachineDeletion = (addressId, machine) => {
		setDeletingAddressID(addressId)
		setMachineToDelete(machine)
		setMachineConfirmationModalOpen(true)
	}

	const handleDeleteAddress = async () => {
		try {
			await deleteAddress(deletingAddressId)
			setAddressConfirmationModalOpen(false)
			fetchAddressData()
		} catch (error) {
			console.error('Error deleting address: ', error)
		}
	}

	const handleDeleteMachine = async () => {
		try {
			await deleteMachine(deletingAddressId, machineToDelete)
			setMachineConfirmationModalOpen(false)
			fetchAddressData()
		} catch (error) {
			console.error('Error deleting machine: ', error)
		}
	}

	const handleAddNewAddress = async (event) => {
		event.preventDefault()
		try {
			await addNewAddress(newAddress)
			setNewAddress('')
			setNewAddressFormOpen(false)
			fetchAddressData()
		} catch (error) {
			console.error('Error adding new address: ', error)
		}
	}

	const handleAddNewMachine = async (addressId, event) => {
		event.preventDefault()
		try {
			await addNewMachine(addressId, newMachine)
			setNewMachine('')
			fetchAddressData()
		} catch (error) {
			console.error('Error adding new machine: ', error)
		}
	}

	const handleToggleNewMachineForm = (addressId) => {
		setAddressList((prevAddressList) =>
			prevAddressList.map((address) =>
				address.id === addressId ? { ...address, newMachineFormOpen: !address.newMachineFormOpen } : address
			)
		)
	}

	const handleToggleMachineList = (addressId) => {
		setAddressList((prevAddressList) =>
			prevAddressList.map((address) =>
				address.id === addressId ? { ...address, machineListOpen: !address.machineListOpen } : address
			)
		)
	}

	return (
		<div className='adminPanelBody'>
			<div>
				{addressList.map((address) => (
					<div key={address.id}>
						<div className='addressField'>
							<div onClick={() => handleToggleMachineList(address.id)}>
								{address.machineListOpen ? '↓' : '→'}
								{address.id}
							</div>
							<button onClick={() => confirmAddressDeletion(address.id)}>delete</button>
							{addressConfirmationModalOpen && (
								<ConfirmationModal
									confirmationMessage={`Are you sure you want to delete address ${deletingAddressId}?`}
									onClose={() => setAddressConfirmationModalOpen(false)}
									onConfirm={handleDeleteAddress}
								/>
							)}
						</div>
						{address.data.machines && address.machineListOpen && (
							<div>
								{Object.values(address.data.machines).map((machine) => (
									<div className='machineField' key={machine}>
										{machine}
										<button onClick={() => confirmMachineDeletion(address.id, machine)}>delete</button>
										{machineConfirmationModalOpen && (
											<ConfirmationModal
												confirmationMessage={`Are you sure you want to delete machine ${machineToDelete}?`}
												onClose={() => setMachineConfirmationModalOpen(false)}
												onConfirm={handleDeleteMachine}
											/>
										)}
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
								<form onSubmit={(event) => handleAddNewMachine(address.id, event)}>
									<input type='text' value={newMachine} onChange={(event) => setNewMachine(event.target.value)} />
									<button type='submit'>Save</button>
								</form>
								<button onClick={() => handleToggleNewMachineForm(address.id)}>close</button>
							</div>
						)}
					</div>
				))}
			</div>
			<div>
				<div className='addressField' onClick={() => setNewAddressFormOpen(true)}>
					<div>Add New Address</div>
					<button>+</button>
				</div>
				{newAddressFormOpen && (
					<div className='newForm'>
						<form autoComplete='off' onSubmit={handleAddNewAddress}>
							<input type='text' value={newAddress} onChange={(event) => setNewAddress(event.target.value)} />
							<button type='submit'>Save</button>
						</form>
						<button onClick={() => setNewAddressFormOpen(false)}>cancel</button>
					</div>
				)}
			</div>
		</div>
	)
}
