import { Field } from 'formik';
import React from 'react';
function MonthPicker(props) {
	const { name, label, ...rest } = props;
	return (
		<div className="form-control">
			<label htmlFor={name}>{label}</label>
			<Field name={name}>
				{({ field }) => {
					return <input type="month" id={name} {...field} {...rest} />;
				}}
			</Field>
		</div>
	);
}

export default MonthPicker;
