import {Addition, HopType, YeastState} from '@constants/enum';

export function additionToText(addition: Addition) {
	switch (addition) {
		case 'B':
			return 'BOIL';
		case 'D':
			return 'Dry Hop';
		case 'F':
			return 'Flame Out';
		case 'M':
			return 'Mash';
		case 'W':
			return 'Whirlpool';
	}
}

export function hopTypeToText(type: HopType) {
	switch (type) {
		case 'P':
			return 'Bellet';
		case 'F':
			return 'Fresh';
		case 'C':
			return 'Cryo';
		case 'D':
			return 'Dry Whole';
	}
}

export function stateToText(state: YeastState) {
	switch (state) {
		case 'D':
			return 'Dry Yeast';
		case 'L':
			return 'Liquid Yeast';
	}
}
