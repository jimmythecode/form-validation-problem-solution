import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UpdatedForm from './UpdatedForm';

describe('Updated Form', () => {
	const submitFunction = jest.fn();

	beforeEach(() => {
		submitFunction.mockClear();
	});

	it('renders correctly', () => {
		render(<UpdatedForm submitFunction={submitFunction} />);
		expect(screen.getByTestId('submit-button')).toBeTruthy();
		expect(screen.getByTestId('email')).toBeTruthy();
		expect(screen.getByTestId('password')).toBeTruthy();
	});

	it('input initial values', () => {
		render(<UpdatedForm submitFunction={submitFunction} />);
		expect(screen.getByTestId('email')).toHaveTextContent('');
		expect(screen.getByTestId('password')).toHaveTextContent('');
	});

	it('input values update', () => {
		render(<UpdatedForm submitFunction={submitFunction} />);

		// Email:
		const email: HTMLInputElement = screen.getByRole('textbox', {
			name: /email/i,
		});
		fireEvent.change(email, { target: { value: 'jimmythecode@gmail.com' } });
		expect(email.value).toBe('jimmythecode@gmail.com');

		// Passwords:
		const password: HTMLInputElement = screen.getByLabelText(/password/i);
		fireEvent.change(password, { target: { value: '123456789' } });
		expect(password.value).toBe('123456789');
	});

	it('example with userEvent from testing-library docs', async () => {
		// I couldn't get the user.<action>() method to work before, so I've put this here so I'll know in future.
		const user = userEvent.setup();
		render(<UpdatedForm submitFunction={submitFunction} />);
		const email: HTMLInputElement = screen.getByRole('textbox', {
			name: /email/i,
		});
		await user.type(email, 'jimmythecode@gmail.com');

		expect(email.value).toBe('jimmythecode@gmail.com');
	});

	test('the select option works', async () => {
		const user = userEvent.setup();
		render(<UpdatedForm submitFunction={submitFunction} />);
		const options = screen.getByTestId('select-option');
		await user.selectOptions(options, 'blue');
		expect((screen.getByText('Blue') as HTMLOptionElement).selected).toBeTruthy();
		expect((screen.queryByText('Green') as HTMLOptionElement).selected).toBeFalsy();
	});

	test('the checkboxes work', async () => {
		const user = userEvent.setup();
		render(<UpdatedForm submitFunction={submitFunction} />);
		const bearCheckbox: HTMLInputElement = screen.getByTestId('bear');
		expect(bearCheckbox.checked).toEqual(false);
		await user.click(bearCheckbox);
		expect(bearCheckbox.checked).toEqual(true);
	});

	test('On submit is called when all fields pass validation', async () => {
		const user = userEvent.setup();
		render(<UpdatedForm submitFunction={submitFunction} />);

		// Function won't fire because inputs with the 'required' attribute are empty:
		expect(submitFunction).toHaveBeenCalledTimes(0);

		// Elements:
		const email: HTMLInputElement = screen.getByRole('textbox', {
			name: /email/i,
		});
		const password: HTMLInputElement = screen.getByLabelText(/password/i);
		const green = screen.getByRole('option', {
			name: /green/i,
		});
		const bearCheckbox: HTMLInputElement = screen.getByTestId('bear');
		const donkeyCheckbox: HTMLInputElement = screen.getByTestId('donkey');
		const submit = screen.getByRole('button', {
			name: /create account/i,
		});

		// Events
		fireEvent.change(email, { target: { value: 'jimmythecode@gmail.com' } });
		fireEvent.change(password, { target: { value: '123456789' } });
		await user.click(green);
		await user.click(bearCheckbox);
		await user.click(donkeyCheckbox);
		await user.click(submit);

		expect(submitFunction).toHaveBeenCalledTimes(1);
	});
});
