import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';

import AppBar from 'app/components/AppBar';
import DatePickerCustom from 'app/components/DatePickerCustom';

import './index.css';
import 'antd/dist/antd.css';

ReactDOM.render(
	<React.StrictMode>
		<AppBar />
		<h1>Hello World</h1>

		<DatePickerCustom />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
