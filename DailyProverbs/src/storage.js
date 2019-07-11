import AsyncStorage from '@react-native-community/async-storage';

const STORAGE_KEY = '@DailyProverbsFavorites:key';

export const categories = [
	{ title: 'Spiritual', key: 'spiritual' },
	{ title: 'Uplifting', key: 'uplifting' },
	{ title: 'Motivational', key: 'motivational' },
	{ title: 'Peaceful', key: 'peaceful' },
	{ title: 'Other', key: 'other' },
];

export const getFavorites = async () => {
	try {
		let favorites = await AsyncStorage.getItem(STORAGE_KEY);
		if (favorites === null) { return []; }

		return JSON.parse(favorites);
	} catch (error) {
		console.error(error.message);
	}
};

export const getParsedFavorites = async() => {
	const capitalize = (s) => {
		if (typeof s !== 'string') return '';
		return s.charAt(0).toUpperCase() + s.slice(1)
	};

	let favorites = await getFavorites();
	let parsedFavorites = [];
	let sectionedData = [];
	categories.map((category) => {
		parsedFavorites[category.key] = [];
	});

	favorites.map((favorite) =>  {
		let catFavorites = parsedFavorites[favorite.category];
		if (Array.isArray(catFavorites)) {
			parsedFavorites[favorite.category] = [...catFavorites, favorite];
		}
	});

	categories.map((category) => {
		if (parsedFavorites[category.key].length > 0) {
			let data = [];
			favorites.map((favorite) => {
				if (favorite.category === category.key) {
					data.push(favorite);
				}
			});

			sectionedData.push({
				title: capitalize(category.key),
				data: data,
			});
		}
	});

	return sectionedData;
};

export async function addFavorite( proverbId, label, category ) {
	let saved = false;
	let favorites = await getFavorites();
	favorites.map((favorite) => {
		if (Number(proverbId) === Number(favorite.id)) {
			saved = true;
		}
	});
	if (!saved) {
		let newFavorite = {
			id:       proverbId,
			label:    label,
			category: category,
		};

		favorites = [...favorites, newFavorite];
		try {
			await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
		} catch (error) {
			console.error(error.message);
		}
	}
}