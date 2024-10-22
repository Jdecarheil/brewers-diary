import GetStartedScreen, {Footer, NavRows} from '@screens/get-started/index';
import {ProviderWrapper} from 'src/__mocks__/provider';
import {nav} from '../navigation-props';

export const FooterWithWrapper = () => {
	return <ProviderWrapper children={<Footer />} />;
};

export const NavRowsWithWrapper = () => {
	return (
		<ProviderWrapper
			children={
				<NavRows
					navigation={{
						navigation: nav,
						route: {
							key: 'GetStartedScreen-YjpeT1KBJFilxkRIrdwZI',
							name: 'GetStartedScreen',
							params: undefined,
						},
					}}
				/>
			}
		/>
	);
};

export const GetStartedScreenWithWrapper = () => {
	return (
		<ProviderWrapper
			children={
				<GetStartedScreen
					navigation={nav}
					route={{
						key: 'GetStartedScreen-YjpeT1KBJFilxkRIrdwZI',
						name: 'GetStartedScreen',
						params: undefined,
					}}
				/>
			}
		/>
	);
};
