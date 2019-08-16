import React from "react";
import {Animated, View, Text, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard} from "react-native";
import Colors from '../../colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {retrieve, sendPrayerRequest} from '../../api';
import DeviceInfo from 'react-native-device-info';
import trim from 'underscore.string/trim';
import stripTags from 'underscore.string/stripTags';
import unescapeHTML from 'underscore.string/unescapeHTML';

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

	render() {
		let { prayerTopFade, prayerTopMove } = this.state;

		return (
			<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
				<KeyboardAvoidingView behavior="padding" style={{
					flex:           1,
					alignItems:     "center",
					justifyContent: "center"
				}} enabled>
					<Animated.View style={{ position: 'absolute', zIndex: 9999, top: prayerTopMove }}>
						<Animated.Text style={{
							color:    Colors.grey,
							fontSize: 25,
							opacity:  prayerTopFade
						}}>{this.state.prayerTopOneText}</Animated.Text>
					</Animated.View>
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
					<Animated.View style={{ position: 'absolute', zIndex: 9999, bottom: prayerTopMove }}>
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