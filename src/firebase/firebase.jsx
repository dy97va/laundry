import React from 'react'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyALEs5TDjXRYBL3ibjZJO8vGPQzfEPYApc',
	authDomain: 'laundry-fde8e.firebaseapp.com',
	projectId: 'laundry-fde8e',
	storageBucket: 'laundry-fde8e.appspot.com',
	messagingSenderId: '165511911383',
	appId: '1:165511911383:web:743472239eecb436badd92',
	measurementId: 'G-FQKGJ1BVF7',
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export { db }
