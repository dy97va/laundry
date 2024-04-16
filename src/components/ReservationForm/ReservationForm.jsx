import React, { useState } from 'react'
import { db } from '../../firebase/firebase'
import './ReservationForm.css'
import dayjs from 'dayjs'
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export const ReservationForm = ({ selectedDate, onClose, bookedSlots, selectedMachine, uid, user }) => {
	const [startTime, setStartTime] = useState(null)
	const [endTime, setEndTime] = useState(null)

	const handleReservation = async () => {
		try {
			const dateKey = dayjs(selectedDate).format('DD-MM-YYYY')
			const scheduleRef = db.collection(selectedMachine).doc(dateKey)

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
			if (!startTime || !endTime) {
				console.error('cannot make a reservation, choose a start time and end time')
				return
			}

			if (endTimeFormatted < startTimeFormatted) {
				console.error('starting time cant be smaller than end time')
				return
			}

			if (endTimeFormatted > '23:00') {
				console.error('cannot make a reservation, latest time is 23:00')
				return
			}

			if (startTimeFormatted < '06:00') {
				console.error('cannot make a reservation, earliest time is 6:00')
				return
			}

			if (overlappingReservation) {
				console.error('Cannot make reservation. Selected time overlaps with an existing reservation.')
				return
			}

			const reservation = {
				startTime: startTimeFormatted,
				endTime: endTimeFormatted,
				uid: uid,
				room: user.room,
			}

			const newBookedSlots = {
				...bookedSlots,
				[startTimeFormatted]: { reservation },
			}

			await scheduleRef.set({ bookedSlots: newBookedSlots }, { merge: true })

			onClose()
		} catch (error) {
			console.error('Error making reservation:', error)
		}
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fi'>
			<div className='reservation-form'>
				<div className='reservationFormHeading'>
					<div className='reservationTitle'>
						<label>{selectedDate.toDateString()}</label>
						<label>{selectedMachine}</label>
					</div>
					<button className='closeButton' onClick={onClose}>
						Cancel
					</button>
				</div>
				<div className='reservationFormTimePickers'>
					<div className='reservationFormTimePicker'>
						<label>From:</label>
						<MultiSectionDigitalClock
							value={startTime}
							onChange={setStartTime}
							ampm={false}
							minutesStep={15}
							skipDisabled={true}
						/>
					</div>
					<div className='reservationFormTimePicker'>
						<label>Untill:</label>
						<MultiSectionDigitalClock
							value={endTime}
							onChange={setEndTime}
							ampm={false}
							minutesStep={15}
							skipDisabled={true}
						/>
					</div>
				</div>
				<div className='makeNewReservationButtonContainer'>
					<button className='makeNewReservationButton' onClick={handleReservation}>
						Confirm
					</button>
				</div>
			</div>
		</LocalizationProvider>
	)
}
