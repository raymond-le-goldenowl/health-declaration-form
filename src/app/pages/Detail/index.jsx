import React, { useEffect, useState } from 'react';
import axios from 'axios';

import useAuth from 'app/hooks/useAuth';
import { Link, useParams } from 'react-router-dom';

import './styles.scss';
import { notificationCustom } from 'app/utils/notificationCustom';
import { ORIGIN_URL } from 'app/config/http-links';
import { OBJECT_KEYS_EN_TO_VN } from '../constants';
import { nanoid } from 'nanoid';

export default function Detail() {
	const params = useParams();
	const { auth } = useAuth();

	const resultId = params?.id;

	const [dataSource, setDataSource] = useState([]);

	useEffect(() => {
		const getDetail = async () => {
			try {
				const responseResultDeclaration = await axios.post(
					`${ORIGIN_URL}result-declaration/${resultId}`,
					{
						accessToken: auth?.accessToken
					}
				);

				const responseUser = await axios.post(
					`${ORIGIN_URL}user/${responseResultDeclaration.data?.data?.user_id}`,
					{
						accessToken: auth?.accessToken
					}
				);

				const userData = responseUser.data?.data;
				const resultDeclarationData = responseResultDeclaration.data?.data;

				const diseaseSymptoms = JSON.parse(resultDeclarationData.disease_symptoms)
					.filter(item => item.isChecked)
					.map(item => item?.content);

				const epidemiologicalFactors = JSON.parse(resultDeclarationData.epidemiological_factors)
					.filter(item => item.isChecked)
					.map(item => item?.content);

				// combineded data fetch from api
				const dataCombinded = {
					...userData,
					national: JSON.parse(userData.national).value,
					province: JSON.parse(userData.province).value,
					district: JSON.parse(userData.district).value,
					ward: JSON.parse(userData.ward).value,
					...resultDeclarationData,
					declaration_place: JSON.parse(resultDeclarationData.declaration_place).value,
					background_disease: JSON.parse(resultDeclarationData.background_disease).join(','),
					symptoms_used_molnupiravir: JSON.parse(
						resultDeclarationData.symptoms_used_molnupiravir
					).join(','),
					disease_symptoms: diseaseSymptoms.join(','),
					epidemiological_factors: epidemiologicalFactors.join(',')
				};

				// ignore value not needed to display
				delete dataCombinded.id;
				delete dataCombinded.user_phone_number;
				delete dataCombinded.updatedAt;
				delete dataCombinded.createdAt;
				delete dataCombinded.user_id;
				delete dataCombinded.declaration_type_id;
				delete dataCombinded.epidemiological_factors;

				setDataSource(dataCombinded);
			} catch (error) {
				notificationCustom({ type: 'danger', message: error.message });
			}
		};

		getDetail();
	}, [resultId, auth]);

	return (
		<div id='detail-page'>
			<h2 className='title'>Kết quả khai báo</h2>
			<div className='result-detail'>
				<div className='username'>{dataSource?.full_name}</div>
				<div className='list-info'>
					{Object.keys(dataSource).map(key => {
						if (String(dataSource[key]).trim() === '' || dataSource[key] === null) return null;
						return (
							<div key={key + nanoid(2)}>
								<strong>{OBJECT_KEYS_EN_TO_VN[key]}: </strong>
								<span>{dataSource[key]}</span>
							</div>
						);
					})}
				</div>
				<div className='more-info'>
					<p className='text-red'>Ghi chú: Kiểm tra ứng dụng</p>
					<p className='text-red bold'>
						Hãy tuân thủ thực hiện 5K (Khẩu trang - Khử khuẩn - Khoảng cách - Không tập trung đông
						người - Khai báo y tế)
					</p>
				</div>
				<div className='btn-center'>
					<Link className='ant-btn ant-btn-primary' to={'/declaration-form'}>
						Tiếp tục khai báo
					</Link>
				</div>
			</div>
		</div>
	);
}
