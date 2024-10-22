import {
	AddAdditiveModalProps,
	AddChildrenProps,
	AddModalProps,
	AdditiveChildrenProps,
} from '@screens/recipe/recipe-editable/types/types';
import {Text, View} from 'react-native';
import {TextInput} from '@generic-components/text-input';
import {useState} from 'react';
import {Addition, AdditiveType} from '@constants/enum';
import {IndexPath} from '@ui-kitten/components';
import {ButtonComponent as Button} from '@generic-components/button';
import {styles} from '@screens/recipe/recipe-editable/styles/new-item-modal';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import {useNhostClient} from '@nhost/react';
import {AddDetails} from '@screens/recipe/recipe-editable/components/add-details';
import {BaseModal} from '@generic-components/modal-base';
import {Additive} from '@global-types/additive';
import {ingredients} from '@api/mutations/ingredients';

export const AdditiveModal = ({
	isVisible,
	onCancel,
	recipe_id,
	additive,
}: AddModalProps & AddAdditiveModalProps) => {
	return (
		<BaseModal
			onCancel={() => onCancel(false, false)}
			isVisible={isVisible}
			title="Add New Addition"
			children={
				<AdditiveChildren recipe_id={recipe_id} additive={additive} />
			}
		/>
	);
};

export const AdditiveChildren = ({
	recipe_id,
	additive,
}: AddChildrenProps & AdditiveChildrenProps) => {
	const queryClient = useQueryClient();
	const client = useNhostClient();
	const [isUpdate, setIsUpdate] = useState(additive ? true : false);

	const [formError, setFormError] = useState('');
	const [newAdditive, setNewAdditive] = useState<Additive>(
		additive ?? {
			recipe_id: recipe_id,
			duration: 0,
			addition: Addition.BOIL,
			name: 'No name',
			brand: 'No name',
			type: AdditiveType.FLAVORING,
			weight: 0,
			comments: '',
		},
	);
	const [typeIndex, setTypeIndex] = useState<IndexPath | IndexPath[]>(
		new IndexPath(0),
	);
	const [subFormValid, setSubFormValid] = useState(true);
	const types = Object.values(AdditiveType).map((type) => type);

	const handleNameChange = (name: string) => {
		setNewAdditive({...newAdditive, name});
	};

	const handleBrandChange = (brand: string) => {
		setNewAdditive({...newAdditive, brand});
	};

	const handleAmountChange = (value: string) => {
		setNewAdditive({...newAdditive, weight: parseInt(value)});
	};

	const handleTypeChange = (value: IndexPath | IndexPath[]) => {
		setTypeIndex(value);
		setNewAdditive({
			...newAdditive,
			type: types[parseInt(value.toString())],
		});
	};

	const handleSubFormValid = (valid: boolean) => {
		setSubFormValid(valid);
	};

	const handleCommentsChange = (comments: string) => {
		if (comments.length > 150) {
			setFormError('Comments are limited to 150 characters');
		} else {
			setFormError('');
			setNewAdditive({...newAdditive, comments});
		}
	};

	const addAdditivesMutation = useMutation({
		mutationFn: () => ingredients(client, newAdditive, 'additives', 'POST'),
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['recipesKey']});
		},
	});

	const updateAdditivesMutation = useMutation({
		mutationFn: () =>
			ingredients(client, newAdditive, 'additives', 'PATCH'),
		onSuccess: () => {
			queryClient.invalidateQueries({queryKey: ['recipesKey']});
		},
	});

	const validateForm = () => {
		if (!formError && subFormValid) {
			isUpdate
				? updateAdditivesMutation.mutateAsync()
				: addAdditivesMutation.mutateAsync();
		}
	};

	return (
		<View style={styles.container}>
			<AddDetails
				handleSubFormValid={handleSubFormValid}
				typeItems={types}
				typeIndex={typeIndex}
				handleTypeChange={handleTypeChange}
				weight={newAdditive.weight.toString()}
				handleWeightChange={handleAmountChange}
				name={newAdditive.name}
				brand={newAdditive.brand}
				handleNameChange={handleNameChange}
				handleBrandChange={handleBrandChange}
				formError={formError}
			/>

			<View style={styles.inputContainer}>
				<Text>Comments</Text>
				<TextInput
					style={styles.input}
					multiline={true}
					value={newAdditive.comments.toString()}
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
