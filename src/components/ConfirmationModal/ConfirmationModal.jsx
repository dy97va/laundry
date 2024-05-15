import React from 'react'

export const ConfirmationModal = ({ confirmationMessage, onConfirm, onClose }) => {
	return (
		<div className='modalBackdrop' onClick={onClose}>
			<div className='errorMessage'>
				<div>{confirmationMessage}</div>
				<div>
					<button onClick={onConfirm}>Yes</button>
					<button className='okErrorButton' onClick={onClose}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	)
}
