import React from 'react';

import logoAppKhaiBaoYte from '../../assets/images/logoAppKhaiBaoYte.png';
import './styles.css';

export default function Footer() {
	return (
		<footer className='footer'>
			<img src={logoAppKhaiBaoYte} alt={`logo app Khai Bao Y te`} height='30px' />
			<br />
			<span className='col-12'>Copyright ® 2021 - Sở Y Tế TP. Hồ Chí Minh</span>
		</footer>
	);
}
