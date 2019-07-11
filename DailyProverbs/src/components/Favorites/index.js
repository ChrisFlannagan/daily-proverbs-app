import React from "react";
import {ActivityIndicator, View, Text, FlatList, SectionList, Button, ImageBackground} from "react-native";
import {addFavorite, getParsedFavorites, getFavorites, categories} from '../../storage';
import Colors from '../../colors';
import Icon from 'react-native-vector-icons/FontAwesome';

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
		const { navigate } = this.props.navigation;

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
				<ImageBackground style={{
					width:  '100%',
					height: '100%',
					flex:   1
				}}
				                 resizeMode='cover'
				                 source={require('./ocean-sunset.jpg')}>
					<View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
						<ActivityIndicator size="large" color={Colors.white}/>
					</View>
				</ImageBackground>
			)
		}

		return (
			<View style={{ flex: 1 }}>
				<ImageBackground style={{
					width:  '100%',
					height: 'auto',
				}}
				                 resizeMode='cover'
				                 source={require('./ocean-sunset.jpg')}>
					<View style={{ padding: 20 }}>
						<Text style={{
							color:            Colors.white,
							paddingTop:       10,
							fontSize:         50,
							fontFamily:       'Bradley Hand',
							fontWeight:       'bold',
							textShadowColor:  'rgba(0, 0, 0, 1)',
							textShadowOffset: { width: -1, height: 2 },
							textShadowRadius: 5
						}}>Favorites</Text>
					</View>
				</ImageBackground>
				<SectionList style={{ width: '100%' }}
				             renderItem={({ item, index, section }) => (
					             <Text key={index}
					                   onPress={() => navigate('Single', {
						                   proverbId: item.id,
					                   })}
					                   onLongPress={() => {

					                   }}
					                   style={{
						                   fontSize: 18,
						                   padding:  10
					                   }}>{item.label}</Text>
				             )}
				             renderSectionHeader={({ section: { title } }) => (
					             <Text style={{
						             fontWeight:      'bold',
						             backgroundColor: Colors.favDarkGold,
						             color:           Colors.white,
						             width:           '100%',
						             padding:         10,
						             fontSize:        20,
					             }}>{title}</Text>
				             )}
				             sections={this.favorites}
				             keyExtractor={(item, index) => item.id + index}
				/>
			</View>
		);
	}
}