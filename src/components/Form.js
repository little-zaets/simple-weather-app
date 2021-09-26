import React from 'react';

const Form = (props) => (
	<form onSubmit={props.getWeather}>
		<input type="text" name="city" placeholder="Enter a city" />
		<input type="text" name="country" placeholder="Enter a country" />
		<button>Get Weather</button>
		<button onClick={props.resetWeather}>
			New Search
		</button>
	</form>
);

export default Form;

