import {abvRegex} from '@lib/validators/form-inputs';

export const calcAbv = (og: number, fg: number) => {
	let abv = (og - fg) * 131.25;
	abv = parseFloat(abv.toFixed(2));
	if (abvRegex.test(abv.toString())) return abv;
	else return 0.0;
};
