import {Crush} from '@constants/enum';
import {Fermentable} from '@global-types/fermentable';
import {Yeast} from '@global-types/yeast';

export const calcOG = (fermentables: Fermentable[], volume: number) => {
	let points = 0;
	let volumeInGallons = volume / 3.78541;

	fermentables.map((fermentable) => {
		let estPpg = 0;
		let weightInPounds = (fermentable.weight / 1000) * 2.2;
		switch (fermentable.crush) {
			case Crush.POWDER:
				estPpg =
					(fermentable.max_ppg - Math.floor(fermentable.max_ppg)) *
					0.9;
				break;
			case Crush.FINE:
				estPpg =
					(fermentable.max_ppg - Math.floor(fermentable.max_ppg)) *
					0.85;
				break;
			case Crush.MEDIUM:
				estPpg =
					(fermentable.max_ppg - Math.floor(fermentable.max_ppg)) *
					0.75;
				break;
			case Crush.COARSE:
				estPpg =
					(fermentable.max_ppg - Math.floor(fermentable.max_ppg)) *
					0.65;
				break;
			default:
				estPpg =
					(fermentable.max_ppg - Math.floor(fermentable.max_ppg)) *
					0.75;
		}

		points += weightInPounds * estPpg;
	});

	const result = points / volumeInGallons;

	return parseFloat(result.toFixed(3)) + 1;
};

export const calcFG = (og: number, yeasts: Yeast, mash_temp: number) => {
	let attenuationAdjusted = yeasts.attenuation - 0.0225 * (mash_temp - 67.5);
	const result = og - (og - 1) * (attenuationAdjusted / 100);
	return parseFloat(result.toFixed(3));
};
