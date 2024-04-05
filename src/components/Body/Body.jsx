import React, { useState } from 'react'
import { DatePicker } from '../DatePicker/DatePicker'
import { ScheduleGrid } from '../ScheduleGrid/ScheduleGrid'
import { db } from '../../firebase/firebase'
import './Body.css'

export const Body = () => {
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [schedule, setSchedule] = useState({ date: new Date(), slots: [] })

	const handleDateChange = (date) => {
		setSelectedDate(date)
		fetchSchedule(date)
	}

	const fetchSchedule = async (date) => {
		const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
		const scheduleRef = db.collection('schedule').doc(formattedDate)
		const doc = await scheduleRef.get()
		if (doc.exists) {
			setSchedule(doc.data())
		} else {
			setSchedule({ date, slots: [] })
		}
	}

	const handleReservation = async (date, time) => {
		const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
		const scheduleRef = db.collection('schedule').doc(formattedDate)

		const updatedSlots = schedule.slots.map((slot) => {
			if (slot.time === time) {
				return { ...slot, status: 'Booked' }
			}
			return slot
		})

		await scheduleRef.set({ date, slots: updatedSlots })
		setSchedule({ date, slots: updatedSlots })
	}

	return (
		<div className='laundryBody'>
			<div>
				<DatePicker onChange={handleDateChange} />
			</div>
			<div className='schedule'>
				<ScheduleGrid selectedDate={selectedDate} />
			</div>
		</div>
	)
}
