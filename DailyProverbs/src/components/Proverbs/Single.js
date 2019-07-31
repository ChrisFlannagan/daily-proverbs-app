import React from "react";
import {ActivityIndicator, ScrollView, Text, View, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../colors';
import {getFavorites} from '../../storage';

// functions & libraries
import {retrieve, retrieveById} from '../../api';
import stripTags from 'underscore.string/stripTags';
import trim from 'underscore.string/trim';
import unescapeHTML from 'underscore.string/unescapeHTML';
import LinearGradient from "react-native-linear-gradient";

export default class Single extends React.Component {

	constructor(props) {
		super(props);
		const { navigation } = this.props;
		this.state = {
			proverbId:  navigation.getParam('proverbId', 0),
			isLoading:  true,
			page:       (navigation.getParam('page', 1) - 1),
			totalPages: 1,
			favorites: [],
			viewFavsDisplay: 'flex',
			addFavDisplay: 'flex',
		};
	}

	componentDidMount() {
		this.prevProverb();
	}

	async prevProverb() {
		this.setState({ isLoading: true });

		let nextPage = this.state.page + 1;
		let favorites = await getFavorites();
		let favoritesIds = [];
		favorites.map((favorite) => {
			favoritesIds.push(favorite.id);
		});
		this.setState({favorites: favoritesIds});

		if (this.state.proverbId === 0) {
			retrieve({ numberposts: 1, page: nextPage, postType: 'daily-proverbs' }).then((data) => {
					let displayNextBtn = 'flex';
					if (nextPage === parseInt(data.totalPages)) {
						displayNextBtn = 'none';
					}

					this.setState({
						isLoading:      false,
						dataSource:     data.text,
						totalPages:     data.totalPages,
						displayNextBtn: displayNextBtn,
						page:           nextPage,
					});
				},
			);
		} else {
			retrieveById({ proverbId: this.state.proverbId, postType: 'daily-proverbs' }).then((data) => {
				this.setState({
					isLoading:      false,
					dataSource:     data.text,
					totalPages:     data.totalPages,
					displayNextBtn: 'none',
				});
			});
		}
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
						<ActivityIndicator size="large" color={Colors.white}/>
					</View>
				</ImageBackground>
			)
		}

		let postData;
		let viewFavsDisplay = 'flex';
		if (typeof this.state.dataSource[0] === 'undefined') {
			viewFavsDisplay = 'none';
			postData = this.state.dataSource;
		} else {
			postData = this.state.dataSource[0];
		}

		let id = Number(postData.id);
		let title = trim(stripTags(unescapeHTML(postData.title.rendered)));
		let proverb = trim(stripTags(unescapeHTML(postData.excerpt.rendered)))
		let content = trim(stripTags(unescapeHTML(postData.content.rendered)));

		let addFavsDisplay = 'flex';
		this.state.favorites.map((favorite) => {
			if (id === Number(favorite)) {
				addFavsDisplay = 'none';
			}
		});

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
							style={{ display: addFavsDisplay }}
							onPress={() => navigate('Favorites', {
								add:          true,
								proverbId:    id,
								proverbTitle: title
							})}
							name="star-o"
							backgroundColor={Colors.favDarkGold} color={Colors.favGold}>
							<Text style={{ fontFamily: 'Arial', fontSize: 15, color: Colors.white }}>
								Add To Favorites
							</Text>
						</Icon.Button>
						<Text style={{ height: 10 }}/>
						<Icon.Button
							style={{ display: viewFavsDisplay }}
							onPress={() => navigate('Favorites')}
							name="star"
							backgroundColor={Colors.favDarkGold} color={Colors.favGold}>
							<Text style={{ fontFamily: 'Arial', fontSize: 15, color: Colors.white }}>
								View Favorites
							</Text>
						</Icon.Button>
						<Text style={{
							color:            Colors.white,
							paddingTop:       10,
							fontSize:         50,
							fontFamily:       'Bradley Hand',
							fontWeight:       'bold',
							textShadowColor:  'rgba(0, 0, 0, 1)',
							textShadowOffset: { width: -1, height: 2 },
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
						}}>{proverb}</Text>
						<Text style={{
							paddingTop: 10,
							fontSize:   15,
							lineHeight: 25,
							color:      Colors.grey
						}}>{content}</Text>
						<View style={{ padding: 20, display: this.state.displayNextBtn }}>
							<Icon.Button
								onPress={() => this.prevProverb()} name="chevron-right"
								backgroundColor={Colors.favDarkGold} color={Colors.favGold}>
								<Text style={{ fontFamily: 'Arial', fontSize: 15, color: Colors.white }}>
									Previous Proverb
								</Text>
							</Icon.Button>
						</View>
					</ScrollView>
				</LinearGradient>
			</View>
		);
	}
}