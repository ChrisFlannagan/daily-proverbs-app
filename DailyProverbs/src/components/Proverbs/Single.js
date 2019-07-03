import React from "react";
import {ActivityIndicator, ScrollView, Text, View, ImageBackground} from 'react-native';
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
		retrieve({ numberposts: 1, page: 1 }).then((text) => {
				this.setState({
					isLoading:  false,
					dataSource: text,
				});
			},
		);
	}

	render() {
		const { navigate } = this.props.navigation;

		if (this.state.isLoading) {
			return (
				<ImageBackground style={{
					width:  '100%',
					height: '100%',
					flex:   1
				}}
				                 resizeMode='cover'
				                 source={require('./dusk-color-sky-with-grassy-field.jpg')}>
					<View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
						<ActivityIndicator size="large" color={Colors.lightGreen}/>
					</View>
				</ImageBackground>
			)
		}

		let id = Number(this.state.dataSource[0].id);
		let title = trim(stripTags(unescapeHTML(this.state.dataSource[0].title.rendered)));
		let content = trim(stripTags(unescapeHTML(this.state.dataSource[0].content.rendered)));
		return (
			<View style={{ flex: 1 }}>
				<ImageBackground style={{
					width:  '100%',
					height: 'auto',
				}}
				                 resizeMode='cover'
				                 source={require('./dusk-color-sky-with-grassy-field.jpg')}>
					<View style={{ padding: 20 }}>
						<Icon.Button
							onPress={() => navigate('Favorites', { add: true, proverbId: id, proverbTitle: title })} name="star-o"
							backgroundColor={Colors.favDarkGold} color={Colors.favGold}>
							<Text style={{ fontFamily: 'Arial', fontSize: 15, color: Colors.white }}>
								Add To Favorites
							</Text>
						</Icon.Button>
						<Text style={{
							color: Colors.white,
							paddingTop: 10,
							fontSize:   50,
							fontFamily: 'Bradley Hand',
							fontWeight: 'bold',
							textShadowColor: 'rgba(0, 0, 0, 1)',
							textShadowOffset: {width: -1, height: 2},
							textShadowRadius: 5
						}}>{title}</Text>
					</View>
				</ImageBackground>
				<LinearGradient
					colors={Colors.topBottomGray}
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