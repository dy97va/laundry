import React, { useState } from 'react'
import { db } from '../../firebase/firebase'
import './ReservationForm.css'
import dayjs from 'dayjs'
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export const ReservationForm = ({ selectedDate, onClose, bookedSlots }) => {
	const [startTime, setStartTime] = useState(null)
	const [endTime, setEndTime] = useState(null)

	const handleReservation = async () => {
		try {
			const dateKey = dayjs(selectedDate).format('YYYY-MM-DD')
			const scheduleRef = db.collection('schedule').doc(dateKey)

			const startTimeFormatted = dayjs(startTime).format('HH:mm')
			const endTimeFormatted = dayjs(endTime).format('HH:mm')

			const overlappingReservation = Object.values(bookedSlots).find((slot) => {
				const slotStartTime = slot.reservation.startTime
				const slotEndTime = slot.reservation.endTime
				return (
					(startTimeFormatted >= slotStartTime && startTimeFormatted < slotEndTime) ||
					(endTimeFormatted > slotStartTime && endTimeFormatted <= slotEndTime) ||
					(startTimeFormatted <= slotStartTime && endTimeFormatted >= slotEndTime)
				)
			})

			if (overlappingReservation) {
				console.error('Cannot make reservation. Selected time overlaps with an existing reservation.')
				return
			}

			const reservation = {
				startTime: startTimeFormatted,
				endTime: endTimeFormatted,
			}

			const newBookedSlots = {
				...bookedSlots,
				[startTimeFormatted]: { status: 'Booked', reservation },
			}

			await scheduleRef.set({ bookedSlots: newBookedSlots }, { merge: true })
			onClose()
		} catch (error) {
			console.error('Error making reservation:', error)
		}
	}

	const shouldDisableTime = (value) => {
		const hour = dayjs(value).hour()
		return hour < 6 || hour > 23
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fi'>
			<div className='reservation-form'>
				<div className='reservationFormHeading'>
					<label>{selectedDate.toDateString()}</label>
					<button onClick={onClose}>x</button>
				</div>
				<label>start time:</label>
				<MultiSectionDigitalClock
					value={startTime}
					onChange={setStartTime}
					ampm={false}
					minutesStep={15}
					skipDisabled={true}
				/>
				<label>end time:</label>
				<MultiSectionDigitalClock
					value={endTime}
					onChange={setEndTime}
					ampm={false}
					minutesStep={15}
					skipDisabled={true}
					shouldDisableTime={shouldDisableTime}
				/>
				<button onClick={handleReservation}>Reserve</button>
			</div>
		</LocalizationProvider>
	)
}
