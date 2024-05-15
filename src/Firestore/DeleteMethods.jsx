import { db } from '../firebase/firebase'
import { deleteField } from '@firebase/firestore'

export const DeleteReservation = async (reservationId, machine, startTime) => {
	try {
		await db
			.collection(machine)
			.doc(reservationId)
			.update({
				[`bookedSlots.${startTime}`]: deleteField(),
			})
	} catch (error) {
		console.error('Error deleting reservation:', error)
	}
}
