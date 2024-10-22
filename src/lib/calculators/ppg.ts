import {Crush} from '@constants/enum';
import {Fermentable} from '@global-types/fermentable';

export function calculatePPG(fermentable: Fermentable): number {
	if (fermentable.extract_dry <= 0) return 1.036;

	let estPpg = 0;
	let variance = fermentable.extract_dry;
	switch (fermentable.crush) {
		case Crush.POWDER:
			estPpg = fermentable.extract_dry + 1.5;
			break;
		case Crush.FINE:
			estPpg = fermentable.extract_dry + 1;
			break;
		case Crush.MEDIUM:
			variance = fermentable.extract_dry + 0.5;
			break;
		case Crush.COARSE:
			break;
	}

	const result = 1 + (variance / 100) * 0.04621;
	return Math.round(result * 1000) / 1000;
}

// (((fermentable.extract_dry / 100) * 0.3) * 100).toString()
