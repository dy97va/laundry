import React, { useState, useEffect } from 'react'
import { GetCurrentUser } from '../../Auth/AuthMethods'
import { ConfirmationModal } from '../ConfirmationModal/ConfirmationModal'
import { fetchMachineList, fetchUserReservations, deleteReservation } from '../../Firestore/FirestoreMethods'
import './UserReservationList.css'

export const UserReservationList = ({ uid }) => {
	const [userReservations, setUserReservations] = useState([])
	const [reservationCollections, setReservationCollections] = useState([])
	const user = GetCurrentUser()
	const [confirmationModalOpen, setConfirmationModalOpen] = useState(false)

	const [reservationToDelete, setReservationToDelete] = useState()
	const [reservationMachine, setReservationMachine] = useState()
	const [startTimeToDelete, setStartTimeToDelete] = useState()

	useEffect(() => {
		if (user) {
			fetchMachineList(user).then((machines) => setReservationCollections(machines))
		}
	}, [uid, user])

	useEffect(() => {
		if (reservationCollections.length > 0) {
			fetchUserReservations(reservationCollections, uid).then((reservations) => setUserReservations(reservations))
		}
	}, [reservationCollections, uid])

	const confirmReservationDeletion = (reservationId, machine, startTime) => {
		setConfirmationModalOpen(true)
		setReservationToDelete(reservationId)
		setReservationMachine(machine)
		setStartTimeToDelete(startTime)
	}

	const handleDeleteReservation = async () => {
		await deleteReservation(reservationToDelete, reservationMachine, startTimeToDelete)
		setConfirmationModalOpen(false)
		fetchUserReservations(reservationCollections, uid).then((reservations) => setUserReservations(reservations))
	}

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
								onConfirm={handleDeleteReservation}
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
