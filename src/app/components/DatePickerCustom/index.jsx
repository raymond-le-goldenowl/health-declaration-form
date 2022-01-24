import React from 'react';

import viVN from 'antd/lib/locale/vi_VN';
import { DatePicker, ConfigProvider } from 'antd';
import moment from 'moment';

moment.updateLocale('vn', {
	weekdaysMin: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
});

export default function DatePickerCustom() {
	const dateFormat = 'DD/MM/YYYY';
	return (
		<ConfigProvider locale={viVN}>
			<DatePicker defaultValue={moment('24/01/2022', dateFormat)} format={dateFormat} />
		</ConfigProvider>
	);
}
