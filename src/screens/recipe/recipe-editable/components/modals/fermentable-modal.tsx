import {BaseModal} from '@generic-components/modal-base';
import {
	AddChildrenProps,
	AddFermentableModalProps,
	AddModalProps,
	FermentableChildrenProps,
} from '../../types/types';
import {Text, View} from 'react-native';
import {TextInput} from '@generic-components/text-input';
import {useState} from 'react';
import {Crush, FermentableCategory, FermentableType} from '@constants/enum';
import {ebcRegex, percentageRegex} from '@lib/validators/form-inputs';
import {SelectInput} from '@generic-components/select-input';
import {IndexPath} from '@ui-kitten/components';
import {Divider} from '../divider';
import {ButtonComponent as Button} from '@generic-components/button';
import {styles} from '@recipe-editable-styles/new-item-modal';
import {ColorInput} from '@recipe-editable-components/inputs/color';
import {CrushInput} from '@recipe-editable-components/inputs/crush';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNhostClient} from '@nhost/react';
import {ingredients} from '@api/mutations/ingredients';
import {AddDetails} from '@recipe-editable-components/add-details';
import {Fermentable} from '@recipe-editable-types/types';

export const FermentableModal = ({
	isVisible,
	onCancel,
	recipe_id,
	fermentable,
}: AddModalProps & AddFermentableModalProps) => {
	return (
		<BaseModal
			testID="add-fermentable"
			onCancel={() => onCancel(false, false)}
			isVisible={isVisible}
			title="Add New Fermentable"
			children={
				<FermentableChildren
					recipe_id={recipe_id}
					fermentable={fermentable}
				/>
			}
		/>
	);
};

