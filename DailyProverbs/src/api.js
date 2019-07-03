import Vars from './components/Api/Vars';

export function retrieve(options) {

	return fetch(Vars.URL)
	.then((response) => {
		return response.text().then((text) => {
			return JSON.parse(text);
		})
	})
	.catch((error) => {
		console.error(error);
	});

}