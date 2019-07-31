import Vars from './components/Api/Vars';

export function retrieve(options) {
	let buildUrl = Vars.URL + options.postType + '/?page=' + options.page + '&per_page=' + options.numberposts;
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
	let buildUrl = Vars.URL + options.postType + '/' + options.proverbId;
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

export function sendPrayerRequest(options) {
	let buildUrl = Vars.baseURL + '/wp-admin/admin-ajax.php';
	let formdata = new FormData();
	formdata.append('action', 'add_prayer_request');
	formdata.append('prayer', options.prayer);
	formdata.append('device_id', options.deviceId);
	return fetch(buildUrl, {
	method: 'POST',
	headers: {
		'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
		'Content-Type': 'x-www-form-urlencoded',
	},
	body: formdata,
});
}