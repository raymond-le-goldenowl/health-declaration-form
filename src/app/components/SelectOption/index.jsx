import { Select } from 'antd';
import React, { useState } from 'react';

import './styles.css';

const { Option } = Select;

export default function SelectOption() {
	const [isSelected, setIsSelected] = useState(false);

	return (
		<div id='select_option-custom'>
			<Select
				id='leanhvu'
				onFocus={() => {
					setIsSelected(prev => !prev);
				}}
				onBlur={() => {
					setIsSelected(prev => !prev);
				}}
				showSearch
				style={{ width: 200 }}
				placeholder='Search to Select'
				optionFilterProp='children'
				filterOption={(input, option) =>
					option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
				filterSort={(optionA, optionB) =>
					optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
				}
			>
				<Option value='1'>Not Identified</Option>
				<Option value='2'>Closed</Option>
				<Option value='3'>Communicated</Option>
				<Option value='4'>Identified</Option>
				<Option value='5'>Resolved</Option>
				<Option value='6'>Cancelled</Option>

				<Option value='7'>Not Identified</Option>
				<Option value='8'>Closed</Option>
				<Option value='9'>Communicated</Option>
				<Option value='10'>Identified</Option>
				<Option value='11'>Resolved</Option>
				<Option value='12'>Cancelled</Option>
			</Select>
			<span
				className={`anticon anticon-search ant-select-suffix pos-anticon-search ${
					isSelected ? 'animate-anticon-search' : ''
				}`}
			>
				<svg
					viewBox='64 64 896 896'
					focusable='false'
					data-icon='down'
					width='1em'
					height='1em'
					fill='currentColor'
					aria-hidden='true'
				>
					<path d='M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z'></path>
				</svg>
			</span>
		</div>
	);
}
