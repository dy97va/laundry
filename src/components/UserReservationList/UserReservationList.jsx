import React, { useState, useEffect } from 'react'
import { db } from '../../firebase/firebase'
import { GetCurrentUser } from '../../Auth/AuthMethods'
import { ConfirmationModal } from '../ConfirmationModal/ConfirmationModal'
import { DeleteReservation } from '../../Firestore/DeleteMethods'
import './UserReservationList.css'

export const UserReservationList = ({ uid }) => {
	const [userReservations, setUserReservations] = useState([])
	const [reservationCollections, setReservationCollections] = useState([])
	const user = GetCurrentUser()
	const [confirmationModalOpen, setConfirmationModalOpen] = useState(false)

	const [reservationToDelete, setReservationToDelete] = useState()
	const [reservationMachine, setReservationMachine] = useState()
	const [startTimeToDelete, setStartTimeToDelete] = useState()

	const fetchMachineList = async () => {
		try {
			if (user) {
				const machinesSnapshot = await db.collection('addresses').doc(user.userAddress).get()
				const machinesData = machinesSnapshot.data()
				if (machinesData && machinesData.machines) {
					setReservationCollections(machinesData.machines)
				} else {
					console.log('No machines found for the current user address')
				}
			} else {
				console.log('No user found')
			}
		} catch (error) {
			console.log('Error fetching machine list:', error)
		}
	}

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
			} catch (error) {
				console.error('Error fetching user reservations:', error)
			}
		}
		setUserReservations(reservations)
	}

	const confirmReservationDeletion = (reservation, machine, startTime) => {
		setConfirmationModalOpen(true)
		setReservationToDelete(reservation)
		setReservationMachine(machine)
		setStartTimeToDelete(startTime)
	}

	const handleDeleteReservation = (reservation, machine, startTime) => {
		DeleteReservation(reservation, machine, startTime)
		setConfirmationModalOpen(false)
		fetchUserReservations()
	}

	useEffect(() => {
		if (user) {
			fetchMachineList()
		}
	}, [uid, user])

	useEffect(() => {
		if (reservationCollections.length > 0) {
			fetchUserReservations()
		}
	}, [reservationCollections])

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
							onClick={() => confirmReservationDeletion(reservation.id, reservation.machine, reservation.startTime)}>
							delete/cancel
						</button>
						{confirmationModalOpen && (
							<ConfirmationModal
								onConfirm={() => handleDeleteReservation(reservationToDelete, reservationMachine, startTimeToDelete)}
								onClose={() => setConfirmationModalOpen(false)}
								confirmationMessage={'are you sure you want to cancel the reservation?'}
							/>
						)}
					</div>
				))}
			</div>
		</div>
	)
}
