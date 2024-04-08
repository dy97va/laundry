import React, { useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

export const MachineSelector = () => {
	const [machine, setMachine] = useState('')
	const handleChange = (event) => {
		setMachine(event.target.value)
	}

	return (
		<div>
			<FormControl sx={{ m: 1, minWidth: 80 }}>
				<InputLabel>Kone</InputLabel>
				<Select value={machine} onChange={handleChange} autoWidth label='Kone'>
					<MenuItem value=''>
						<em>Choose the machine</em>
					</MenuItem>
					<MenuItem>H-Rapu</MenuItem>
					<MenuItem>I-Rapu</MenuItem>
					<MenuItem>Kuivaus Kone</MenuItem>
				</Select>
			</FormControl>
		</div>
	)
}
