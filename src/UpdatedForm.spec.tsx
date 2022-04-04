import React from 'react';
import { render, screen, within } from '@testing-library/react';
import UpdatedForm from './Components/UpdatedForm/UpdatedForm';
import App from './App';
import user from '@testing-library/user-event';

describe('Updated Form', () => {
	const submitFunction = jest.fn();

	beforeEach(() => {
		submitFunction.mockClear();
	});

	it('On submit is called when all fields pass validation', () => {
		render(<UpdatedForm submitFunction={submitFunction} />);
		const email = screen.getByRole('textbox', {
			name: /email/i,
		});
		const password = screen.getByLabelText(/password/i);
		const green = screen.getByRole('option', {
			name: /green/i,
		});
		const snake = screen.getByRole('checkbox', {
			name: /snake/i,
		});
		const donkey = screen.getByRole('checkbox', {
			name: /donkey/i,
		});

		const submit = screen.getByRole('button', {
			name: /create account/i,
		});
		user.type(email, 'jimmythecode@gmail.com');
		user.type(password, '123456789');
		user.click(green);
		user.click(snake);
		user.click(donkey);
		user.click(submit);
		expect(submitFunction).toHaveBeenCalledTimes(1);
	});
});
