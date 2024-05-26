# User reservation management system

## Description

This project was built for managing laundry room reservations, in a student appartment complex but can also be used for other scheduling purposes.

## Features

    * Authentication: Users can login and signup using email and password (Firebase auth services)
    * Reservation management: Users can create, view and cancel reservations
    * Address and machine management: Admins can add new addresses/machines/rooms to the list
    * Responsive design: the app works on mobile and web

## Firestore Structure

    - users: Stores a list of user ids with emails, addresses, names and room numbers
    - addresses: Stores a list of addresses wirh list of machines/rooms availible for reservations
    - machines/rooms: a collection for each separate machine is then created to store the reservations for each separate date

## Setup and installation

    - Clone the repository with git clone https://github.com/dy97va/laundry.git
    - Run npm install in project terminal to install all the dependencies
    - firebase configuration:
        - create a firebase project
        - add a web app to your Firebase project and copy the firebase config object
        - paste the firebase config object to /src/firebase/firebase/
        - turn on the authentication in your Firebase project and add email authintication
    - Run npm start to test locally
    - build the project and deploy

## Project Structure

    - Auth: includes some of the firebase auth methods
    - components: all the main components of the app
        - AuthForms: login, sign up and password rest forms with corresponding methods
        - ConfirmationModal: confirmation modal for deleting data
        - DatePicker: react-calendar used for date selection
        - ErrorMessage: error message modal for displaying errors to user
        - LanguagePicker: element for choosing the language of the app, that is yet to be implemented
        - MachinePicker: element for picking a machine/room for reservations
        - NavBar: Navigation bar component
        - ReservationForm: element for creating new reservations
        - ScheduleGrid: displays the existing schedule/reservations to users for selected date and machine/room
        - UserReservationList: displays user reservations with ability to cancel them
        - colors: contains color scheme for the app
    - firebase
        - firebase: contains configuration for firebase web app
    - Firestore:
        - FirestoreMethods: contains data fetching and manipulation methods
    - Pages
        AdminPanel: admin page for room and address management
        Main: main page with schedule grid
        Profile: page where user can edit their reservations, (and info in the future)
