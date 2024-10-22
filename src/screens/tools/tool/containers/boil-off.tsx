import {Text, View} from 'react-native';
import {useState} from 'react';
import {baseStyles} from '@styles/base';
import {ScaledSheet, s} from 'react-native-size-matters';
import {baseColors} from '@styles/constants';
import {gravityRegex} from '@lib/validators/form-inputs';
import {ButtonComponent as Button} from '@generic-components/button';
import {boilOffCalc} from '@lib/calculators/boil-off';

export const BoilOffTool = () => {
	const [boilDuration, setBoilDuration] = useState('');
	const [kettleSize, setKettleSize] = useState('');
	const [formError, setFormError] = useState('');
	const [result, setResult] = useState('0');

	const handleBoilDurationChange = (value: string) => {
		setFormError('');
		setBoilDuration(value);
	};

	const handleKettleSizeChange = (value: string) => {
		setFormError('');
		setKettleSize(value);
	};

	const handleSubmit = () => {
		if (
			gravityRegex.test(boilDuration.toString()) &&
			gravityRegex.test(kettleSize.toString())
		) {
			setFormError('');
			setResult(
				boilOffCalc(
					parseFloat(boilDuration),
					parseFloat(kettleSize),
				).toString(),
			);
		} else {
			setFormError('Correct units must be used');
		}
	};

	return (
		<View style={styles.body}>
			<Text style={baseStyles.label}>Original Gravity</Text>
			{/* <TextInput value={og} onChange={handleChangeOg}/>
      <Text style={[baseStyles.label, {marginTop: s(15)}]}>Final Gravity</Text>
      <TextInput value={fg} onChange={handleChangeFg}/> */}
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
