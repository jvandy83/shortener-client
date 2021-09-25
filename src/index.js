import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import UrlForm from './Urls';

import { Router as BrowserRouter, Route, Switch } from 'react-router-dom';

import { createBrowserHistory } from 'history';

const newHistory = createBrowserHistory();

ReactDOM.render(
	<BrowserRouter history={newHistory}>
		<React.StrictMode>
			<Switch>
				<Route exact path='/' component={App} />
				<Route path='/urls' component={UrlForm} />
			</Switch>
		</React.StrictMode>
	</BrowserRouter>,
	document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
