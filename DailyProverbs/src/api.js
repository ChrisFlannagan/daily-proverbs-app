import Vars from './components/Api/Vars';

export function retrieve(options) {
	let numberposts = 1;
	let page = 1;

	if(options.numberposts.length) {
		numberposts = options.numberposts;
	}

	if(options.page.length) {
		page = options.page;
	}

	let buildUrl = Vars.URL + '?page=' + page + '&per_page=' + numberposts;

	return fetch(buildUrl)
	.then((response) => {
		return response.text().then((text) => {
			return JSON.parse(text);
		})
	})
	.catch((error) => {
		console.error(error);
	});

}