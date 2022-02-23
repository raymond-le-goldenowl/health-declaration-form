import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import * as serviceWorker from './serviceWorker';

import AppBar from 'app/components/AppBar';
import Footer from 'app/components/Footer';

import { notificationCustom } from 'app/utils/notificationCustom';

import './index.scss';
import 'antd/dist/antd.css';

notificationCustom({ description: '  ', type: 'success' });

ReactDOM.render(
	<React.StrictMode>
		<AppBar />
		<h1>Hello World</h1>
		<Footer />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
