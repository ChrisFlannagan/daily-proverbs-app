import firebase from 'react-native-firebase';

const permissionCheck = async () => {
	const enabled = await firebase.messaging().hasPermission();
	if(enabled) {
		this.notificationListener = firebase
			.notifications()
			.onNotification(async notification => {
				await firebase.notifications().displayNotification(notification);
			});
	} else {
		firebase.messaging().requestPermission()
		.then(() => {
			// User has authorised
		})
		.catch(error => {
			console.log(error);
		});
	}
};

export {
	permissionCheck,
};