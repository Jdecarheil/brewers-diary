import {BoilRate} from '@constants/enum';

export const boilOffCalc = (
	duration: number,
	kettleSize: number,
	heatIntensity?: BoilRate,
) => {
	const base = 3.2;
	let heatFactor = 1;
	let kettleSizeFactor = 1;

	switch (heatIntensity) {
		case BoilRate.GENTLE_BOIL:
			heatFactor = 0.75;
			break;
		case BoilRate.MODERATE_BOIL:
			heatFactor = 1;
			break;
		case BoilRate.INTENSE_BOIL:
			heatFactor = 1.25;
			break;
	}

	switch (true) {
		case kettleSize < 30:
			kettleSizeFactor = 0.75;
			break;
		case kettleSize < 40:
			kettleSizeFactor = 1;
			break;
		case kettleSize < 50:
			kettleSizeFactor = 1.25;
			break;
		case kettleSize < 60:
			kettleSizeFactor = 1.5;
			break;
		default:
			kettleSizeFactor = 1.75;
	}

	result = (base * kettleSize * heatFactor) / 60;
	if (kettleSize >= 30 && kettleSize < 40) result = (3.2 * duration) / 60;
	else if (kettleSize >= 20 && kettleSize < 30)
		result = (2.8 * duration) / 60;
	else if (kettleSize >= 40 && kettleSize < 50)
		result = (6.624471 * duration) / 60;
	else if (kettleSize >= 50 && kettleSize < 60)
		result = (7.6 * duration) / 60;
	else result = (8.6 * duration) / 60;

	if (heatIntensity === BoilRate.GENTLE_BOIL) result = result * 2;
	return parseFloat(result.toFixed(1));
};
