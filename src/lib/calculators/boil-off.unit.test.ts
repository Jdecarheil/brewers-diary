import {calcAbv} from './abv';
import {boilOffCalc} from './boil-off';

describe('boil-off.ts', () => {
	test('verifies correct boil-off rate with intensity supplied', () => {
		const response = boilOffCalc(70, 35);
		expect(response).toEqual(5.51);
	});

	test('verifies correct boil-off rate without intensity supplied', () => {
		const response = boilOffCalc(70, 35);
		expect(response).toEqual(5.51);
	});
});
