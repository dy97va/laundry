import React from 'react'
import './ErrorMessagePopup.css'

export const ErrorMessagePopup = ({ errorMessage, onClose }) => {
	return (
		<div className='modalBackdrop' onClick={onClose}>
			<div className='errorMessage'>
				<div>{errorMessage}</div>
				<div>
					<button className='okErrorButton' onClick={onClose}>
						Ok
					</button>
				</div>
			</div>
		</div>
	)
}
