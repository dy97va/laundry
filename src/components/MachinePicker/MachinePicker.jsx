import React, { useEffect, useState } from 'react'
import './MachinePicker.css'
import { GetCurrentUser } from '../../Auth/AuthMethods'
import { db } from '../../firebase/firebase'

export const MachinePicker = ({ onChange }) => {
	const [selectedMachine, setSelectedMachine] = useState('')
	const [machineList, setMachineList] = useState([])
	const user = GetCurrentUser()

	useEffect(
		() => {
			if (user) {
				fetchMachineList()
			}
		},
		[user],
		[machineList]
	)
	console.log(machineList)

	const fetchMachineList = async () => {
		try {
			if (user) {
				const machinesSnapshot = await db.collection('addresses').doc(user.userAddress).get()
				const machinesData = machinesSnapshot.data()
				if (machinesData && machinesData.machines) {
					setMachineList(machinesData.machines)
				} else {
					console.log('No machines found for the current user address')
				}
			} else {
				console.log('No user found')
			}
		} catch (error) {
			console.log('Error fetching machine list:', error)
		}
	}

	const handleClick = (machine) => {
		setSelectedMachine(machine)
		onChange(machine)
	}

	return (
		<div className='machinePicker'>
			{machineList.map((machine) => (
				<button
					className={selectedMachine === machine ? 'selected' : 'notSelected'}
					onClick={() => handleClick(machine)}>
					{machine}
				</button>
			))}
		</div>
	)
}
