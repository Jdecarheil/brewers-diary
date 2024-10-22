import {IndexPath} from '@ui-kitten/components';

export type SettingsDropdownItemProps = {
	vs: number;
	icon: string;
	title: string;
	options: string[];
	value: string;
	selectedIndex: IndexPath | IndexPath[];
	setSelectedIndex: (index: IndexPath | IndexPath[]) => void;
};
