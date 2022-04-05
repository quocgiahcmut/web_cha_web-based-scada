import React from 'react';
import { Field } from 'formik';
import { Label } from 'reactstrap';

function Input(props) {
	const { placeholder, disable, label, name, ...rest } = props;
	return (
		<div className="form-control">
			<Label for={name}>{label}</Label>
			<Field name={name} {...rest}>
				{({ field }) => {
					return (
						<input
							style={disable ? { backgroundColor: '#d9d9d9' } : {}}
							id={field.name}
							{...field}
							disabled={disable}
							type="text"
							placeholder={placeholder}
						/>
					);
				}}
			</Field>
		</div>
	);
}

export default Input;
