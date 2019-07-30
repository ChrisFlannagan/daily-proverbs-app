import React from "react";
import {View, Text, TextInput} from "react-native";
import Colors from '../../colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeviceInfo from 'react-native-device-info';
import replaceAll from 'underscore.string/replaceAll';

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
		};
	}

	sendPrayer = function () {

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