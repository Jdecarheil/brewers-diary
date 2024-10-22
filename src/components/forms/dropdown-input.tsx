import {IndexPath, Layout, Select, SelectItem} from '@ui-kitten/components';

export type DropdownInputProps = {
	vs: number;
	label?: string;
	options: string[];
	selectedIndex: IndexPath | IndexPath[];
	setSelectedIndex: (index: IndexPath | IndexPath[]) => void;
	value: string;
};

const DropdownInput = (props: DropdownInputProps) => {
	const {label, options, selectedIndex, setSelectedIndex, value} = props;

	return (
		<Layout level="1">
			<Select
				value={value}
				selectedIndex={selectedIndex}
				label={label}
				onSelect={(index) => setSelectedIndex(index)}
			>
				{options.map((option) => {
					return <SelectItem title={option} />;
				})}
			</Select>
		</Layout>
	);
};

export default DropdownInput;
