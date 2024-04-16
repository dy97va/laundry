import React, { useState } from 'react'
import './MachinePicker.css'

export const MachinePicker = ({ onChange }) => {
	const [selectedMachine, setSelectedMachine] = useState('')

	const handleClick = (machine) => {
		setSelectedMachine(machine)
		onChange(machine)
	}

	return (
		<>
			<div className='machinePicker'>
				<button
					className={selectedMachine === 'Ketunpolku H' ? 'selected' : 'notSelected'}
					onClick={() => handleClick('Ketunpolku H')}>
					Ketunpolku (H-Rapu)
				</button>
				<button
					className={selectedMachine === 'Ketunpolku I' ? 'selected' : 'notSelected'}
					onClick={() => handleClick('Ketunpolku I')}>
					Ketunpolku (I-Rapu)
				</button>
				<button
					className={selectedMachine === 'Opintie 1' ? 'selected' : 'notSelected'}
					onClick={() => handleClick('Opintie 1')}>
					Opintie (Kone1)
				</button>
				<button
					className={selectedMachine === 'Opintie 2' ? 'selected' : 'notSelected'}
					onClick={() => handleClick('Opintie 2')}>
					Opintie (Kone2)
				</button>
			</div>
		</>
	)
}
