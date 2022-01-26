import React from 'react';

import moment from 'moment';
import viVN from 'antd/lib/locale/vi_VN';
import { DatePicker, ConfigProvider } from 'antd';

import { DATE_FORMAT, MONTHS, WEEKS } from './constants';
import './styles.css';

// custom local days on a week and months on a year.
moment.updateLocale('vn', {
	weekdaysMin: WEEKS,
	monthsShort: MONTHS
});

export default function DatePickerCustom({ defaultDateTime, getValueSelected }) {
	const handleOnchange = value => getValueSelected(moment(value).format(DATE_FORMAT));

	return (
		<ConfigProvider locale={viVN}>
			<DatePicker
				className='date-picker-custom'
				defaultValue={
					defaultDateTime
						? moment(defaultDateTime, DATE_FORMAT)
						: moment(moment(moment()._d).format(DATE_FORMAT), DATE_FORMAT)
				}
				format={DATE_FORMAT}
				onChange={handleOnchange}
			/>
		</ConfigProvider>
	);
}
