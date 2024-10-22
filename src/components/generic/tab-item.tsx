import {Tab} from '@rneui/base';

type TabItemComponentProps = {
	title: string;
	titleStyle: string;
	icon: string;
};

const TabItem: React.FunctionComponent<TabItemComponentProps> = (props) => {
	return (
		<Tab.Item
			title="Recipes"
			titleStyle={{fontSize: 12}}
			icon={{name: 'timer', type: 'ionicon', color: 'white'}}
		/>
	);
};

export default TabItem;
