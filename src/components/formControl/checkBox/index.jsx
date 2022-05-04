import React from 'react';
import { Field } from 'formik';
import { Input, Label } from 'reactstrap';

function CheckboxGroup({ label, name, options, ...rest }) {
	return (
		<div className="form-control">
			<label>{label}</label>
			<Field id={name} name={name} {...rest}>
				{({ field }) => {
					return options.map((option) => {
						return (
							<React.Fragment key={option.key}>
								<Input
									type="checkbox"
									value={option.value}
									id={option.value}
									checked={field.value.includes(option.value)}
									{...rest}
									{...field}
								/>
								<Label for={option.value}>{option.key}</Label>
							</React.Fragment>
						);
					});
				}}
			</Field>
		</div>
	);
}

export default CheckboxGroup;
