import {Text, View} from 'react-native';
import {useState} from 'react';
import {baseStyles} from '@styles/base';
import {ScaledSheet, s} from 'react-native-size-matters';
import {baseColors} from '@styles/constants';
import {TextInput} from '@generic-components/text-input';
import {gravityRegex} from '@lib/validators/form-inputs';
import {ButtonComponent as Button} from '@generic-components/button';
import {calcAbv} from '@lib/calculators/abv';

export const AbvTool = () => {
	const [og, setOg] = useState('');
	const [fg, setFg] = useState('');
	const [formError, setFormError] = useState('');
	const [result, setResult] = useState('0');

	const handleChangeOg = (value: string) => {
		setFormError('');
		setOg(value);
	};

	const handleChangeFg = (value: string) => {
		setFormError('');
		setFg(value);
	};

	const handleSubmit = () => {
		if (
			gravityRegex.test(og.toString()) &&
			gravityRegex.test(fg.toString())
		) {
			setFormError('');
			setResult(calcAbv(parseFloat(og), parseFloat(fg)).toString());
		} else {
			setFormError('Correct gravity format must be used');
		}
	};

	return (
		<View style={styles.body}>
			<Text style={baseStyles.label}>Original Gravity</Text>
			<TextInput value={og} onChange={handleChangeOg} />
			<Text style={[baseStyles.label, {marginTop: s(15)}]}>
				Final Gravity
			</Text>
			<TextInput value={fg} onChange={handleChangeFg} />
			<View style={styles.contentContainer}>
				<Text style={baseStyles.formTextError}>{formError}</Text>
			</View>
			<View style={styles.contentContainer}>
				<Text style={baseStyles.label}>{result}% abv</Text>
			</View>
			<View style={styles.buttonContainer}>
				<Button
					title="Result"
					onPress={handleSubmit}
					titleStyle={{color: 'white', marginHorizontal: 20}}
					buttonStyle={{
						backgroundColor: baseColors.primary,
						borderRadius: 10,
					}}
				/>
			</View>
		</View>
	);
};

export const styles = ScaledSheet.create({
	body: {
		width: '90%',
		alignSelf: 'center',
		marginTop: s(30),
	},
	contentContainer: {
		alignItems: 'center',
		marginTop: s(30),
	},
	buttonContainer: {
		alignItems: 'center',
		marginTop: s(30),
	},
});
