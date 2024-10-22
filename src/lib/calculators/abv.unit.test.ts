import {calcAbv} from './abv';

describe('abv.ts', () => {
	test('verifies correct abv given', () => {
		const response = calcAbv(1.05, 1.008);
		expect(response).toEqual(5.51);
	});

	test('verifies 0.0 returned for all false values', () => {
		const response = calcAbv(2000, 1.008);
		expect(response).toEqual(0.0);
	});
});
