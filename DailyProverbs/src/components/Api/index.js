import React from 'react';
import {ActivityIndicator, Text, View, ScrollView} from 'react-native';

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

		let striphtml = this.state.dataSource[0].content.rendered;
		striphtml = striphtml.replace( '<p>', "\n\n" );
		striphtml = striphtml.replace( /(<([^>]+)>)/ig, '' );
		console.log(striphtml);
		return (
			<ScrollView style={{ flex: 1, padding: 20 }}>
				<Text style={{ paddingBottom: 20, fontSize: 30, fontWeight: 'bold' }}>{this.state.dataSource[0].title.rendered}</Text>
				<Text style={{ fontSize: 20, fontWeight: 'bold', color: Colors.grey }}>{striphtml}</Text>
			</ScrollView>
		);
	}
}
