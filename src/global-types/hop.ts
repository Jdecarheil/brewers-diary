import {Addition, HopType} from '@constants/enum';

export type Hop = {
	name: string;
	recipe_id?: number;
	alpha_acid: number;
	type: HopType;
	weight: number;
	duration: number;
	addition: Addition;
	brand: string;
	id?: number;
	comments: string;
};
