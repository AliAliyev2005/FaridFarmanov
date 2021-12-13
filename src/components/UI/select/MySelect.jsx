import { Select } from "antd";
import { Option } from "antd/lib/mentions";
import React from "react";

//<MySelect defaultValue='...' options={options} onChange={onChangeSelect} value={selected}/>

// const [selected, setSelected] = useState('')

//const onChangeSelect = (value) => {
//   setSelected(value)
//}

function MySelect({ options, defaultValue, onChange, value }) {
	const { Option } = Select;

	function handleChange(value) {
		console.log(`selected ${value}`);
	}

	return (
		<Select
			defaultValue={defaultValue}
			value={value}
			onChange={(e) => onChange(e)}
		>
			{options
				? options.map((option) => {
						return (
							<Option value={option.Name} key={option.Id}>
								{option.Name}
							</Option>
						);
				  })
				: ""}
		</Select>
	);
}

export default MySelect;
