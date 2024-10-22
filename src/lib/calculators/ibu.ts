import {BiternessFormula, HopType} from '@constants/enum';
import {Recipe} from '@global-types/recipe';

export function typeAdjustment(type: HopType) {
	switch (type) {
		case HopType.PELLET:
			return 1.1;
		case HopType.DRY_WHOLE:
			return 1.0;
		case HopType.CRYO:
			return 1.1;
		default:
			return 1.1;
	}
}

export const calcIBU = (
	recipe: Recipe,
	formula: BiternessFormula,
	preboilGravity: number,
) => {
	let ibu = 0;
	switch (formula) {
		case BiternessFormula.TINSETH:
			recipe.hops.map((hop) => {
				let gravityFactor =
					1.65 * Math.pow(0.000125, preboilGravity - 1);
				let boilTimeFactor =
					(1 - Math.exp(-0.04 * hop.duration)) / 4.15;
				let utilization = gravityFactor * boilTimeFactor;
				ibu +=
					((utilization *
						hop.alpha_acid *
						(hop.weight / 28) *
						0.7489) /
						(recipe.fermentable_volume / 3.78541)) *
					typeAdjustment(hop.type);
			});
			return ibu;
		// IBU = weight of hops in ounces x alpha acid % x utilization % volume of final batch in gallons x 1.34*
		default:
			return 0;
	}
};
