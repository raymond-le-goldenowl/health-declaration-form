import React, { lazy } from 'react';

import { nanoid } from 'nanoid';
import { createBrowserHistory } from 'history';
import { Navigate, Route, Routes } from 'react-router';
import { ClockCircleOutlined, FileAddOutlined } from '@ant-design/icons/lib/icons';

const Login = lazy(() => import('app/pages/Login'));
const Detail = lazy(() => import('app/pages/Detail'));
const RequireAuth = lazy(() => import('app/components/RequireAuth'));
const HistoryPage = lazy(() => import('app/pages/HistoryPage'));
const DeclarationForm = lazy(() => import('app/pages/DeclarationForm'));
const DeclarationFormWrapper = lazy(() => import('app/Layouts/declarationFormWrapper'));

export const history = createBrowserHistory();

export const routes = {
	declarationForm: {
		id: nanoid(4),
		path: '/declaration-form',
		exact: true,
		component: DeclarationForm,
		layout: DeclarationFormWrapper,
		content: 'Khai báo y tế',
		icon: <FileAddOutlined />
	},
	historyPage: {
		id: nanoid(4),
		path: '/history',
		exact: true,
		component: HistoryPage,
		layout: DeclarationFormWrapper,
		content: 'Lịch sử khai báo',
		icon: <ClockCircleOutlined />
	},
	default: {
		id: nanoid(4),
		path: '/',
		component: () => <Navigate to={`/declaration-form`} />
	}
};

export const renderRouteConfigs = routes => (
	<Routes>
		{/* Protected Route */}
		<Route element={<RequireAuth />}>
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

			<Route
				path={'/detail/:id'}
				exact={true}
				element={
					<DeclarationFormWrapper>
						<Detail />
					</DeclarationFormWrapper>
				}
			/>
		</Route>

		<Route
			path={'/login'}
			exact={true}
			element={
				<>
					<Login />
				</>
			}
		/>
	</Routes>
);
