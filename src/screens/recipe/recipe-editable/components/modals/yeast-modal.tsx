import {BaseModal} from 'components/generic/modal-base';
import {
	AddChildrenProps,
	AddModalProps,
	AddYeastModalProps,
	YeastChildrenProps,
} from '../../types/types';
import {Text, View} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNhostClient} from '@nhost/react';
import {useState} from 'react';
import {Yeast} from 'types/yeast';
import {IndexPath} from '@ui-kitten/components';
import {YeastState, YeastType} from 'constants/enum';
import {AddDetails} from '../add-details';
import {styles} from '../../styles/new-item-modal';
import {SelectInput} from 'components/generic/select-input';
import {TextInput} from 'components/generic/text-input';
import {percentageRegex} from 'lib/validators/form-inputs';
import Button from 'components/generic/button';
import {ingredients} from 'api/mutations/ingredients';

export const YeastModal = ({
	isVisible,
	onCancel,
	recipe_id,
	yeast,
}: AddModalProps & AddYeastModalProps) => {
	return (
		<BaseModal
			onCancel={() => onCancel(false, false)}
			isVisible={isVisible}
			title="Add New Yeast"
			children={<YeastChildren recipe_id={recipe_id} yeast={yeast} />}
		/>
	);
};

export const YeastChildren = ({
	recipe_id,
	yeast,
}: AddChildrenProps & YeastChildrenProps) => {
	const queryClient = useQueryClient();
	const client = useNhostClient();
	const [isUpdate, setIsUpdate] = useState(yeast ? true : false);
	const [formError, setFormError] = useState('');
	const [newYeast, setNewYeast] = useState<Yeast>(
		yeast ?? {
			recipe_id: recipe_id,
			weight: 0,
			state: YeastState.DRY,
			name: 'No name',
			brand: 'No name',
			type: YeastType.ALE,
			comments: '',
			attenuation: 0.0,
		},
	);
	const [stateIndex, setStateIndex] = useState<IndexPath | IndexPath[]>(
		new IndexPath(0),
	);
	const [coHumulone, setCohumulone] = useState(0);
	const [typeIndex, setTypeIndex] = useState<IndexPath | IndexPath[]>(
		new IndexPath(0),
	);
	const states = Object.values(YeastState).map((state) => state);
	const types = Object.values(YeastType).map((type) => type);
	const [subFormValid, setSubFormValid] = useState(false);

	const handleNameChange = (name: string) => {
		setNewYeast({...newYeast, name});
	};

	const handleBrandChange = (brand: string) => {
		setNewYeast({...newYeast, brand});
	};

	const handleAmountChange = (value: string) => {
		setNewYeast({...newYeast, weight: parseInt(value)});
	};

	const handleSubFormValid = (valid: boolean) => {
		setSubFormValid(valid);
	};

	const handleCommentsChange = (value: string) => {
		if (value.length > 150) {
			setFormError('Comments cannot exceed 150 characters');
		} else {
			setNewYeast({...newYeast, comments: value});
		}
	};

	const handleTypeChange = (value: IndexPath | IndexPath[]) => {
		setTypeIndex(value);
		setNewYeast({...newYeast, type: types[parseInt(value.toString())]});
	};

	const handleAttenuationChange = (value: string) => {
		if (value.match(percentageRegex)) {
			setFormError('');
			setNewYeast({...newYeast, attenuation: parseInt(value)});
		} else {
			setFormError('Attenuation must be a percentage');
		}
	};

	const handleStateChange = (value: IndexPath | IndexPath[]) => {
		setStateIndex(value);
		setNewYeast({...newYeast, state: states[parseInt(value.toString())]});
	};

	const addYeastMutation = useMutation({
		mutationFn: () => ingredients(client, newYeast, 'yeast', 'POST'),
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['recipesKey']});
		},
	});

	const updateMutation = useMutation({
		mutationFn: () => ingredients(client, newYeast, 'hops', 'PATCH'),
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['recipesKey']});
		},
	});

	const validateForm = () => {
		if (!formError && subFormValid) {
			addYeastMutation.mutateAsync();
		}
	};

	return (
		<View style={styles.container}>
			<AddDetails
				handleSubFormValid={handleSubFormValid}
				typeItems={types}
				typeIndex={typeIndex}
				handleTypeChange={handleTypeChange}
				weight={newYeast.weight.toString()}
				handleWeightChange={handleAmountChange}
				name={newYeast.name}
				brand={newYeast.brand}
				handleNameChange={handleNameChange}
				handleBrandChange={handleBrandChange}
				formError={formError}
			/>
			<View style={styles.inputContainer}>
				<Text>Yeast State</Text>
				<SelectInput
					size="large"
					items={states}
					currentIndex={stateIndex}
					selectedIndex={handleStateChange}
				/>
			</View>
			<View style={styles.containerRow}>
				<View style={styles.outerContainer}>
					<View style={styles.inputContainer}>
						<Text>Attenuation (%)</Text>
						<TextInput
							style={styles.input}
							value={newYeast.attenuation.toString()}
							onChange={handleAttenuationChange}
							placeholder={'0.0%'}
						/>
					</View>
				</View>
			</View>

			<View style={styles.inputContainer}>
				<Text>Comments</Text>
				<TextInput
					style={styles.input}
					multiline={true}
					value={newYeast.comments}
					onChange={handleCommentsChange}
					placeholder="EBC"
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
