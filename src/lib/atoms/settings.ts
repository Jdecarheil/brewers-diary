import {
	BeerColor,
	BiternessFormula,
	Languages,
	Pressure,
} from '@constants/enum';
import {fetchSettings} from '@lib/storage/settings';
import {atomFamily} from 'recoil';

export const defaultSettings = {
	metric: true,
	pressure: Pressure.PSI,
	color: BeerColor.EBC,
	ibu_formula: BiternessFormula.TINSETH,
	language: Languages.EN,
};

export const settingsAtomFamily = atomFamily({
	key: 'settingsAtomFamily',
	default: defaultSettings,
	effects: [fetchSettings()],
});
