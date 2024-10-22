import {Crush, FermentableCategory} from '@constants/enum';

export type Fermentable = {
	name: string;
	brand: string;
	type: string;
	weight: number;
	max_ppg: number;
	comments: string;
	category: FermentableCategory;
	recipe_id?: number;
	extract_dry: number;
	moisture: number;
	ebc_min: number;
	ebc_max: number;
	grist_ratio: number;
	crush: Crush;
	id?: number;
};
