import React from 'react';
import './App.css';
import UpdatedForm from './Components/UpdatedForm/UpdatedForm';

function App() {
	function submitFunction(
		setSubmitClickedState: React.Dispatch<React.SetStateAction<boolean>>,
		setSuccessState: React.Dispatch<React.SetStateAction<boolean>>,
		errorState: {
			email: string;
			password: string;
			color: string;
			animal: string;
			tiger: string;
		}
	) {
		setSubmitClickedState(true);
		if (Object.values(errorState).filter((thisString) => thisString.length > 0).length === 0) {
			setSuccessState(true);
			setTimeout(() => {
				setSuccessState(false);
			}, 3000);
		}
	}

	return (
		<div className='App'>
			<UpdatedForm submitFunction={submitFunction} />
		</div>
	);
}

export default App;
