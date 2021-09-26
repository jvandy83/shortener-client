import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import UrlForm from './Urls';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

ReactDOM.render(
	<Router>
		<React.StrictMode>
			<Switch>
				<Route exact path='/' component={App} />
				<Route path='/urls' component={UrlForm} />
			</Switch>
		</React.StrictMode>
	</Router>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
