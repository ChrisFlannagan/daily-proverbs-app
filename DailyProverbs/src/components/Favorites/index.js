import React from "react";
import {ActivityIndicator, View, Text, FlatList, SectionList, Button} from "react-native";
import {addFavorite, getParsedFavorites, getFavorites, categories} from '../../storage';
import Colors from '../../colors';

export default class FavoritesScreen extends React.Component {
	constructor(props) {
		super(props);
		const { navigation } = this.props;

		this.addToFavorites = this.addToFavorites.bind(this);
		this.setFavorites = this.setFavorites.bind(this);

		this.favorites = [];
		this.state = {
			add:          navigation.getParam('add', false),
			isLoading:    true,
			proverbId:    navigation.getParam('proverbId', 0),
			proverbTitle: navigation.getParam('proverbTitle', 0),
		}
	}

	componentDidMount() {
		this.setFavorites();
	}

	async addToFavorites(event, category) {
		addFavorite(this.state.proverbId, this.state.proverbTitle, category);
		this.setState({ add: false });
	}

	async setFavorites() {
		await getParsedFavorites()
		.then((favorites) => {
			this.favorites = favorites;
			this.setState({ isLoading: false });
		})
		.catch((error) => {
			console.error(error);
		});
	}

	render() {
		if (this.state.add) {
			return (
				<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
					<Text>Add {this.state.proverbTitle} To Favorites Category</Text>
					<FlatList
						data={categories}
						renderItem={({ item }) => <Button onPress={(event) => this.addToFavorites(event, item.key)}
						                                  title={item.title} key={item.key}/>}
					/>
				</View>
			)
		}

		if (this.state.isLoading) {
			return (
				<View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
					<ActivityIndicator size="large" color={Colors.lightGreen}/>
				</View>
			)
		}

		return (
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Text>Favorites Screen</Text>
				<SectionList
					renderItem={({item, index, section}) => <Text key={index}>{item.label}</Text>}
					renderSectionHeader={({section: {title}}) => (
						<Text style={{
							fontWeight: 'bold',
							backgroundColor: Colors.favDarkGold,
							color: Colors.white,
							width: '100%',
							padding: 20,
						}}>{title}</Text>
					)}
					sections={this.favorites}
					keyExtractor={(item, index) => item.id + index}
				/>
			</View>
		);
	}
}