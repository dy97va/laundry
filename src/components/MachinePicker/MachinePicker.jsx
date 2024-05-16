import React, { useEffect, useState } from 'react'
import './MachinePicker.css'
import { GetCurrentUser } from '../../Auth/AuthMethods'
import { fetchMachineList } from '../../Firestore/FirestoreMethods'

export const MachinePicker = ({ onChange }) => {
	const [selectedMachine, setSelectedMachine] = useState('')
	const [machineList, setMachineList] = useState([])
	const user = GetCurrentUser()

	useEffect(() => {
		if (user) {
			fetchMachineList(user).then((machines) => setMachineList(machines))
		}
	}, [user])

	const handleClick = (machine) => {
		setSelectedMachine(machine)
		onChange(machine)
	}

	return (
		<div className='machinePicker'>
			{machineList.map((machine) => (
				<button
					key={machine}
					className={selectedMachine === machine ? 'selected' : 'notSelected'}
					onClick={() => handleClick(machine)}>
					{machine}
				</button>
			))}
		</div>
	)
}
