import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import * as serviceWorker from './serviceWorker';

import AppBar from 'app/components/AppBar';
import Footer from 'app/components/Footer';
import SelectOption from 'app/components/SelectOption';

import './index.scss';
import 'antd/dist/antd.css';

// demo data
const options = [
	{ key: 1, value: 1, text: 'Text 1' },
	{ key: 2, value: 2, text: 'Text 2' },
	{ key: 3, value: 3, text: 'Text 3' },
	{ key: 4, value: 4, text: 'Text 4' },
	{ key: 5, value: 5, text: 'Text 5' },
	{ key: 6, value: 6, text: 'Text 6' }
];

ReactDOM.render(
	<React.StrictMode>
		<AppBar />
		<h1>Hello World</h1>

		{/* demo render custom */}
		<SelectOption
			options={options}
			width={'50%'}
			placeholder={'Select option'}
			defaultValue={'1'}
		/>
		<Footer />
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
