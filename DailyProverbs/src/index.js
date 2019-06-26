/**
 * Daily Proverbs
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import {createStackNavigator, createAppContainer} from "react-navigation";

// Screens
import HomeScreen from 'DailyProverbs/src/components/Home';
import DetailsScreen from 'DailyProverbs/src/components/Details';

const AppNavigator = createStackNavigator(
	{
		Home:    HomeScreen,
		Details: DetailsScreen
	},
	{
		initialRouteName: "Home"
	}
);

const AppContainer = createAppContainer(AppNavigator);

export default class Index extends React.Component {
	render() {
		return <AppContainer/>;
	}
}
