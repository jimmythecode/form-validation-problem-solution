import React from 'react';

function Initial() {
	return (
		<form method='post' action=''>
			<h1>Fill out this awesome form</h1>
			<fieldset>
				<h3>Your details</h3>
				<p>
					<label className='label' htmlFor='email'>
						Email
					</label>
					<input type='text' id='email' name='email' />
				</p>
				<p>
					<label className='label' htmlFor='password'>
						Password
					</label>
					<input className='error' type='password' id='password' name='username' />
				</p>
			</fieldset>

			<fieldset>
				<h3>Your animal</h3>
				<p>
					<label className='label' htmlFor='colour'>
						Colour
					</label>
					<select name='colour' id='colour'>
						<option value=''>Choose colour</option>
						<option value='blue'>Blue</option>
						<option value='green'>Green</option>
						<option value='red'>Red</option>
						<option value='black'>Black</option>
						<option value='brown'>Brown</option>
					</select>
				</p>
				<p>
					<span className='label'>Animal</span>

					<input type='checkbox' name='animal' value='bear' id='bear' />
					<label htmlFor='bear'>Bear</label>

					<input type='checkbox' name='animal' value='tiger' id='tiger' />
					<label htmlFor='tiger'>Tiger</label>

					<input type='checkbox' name='animal' value='snake' id='snake' />
					<label htmlFor='snake'>Snake</label>

					<input type='checkbox' name='animal' value='donkey' id='donkey' />
					<label htmlFor='donkey'>Donkey</label>
				</p>
				<p>
					<label className='label' htmlFor='tiger_type'>
						Type of tiger
					</label>
					<input type='text' name='tiger_type' id='tiger_type' />
				</p>
			</fieldset>
			<fieldset>
				<p>
					<input type='submit' value='Create account' />
				</p>
			</fieldset>
		</form>
	);
}

export default Initial;
