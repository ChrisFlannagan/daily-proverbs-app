import React from "react";
import { View, Text } from "react-native";

export default class SettingsScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Text>Prayer Requests - make the input text field borderless and feel like typing on screen with other prayers</Text>
			</View>
		);
	}
}