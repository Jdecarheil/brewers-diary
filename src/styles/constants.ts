import {Dimensions} from 'react-native';
import {s} from 'react-native-size-matters';

const fontScale = Dimensions.get('window').fontScale;

const button_styles = {
	backgroundColor: '#e0e0e0',
};

const text_styles = {
	title_color: '#556080',
	text_primary: '#909cb4',
	nav_title_weight: 'bold',
};
//#f7fbc4
const baseColors = {
	primary: '#003c47', //teal
	secondary: '#ffffff', // white
	tertiary: '#E8E8E8', //darker gray
	quaternary: '#F6F6F6', //light gray
	quinary: '#fafafa', //lightest gray
	warning: '#FF1919', //Red
	error: '#FF1919', //Red
	input: '#F8F9FC',
	input_placeholder: '#808080', //darkest gray
	text_primary: '#F6F6F6',
	text_secondary: 'black',
	text_tertiary: '#666666',
};

const baseSizes = {
	text_h1: s(20),
	text_modal_title: s(25),
	text_subtext: s(17),
	text_details: s(13),
	text_spec_text: s(10),
};
const baseFonts = {
	text_primary: 'courrier',
};

const chevron = {
	color: '#F6BE00',
};

const icon_styles = {
	icon_primary_color: '#556080',
	icon_secondary_color: '#F6BE00',
	icon_nav_size: s(30),
};

const warning_styles = {
	warning_serious: '#bf0000',
};

export {
	button_styles,
	text_styles,
	chevron,
	icon_styles,
	warning_styles,
	baseColors,
	baseSizes,
	baseFonts,
};
