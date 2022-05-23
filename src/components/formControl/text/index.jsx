import React from 'react';
import { Field } from 'formik';
import { Label } from 'reactstrap';

function Input(props) {
	const { placeholder, disable, label, name, list, onChange, onKeyDown, ...rest } = props;
	return (
		<div className="form-control">
			<Label for={name}>{label}</Label>
			<Field name={name} {...rest}>
				{({ field }) => {
					return (
						<input
							id={field.name}
							list={list}
							disabled={disable}
							type="text"
							placeholder={placeholder}
							onChange={onChange}
							onKeyDown={onKeyDown}
							{...field}
						/>
					);
				}}
			</Field>
		</div>
	);
}

export default Input;
