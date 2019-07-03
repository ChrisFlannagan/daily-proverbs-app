import React from "react";
import {View} from 'react-native';
import {createStackNavigator, createAppContainer} from "react-navigation";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Header } from 'react-native-elements';

// Screens
import Single from 'DailyProverbs/src/components/Proverbs/Single';
import FavoritesScreen from 'DailyProverbs/src/components/Favorites';
import ArchiveScreen from 'DailyProverbs/src/components/Archive';
import SettingsScreen from 'DailyProverbs/src/components/Settings';

// Constants
import Colors from 'DailyProverbs/src/colors.js';

const baseNavigationOptions = {
	headerTitle: 'Daily Proverbs',
	headerTitleStyle: { color: Colors.white },
	headerStyle: { backgroundColor: Colors.darkGreen },
};

export const ArchiveStack = createStackNavigator(
	{
		Archive: ArchiveScreen,
	},
	{
		initialRouteName: 'Archive',
		defaultNavigationOptions: {
			...baseNavigationOptions,
		}
	}
);

export const HomeStack = createStackNavigator(
	{
		Single: Single,
		Favorites: FavoritesScreen,
	},
	{
		initialRouteName: 'Single',
		defaultNavigationOptions: {
			...baseNavigationOptions,
		}
	}
);

export const Tabbed = createMaterialBottomTabNavigator({
	Home:      {
		screen: HomeStack,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => (
				<Icon name="book" size={26} color={tintColor}/>
			),
			...baseNavigationOptions,
		},
	},
	Archives:  {
		screen:            ArchiveStack,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => (
				<Icon name="archive" size={26} color={tintColor}/>
			),
			...baseNavigationOptions,
		},
	},
	Favorites: {
		screen:            SettingsScreen,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => (
				<Icon name="cog" size={26} color={tintColor}/>
			),
			...baseNavigationOptions,
		},
	},
}, {
	barStyle:                 { backgroundColor: Colors.darkGreen },
	activeTintColor:          Colors.white,
	inactiveTintColor:        Colors.lightGreen,
	defaultNavigationOptions: {
		labeled: false,
	},
});

const AppContainer = createAppContainer(Tabbed);
export default class Index extends React.Component {
	render() {
		return (
			<AppContainer/>
		)
	}
}