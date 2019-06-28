import React from "react";
import {createStackNavigator, createAppContainer} from "react-navigation";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';

// Screens
import HomeScreen from 'DailyProverbs/src/components/Home';
import ArchiveScreen from 'DailyProverbs/src/components/Archive';
import SettingsScreen from 'DailyProverbs/src/components/Settings';

// Constants
import Colors from 'DailyProverbs/src/colors.js';

export const ArchiveStack = createStackNavigator(
	{
		Archive:   ArchiveScreen,
	},
	{
		initialRouteName: 'Archive',
	}
);

export const Tabbed = createMaterialBottomTabNavigator({
	Home: {
		screen: HomeScreen,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => (
				<Icon name="book" size={26} color={tintColor} />
			),
		},
	},
	Archives: {
		screen: ArchiveStack,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => (
				<Icon name="archive" size={26} color={tintColor} />
			),
		},
	},
	Favorites: {
		screen: SettingsScreen,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => (
				<Icon name="cog" size={26} color={tintColor} />
			),
		},
	},
}, {
	barStyle: { backgroundColor: Colors.darkGreen },
	activeTintColor: Colors.white,
	inactiveTintColor: Colors.lightGreen,
	defaultNavigationOptions: {
		labeled: false,
	},
});

const AppContainer = createAppContainer(Tabbed);
export default class Index extends React.Component {
	render() {
		return <AppContainer/>;
	}
}