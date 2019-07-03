import React from "react";
import { View, Text, FlatList, Button } from "react-native";

const categories = [
	{ title: 'Spiritual', key: 'spiritual' },
	{ title: 'Uplifting', key: 'uplifting' },
	{ title: 'Motivational', key: 'motivational' },
	{ title: 'Peaceful', key: 'peaceful' },
	{ title: 'Other', key: 'other' },
];

export function onPressLearnMore() {
	console.log("saving: ");
	console.log(this.props);
}

export class ListItem extends React.Component {
	render() {
		return (
			<Button
				onPress={onPressLearnMore.bind(this)}
				title={this.props.title}
				color="#841584"
			/>
		);
	}
}

export default class FavoritesScreen extends React.Component {
	constructor(props) {
		super(props);
		const { navigation } = this.props;
		this.state = {
			add: navigation.getParam( 'add', false ) ,
			proverbId: navigation.getParam( 'proverbId', 0 ),
			proverbTitle: navigation.getParam( 'proverbTitle', 0 ),
		}
	}

	render() {
		if ( this.state.add ) {
			return (
				<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
					<Text>Add {this.state.proverbTitle} To Favorites Category</Text>
					<FlatList
					data={categories}
					renderItem={({item}) => <ListItem title={item.title} proverbId={this.state.proverbId} proverbTitle={this.state.proverbTitle} />}
					/>
				</View>
			)
		}

		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Text>Favorites Screen</Text>
			</View>
		);
	}
}