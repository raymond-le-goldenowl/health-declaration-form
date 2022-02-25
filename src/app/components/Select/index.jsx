import { Select as AntSelect } from 'antd';
import React, { useState } from 'react';

import './styles.scss';

const AntSelectOption = AntSelect.Option;

export default function Select({
	options,
	getValueSelected,
	width,
	placeholder,
	defaultValue = '',
	disabled = false,
	value
}) {
	const [isArrowUp, setIsArrowUp] = useState(false);

	const handleChange = value => {
		getValueSelected && getValueSelected(value);
		setIsArrowUp(false);
	};

	return (
		<div className='select_option-custom' style={{ width: width }}>
			<AntSelect
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
				defaultValue={defaultValue || null}
				disabled={disabled}
				value={value}
			>
				{options &&
					options.map(option => (
						<AntSelectOption
							key={option.key}
							value={JSON.stringify(option)}
							style={{ fontSize: '1rem' }}
						>
							{option.text}
						</AntSelectOption>
					))}
			</AntSelect>
			<span
				className={`anticon anticon-search ant-select-suffix pos-anticon-search ${
					isArrowUp ? 'animate-anticon-search' : ''
				}`}
			></span>
		</div>
	);
}
