import {Tab} from '@rneui/base';

type TabComponentProps = {
	setIndex: (value: number) => void;
	index: number;
	tabItemCount: number;
	tabItemTitleStyle: Object;
	tabItems: string[];
};

const TabComponent = (props: TabComponentProps) => {
	const {setIndex, index, tabItems, tabItemTitleStyle} = props;
	return (
		<Tab
			value={index}
			onChange={(e) => setIndex(e)}
			style={{width: '80%', alignSelf: 'center'}}
			indicatorStyle={{
				backgroundColor: 'white',
				height: 3,
			}}
		>
			{tabItems.map((tabItem, i) => {
				return (
					<Tab.Item
						key={i}
						title={tabItem}
						titleStyle={tabItemTitleStyle}
					></Tab.Item>
				);
			})}
		</Tab>
	);
};

export default TabComponent;
