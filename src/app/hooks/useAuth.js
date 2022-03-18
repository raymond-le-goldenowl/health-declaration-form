import { useContext } from 'react';

import { AuthContext } from 'app/contexts/AuthContextProvider';

const useAuth = () => useContext(AuthContext);

export default useAuth;