export const FermentableChildren = ({
	recipe_id,
	fermentable,
}: FermentableChildrenProps & AddChildrenProps) => {
	const queryClient = useQueryClient();
	const client = useNhostClient();
	const [isUpdate] = useState(fermentable ? true : false);

	const [formError, setFormError] = useState('');
	const [newFermentable, setNewFermentable] = useState<Fermentable>(
		fermentable ?? {
			recipe_id: recipe_id,
			name: 'No name',
			brand: 'No name',
			type: FermentableType.BARLEY,
			category: FermentableCategory.GRAIN,
			weight: 0,
			max_ppg: 1.036,
			grist_ratio: 0,
			extract_dry: 0,
			moisture: 0,
			crush: Crush.MEDIUM,
			ebc_min: 4,
			ebc_max: 6,
			comments: '',
		},
	);
	const [typeIndex, setTypeIndex] = useState<IndexPath | IndexPath[]>(
		new IndexPath(0),
	);
	const [categoryIndex, setCategoryIndex] = useState<IndexPath | IndexPath[]>(
		new IndexPath(0),
	);
	const [crushIndex, setCrushIndex] = useState<IndexPath | IndexPath[]>(
		new IndexPath(2),
	);
	const [subFormValid, setSubFormValid] = useState(true);
	const types = Object.values(FermentableType).map((type) => type);
	const categories = Object.values(FermentableCategory).map(
		(category) => category,
	);
	const crush = Object.values(Crush).map((crush) => crush);

	const handleNameChange = (name: string) => {
		setNewFermentable({...newFermentable, name});
	};

	const handleBrandChange = (brand: string) => {
		setNewFermentable({...newFermentable, brand});
	};

	const handleAmountChange = (value: string) => {
		setNewFermentable({...newFermentable, weight: parseInt(value)});
	};

	const handleTypeChange = (value: IndexPath | IndexPath[]) => {
		setTypeIndex(value);
		setNewFermentable({
			...newFermentable,
			type: types[parseInt(value.toString())],
		});
	};

	const handleCategoryChange = (value: IndexPath | IndexPath[]) => {
		setCategoryIndex(value);
		setNewFermentable({
			...newFermentable,
			category: categories[parseInt(value.toString())],
		});
	};

	const handleCrushChange = (value: IndexPath | IndexPath[]) => {
		setCrushIndex(value);
		setNewFermentable({
			...newFermentable,
			type: crush[parseInt(value.toString())],
		});
	};

	const handleMinColorChange = (ebc_min: string) => {
		if (ebc_min.match(ebcRegex)) {
			setFormError('');
			setNewFermentable({...newFermentable, ebc_min: parseInt(ebc_min)});
		} else {
			setFormError('Color only accepts up to 999 and numeric values');
		}
	};

	const handleSubFormValid = (valid: boolean) => {
		setSubFormValid(valid);
	};

	const handleMaxColorChange = (ebc_max: string) => {
		let max_ebc = parseInt(ebc_max);
		if (max_ebc < newFermentable.ebc_min) {
			setFormError('Max color should be higher than the minimum');
		} else if (ebc_max.match(ebcRegex)) {
			setFormError('');
			setNewFermentable({...newFermentable, ebc_max: parseInt(ebc_max)});
		} else {
			setFormError('Color only accepts up to 999 and numeric values');
		}
	};

	const handleExtractPotentialChange = (extract_dry: string) => {
		if (extract_dry.match(percentageRegex)) {
			setFormError('');
			setNewFermentable({
				...newFermentable,
				extract_dry: parseInt(extract_dry),
			});
		} else {
			setFormError('Extract must be a percentage');
		}
	};

	const handleMoistureChange = (moisture: string) => {
		if (moisture.match(percentageRegex)) {
			setFormError('');
			setNewFermentable({
				...newFermentable,
				moisture: parseInt(moisture),
			});
		} else {
			setFormError('Moisture must be a percentage');
		}
	};

	const handleCommentsChange = (comments: string) => {
		if (comments.length > 150) {
			setFormError('Comments are limited to 150 characters');
		} else {
			setFormError('');
			setNewFermentable({...newFermentable, comments});
		}
	};

	const addFermentableMutation = useMutation({
		mutationFn: () =>
			ingredients(client, newFermentable, 'fermentables', 'POST'),
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['recipesKey']});
		},
	});

	const updateFermentableMutation = useMutation({
		mutationFn: () =>
			ingredients(client, newFermentable, 'fermentables', 'PATCH'),
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['recipesKey']});
		},
	});

	const validateForm = () => {
		if (!formError && subFormValid) {
			isUpdate
				? updateFermentableMutation.mutateAsync()
				: addFermentableMutation.mutateAsync();
		}
	};

	return (
		<View style={styles.container}>
			<AddDetails
				handleSubFormValid={handleSubFormValid}
				typeItems={types}
				typeIndex={typeIndex}
				handleTypeChange={handleTypeChange}
				weight={newFermentable.weight.toString()}
				handleWeightChange={handleAmountChange}
				name={newFermentable.name}
				brand={newFermentable.brand}
				handleNameChange={handleNameChange}
				handleBrandChange={handleBrandChange}
				formError={formError}
			/>

			<View style={styles.inputContainer}>
				<Text>Category</Text>
				<SelectInput
					size="large"
					items={categories}
					currentIndex={categoryIndex}
					selectedIndex={handleCategoryChange}
				/>
			</View>
			<View style={styles.containerRow}>
				<ColorInput
					value={newFermentable.ebc_min.toString()}
					onChange={handleMinColorChange}
				/>
				<Divider />
				<ColorInput
					value={newFermentable.ebc_max.toString()}
					onChange={handleMaxColorChange}
				/>
			</View>
			<View style={styles.containerRow}>
				<CrushInput
					size="large"
					items={crush}
					index={crushIndex}
					title="Crush"
					handleCrushChange={handleCrushChange}
				/>
			</View>
			<View style={styles.containerRow}>
				<View style={styles.outerContainer}>
					<View style={styles.inputContainer}>
						<Text>Extract Min Potential (%)</Text>
						<TextInput
							style={styles.input}
							value={newFermentable.extract_dry.toString()}
							onChange={handleExtractPotentialChange}
							placeholder="Extract %"
						/>
					</View>
				</View>
				<Divider />
				<View style={styles.outerContainer}>
					<View style={styles.inputContainer}>
						<Text>Moisture Content (%)</Text>
						<TextInput
							style={styles.input}
							value={newFermentable.moisture.toString()}
							onChange={handleMoistureChange}
							placeholder="Moisture %"
						/>
					</View>
				</View>
			</View>

			<View style={styles.inputContainer}>
				<Text>Comments</Text>
				<TextInput
					style={styles.input}
					multiline={true}
					value={newFermentable.comments}
					onChange={handleCommentsChange}
					placeholder="Notes"
				/>
			</View>

			<Button
				title="Add"
				onPress={() => validateForm()}
				buttonStyle={styles.buttonStyle}
				containerStyle={styles.buttonContainerStyle}
			/>
		</View>
	);
};
