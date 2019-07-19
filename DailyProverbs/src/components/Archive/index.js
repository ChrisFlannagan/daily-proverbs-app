import React from "react";
import {ActivityIndicator, ScrollView, FlatList, Text, View, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../colors';

// functions & libraries
import {retrieve} from '../../api';
import stripTags from 'underscore.string/stripTags';
import trim from 'underscore.string/trim';
import unescapeHTML from 'underscore.string/unescapeHTML';
import LinearGradient from "react-native-linear-gradient";

export default class ArchiveScreen extends React.Component {

	constructor(props) {
		super(props);
		const { navigation } = this.props;
		this.state = {
			isLoading: true,
			page:      0,
			perPage:   20,
			totalPages: 1,
		};
	}

	componentDidMount() {
		this.loadPage();
	}

	async loadPage() {
		this.setState({ isLoading: true });

		let nextPage = this.state.page + 1;
		retrieve({ numberposts: this.state.perPage, page: nextPage }).then((data) => {
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
	}

	_keyExtractor = (item, index) => item.id;
	_renderItem = ({item}) => (
		<View style={{ flex: 1 }}>
			<Text onPress={() => this.props.navigation.navigate('Single', {
				      proverbId: item.id,
			      })}
			      style={{
				      fontSize: 18,
				      padding:  10
			      }}>
				{item.title} - {item.date}
			</Text>
		</View>
	);

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
				                 source={require('./mountains.jpg')}>
					<View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
						<ActivityIndicator size="large" color={Colors.white}/>
					</View>
				</ImageBackground>
			)
		}

		let postData = this.state.dataSource;
		let itemsData = [];
		postData.map((item) => {
			itemsData.push({
				id: Number(item.id),
				title: trim(stripTags(unescapeHTML(item.title.rendered))),
				date: trim(stripTags(unescapeHTML(item.date)))
			})
		});

		return (
			<View style={{ flex: 1 }}>
				<ImageBackground style={{
					width:  '100%',
					height: 'auto',
				}}
				                 resizeMode='cover'
				                 source={require('./mountains.jpg')}>
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
						}}>Archive</Text>
					</View>
				</ImageBackground>
				<LinearGradient
					colors={Colors.topBottomGray}
					style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
					<ScrollView style={{ flex: 1 }}>
						<FlatList
							data={itemsData}
							keyExtractor={this._keyExtractor}
							renderItem={this._renderItem}
							/>
						<View style={{ padding: 20, display: this.state.displayNextBtn }}>
							<Icon.Button
								onPress={() => this.loadPage()} name="chevron-right"
								backgroundColor={Colors.favDarkGold} color={Colors.favGold}>
								<Text style={{ fontFamily: 'Arial', fontSize: 15, color: Colors.white }}>
									Next Page
								</Text>
							</Icon.Button>
						</View>
					</ScrollView>
				</LinearGradient>
			</View>
		);
	}
}