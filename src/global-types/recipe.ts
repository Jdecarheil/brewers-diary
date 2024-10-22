import {Additive} from '@global-types/additive';
import {Fermentable} from '@global-types/fermentable';
import {Hop} from '@global-types/hop';
import {Yeast} from '@global-types/yeast';

export type Recipe = {
	recipe_id?: number;
	user_id: string;
	name: string;
	author: string;
	fermentable_volume: number;
	date_added: string;
	notes: string;
	boil_duration: number;
	style: string;
	downloads?: number;
	public?: number;
	reviews?: number;
	kettle_size: number;
	grist_ratio: number;
	additives: Additive[];
	fermentables: Fermentable[];
	hops: Hop[];
	mash_temp: number;
	image_id: string;
	yeasts: Yeast[];
};

export type Recipes = {
	recipes: Recipe[];
};
