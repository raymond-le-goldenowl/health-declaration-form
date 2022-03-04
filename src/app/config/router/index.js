import React, { lazy } from 'react';

import { nanoid } from 'nanoid';
import { createBrowserHistory } from 'history';
import { Navigate, Route, Routes } from 'react-router';

const DeclarationForm = lazy(() => import('../../pages/DeclarationForm'));
const DeclarationFormWrapper = lazy(() => import('../../Layouts/declarationFormWrapper'));

export const history = createBrowserHistory();

export const routes = {
	declarationForm: {
		id: nanoid(4),
		path: '/declaration-form',
		exact: true,
		component: DeclarationForm,
		layout: DeclarationFormWrapper,
		content: 'Declaration Form'
	},
	default: {
		id: nanoid(4),
		path: '/',
		component: () => <Navigate to={`/declaration-form`} />
	}
};

export const renderRouteConfigs = routes => (
	<Routes>
		{Object.values(routes).map(route => {
			const Layout = route.layout || React.Fragment;

			return (
				<Route
					key={route.id}
					path={route.path}
					exact={route.exact}
					element={
						<Layout>
							<route.component />
						</Layout>
					}
				/>
			);
		})}
	</Routes>
);
