import {BaseModal} from 'components/generic/modal-base';
import {
	AddChildrenProps,
	AddHopModalProps,
	AddModalProps,
	HopChildrenProps,
} from '../../types/types';
import {Text, View} from 'react-native';
import {TextInput} from 'components/generic/text-input';
import {useState} from 'react';
import {Addition, HopType} from 'constants/enum';
import {durationRegex, percentageRegex} from 'lib/validators/form-inputs';
import {SelectInput} from 'components/generic/select-input';
import {IndexPath} from '@ui-kitten/components';
import {Divider} from '../divider';
import Button from 'components/generic/button';
import {styles} from '../../styles/new-item-modal';
import {DurationInput} from '../inputs/duration';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {ingredients} from 'api/mutations/ingredients';
import {useNhostClient} from '@nhost/react';
import {AddDetails} from '../add-details';
import {Hop} from 'types/hop';

export const HopModal = ({
	isVisible,
	onCancel,
	recipe_id,
	hop,
}: AddModalProps & AddHopModalProps) => {
	return (
		<BaseModal
			onCancel={() => onCancel(false, false)}
			isVisible={isVisible}
			title="Add New Hop"
			children={<HopChildren recipe_id={recipe_id} hop={hop} />}
		/>
	);
};

export const HopChildren = ({
	recipe_id,
	hop,
}: AddChildrenProps & HopChildrenProps) => {
	const queryClient = useQueryClient();
	const client = useNhostClient();
	const [isUpdate, setIsUpdate] = useState(hop ? true : false);
	const [formError, setFormError] = useState('');
	const [newHop, setNewHop] = useState<Hop>(
		hop ?? {
			recipe_id: recipe_id,
			name: 'No name',
			alpha_acid: 0,
			duration: 0,
			addition: Addition.BOIL,
			brand: 'No name',
			type: HopType.PELLET,
			weight: 0,
			comments: '',
		},
	);
	const [additionIndex, setAddition] = useState<IndexPath | IndexPath[]>(
		new IndexPath(0),
	);
	const [coHumulone, setCohumulone] = useState(0);
	const [type, setType] = useState<IndexPath | IndexPath[]>(new IndexPath(0));
	const additions = Object.values(Addition).map((addition) => addition);
	const types = Object.values(HopType).map((type) => type);
	const [subFormValid, setSubFormValid] = useState(true);

	const handleNameChange = (name: string) => {
		setNewHop({...newHop, name});
	};

	const handleBrandChange = (brand: string) => {
		setNewHop({...newHop, brand});
	};

	const handleAmountChange = (amount: string) => {
		setNewHop({...newHop, weight: parseInt(amount)});
	};

	const handleSubFormValid = (valid: boolean) => {
		setSubFormValid(valid);
	};

	const handleDurationChange = (duration: string) => {
		let value = parseInt(duration);

		if (duration.match(durationRegex)) {
			setFormError('');
			setNewHop({...newHop, duration: value});
		} else {
			setFormError(
				'Duration must be numerical and less than 999 seconds',
			);
		}
	};

	const handleAlphaAcidChange = (value: string) => {
		if (value.match(percentageRegex)) {
			setFormError('');
			setNewHop({...newHop, alpha_acid: parseInt(value)});
		} else {
			setFormError('Aplpha acid must be in percentage value');
		}
	};

	const handleCohumuloneChange = (value: string) => {
		setCohumulone(parseInt(value));
	};

	const handleCommentsChange = (value: string) => {
		if (value.length > 150) {
			setFormError('Comments cannot exceed 150 characters');
		} else {
			setNewHop({...newHop, comments: value});
		}
	};

	const handleAdditionChange = (value: IndexPath | IndexPath[]) => {
		setAddition(value);
		setNewHop({...newHop, addition: additions[parseInt(value.toString())]});
	};

	const handleTypeChange = (value: IndexPath | IndexPath[]) => {
		setType(value);
		setNewHop({...newHop, type: types[parseInt(value.toString())]});
	};

	const addHopMutation = useMutation({
		mutationFn: () => ingredients(client, newHop, 'hops', 'POST'),
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['recipesKey']});
		},
	});

	const updateMutation = useMutation({
		mutationFn: () => ingredients(client, newHop, 'hops', 'PATCH'),
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['recipesKey']});
		},
	});

	const validateForm = () => {
		if (!formError && subFormValid) {
			isUpdate
				? updateMutation.mutateAsync()
				: addHopMutation.mutateAsync();
		}
	};

	return (
		<View style={styles.container}>
			<AddDetails
				handleSubFormValid={handleSubFormValid}
				typeItems={types}
				typeIndex={type}
				handleTypeChange={handleTypeChange}
				weight={newHop.weight.toString()}
				handleWeightChange={handleAmountChange}
				name={newHop.name}
				brand={newHop.brand}
				handleNameChange={handleNameChange}
				handleBrandChange={handleBrandChange}
				formError={formError}
			/>
			<View style={styles.inputContainer}>
				<Text>Addition</Text>
				<SelectInput
					size="large"
					items={additions}
					currentIndex={additionIndex}
					selectedIndex={handleAdditionChange}
				/>
			</View>
			<View style={styles.containerRow}>
				<View style={styles.outerContainer}>
					<View style={styles.inputContainer}>
						<Text>Alpha Acid Content (%)</Text>
						<TextInput
							style={styles.input}
							value={newHop.alpha_acid.toString()}
							onChange={handleAlphaAcidChange}
							placeholder={'0.0%'}
						/>
					</View>
				</View>
			</View>
			<View style={styles.containerRow}>
				<DurationInput
					value={newHop.duration.toString()}
					onChange={handleDurationChange}
				/>
				<Divider />
				<View style={styles.outerContainer}>
					<View style={styles.inputContainer}>
						<Text>Co-Humulone Content</Text>
						<TextInput
							style={styles.input}
							value={coHumulone.toString()}
							onChange={handleCohumuloneChange}
							placeholder={'0.0%'}
						/>
					</View>
				</View>
			</View>
			<View style={styles.inputContainer}>
				<Text>Composition</Text>
				<SelectInput
					size="large"
					items={types}
					currentIndex={type}
					selectedIndex={handleTypeChange}
				/>
			</View>

			<View style={styles.inputContainer}>
				<Text>Comments</Text>
				<TextInput
					style={styles.input}
					multiline={true}
					value={newHop.comments}
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
