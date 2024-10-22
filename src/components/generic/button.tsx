import {Button, IconNode} from '@rneui/base';

type ButtonComponentProps = {
	title: string;
	buttonStyle?: Object;
	containerStyle?: Object;
	onPress?: () => void;
	titleStyle?: Object;
	icon?: IconNode;
};

export const ButtonComponent = (props: ButtonComponentProps) => {
	const {containerStyle, buttonStyle, onPress} = props;

	return (
		<Button
			containerStyle={
				containerStyle ?? {
					width: 200,
					marginHorizontal: 50,
					marginVertical: 10,
				}
			}
			buttonStyle={buttonStyle ?? {backgroundColor: 'black'}}
			onPress={onPress}
			{...props}
		/>
	);
};
