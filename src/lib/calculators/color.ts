import {Additive} from '@global-types/additive';
import {Fermentable} from '@global-types/fermentable';

export function ebcToLovi(ebc: number) {
	let srm = ebc * 0.508;
	let lovi = (srm + 0.76) / 1.3546;
	return lovi;
}

export const calcColor = (
	fermentables: Fermentable[],
	additives: Additive[],
	volume: number,
) => {
	let totalWeight = 0;
	let mcu = 0;
	fermentables.map((fermentable) => {
		totalWeight += fermentable.weight;
	});

	additives.map((additive) => {
		totalWeight += additive.weight;
	});

	fermentables.map((fermentable) => {
		let weightInPounds = (fermentable.weight / 1000) * 2.2;
		let averageEbc = (fermentable.ebc_min + fermentable.ebc_max) / 2;
		let result = weightInPounds * ebcToLovi(averageEbc);
		mcu += result;
	});

	additives.map((additive) => {
		let weightInPounds = (additive.weight / 1000) * 2.2;
		let averageEbc = (additive.ebc_min + additive.ebc_max) / 2;
		let result = weightInPounds * ebcToLovi(averageEbc);
		mcu += result;
	});

	return parseFloat(((mcu / (volume / 3.78541)) * 1.97).toString()).toFixed(
		1,
	);
};
