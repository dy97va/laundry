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
				<InputLabel id='demo-simple-select-autowidth-label'>Kone</InputLabel>
				<Select
					labelId='demo-simple-select-autowidth-label'
					id='demo-simple-select-autowidth'
					value={machine}
					onChange={handleChange}
					autoWidth
					label='Kone'>
					<MenuItem value=''>
						<em>Valistse Kone</em>
					</MenuItem>
					<MenuItem value={10}>H-Rapu</MenuItem>
					<MenuItem value={21}>I-Rapu</MenuItem>
					<MenuItem value={22}>Kuivaus Kone</MenuItem>
				</Select>
			</FormControl>
		</div>
	)
}
