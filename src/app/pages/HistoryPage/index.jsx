import React, { useEffect, useState } from 'react';

import axios from 'axios';
import moment from 'moment';
import { Table } from 'antd';

import useAuth from 'app/hooks/useAuth';

import { ORIGIN_URL } from 'app/config/http-links';
import { notificationCustom } from 'app/utils/notificationCustom';
import { DATE_FORMAT } from 'app/components/DatePickerCustom/constants';

import './styles.scss';
import { Link } from 'react-router-dom';

export default function HistoryPage() {
	const { auth } = useAuth();

	const [dataSource, setDataSource] = useState([]);

	useEffect(() => {
		const doFetch = async () => {
			try {
				const getListResult = await axios.post(`${ORIGIN_URL}result-declaration/all`, {
					accessToken: auth.accessToken
				});
				const getListUser = await axios.post(`${ORIGIN_URL}user/all`, {
					accessToken: auth.accessToken
				});

				if (getListResult.data?.success && getListUser.data?.success) {
					// spread data.
					const listResultDeclaration = getListResult.data?.data || [];
					const listUser = getListUser.data?.data || [];

					const combinded = listResultDeclaration.map(resultItem => {
						const user_id = resultItem?.user_id;
						const userFinded = listUser.find(userItem => userItem.id === user_id);

						return {
							key: resultItem.id,
							viewDetail: <Link to={`/detail/${resultItem.id}`}>Chi tiết</Link>,
							...userFinded,
							userCreatedAt: moment(userFinded.createdAt).format(DATE_FORMAT),
							userUpdatedAt: moment(userFinded.updatedAt).format(DATE_FORMAT),
							...resultItem,
							resultCreatedAt: moment(resultItem.createdAt).format(DATE_FORMAT),
							resultUpdatedAt: moment(resultItem.updatedAt).format(DATE_FORMAT)
						};
					});

					setDataSource(combinded);
				} else {
					notificationCustom({
						type: 'danger',
						message: ''
					});
				}
			} catch (error) {
				notificationCustom({ type: 'danger', message: error.message });
			}
		};
		if (auth?.isAuth) {
			doFetch();
		}
	}, [auth]);

	const columns = [
		{
			title: 'Họ tên',
			dataIndex: 'full_name',
			key: 'full_name'
		},
		{
			title: 'Ngày sinh',
			dataIndex: 'date_of_birth',
			key: 'date_of_birth'
		},
		{
			title: 'Thời gian khai báo',
			dataIndex: 'resultCreatedAt',
			key: 'resultCreatedAt'
		},
		{
			title: 'Chi tiết',
			dataIndex: 'viewDetail',
			key: 'viewDetail'
		}
	];

	return (
		<div id='history-page'>
			<h2 className='title'>Lịch sử khai báo y tế</h2>
			<Table dataSource={dataSource} columns={columns} />
		</div>
	);
}
