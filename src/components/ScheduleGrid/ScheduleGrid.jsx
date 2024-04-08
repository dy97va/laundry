import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebase'
import { ReservationForm } from '../ReservationForm/ReservationForm'
import dayjs from 'dayjs'
import './ScheduleGrid.css'

export const ScheduleGrid = ({ selectedDate }) => {
	const [bookedSlots, setBookedSlots] = useState({})
	const [showReservationForm, setShowReservationForm] = useState(false)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const dateKey = dayjs(selectedDate).format('YYYY-MM-DD')
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

	const timeline = []
	for (let hour = 6; hour < 24; hour++) {
		const time = `${hour.toString().padStart(2, '0')}:00`
		timeline.push(time)
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
								<div>{slot.reservation.startTime}</div>
								<div>{slot.reservation.endTime}</div>
							</div>
						)
					})}
				</div>
			</div>
			<div className='reservationButton'>
				<button className='newreservation' onClick={openReservationForm}>
					New
				</button>
				{showReservationForm && (
					<ReservationForm selectedDate={selectedDate} onClose={closeReservationForm} bookedSlots={bookedSlots} />
				)}
			</div>
		</div>
	)
}
