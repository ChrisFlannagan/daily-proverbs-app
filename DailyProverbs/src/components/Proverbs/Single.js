import React from "react";
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../colors';

// functions & libraries
import {retrieve} from '../../api';
import stripTags from 'underscore.string/stripTags';
import trim from 'underscore.string/trim';
import unescapeHTML from 'underscore.string/unescapeHTML';
import LinearGradient from "react-native-linear-gradient";

export default class Single extends React.Component {

	constructor(props) {
		super(props);
		this.state = { isLoading: true }
		retrieve().then((text) => {
				console.log("The text: " + text);
				this.setState({
					isLoading: false,
					dataSource: text,
				});
			},
		);
	}

	render() {
		const { navigate } = this.props.navigation;

		if (this.state.isLoading) {
			return (
				<View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
					<ActivityIndicator size="large" color={Colors.lightGreen}/>
				</View>
			)
		}

		let title = trim(stripTags(unescapeHTML(this.state.dataSource[0].title.rendered)));
		let content = trim(stripTags(unescapeHTML(this.state.dataSource[0].content.rendered)));
		return (
			<View style={{ flex: 1 }}>
				<View style={{ padding: 20 }}>
					<Icon.Button
						onPress={() => navigate('Favorites', { proverbId: 12 })} name="star-o"
						backgroundColor={Colors.favDarkGold} color={Colors.favGold}>
						<Text style={{ fontFamily: 'Arial', fontSize: 15, color: Colors.white }}>
							Add To Favorites
						</Text>
					</Icon.Button>
					<Text style={{
						paddingTop: 10,
						fontSize:   50,
						fontFamily: 'Bradley Hand',
						fontWeight: 'bold'
					}}>{title}</Text>
				</View>
				<LinearGradient
					colors={ Colors.topBottomGray }
					style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
					<ScrollView style={{ flex: 1 }}>
						<Text style={{
							paddingTop: 10,
							fontSize:   25,
							lineHeight: 35,
							color:      Colors.grey
						}}>{content}</Text>
					</ScrollView>
				</LinearGradient>
			</View>
		);
	}
}