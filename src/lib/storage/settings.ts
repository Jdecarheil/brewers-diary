import AsyncStorage from '@react-native-async-storage/async-storage';
import {Settings} from '@global-types/settings';

export const fetchSettings =
	() =>
	({setSelf, onSet, trigger}: any) => {
		let parsed;
		const loadPersisted = async () => {
			try {
				let settings = await AsyncStorage.getItem(
					process.env.STORAGE_KEY ?? '@Settings/key',
				);

				if (settings) {
					parsed = await JSON.parse(settings);
					setSelf(parsed);
				} else {
					console.log(
						'Failed to retrieve settings, there appears to be no key',
					);
				}
			} catch (e) {
				console.log('Error receiving settings from storage with: ', e);
			}
		};

		if (trigger === 'get') {
			loadPersisted();
		}

		onSet(async (newValue: Settings, _: any, isReset: boolean) => {
			try {
				!isReset
					? await AsyncStorage.setItem(
							'@Settings:key',
							JSON.stringify(newValue),
					  )
					: console.log('reseted');
			} catch (e) {
				console.log('Error receiving settings from storage with: ', e);
			}
		});
	};
