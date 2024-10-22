import {NhostProvider} from '@nhost/react';
import {NavigationContainer} from '@react-navigation/native';
import {nhost} from '@config/nhost';
// import FlashMessage, {showMessage} from 'react-native-flash-message';

import StackNavigator from '@screens/stack-navigator';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, Text} from '@ui-kitten/components';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {baseColors, baseSizes} from '@styles/constants';
import {RecoilEnv, RecoilRoot} from 'recoil';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';

const App = () => {
	const queryClient = new QueryClient();

	RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

	return (
		<SafeAreaView style={{flex: 1}}>
			<NhostProvider nhost={nhost}>
				<NavigationContainer>
					<ApplicationProvider {...eva} theme={eva.light}>
						<QueryClientProvider client={queryClient}>
							<RecoilRoot>
								<React.Suspense fallback={<Text>Loading</Text>}>
									<StackNavigator />
									<FlashMessage
										position="top"
										statusBarHeight={10}
										titleStyle={{
											color: baseColors.primary,
											fontSize: baseSizes.text_subtext,
										}}
										style={{
											backgroundColor:
												baseColors.secondary,
											borderBottomWidth: 1,
											borderBottomColor:
												baseColors.quinary,
											alignItems: 'center',
										}}
									/>
								</React.Suspense>
							</RecoilRoot>
						</QueryClientProvider>
					</ApplicationProvider>
				</NavigationContainer>
			</NhostProvider>
		</SafeAreaView>
	);
};

export default App;
