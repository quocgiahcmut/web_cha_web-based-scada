import { Field } from 'formik';
import React from 'react';
function DatePicker(props) {
	const { name, label, ...rest } = props;
	return (
		<div className="form-control">
			<label htmlFor={name}>{label}</label>
			<Field name={name}>
				{({ field, form }) => {
					return <input type="date" id={name} name={name} {...field} {...rest} />;
				}}
			</Field>
		</div>
	);
}

export default DatePicker;
