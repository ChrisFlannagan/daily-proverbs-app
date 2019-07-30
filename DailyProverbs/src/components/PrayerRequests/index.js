import React from "react";
import {View, Text, TextInput} from "react-native";
import Colors from '../../colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import {sendPrayerRequest} from '../../api';
import DeviceInfo from 'react-native-device-info';

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
			text: '',
			isSending: false
		};
	}

	async sendPrayer() {
		this.setState({isSending: true});
		sendPrayerRequest({ prayer: this.state.text, deviceId: DeviceInfo.getDeviceId() }).then((data) => {
				console.log(data);
				this.setState({
					isSending: false,
					text:      '',
				});
			},
		);
	};

	render() {
		return (
			<View style={{
				flex:           1,
				alignItems:     "center",
				justifyContent: "center"
			}}>
				<PrayerInput style={{
					color:             Colors.grey,
					borderBottomWidth: 1,
					borderBottomColor: Colors.grey,
					paddingBottom:     10,
					fontSize:          20
				}}
				             autoFocus={true}
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
			</View>
		);
	}
}