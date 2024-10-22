export const enum Nav {
	LOGIN = 'LOGIN',
	REGISTER = 'REGISTER',
	GETSTARTED = 'GETSTARTED',
	FORGOT_PASSWORD = 'FORGOT_PASSWORD',
}

export const enum BiternessFormula {
	ALL = 'All',
	TINSETH = 'Tenseth',
	RAGER = 'Rager',
	GARETZ = 'Garetz',
	DANIELS = 'DANIELS',
}

export enum UploadImageType {
	RECIPE,
	PROFILE,
}

export const enum RecipeType {
	PUBLIC = 'Public',
	PRIVATE = 'Private',
}

export enum HopType {
	PELLET = 'P',
	FRESH = 'F',
	CRYO = 'C',
	DRY_WHOLE = 'D',
}

export enum Addition {
	BOIL = 'B',
	DRY_HOP = 'D',
	FLAME_OUT = 'F',
	MASH = 'M',
	WHIRLPOOL = 'W',
}

export enum YeastType {
	ALE = 'A',
	LAGER = 'L',
	WINE = 'W',
	CHAMPAGNE = 'C',
	UNDEFINED = 'U',
	BAKERS = 'B',
}

export enum AdditiveType {
	ANTI_FOAM = 'ANTI_FOAM',
	CLARITY = 'CLARITY',
	MINERAL = 'MINERAL',
	ENZYME = 'ENZYME',
	FLAVORING = 'Flavouring',
	OTHER = 'Other',
}

export enum HttpMethod {
	GET = 'GET',
	POST = 'POST',
	PATCH = 'PATCH',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export enum YeastState {
	DRY = 'D',
	LIQUID = 'L',
}

export enum Languages {
	EN = 'en',
	FR = 'fr',
}

export enum BoilRate {
	GENTLE_BOIL = 'Gentle Boil',
	MODERATE_BOIL = 'Moderate Boil',
	INTENSE_BOIL = 'Intense Boil',
}

export enum AuthErrors {
	INVALID_EMAIL = 'invalid-email',
	ALREADY_LOGGED_IN = 'already-signed-in',
	INVALID_EMAIL_PASSWORD = 'invalid-email-password',
}

export enum SettingType {
	PRESSURE = 'Pressure Unit',
	COLOR = 'Beer Color',
	LANGUAGE = 'Set Language',
}

export enum BeerColor {
	EBC = 'EBC',
	SRM = 'SRM',
	LOVI = 'LOVIBOND',
}

export enum Pressure {
	PSI = 'PSI',
	KPA = 'KPA',
	BAR = 'BAR',
}

export enum ToolType {
	ABV = 'Alcohol By Volume',
	GRAVITY = 'G',
	BOIL_OFF = 'B',
}

export const enum NavBarButton {
	LEFT = 'L',
	MIDDLE = 'M',
	RIGHT = 'R',
}

export enum FermentableCategory {
	GRAIN = 'Grain',
	LME = 'LME',
	DME = 'DME',
	ADJ = 'Adjunct',
	OTHER = 'Other',
}

export enum FermentableType {
	BARLEY = 'Barley',
	WHEAT = 'Wheat',
	RYE = 'Rye',
}

export enum Crush {
	POWDER = 'Powder',
	FINE = 'Fine',
	MEDIUM = 'Medium',
	COARSE = 'Coarse',
}

export const enum TitleType {
	FERMENTABLE,
	ADDITION,
	YEAST,
	HOPS,
	EMPTY,
}
