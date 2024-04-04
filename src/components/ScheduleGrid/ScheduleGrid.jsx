import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase'
import { ReservationForm } from '../ReservationForm/ReservationForm'

export const ScheduleGrid = ({ selectedDate }) => {
	const [bookedSlots, setBookedSlots] = useState({})
	const [showReservationForm, setShowReservationForm] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const dateKey = selectedDate.toISOString().slice(0, 10) // Get the date in yyyy-mm-dd format
				const scheduleRef = db.collection('schedule').doc(dateKey)
				const doc = await scheduleRef.get()
				if (doc.exists) {
					setBookedSlots(doc.data().bookedSlots || {})
				} else {
					setBookedSlots({})
				}
			} catch (error) {
				console.error('Error fetching booked slots:', error)
			}
		}

		fetchData()
	}, [selectedDate])

	const openReservationForm = () => {
		setShowReservationForm(true)
	}

	const closeReservationForm = () => {
		setShowReservationForm(false)
	}

	const timeSlots = []
	for (let hour = 7; hour < 22; hour++) {
		for (let minute = 0; minute < 60; minute += 30) {
			const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
			timeSlots.push(time)
		}
	}

	const getStatusForTime = (time) => {
		for (const startTime of Object.keys(bookedSlots)) {
			const endTime = bookedSlots[startTime].reservation.endTime
			if (time >= startTime && time <= endTime) {
				return 'Booked'
			}
		}
		return 'Available'
	}

	return (
		<div className='schedule-grid'>
			<h2>Schedule for {selectedDate.toDateString()}</h2>
			<button onClick={openReservationForm}>Make Reservation</button>
			{showReservationForm && <ReservationForm selectedDate={selectedDate} onClose={closeReservationForm} />}
			<table>
				<thead>
					<tr>
						<th>Time</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{timeSlots.map((time, index) => (
						<tr key={index}>
							<td>{time}</td>
							<td>{getStatusForTime(time)}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
