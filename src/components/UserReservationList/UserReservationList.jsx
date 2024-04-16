import React, { useState, useEffect } from 'react'
import { db } from '../../firebase/firebase'
import { GetUserUid } from '../../Auth/AuthMethods'
import './UserReservationList.css'
import { deleteField } from '@firebase/firestore'

export const UserReservationList = () => {
	const [userReservations, setUserReservations] = useState([])
	const reservationCollections = ['Ketunpolku H', 'Ketunpolku I', 'Opintie 1', 'Opintie 2']
	const uid = GetUserUid()

	const fetchUserReservations = async () => {
		const reservations = []
		for (const reservationCollection of reservationCollections) {
			try {
				const querySnapshot = await db.collection(reservationCollection).get()

				querySnapshot.forEach((doc) => {
					const bookedSlots = doc.data().bookedSlots

					for (const key in bookedSlots) {
						const reservation = bookedSlots[key].reservation

						if (reservation.uid === uid) {
							reservations.push({
								id: doc.id,
								startTime: bookedSlots[key].reservation.startTime,
								endTime: bookedSlots[key].reservation.endTime,
								machine: reservationCollection,
							})
						}
					}
				})

				setUserReservations(reservations)
			} catch (error) {
				console.error('Error fetching user reservations:', error)
			}
		}
	}

	const handleDeleteReservation = async (reservationId, machine, startTime) => {
		try {
			await db
				.collection(machine)
				.doc(reservationId)
				.update({
					[`bookedSlots.${startTime}`]: deleteField(),
				})
			fetchUserReservations()
		} catch (error) {
			console.error('Error deleting reservation:', error)
		}
	}

	useEffect(() => {
		fetchUserReservations()
	}, [uid])

	return (
		<div>
			<h2>Your Reservations</h2>
			<div className='userReservationList'>
				{userReservations.map((reservation) => (
					<div className='individualReservation' key={reservation.id}>
						<div className='reservationInfo'>
							<div>Machine: {reservation.machine}</div>
							<div>Date: {reservation.id}</div>
							<div>StartTime: {reservation.startTime}</div>
							<div>EndTime: {reservation.endTime}</div>
						</div>
						<button
							className='deleteReservationButton'
							onClick={() => handleDeleteReservation(reservation.id, reservation.machine, reservation.startTime)}>
							delete/cancel
						</button>
					</div>
				))}
			</div>
		</div>
	)
}
