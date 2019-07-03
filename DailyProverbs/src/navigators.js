import React from "react";
import {Text, View, FlatList} from 'react-native';
import {createStackNavigator, createAppContainer} from "react-navigation";
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';

// Screens
import Single from 'DailyProverbs/src/components/Proverbs/Single';
import FavoritesScreen from 'DailyProverbs/src/components/Favorites';
import ArchiveScreen from 'DailyProverbs/src/components/Archive';
import SettingsScreen from 'DailyProverbs/src/components/Settings';

// Constants
import Colors from 'DailyProverbs/src/colors.js';

class IconTitle extends React.Component {
	render() {
		return (
			<Text style={{
				paddingLeft: 8,
				width: 100,
				flex: 1,
				flexDirection: 'row',
				alignItems: 'center',
				textAlign: 'center',
				justifyContent: 'flex-start'
			}}>
				<Icon2 name="feather" size={26} style={{ color: Colors.white }}/>
				<Text style={{ color: Colors.white, fontSize: 18 }}>Daily Proverbs</Text>
			</Text>
		);
	}
}

const baseNavigationOptions = {
	headerTitle:      <IconTitle/>,
	headerStyle:      { backgroundColor: Colors.darkGreen },
	headerBackTitleStyle: {
		color: 'white',
	},
	headerTintColor: 'white',
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
		Single:    Single,
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
		screen:            HomeStack,
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