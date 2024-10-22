import {ImageSourcePropType} from 'react-native';
import {TitleType} from '@constants/enum';
import {Recipe} from '@global-types/recipe';
import {Fermentable} from '@global-types/fermentable';
import {Hop} from '@global-types/hop';
import {Additive} from '@global-types/additive';
import {Yeast} from '@global-types/yeast';

export type NewItemModalProps = {
	newFermentable: boolean;
	setNewFermentable: (value: boolean) => void;
};

export type NewHopProps = {
	newFermentable: boolean;
	setNewFermentable: (value: boolean) => void;
};

export type AddChildrenProps = {
	recipe_id: number | undefined;
};

export type FermentableChildrenProps = {
	fermentable: Fermentable | undefined;
};

export type HopChildrenProps = {
	hop: Hop | undefined;
};

export type YeastChildrenProps = {
	yeast: Yeast | undefined;
};

export type AdditiveChildrenProps = {
	additive: Additive | undefined;
};

export type AddModalProps = {
	onCancel: (show: boolean, isUpdate: boolean, index?: number) => void;
	isVisible: boolean;
	recipe_id?: number;
};

export type AddFermentableModalProps = {
	fermentable?: Fermentable;
};

export type AddHopModalProps = {
	hop?: Hop;
};

export type AddAdditiveModalProps = {
	additive?: Additive;
};

export type AddYeastModalProps = {
	yeast?: Yeast;
};

export type IngredientProp = {
	icon: ImageSourcePropType;
	title: string;
	amount: number;
	ratio: number;
	index: number;
	subText: string;
	clickedRow: (show: boolean, isUpdate: boolean, index: number) => void;
};

export type ProcessProps = {
	recipe: Recipe;
};

export type NewItemProps = {
	setNewItem: (value: boolean) => void;
	vs: number;
};

export type IngredientProps = {
	recipe: Recipe;
};

export type DetailsProps = {
	recipe: Recipe;
	ibu: number;
	bugu: number;
	abv: number;
	ebc: string;
	originalGravity: number;
	finalGravity: number;
	preboilVolume: number;
	spargeVolume: number;
	strikeWaterVolume: number;
	mashVolume: number;
};

export type GrainBillProps = {};

export type TitleRowProps = {
	left?: boolean;
	middle?: string;
	right?: string;
	type?: TitleType;
	onPress?: (show: boolean, isUpdate: boolean, index?: number) => void;
};

export type RenderTilesProp = {
	value: string;
	title: string;
};

export type HopBillProps = {};

export type RenderItemFormInputsProps = {
	name: string;
	brand: string;
	weight: string;
	handleFormError: (value: string) => void;
	parentFormValid: boolean;
	setNewFermentable: (value: boolean) => void;
};

export interface RenderHopItemFormInputs extends RenderItemFormInputsProps {}

export interface RenderFermentableItemFormInputs
	extends RenderItemFormInputsProps {}
export interface RenderNonFermentableItemFormInputs
	extends RenderItemFormInputsProps {}

export type RecipeStatRowProps = {
	title: string;
	value: string;
	icon: ImageSourcePropType;
};
