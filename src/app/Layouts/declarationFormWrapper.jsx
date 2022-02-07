import React from 'react';

import AppBar from 'app/components/AppBar';

export default function DeclarationFormWrapper({ children }) {
	return (
		<>
			<AppBar />
			{children}
		</>
	);
}
