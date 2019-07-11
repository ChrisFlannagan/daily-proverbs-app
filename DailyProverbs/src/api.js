import Vars from './components/Api/Vars';

export function retrieve(options) {
	let buildUrl = Vars.URL + '?page=' + options.page + '&per_page=' + options.numberposts;
	return fetch(buildUrl)
	.then((response) => {
		return response.text().then((text) => {
			const data = JSON.parse(text);
			return {
				text: data,
				totalPages: response.headers.get('x-wp-totalpages'),
			};
		})
	})
	.catch((error) => {
		console.error(error);
	});
}

export function retrieveById(options) {
	let buildUrl = Vars.URL + '/' + options.proverbId;
	console.log(buildUrl);
	return fetch(buildUrl)
	.then((response) => {
		return response.text().then((text) => {
			const data = JSON.parse(text);
			return {
				text: data,
				totalPages: response.headers.get('x-wp-totalpages'),
			};
		})
	})
	.catch((error) => {
		console.error(error);
	});
}