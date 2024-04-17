import React from 'react'

export const LanguagePicker = () => {
	const [language, setLanguage] = useState('eng')

	const handleLanguageChange = (lang) => {
		setLanguage(lang)
	}
	return (
		<div>
			<li className='languagePicker' onClick={() => handleLanguageChange('rus')}>
				РУС
			</li>
			<li className='languagePicker' onClick={() => handleLanguageChange('fin')}>
				SUO
			</li>
			<li className='languagePicker' onClick={() => handleLanguageChange('eng')}>
				ENG
			</li>
		</div>
	)
}
