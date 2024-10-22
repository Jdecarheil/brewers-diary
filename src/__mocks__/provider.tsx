import {NhostClient, NhostProvider} from '@nhost/react';
import {ReactNode, Suspense} from 'react';
import {
	I18nextProvider,
	I18nextProviderProps,
	initReactI18next,
} from 'react-i18next';
import {Text} from 'react-native';
import {RecoilRoot} from 'recoil';
import i18n from 'i18next';
import {NavigationContainer} from '@react-navigation/native';
export type ProviderProps = {
	children?: ReactNode;
	i18n?: {language?: string};
};

export const ProviderWrapper = (props: ProviderProps) => {
	const nhostStub = new NhostClient({subdomain: 'local'});

	// const i18: any = i18n.use(initReactI18next).init({
	// 	lng: '',
	// 	fallbackLng: 'en',

	// 	ns: ['translationsNS'],
	// 	defaultNS: 'translationsNS',

	// 	debug: true,

	// 	resources: {
	// 		en: {translationsNS: {}, image: require('../assets/flags/uk.png')},
	// 	},
	// });

	const Base = () => {
		return (
			<NavigationContainer>
				<RecoilRoot>
					<NhostProvider nhost={nhostStub}>
						{props.children}
					</NhostProvider>
				</RecoilRoot>
			</NavigationContainer>
		);
	};

	if (props.i18n?.language) {
		return (
			// <I18nextProvider i18n={i18}>
			<Base />
			// {/* </I18nextProvider> */}
		);
	}

	return <Base />;
};
