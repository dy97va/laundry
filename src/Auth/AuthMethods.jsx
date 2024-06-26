import { useState, useEffect } from 'react'
import { db, auth } from '../firebase/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'

export const GetUserUid = () => {
	const [uid, setUid] = useState(null)
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				setUid(user.uid)
			} else {
				setUid(null)
			}
		})
	}, [])
	return uid
}

export const GetCurrentUser = () => {
	const [user, setUser] = useState(null)
	useEffect(() => {
		auth.onAuthStateChanged((user) => {
			if (user) {
				db.collection('users')
					.doc(user.uid)
					.get()
					.then((snapshot) => {
						setUser(snapshot.data())
					})
			} else {
				setUser(null)
			}
		})
	}, [])
	return user
}

export const Logout = async () => {
	try {
		await auth.signOut().then(() => {
			console.log('signed out')
		})
	} catch (error) {
		console.log(error)
	}
}

export const PasswordReset = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email)
	} catch (error) {
		console.log(error)
	}
}
