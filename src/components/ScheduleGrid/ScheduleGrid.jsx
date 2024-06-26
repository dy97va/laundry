import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase'
import { ReservationForm } from '../ReservationForm/ReservationForm'
import dayjs from 'dayjs'
import { GetCurrentUser, GetUserUid } from '../../Auth/AuthMethods'
import './ScheduleGrid.css'
import { ErrorMessagePopup } from '../ErrorMessage/ErrorMessagePopup'

export const ScheduleGrid = ({ selectedDate, selectedMachine }) => {
	const [bookedSlots, setBookedSlots] = useState({})
	const [showReservationForm, setShowReservationForm] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [errorMessagePopupOpen, setErrormessagePopupOpen] = useState(false)
	const user = GetCurrentUser()
	const uid = GetUserUid()

	const fetchData = async () => {
		try {
			if (selectedMachine) {
				const dateKey = dayjs(selectedDate).format('DD-MM-YYYY')
				const scheduleRef = db.collection(selectedMachine).doc(dateKey)
				const doc = await scheduleRef.get()
				if (doc.exists) {
					setBookedSlots(doc.data()?.bookedSlots || {})
				} else {
					setBookedSlots({})
				}
			}
		} catch (error) {
			console.error('Error fetching booked slots:', error)
		}
	}
	useEffect(() => {
		fetchData()
	}, [selectedDate, selectedMachine])

	const openReservationForm = () => {
		if (!user) {
			setErrorMessage('Log in to make a reservation')
			setErrormessagePopupOpen(true)
			return
		}

		if (!selectedDate || !selectedMachine) {
			setErrorMessage('Select date and machine to add a new reservation')
			setErrormessagePopupOpen(true)
			return
		}

		setShowReservationForm(true)
		document.body.classList.add('popUpOpen')
	}

	const closeErrorMessagePopup = () => {
		setErrormessagePopupOpen(false)
	}

	const closeReservationForm = () => {
		setShowReservationForm(false)
		fetchData()
		document.body.classList.remove('popUpOpen')
	}

	const timeline = []
	for (let hour = 6; hour < 24; hour++) {
		const time = `${hour.toString().padStart(2, '0')}:00`
		timeline.push(time)
	}

	const calculatePositionAndHeight = (startTime, endTime) => {
		const startHour = parseInt(startTime.substring(0, 2))
		const startMinute = parseInt(startTime.substring(3, 5))
		const endHour = parseInt(endTime.substring(0, 2))
		const endMinute = parseInt(endTime.substring(3, 5))

		const startMinutesFrom7AM = (startHour - 6) * 60 + startMinute
		const endMinutesFrom7AM = (endHour - 6) * 60 + endMinute
		const position = (startMinutesFrom7AM / 60) * 40 + 21
		const height = ((endMinutesFrom7AM - startMinutesFrom7AM) / 60) * 40

		return { position, height }
	}

	return (
		<div className='schedule'>
			<div className='scheduleTitle'>Schedule for {selectedDate.toDateString()}</div>
			<div className='scheduleGrid'>
				<div className='timeline'>
					{timeline.map((time, index) => (
						<div key={index} className='timeline-item'>
							{time}
						</div>
					))}
				</div>
				<div className='booked-slots'>
					{Object.values(bookedSlots).map((slot, index) => {
						const { position, height } = calculatePositionAndHeight(
							slot.reservation.startTime,
							slot.reservation.endTime
						)
						return (
							<div
								key={index}
								className='booked-slot'
								style={{
									top: `${position}px`,
									height: `${height}px`,
								}}>
								<div className='bookedSlotTime'>
									<div>{slot.reservation.startTime}</div>
									<div>{slot.reservation.endTime}</div>
								</div>
								<div className='bookedSlotUser'>{slot.reservation.room}</div>
							</div>
						)
					})}
				</div>
			</div>
			<div className='reservationButton'>
				<button className='newreservation' onClick={openReservationForm}>
					Add
				</button>
				{showReservationForm && (
					<>
						<ReservationForm
							selectedDate={selectedDate}
							onClose={closeReservationForm}
							bookedSlots={bookedSlots}
							selectedMachine={selectedMachine}
							user={user}
							uid={uid}
						/>
					</>
				)}
				{errorMessagePopupOpen && <ErrorMessagePopup onClose={closeErrorMessagePopup} errorMessage={errorMessage} />}
			</div>
		</div>
	)
}
