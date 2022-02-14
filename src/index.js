import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';

import AppBar from 'app/components/AppBar';
import './index.css';

import * as serviceWorker from './serviceWorker';

import Footer from './app/components/Footer';

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
