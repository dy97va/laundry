import React, { useState } from 'react'
import { TimePicker } from 'react-time-picker'
import { db } from '../../firebase/firebase'
import './ReservationForm.css'

export const ReservationForm = ({ selectedDate, onClose }) => {
	const [startTime, setStartTime] = useState('')
	const [endTime, setEndTime] = useState('')

	const handleReservation = async () => {
		try {
			const dateKey = selectedDate.toISOString().slice(0, 10) // Get the date in yyyy-mm-dd format
			console.log(dateKey) //print dateKey to console to check if the date is correct
			const scheduleRef = db.collection('schedule').doc(dateKey)
			const reservation = { startTime, endTime }
			const bookedSlots = {}

			// Create a single entry for the reservation with start and end times
			bookedSlots[startTime] = { status: 'Booked', reservation }

			await scheduleRef.set(
				{
					bookedSlots,
				},
				{ merge: true } // Merge with existing data
			)
			onClose()
		} catch (error) {
			console.error('Error making reservation:', error)
		}
	}

	return (
		<div className='reservation-form'>
			<h2>Make Reservation</h2>
			<h2>{selectedDate.toDateString()}</h2>
			<label>Start Time:</label>
			<TimePicker className='timePicker' value={startTime} onChange={setStartTime} />
			<label>End Time:</label>
			<TimePicker className='timePicker' value={endTime} onChange={setEndTime} />
			<button onClick={handleReservation}>Reserve</button>
		</div>
	)
}
