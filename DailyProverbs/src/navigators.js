import React from "react";
import {createStackNavigator, createAppContainer} from "react-navigation";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";

// Screens
import HomeScreen from 'DailyProverbs/src/components/Home';
import ArchiveScreen from 'DailyProverbs/src/components/Archive';
import FavoritesScreen from 'DailyProverbs/src/components/Favorites';

export const ArchiveStack = createStackNavigator(
	{
		Archive:   ArchiveScreen,
	},
	{
		initialRouteName: 'Archive',
	}
);

export const Tabbed = createMaterialBottomTabNavigator({
	Home: { screen: HomeScreen },
	Archives: { screen: ArchiveStack },
	Favorites: { screen: FavoritesScreen },
}, {
	initialRouteName: 'Home',
	activeColor: '#f0edf6',
	inactiveColor: '#3e2465',
	barStyle: { backgroundColor: '#694fad' },
});

const AppContainer = createAppContainer(Tabbed);
export default class Index extends React.Component {
	render() {
		return <AppContainer/>;
	}
}