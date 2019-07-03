import React from "react";
import { View, Text, FlatList, Button } from "react-native";

const categories = [
	{ title: 'Spiritual', key: 'spiritual' },
	{ title: 'Uplifting', key: 'uplifting' },
	{ title: 'Motivational', key: 'motivational' },
	{ title: 'Peaceful', key: 'peaceful' },
	{ title: 'Other', key: 'other' },
];

export default class FavoritesScreen extends React.Component {
	constructor(props) {
		super(props);
		const { navigation } = this.props;
		this.addToFavorites = this.addToFavorites.bind(this);
		this.state = {
			add: navigation.getParam( 'add', false ) ,
			proverbId: navigation.getParam( 'proverbId', 0 ),
			proverbTitle: navigation.getParam( 'proverbTitle', 0 ),
		}
	}

	addToFavorites() {
		console.log("saving: ");
		console.log(this.state.proverbTitle);
	}

	render() {
		if ( this.state.add ) {
			return (
				<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
					<Text>Add {this.state.proverbTitle} To Favorites Category</Text>
					<FlatList
					data={categories}
					renderItem={({item}) => <Button onPress={this.addToFavorites} title={item.title}/>}
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