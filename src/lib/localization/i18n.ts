import {en, fr} from '@localization/index';
import {initReactI18next} from 'react-i18next';
import i18n from 'i18next';

const resources = {
	en: {
		translation: en,
		image: require('../../assets/flags/uk.png'),
	},
	fr: {
		translation: fr,
		image: require('../../assets/flags/fr.png'),
	},
};

i18n.use(initReactI18next).init({
	resources,
	compatibilityJSON: 'v3',
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false,
	},
});

export default i18n;
