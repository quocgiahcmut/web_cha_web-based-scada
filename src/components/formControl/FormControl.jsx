import React from 'react';
import Input from './text';
import CheckboxGroup from './checkBox';
import DatePicker from './datePicker';
import Select from './select';
import DropdownInput from './dropdownInput';
import MonthPicker from './monthPicker';
function FormikControl(props) {
	const { control, ...rest } = props;
	switch (control) {
		case 'input':
			return <Input {...rest} />;
		case 'select':
			return <Select {...rest} />;
		case 'checkbox':
			return <CheckboxGroup {...rest} />;
		case 'date':
			return <DatePicker {...rest} />;
		case 'month':
			return <MonthPicker {...rest} />;
		case 'dropdown-input':
			return <DropdownInput {...rest} />;
		default:
			return null;
	}
}

export default FormikControl;
