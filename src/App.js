import React from 'react';
import { Link } from 'react-router-dom';

function App() {
	return (
		<div className='App'>
			<h1>Home Page</h1>
			<div>
				<Link to='/urls'>Create a new URL</Link>
			</div>
		</div>
	);
}

export default App;
