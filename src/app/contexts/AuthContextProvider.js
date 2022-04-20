import { createContext, useEffect, useState } from 'react';

import axios from 'axios';

import { ORIGIN_URL } from 'app/config/http-links';
import { notificationCustom } from 'app/utils/notificationCustom';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [auth, setAuth] = useState({ isAuth: false, accessToken: null });

	const fetchIsAuth = async (phoneNumber, otpCode) => {
		const dofetchIsAuth = await axios.post(`${ORIGIN_URL}user/auth`, {
			phone_number: phoneNumber,
			otp_code: otpCode
		});
		if (dofetchIsAuth.data?.success) {
			const accessToken = dofetchIsAuth.data?.data;
			localStorage.setItem('accessToken', accessToken);
			setAuth(prev => ({
				...prev,
				isAuth: true,
				accessToken: accessToken
			}));
			return true;
		} else {
			setAuth(prev => ({
				...prev,
				isAuthisAuth: false,
				accessToken: null
			}));
			removeAccessToken();
			notificationCustom({ type: 'danger', mesage: dofetchIsAuth.data?.mesage });
			return false;
		}
	};

	useEffect(() => {
		const doGetUser = async () => {
			try {
				const accessToken = getAccessToken();
				const resultGetUser = await axios.post(`${ORIGIN_URL}user/user-by-phone-number`, {
					accessToken
				});

				if (resultGetUser.data?.success) {
					setAuth(prev => ({
						...prev,
						isAuth: true,
						accessToken: accessToken
					}));
				} else {
					setAuth(prev => ({
						...prev,
						isAuthisAuth: false,
						accessToken: null
					}));
					removeAccessToken();
					notificationCustom({ type: 'danger', mesage: resultGetUser.data?.message });
				}
			} catch (error) {
				removeAccessToken();
			}
		};

		doGetUser();
	}, []);

	const getAccessToken = () => {
		return localStorage.getItem('accessToken') || null;
	};
	const removeAccessToken = () => {
		localStorage.removeItem('accessToken');
	};

	const values = { getAccessToken, removeAccessToken, fetchIsAuth, auth };
	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};
