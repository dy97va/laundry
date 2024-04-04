import React, { useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'

export const DatePicker = ({ onChange }) => {
	const [date, setDate] = useState(new Date())

	const handleDateChange = (newDate) => {
		setDate(newDate)
		onChange(newDate)
	}

	return <Calendar onChange={handleDateChange} value={date} />
}
