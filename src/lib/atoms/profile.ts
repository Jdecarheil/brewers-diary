import {atomFamily} from 'recoil';

export const profileAtomFamily = atomFamily({
	key: 'profileFamily',
	default: {
		image: require('@assets/images/default.png'),
	},
});
