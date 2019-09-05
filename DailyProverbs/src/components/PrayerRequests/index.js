import React from "react";
import {
	Animated,
	View,
	Vibration,
	Text,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	TouchableWithoutFeedback,
	TouchableOpacity,
	Keyboard, ImageBackground, FlatList, Button
} from "react-native";
import Colors from '../../colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {retrieve, sendPrayerRequest} from '../../api';
import DeviceInfo from 'react-native-device-info';
import trim from 'underscore.string/trim';
import stripTags from 'underscore.string/stripTags';
import unescapeHTML from 'underscore.string/unescapeHTML';
import firebase from 'react-native-firebase';

class PrayerInput extends React.Component {
	render() {
		return (
			<TextInput
				{...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
				editable={true}
				maxLength={120}
			/>
		);
	}
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default class PrayerRequestsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text:             '',
			isSending:        false,
			isLoading:        true,
			dataSource:       null,
			prayerTopFade:    new Animated.Value(0),
			prayerTopMove:    new Animated.Value(45),
			prayerTopOneText: '',
			prayerBotOneText: '',
			addReminderView:  false,
			reminderText:     '',
		};

		retrieve({ numberposts: 5, page: 1, postType: 'prayer-reqs' }).then((data) => {
				let prayerOne = '';
				let prayerTwo = '';
				data.text.map((item) => {
					if (prayerOne === '') {
						prayerOne = trim(stripTags(unescapeHTML(item.title.rendered)));
					} else if (prayerTwo === '') {
						prayerTwo = trim(stripTags(unescapeHTML(item.title.rendered)));
					}
				});

				this.setState({
					isLoading:        false,
					dataSource:       data.text,
					prayerTopOneText: prayerOne,
					prayerBotOneText: prayerTwo,
				});
				Animated.timing(
					this.state.prayerTopFade,
					{
						toValue:  1,
						duration: 5000,
					}
				).start();
				Animated.timing(
					this.state.prayerTopMove,
					{
						toValue:  150,
						duration: 7000,
					}
				).start();
			},
		);
	}

	async sendPrayer() {
		if (this.state.text === '') {
			return;
		}

		this.setState({ isSending: true });
		sendPrayerRequest({ prayer: this.state.text, deviceId: DeviceInfo.getDeviceId() }).then((data) => {
				this.setState({
					isSending: false,
					text:      '',
				});
			},
		);
	};

	addReminderModal(text) {
		Vibration.vibrate(1000);
		this.setState({ reminderText: text, addReminderView: true })
	};

	addReminder = async (time) => {
		const enabled = await firebase.messaging().hasPermission();
		if (enabled) {
			time = 24 * 60 * 60 * time;
			time += Date.now();
			const title = Platform.OS === "android" ? "The Edge Prayer Reminder" : "";
			const notification = new firebase.notifications.Notification()
			.setNotificationId("777") // Any random ID
			.setTitle(title) // Title of the notification
			.setBody(`Pray for... ${this.state.reminderText}`) // body of notification
			.android.setPriority(firebase.notifications.Android.Priority.High) // set priority in Android
			.android.setChannelId("reminder") // should be the same when creating channel for Android
			.android.setAutoCancel(true); // To remove notification when tapped on it

			// schedule notification
			firebase.notifications().scheduleNotification(notification, {
				fireDate: time,
				exact: false,
			});
		}

		this.setState({addReminderView: false});
	};

	render() {

		if (this.state.addReminderView) {
			return (
				<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
					<View style={{ padding: 22 }}>
						<Text style={{
							color:            Colors.darkGreen,
							paddingTop:       10,
							fontSize:         30,
							fontFamily:       'Bradley Hand',
							fontWeight:       'bold',
							textShadowColor:  'rgba(0, 0, 0, 1)',
							textShadowOffset: { width: -1, height: 2 },
							textShadowRadius: 5
						}}>Remind Me In...</Text>
					</View>
					<View style={{ width: '100%', marginBottom: 10, padding: 10, backgroundColor: Colors.darkGreen }}>
						<Button onPress={() => this.addReminder(1)}
						        color={Colors.white} title="1 Day"/>
						<Button onPress={() => this.addReminder(7)}
						        color={Colors.white} title="7 Days"/>
					</View>
					<View style={{ width: '100%', marginTop: 10, padding: 10, backgroundColor: Colors.white }}>
						<Button onPress={() => {this.setState({addReminderView: false})}}
						        color={Colors.darkGreen} title="Close"/>
					</View>
				</View>
			);
		} else {
			let { prayerTopFade, prayerTopMove } = this.state;

			return (
				<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
					<KeyboardAvoidingView behavior="padding" style={{
						flex:           1,
						alignItems:     "center",
						justifyContent: "center"
					}} enabled>
						<AnimatedTouchable
							style={{ padding: 20, position: 'absolute', zIndex: 9999, top: prayerTopMove }}
							onLongPress={() => this.addReminderModal(this.state.prayerTopOneText)}>
							<Animated.Text style={{
								color:    Colors.grey,
								fontSize: 25,
								opacity:  prayerTopFade
							}}>{this.state.prayerTopOneText}</Animated.Text>
						</AnimatedTouchable>
						<PrayerInput style={{
							color:             Colors.grey,
							borderBottomWidth: 1,
							borderBottomColor: Colors.grey,
							paddingBottom:     10,
							fontSize:          20
						}}
						             placeholder="New Request ..."
						             multiline={true}
						             numberOfLines={4}
						             onChangeText={(text) => {
							             this.setState({ text: text });
						             }}
						             value={this.state.text}
						/>
						<Text style={{ fontSize: 12 }}> </Text>
						<Icon.Button name="send" backgroundColor='transparent' color={Colors.grey} onPress={(event) => {
							this.sendPrayer();
						}}>
							<Text style={{ fontFamily: 'Arial', fontSize: 12, color: Colors.grey }}>
								send
							</Text>
						</Icon.Button>
						<Animated.View
							style={{ padding: 20, position: 'absolute', zIndex: 9999, bottom: prayerTopMove }}>
							<Animated.Text style={{
								color:    Colors.grey,
								fontSize: 25,
								opacity:  prayerTopFade
							}}>{this.state.prayerBotOneText}</Animated.Text>
						</Animated.View>
					</KeyboardAvoidingView>
				</TouchableWithoutFeedback>
			);
		}
	}
}