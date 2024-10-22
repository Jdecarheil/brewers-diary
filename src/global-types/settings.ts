import {
	BeerColor,
	BiternessFormula,
	Languages,
	Pressure,
} from '@constants/enum';

export type Notifications = {
	push_notifications_enabled: number;
	email_notifications_enabled: number;
	mobile_notifications_enabled: number;
};

export type Settings =
	| {
			metric: boolean;
			color: BeerColor;
			pressure: Pressure;
			ibu_formula: BiternessFormula;
			language: Languages;
	  }
	| undefined;
