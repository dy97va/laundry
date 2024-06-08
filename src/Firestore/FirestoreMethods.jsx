import { db } from '../firebase/firebase'
import { deleteField } from '@firebase/firestore'
import firebase from 'firebase/compat/app'

//Used in AdminPanel and SignupForm
export const fetchAddressList = async () => {
	try {
		const addressRef = await db.collection('addresses').get()
		const addresses = addressRef.docs.map((doc) => ({
			id: doc.id,
			data: doc.data(),
		}))
		return addresses
	} catch (error) {
		throw error
	}
}
export const fetchUserList = async () => {
	try {
		const usersRef = await db.collection('users').get()
		const userList = usersRef.docs.map((doc) => ({
			id: doc.id,
			data: doc.data(),
		}))
		return userList
	} catch (error) {
		console.log(error)
	}
}

//Used in AdminPanel
export const addNewAddress = async (address) => {
	try {
		await db.collection('addresses').doc(address).set({})
	} catch (error) {
		throw error
	}
}
//Used in AdminPanel
export const addNewMachine = async (addressId, machine) => {
	try {
		await db
			.collection('addresses')
			.doc(addressId)
			.update({
				machines: firebase.firestore.FieldValue.arrayUnion(machine),
			})
	} catch (error) {
		throw error
	}
}
//Used in AdminPanel
export const deleteAddress = async (addressId) => {
	try {
		await db.collection('addresses').doc(addressId).delete()
		fetchAddressList()
	} catch (error) {
		console.log(error)
	}
}
//Used in AdminPanel
export const deleteMachine = async (addressId, machine) => {
	try {
		await db
			.collection('addresses')
			.doc(addressId)
			.update({
				machines: firebase.firestore.FieldValue.arrayRemove(machine),
			})
	} catch (error) {
		throw error
	}
}

//new ones
export const deleteUser = async (userId) => {
	try {
		await db.collection('users').doc(userId).delete()
	} catch (error) {
		throw new Error('Error deleting user: ' + error.message)
	}
}

export const updateUser = async (userId, updatedData) => {
	try {
		await db.collection('users').doc(userId).update(updatedData)
	} catch (error) {
		throw new Error('Error updating user: ' + error.message)
	}
}

//Used in MachinePicker
export const fetchMachineList = async (user) => {
	try {
		if (user) {
			const machinesSnapshot = await db.collection('addresses').doc(user.userAddress).get()
			const machinesData = machinesSnapshot.data()
			return machinesData && machinesData.machines ? machinesData.machines : []
		} else {
			console.log('No user found')
			return []
		}
	} catch (error) {
		console.log('Error fetching machine list:', error)
		return []
	}
}

//Used in UserReservationList
export const fetchUserReservations = async (reservationCollections, uid) => {
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
	return reservations
}

//Used in UserReservationList
export const deleteReservation = async (reservationId, machine, startTime) => {
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
