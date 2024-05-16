import React from 'react'
import './ConfirmationMessage.css'

export const ConfirmationModal = ({ confirmationMessage, onConfirm, onClose }) => {
	return (
		<div className='modalBackdrop' onClick={onClose}>
			<div className='errorMessage'>
				<div>{confirmationMessage}</div>
				<div className='buttonsContainer'>
					<button className='confirmationButton' onClick={onConfirm}>
						Yes
					</button>
					<button className='confirmationButton' onClick={onClose}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	)
}
