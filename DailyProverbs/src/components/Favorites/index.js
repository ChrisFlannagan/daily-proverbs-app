import React from "react";
import {ActivityIndicator, View, Text, FlatList, SectionList, Button, ImageBackground} from "react-native";
import {addFavorite, deleteFavorite, getParsedFavorites, categories} from '../../storage';
import Colors from '../../colors';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class FavoritesScreen extends React.Component {
	constructor(props) {
		super(props);
		const { navigation } = this.props;

		this.addToFavorites = this.addToFavorites.bind(this);
		this.setFavorites = this.setFavorites.bind(this);

		this.favorites = [];
		this.state = {
			add:             navigation.getParam('add', false),
			isLoading:       true,
			isModalVisible:  false,
			proverbId:       navigation.getParam('proverbId', 0),
			proverbTitle:    navigation.getParam('proverbTitle', 0),
			selectedInModal: {
				proverbTitle: '',
				proverbId: '',
			},
		}
	}

	componentDidMount() {
		this.setFavorites();
	}

	showModal() {
		this.setState({ isModalVisible: true });
	}

	async addToFavorites(event, category) {
		this.setState({isLoading: true});
		this.setState({ add: false });
		await addFavorite(this.state.proverbId, this.state.proverbTitle, category);
		await this.setFavorites();
	}

	async deleteFromFavorites(event) {
		this.setState({isLoading: true});
		await deleteFavorite(this.state.selectedInModal.proverbId);
		await this.setFavorites();
		this.setState({isLoading: false});
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
				<ImageBackground style={{
					width:  '100%',
					height: '100%',
					flex:   1
				}} resizeMode='cover' source={require('./ocean-sunset.jpg')}>
				<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
					<View style={{ padding: 22 }}>
						<Text style={{
							color:            Colors.white,
							paddingTop:       10,
							fontSize:         20,
							fontFamily:       'Bradley Hand',
							fontWeight:       'bold',
							textShadowColor:  'rgba(0, 0, 0, 1)',
							textShadowOffset: { width: -1, height: 2 },
							textShadowRadius: 5
						}}>Add {this.state.proverbTitle} To A Category</Text>
					</View>
					<FlatList style={{ width: '100%' }}
						data={categories}
						renderItem={({ item }) => (
							<View style={{ width: '100%', marginBottom: 10, padding: 10, backgroundColor: Colors.darkGreen }}>
								<Button onPress={(event) => this.addToFavorites(event, item.key)}
						                                  color={Colors.white} title={item.title} key={item.key}/>
							</View>
						)}
					/>
				</View>
				</ImageBackground>
			)
		}

		if (this.state.isLoading) {
			return (
				<ImageBackground style={{
					width:  '100%',
					height: '100%',
					flex:   1
				}} resizeMode='cover' source={require('./ocean-sunset.jpg')}>
					<View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
						<ActivityIndicator size="large" color={Colors.white}/>
					</View>
				</ImageBackground>
			)
		}

		return (
			<View style={{ flex: 1 }}>
				<Modal isVisible={this.state.isModalVisible}>
					<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
						<View style={{ width: '80%' }}>
							<Icon.Button name="warning" backgroundColor={Colors.red}
							             onPress={(event) => {
							             	 this.deleteFromFavorites(event);
								             this.setState({ isModalVisible: false });
							             }}>
								<Text style={{ fontFamily: 'Arial', fontSize: 15, color: Colors.white }}>
									Remove {this.state.selectedInModal.proverbTitle}
								</Text>
							</Icon.Button>
							<Text style={{ height: 10 }}/>
							<Icon.Button name="window-close" backgroundColor={Colors.darkGreen}
							             onPress={() => {
								             this.setState({ isModalVisible: false });
							             }}>
								<Text style={{ fontFamily: 'Arial', fontSize: 15, color: Colors.white }}>
									Close
								</Text>
							</Icon.Button>
						</View>
					</View>
				</Modal>
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
					             <View style={{ flex: 1 }}>
						             <Text key={index}
						                   onPress={() => navigate('Single', {
							                   proverbId: item.id,
						                   })}
						                   onLongPress={() => {
							                   this.setState({
								                   selectedInModal: {
									                   proverbId:    item.id,
									                   proverbTitle: item.label,
								                   }
							                   });
							                   this.showModal();
						                   }}
						                   style={{
							                   fontSize: 18,
							                   padding:  10
						                   }}>
							             {item.label}
						             </Text>
					             </View>
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