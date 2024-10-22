import {Icon, ListItem} from '@rneui/base';
import {ReactNode} from 'react';
import {TouchableOpacity} from 'react-native';

export type AccordionProps = {
	setExpanded: (value: boolean) => void;
	expanded: boolean;
	avatar: ReactNode;
	accordionTitle: string;
	children: ReactNode;
	subTitle?: string;
	vs?: number;
	addButton?: boolean;
	onPress?: () => void;
	containerStyle?: Object;
};

export const Accordion = (props: AccordionProps) => {
	const {
		setExpanded,
		expanded,
		avatar,
		accordionTitle,
		children,
		subTitle,
		vs = 0,
		addButton,
		onPress,
		containerStyle,
	} = props;
	return (
		<ListItem.Accordion
			isExpanded={expanded}
			content={
				<>
					{avatar}
					<ListItem.Content style={{paddingLeft: 20}}>
						<ListItem.Title>{accordionTitle}</ListItem.Title>
					</ListItem.Content>
					{subTitle ? (
						<ListItem.Content
							style={{paddingLeft: 20, alignItems: 'flex-end'}}
						>
							<ListItem.Title style={{fontSize: vs * 6}}>
								{subTitle}
							</ListItem.Title>
						</ListItem.Content>
					) : null}
				</>
			}
			containerStyle={containerStyle}
			onPress={() => {
				setExpanded(!expanded);
			}}
		>
			{children}
			{addButton ? (
				<TouchableOpacity onPress={onPress}>
					<ListItem.Content
						style={{alignSelf: 'center', padding: 10}}
					>
						<Icon name="add" color={'gray'} />
					</ListItem.Content>
				</TouchableOpacity>
			) : null}
		</ListItem.Accordion>
	);
};

export default Accordion;
