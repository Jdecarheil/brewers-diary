import {Divider, IndexPath} from '@ui-kitten/components';
import {SelectInput} from 'components/generic/select-input';
import {TextInput} from 'components/generic/text-input';
import {weightRegex} from 'lib/validators/form-inputs';
import {useState} from 'react';
import {Text, View} from 'react-native';
import {styles} from 'screens/recipe/recipe-editable/styles/new-item-modal';

export type AddDetailsProps = {
	handleNameChange: (value: string) => void;
	handleBrandChange: (value: string) => void;
	handleTypeChange: (value: IndexPath | IndexPath[]) => void;
	handleWeightChange: (value: string) => void;
	handleSubFormValid: (value: boolean) => void;
	formError: string;
	name: string;
	brand: string;
	typeItems: string[];
	typeIndex: IndexPath | IndexPath[];
	weight: string;
};

export const AddDetails = (props: AddDetailsProps) => {
	const {
		handleBrandChange,
		handleNameChange,
		handleSubFormValid,
		handleTypeChange,
		handleWeightChange,
		formError,
		name,
		brand,
		typeItems,
		typeIndex,
		weight,
	} = props;
	const [error, setError] = useState('');

	const validateNameChange = (name: string) => {
		if (name.length > 50) {
			setError('Name must be less than 50 characters');
		} else {
			setError('');
			handleSubFormValid(true);
			handleNameChange(name);
		}
	};

	const validateBrandChange = (brand: string) => {
		if (brand.length > 50) {
			setError('Brand must be less than 50 characters');
		} else {
			setError('');
			handleSubFormValid(true);
			handleBrandChange(name);
		}
	};

	const validateAmountChange = (value: string) => {
		if (!value.match(weightRegex)) {
			setError('Amount needs to be numerical');
		} else {
			setError('');
			handleSubFormValid(true);
			handleWeightChange(value);
		}
	};

	return (
		<View style={styles.detailsContainer}>
			<Text style={styles.formError}>{formError ?? error}</Text>
			<View style={styles.containerRow}>
				<View style={styles.inputContainer}>
					<Text>Name</Text>
					<TextInput
						value={name}
						style={styles.input}
						onChange={validateNameChange}
						placeholder={'Enter Name'}
					/>
				</View>
				<View style={styles.inputContainer}>
					<Text>Brand</Text>
					<TextInput
						value={brand}
						style={styles.input}
						onChange={validateBrandChange}
						placeholder={'Enter Brand'}
					/>
				</View>
			</View>
			<View style={styles.containerRow}>
				<View style={styles.outerContainer}>
					<View style={styles.inputContainer}>
						<Text>Amount</Text>
						<TextInput
							style={styles.input}
							value={weight}
							onChange={validateAmountChange}
							placeholder={'Amount'}
						/>
					</View>
				</View>
				<Divider />
				<View style={styles.outerContainer}>
					<View style={styles.inputContainer}>
						<Text>Type</Text>
						<SelectInput
							size={'large'}
							items={typeItems}
							currentIndex={typeIndex}
							selectedIndex={handleTypeChange}
						/>
					</View>
				</View>
			</View>
		</View>
	);
};
