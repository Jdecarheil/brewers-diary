import {AdditiveType} from '@constants/enum';

export type Additive = {
	recipe_id?: number;
	name: string;
	brand: string;
	type: AdditiveType;
	duration: number;
	weight: number;
	addition: string;
	ebc_min: number;
	ebc_max: number;
	id?: number;
	comments: string;
};
