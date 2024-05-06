import React, { useState } from 'react'
import { DatePicker } from '../../components/DatePicker/DatePicker'
import { ScheduleGrid } from '../../components/ScheduleGrid/ScheduleGrid'
import { db } from '../../firebase/firebase'
import './Main.css'
import { MachinePicker } from '../../components/MachinePicker/MachinePicker'

export const Main = () => {
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [selectedMachine, setSelectedMachine] = useState('')
	// const [schedule, setSchedule] = useState({ date: new Date(), slots: [] })

	const handleDateChange = (date) => {
		setSelectedDate(date)
	}
	const handleMachineChange = (machine) => {
		setSelectedMachine(machine)
	}

	return (
		<div className='laundryBody'>
			<div>
				<MachinePicker onChange={handleMachineChange}></MachinePicker>
			</div>
			<div>
				<DatePicker onChange={handleDateChange} />
			</div>
			<div className='schedule'>
				<ScheduleGrid selectedDate={selectedDate} selectedMachine={selectedMachine} />
			</div>
		</div>
	)
}
