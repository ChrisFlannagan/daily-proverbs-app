import firebase from 'react-native-firebase';

const permissionCheck = async () => {
	firebase.messaging().requestPermission()
	.then(() => {
		// User has authorised
	})
	.catch(error => {
		console.log(error);
	});
};



export {
	permissionCheck,
};