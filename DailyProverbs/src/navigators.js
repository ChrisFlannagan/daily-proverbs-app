import React from "react";
import {createStackNavigator, createAppContainer} from "react-navigation";
import {Text} from 'react-native';
import {createMaterialBottomTabNavigator} from "react-navigation-material-bottom-tabs";
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-community/async-storage';

// Screens
import Single from 'DailyProverbs/src/components/Proverbs/Single';
import FavoritesScreen from 'DailyProverbs/src/components/Favorites';
import ArchiveScreen from 'DailyProverbs/src/components/Archive';
import PrayerRequestsScreen from 'DailyProverbs/src/components/PrayerRequests';
import firebase from 'react-native-firebase';

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
				<Icon2 name="compass" size={20} style={{ color: Colors.white }}/>
				<Text style={{ fontSize: 18 }}> </Text>
				<Text style={{ color: Colors.white, fontSize: 18 }}>The Daily Edge</Text>
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
		Single:    Single,
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
			page: 1,
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
	PrayerRequests: {
		screen:            PrayerRequestsScreen,
		navigationOptions: {
			tabBarIcon: ({ tintColor }) => (
				<Icon name="fire" size={26} color={tintColor}/>
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
	async componentDidMount() {
		this.checkPermission();
		this.createNotificationListeners(); //add this line
	}

	//Remove listeners allocated in createNotificationListeners()
	componentWillUnmount() {
		this.notificationListener();
		this.notificationOpenedListener();
	}

	//1
	async checkPermission() {
		const enabled = await firebase.messaging().hasPermission();
		if (enabled) {
			this.getToken();
		} else {
			this.requestPermission();
		}
	}

	//3
	async getToken() {
		let fcmToken = await AsyncStorage.getItem('fcmToken');
		if (!fcmToken) {
			fcmToken = await firebase.messaging().getToken();
			if (fcmToken) {
				// user has a device token
				await AsyncStorage.setItem('fcmToken', fcmToken);
			}
		}
		console.log("FCM TOKEN: ");
		console.log(fcmToken);
	}

	//2
	async requestPermission() {
		try {
			await firebase.messaging().requestPermission();
			// User has authorised
			this.getToken();
		} catch (error) {
			// User has rejected permissions
			console.log('permission rejected');
		}
	}

	async createNotificationListeners() {
		/*
		* Triggered when a particular notification has been received in foreground
		* */
		this.notificationListener = firebase.notifications().onNotification((notification) => {
			const { title, body } = notification;
			this.showAlert(title, body);
		});

		/*
		* If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
		* */
		this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
			const { title, body } = notificationOpen.notification;
			this.showAlert(title, body);
		});

		/*
		* If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
		* */
		const notificationOpen = await firebase.notifications().getInitialNotification();
		if (notificationOpen) {
			const { title, body } = notificationOpen.notification;
			this.showAlert(title, body);
		}
		/*
		* Triggered for data only payload in foreground
		* */
		this.messageListener = firebase.messaging().onMessage((message) => {
			//process data message
			console.log(JSON.stringify(message));
		});
	}

	showAlert(title, body) {
		Alert.alert(
			title, body,
			[
				{ text: 'OK', onPress: () => console.log('OK Pressed') },
			],
			{ cancelable: false },
		);
	}

	render() {
		return (
			<AppContainer/>
		)
	}
}