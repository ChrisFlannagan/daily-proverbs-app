import React from 'react';
import {ActivityIndicator, Text, View, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

// Constants
import Colors from 'DailyProverbs/src/colors.js';
import Vars from 'DailyProverbs/src/components/Api/Vars.js';

export default class Api extends React.Component {

	constructor(props) {
		super(props);
		this.state = { isLoading: true }
	}

	componentDidMount() {
		return fetch(Vars.URL)
		.then((response) => response.text())
		.then((text) => {

			this.setState({
				isLoading:  false,
				dataSource: JSON.parse(text),
			}, function () {

			});

		})
		.catch((error) => {
			console.error(error);
		});
	}

	render() {
		if (this.state.isLoading) {
			return (
				<View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
					<ActivityIndicator size="large" color={Colors.lightGreen}/>
				</View>
			)
		}

		const {navigate} = this.props.navigation;

		let striphtml = this.state.dataSource[0].content.rendered;
		striphtml = striphtml.replace( '<p>', "\n\n" );
		striphtml = striphtml.replace( /(<([^>]+)>)/ig, '' );
		return (
			<View style={{ flex: 1 }}>
				<View style={{ padding: 20 }}>
				<Icon.Button
					onPress={() => navigate('Favorites', {proverbId: this.state.dataSource[0].id})} name="star-o" backgroundColor={Colors.favDarkGold} color={Colors.favGold}>
					<Text style={{ fontFamily: 'Arial', fontSize: 15, color: Colors.white }}>
						Add To Favorites
					</Text>
				</Icon.Button>
				<Text style={{ paddingTop: 10, fontSize: 50, fontFamily: 'Bradley Hand', fontWeight: 'bold' }}>{this.state.dataSource[0].title.rendered}</Text>
				</View>
				<LinearGradient colors={['#acacac', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#acacac']} style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
					<ScrollView style={{ flex: 1 }}>
						<Text style={{ fontSize: 25, lineHeight: 35, color: Colors.grey }}>{striphtml}</Text>
					</ScrollView>
				</LinearGradient>
			</View>
		);
	}
}
