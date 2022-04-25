import { Field } from 'formik';
import React from 'react';
import { Label } from 'reactstrap';
import Select from 'react-select';

function DropdownInput(props) {
	const { onChange, options, disable, label, name, ...rest } = props;
	return (
		<div className="form-control">
			<Label for={name}>{label}</Label>
			<Field name={name} {...rest}>
				{({ field }) => {
					return (
						<Select
							id={name}
							options={options}
							onChange={(value) => {
								field.onChange(value.value);
								onChange(value.value);
							}}
							placeholder="Chọn sản phẩm"
						/>
					);
				}}
			</Field>
		</div>
	);
}

export default DropdownInput;
