import ReactDOM from 'react-dom';
import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import { history, renderRouteConfigs, routes } from 'app/config/router';

import './index.scss';
import 'antd/dist/antd.css';

ReactDOM.render(
	<React.StrictMode>
		<Suspense fallback={<p>Loading ...</p>}>
			<BrowserRouter history={history}>{renderRouteConfigs(routes)}</BrowserRouter>
		</Suspense>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
