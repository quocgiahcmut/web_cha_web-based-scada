import React from 'react';
import { Field } from 'formik';
import { Label } from 'reactstrap';

function Select({ label, name, options, onClick, ...rest }) {
	return (
		<div className="form-control">
			<Label for={name}>{label}</Label>
			<Field as="select" {...rest} name={name} id={name} onClick={onClick}>
				{options.map((option) => {
					return (
						<option key={option.value} value={option.value}>
							{option.key}
						</option>
					);
				})}
			</Field>
		</div>
	);
}

export default Select;
