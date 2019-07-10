import React from "react";
import { View, Text } from "react-native";

export default class ArchiveScreen extends React.Component {
	constructor(props) {
		super(props);
		const { navigation } = this.props;
	}

	render() {
		const { navigate } = this.props.navigation;

		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Text>Archive Screen</Text>
			</View>
		);
	}
}