import {Avatar} from '@rneui/base';
import Accordion from '@generic-components/accordion';
import {useState} from 'react';
import {Text, useWindowDimensions} from 'react-native';

const PublicRecipesScreen = () => {
	const [myRecipesExpanded, setMyRecipesExpanded] = useState(false);
	const [allRecipesExpanded, setAllRecipesExpanded] = useState(false);
	const vs = useWindowDimensions().width;

	return (
		<>
			<Accordion
				expanded={myRecipesExpanded}
				setExpanded={setMyRecipesExpanded}
				accordionTitle="Totals"
				avatar={
					<Avatar
						source={require('assets/icons/hop.png')}
						size={vs / 15}
					/>
				}
				children={<Text></Text>}
			/>{' '}
			<Accordion
				expanded={allRecipesExpanded}
				setExpanded={setAllRecipesExpanded}
				accordionTitle="Totals"
				avatar={
					<Avatar
						source={require('assets/icons/hop.png')}
						size={vs / 15}
					/>
				}
				children={<Text></Text>}
			/>
		</>
	);
};

export default PublicRecipesScreen;
