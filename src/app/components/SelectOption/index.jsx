import { Select } from 'antd';
import React, { useState } from 'react';

import './styles.css';

const { Option } = Select;

export default function SelectOption({
	options,
	getValueSelected,
	width,
	placeholder,
	defaultValue = ''
}) {
	const [isArrowUp, setIsArrowUp] = useState(false);

	const handleChange = value => {
		getValueSelected && getValueSelected(value);
		setIsArrowUp(false);
	};

	return (
		<div className='select_option-custom' style={{ width: width }}>
			<Select
				style={{ width: '100%' }}
				onChange={handleChange}
				onFocus={() => setIsArrowUp(true)}
				onBlur={() => setIsArrowUp(false)}
				showSearch
				placeholder={placeholder}
				optionFilterProp='children'
				filterOption={(input, option) =>
					option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
				}
				filterSort={(optionA, optionB) =>
					optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
				}
				defaultValue={defaultValue}
			>
				{options &&
					options.map(option => (
						<Option key={option.key} value={option.value} style={{ fontSize: '1rem' }}>
							{option.text}
						</Option>
					))}
			</Select>
			<span
				className={`anticon anticon-search ant-select-suffix pos-anticon-search ${
					isArrowUp ? 'animate-anticon-search' : ''
				}`}
			></span>
		</div>
	);
}
