import React, { useState } from 'react';

import axios from 'axios';
import { Input } from 'antd';

import { ORIGIN_URL } from 'app/config/http-links';
import { notificationCustom } from 'app/utils/notificationCustom';

import './styles.scss';
import useAuth from 'app/hooks/useAuth';
import { Navigate } from 'react-router';

export default function Login() {
	const [phoneNumber, setPhoneNumber] = useState(null);
	const [requestOtpSuccess, setRequestOtpSuccess] = useState(false);
	const [otpCode, setOtpCode] = useState(null);

	const { auth, fetchIsAuth } = useAuth();

	const handleFormSubmit = async event => {
		event.preventDefault();

		if (phoneNumber) {
			const requestGetOtp = await axios.post(`${ORIGIN_URL}user/get-otp`, {
				phone_number: phoneNumber
			});

			if (requestGetOtp.data?.success) {
				notificationCustom({ type: 'success', message: requestGetOtp.data?.message });
				setRequestOtpSuccess(true);
			}
		}

		if (otpCode) {
			const resultFetchIsAuth = await fetchIsAuth(phoneNumber, otpCode);
			if (resultFetchIsAuth) {
				setOtpCode(null);
				setPhoneNumber(null);
			}
		}
	};

	if (auth?.isAuth) {
		return <Navigate to={'/declaration-form'} replace />;
	}
	return (
		<form onSubmit={handleFormSubmit} id='login-form'>
			{!requestOtpSuccess && (
				<label>
					<h2>Enter your phone number!</h2>
					<Input
						type='text'
						value={phoneNumber}
						onChange={({ target }) => setPhoneNumber(target.value)}
					/>
				</label>
			)}

			{requestOtpSuccess && (
				<label>
					<h2>
						<span>Enter your otp code!</span>
						<Input
							type='text'
							value={otpCode}
							onChange={({ target }) => setOtpCode(target.value)}
						/>
					</h2>
				</label>
			)}

			<button type='submit'>Xác nhận</button>
		</form>
	);
}
