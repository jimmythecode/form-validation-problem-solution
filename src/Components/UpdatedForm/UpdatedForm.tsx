import React, { useEffect, useState } from 'react';

function UpdatedForm({
	submitFunction,
}: {
	submitFunction: (
		setSubmitClickedState: React.Dispatch<React.SetStateAction<boolean>>,
		setSuccessState: React.Dispatch<React.SetStateAction<boolean>>,
		errorState: {
			email: string;
			password: string;
			color: string;
			animal: string;
			tiger: string;
		}
	) => void;
}) {
	const [emailState, setEmailState] = useState('');
	const [passwordState, setPasswordState] = useState('');
	const [colorOptionsState, setColorOptionsState] = useState('');
	const [animalCheckboxState, setAnimalCheckboxState] = useState({
		bear: false,
		tiger: false,
		snake: false,
		donkey: false,
	});
	const [tigerTypeState, setTigerTypeState] = useState('');
	const [errorState, setErrorState] = useState({
		email: '',
		password: '',
		color: '',
		animal: '',
		tiger: '',
	});
	const [submitClickedState, setSubmitClickedState] = useState(false);
	const [successState, setSuccessState] = useState(false);

	useEffect(() => {
		// At least two Animals must be chosen.
		if (Object.values(animalCheckboxState).filter((bool) => bool).length < 2) {
			setErrorState((prev) => ({ ...prev, animal: 'At least two animals must be chosen' }));
		} else {
			setErrorState((prev) => ({ ...prev, animal: '' }));
		}
	}, [animalCheckboxState]);

	useEffect(() => {
		// If Tiger is one of the chosen Animals then Type of tiger is required to be a non-empty string.
		if (animalCheckboxState.tiger && tigerTypeState.length === 0) {
			setErrorState((prev) => ({ ...prev, tiger: 'Tiger description is required' }));
		} else {
			setErrorState((prev) => ({ ...prev, tiger: '' }));
		}
	}, [tigerTypeState, animalCheckboxState]);

	function handleSubmit(e: React.SyntheticEvent) {
		e.preventDefault();
		submitFunction(setSubmitClickedState, setSuccessState, errorState);
	}

	return (
		<form onSubmit={handleSubmit}>
			<h1>Fill out this awesome form</h1>
			<fieldset>
				<h3>Your details</h3>
				<div className={`inputContainer ${errorState.email.length > 0 && submitClickedState ? 'error' : ''}`}>
					<label className='label' htmlFor='email'>
						Email
					</label>
					<input
						type='text'
						id='email'
						name='email'
						value={emailState}
						onChange={(event) => {
							setEmailState(event.target.value);
							if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(event.target.value)) {
								setErrorState((prev) => ({ ...prev, email: '' }));
							} else {
								setErrorState((prev) => ({ ...prev, email: 'Please use a valid email address' }));
							}
						}}
						onError={(event) => setErrorState((prev) => ({ ...prev, email: 'onError change' }))}
						required
					/>
					<span style={{ color: errorState.email.length > 0 && submitClickedState ? 'inherit' : 'white' }}>
						Please enter a valid email address
					</span>
				</div>
				<div className={`inputContainer ${errorState.password.length > 0 && submitClickedState ? 'error' : ''}`}>
					<label className='label' htmlFor='password'>
						Password
					</label>
					<input
						className={`error`}
						type='password'
						id='password'
						name='username'
						value={passwordState}
						onChange={(event) => {
							setPasswordState(event.target.value);
							// Password must be longer than 8 characters.
							if (event.target.value.length <= 8) {
								setErrorState((prev) => ({ ...prev, password: 'Password must be longer than 8 characters' }));
							} else {
								setErrorState((prev) => ({ ...prev, password: '' }));
							}
						}}
						required
					/>
					<span style={{ color: errorState.password.length > 0 && submitClickedState ? 'inherit' : 'white' }}>
						Password must be longer than 8 characters
					</span>
				</div>
			</fieldset>

			<fieldset>
				<h3>Your animal</h3>
				<div className={`inputContainer ${errorState.color.length > 0 && submitClickedState ? 'error' : ''}`}>
					<label className='label' htmlFor='colour'>
						Colour
					</label>
					<select
						name='colour'
						id='colour'
						value={colorOptionsState}
						onChange={(event) => {
							setColorOptionsState(event.target.value);
							// Colour must be selected.
							if (event.target.value === '') {
								setErrorState((prev) => ({ ...prev, color: 'A color must be selected' }));
							} else {
								setErrorState((prev) => ({ ...prev, color: '' }));
							}
						}}
					>
						<option value=''>Choose colour</option>
						<option value='blue'>Blue</option>
						<option value='green'>Green</option>
						<option value='red'>Red</option>
						<option value='black'>Black</option>
						<option value='brown'>Brown</option>
					</select>
					<span style={{ color: errorState.color.length > 0 && submitClickedState ? 'inherit' : 'white' }}>
						A color must be selected
					</span>
				</div>

				<div
					className={`inputContainer animalCheckboxes ${
						errorState.animal.length > 0 && submitClickedState ? 'error' : ''
					}`}
				>
					<label className='label'>Animal</label>
					<div style={{ flexDirection: 'row' }}>
						{Object.keys(animalCheckboxState).map((thisAnimalLabel) => (
							<label
								key={thisAnimalLabel}
								htmlFor={thisAnimalLabel}
								style={{ color: 'inherit' }}
								className='animalCheckbox'
							>
								{thisAnimalLabel}
								<input
									type='checkbox'
									name='animal'
									value={thisAnimalLabel}
									id={thisAnimalLabel}
									checked={animalCheckboxState[thisAnimalLabel as keyof typeof animalCheckboxState]}
									onChange={(event) =>
										setAnimalCheckboxState((prev) => ({ ...prev, [thisAnimalLabel]: event.target.checked }))
									}
								/>
							</label>
						))}
					</div>
					<span style={{ color: errorState.animal.length > 0 && submitClickedState ? 'inherit' : 'white' }}>
						At least two animals must be chosen
					</span>
				</div>
				<div className={`inputContainer ${errorState.tiger.length > 0 && submitClickedState ? 'error' : ''}`}>
					<label className='label' htmlFor='tiger_type'>
						Type of tiger
					</label>
					<input
						type='text'
						name='tiger_type'
						id='tiger_type'
						value={tigerTypeState}
						onChange={(e) => setTigerTypeState(e.target.value)}
					/>
					<span style={{ color: errorState.tiger.length > 0 && submitClickedState ? 'inherit' : 'white' }}>
						Tiger description is required
					</span>
				</div>
			</fieldset>
			<fieldset>
				<div>
					<input
						type='submit'
						value={`${successState ? 'Successfully Added' : 'Create account'}`}
						style={{ backgroundColor: successState ? 'green' : '#0b77db' }}
					/>
				</div>
			</fieldset>
		</form>
	);
}

export default UpdatedForm;
