import React from "react";
import { View, Text } from "react-native";
import { Header } from 'react-native-elements';
import Api from 'DailyProverbs/src/components/Api';

// Constants
import Colors from 'DailyProverbs/src/colors.js';

export default class HomeScreen extends React.Component {
	render() {
		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Header
					containerStyle={{
						backgroundColor: Colors.darkGreen,
						justifyContent: 'space-around',
					}}
					centerComponent={{ text: "Today's Proverb", style: { color: Colors.white, fontSize: 20, fontWeight: 'bold' } }} />
				<Api style={{ flex: 1 }} limit={1} />
			</View>
		);
	}
}