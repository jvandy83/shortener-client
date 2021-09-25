import React, { useState, useEffect } from 'react';

import axios from 'axios';

import './Url.css';

const UrlForm = () => {
	const [value, setValue] = useState({});

	const [shortenedUrls, setShortenedUrl] = useState([]);

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		setValue((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const isUrl = (string) => {
		try {
			return Boolean(new URL(string));
		} catch (e) {
			return false;
		}
	};

	const makeId = () => {
		var result = '';
		var characters =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		var charLen = characters.length;
		for (var i = 0; i < 5; i++) {
			result += characters.charAt(Math.floor(Math.random() * charLen));
		}
		return result;
	};
	const handleClick = () => {
		const isValidUrl = isUrl(value?.currentUrl);
		if (!isValidUrl) {
			setErrors((prev) => ({
				...prev,
				invalidUrl: 'Please enter a valid URL',
			}));
			return;
		}
		const hash = makeId();
		const customUrl = value?.customUrl;
		const data = {
			hash: customUrl ? customUrl : hash,
			aliasUrl: `http://localhost:5500/api/fetch-url/${
				customUrl ? customUrl : hash
			}`,
			actualUrl: value?.currentUrl,
		};
		axios.post('http://localhost:5500/api/create-url', data).then((res) => {
			if (res.status !== 200 && res.status !== 201) {
				console.log('unsuccessful');
				console.log(res);
			}
			console.log('success');
			setValue({});
			window.location.reload();
		});
	};

	const renderUrls = () => {
		return (
			<div className='shortened-urls'>
				<h2>Your new URL's</h2>
				{shortenedUrls.map((u) => (
					<div key={u.hash}>
						<a href={u.aliasUrl}>{u.aliasUrl}</a>
					</div>
				))}
			</div>
		);
	};

	useEffect(() => {
		axios('http://localhost:5500/api/fetch-urls').then((res) => {
			console.log(res.data);
			setShortenedUrl(res.data.urls);
		});
	}, []);

	const renderErrors = () => {
		console.log(errors);
		return Object.keys(errors).map((e) => (
			<p key={e} className='error'>
				{errors[e]}
			</p>
		));
	};

	return (
		<div className='form-container'>
			<h1 className='form-title'>Url Shortener</h1>
			{Object.keys(errors).length > 0 && renderErrors()}
			<form className='form' onSubmit={(e) => e.preventDefault()}>
				<div className='form-input-container'>
					<label className='form-label'>Enter current url: </label>
					<input
						className='form-input'
						style={errors.invalidUrl && { border: '2px solid red' }}
						type='text'
						name='currentUrl'
						onChange={handleChange}
						value={value.currentUrl || ''}
					/>
				</div>
				<div className='form-input-container'>
					<label className='form-label'>
						Enter custom url <span className='message'>(optional)</span>:{' '}
					</label>
					<input
						className='form-input'
						type='text'
						name='customUrl'
						onChange={handleChange}
						value={value.customUrl || ''}
					/>
				</div>
				<div className='button-container'>
					<button className='form-button' onClick={handleClick}>
						Get url
					</button>
				</div>
			</form>
			{shortenedUrls.length > 0 && renderUrls()}
		</div>
	);
};

export default UrlForm;
