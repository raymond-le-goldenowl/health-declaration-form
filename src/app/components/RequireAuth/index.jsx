import { useLocation, Navigate, Outlet } from 'react-router-dom';

import useAuth from 'app/hooks/useAuth';

export default function RequireAuth() {
	const { auth } = useAuth();
	const location = useLocation();

	return auth?.isAuth ? <Outlet /> : <Navigate to={'/login'} state={{ from: location }} replace />;
}
