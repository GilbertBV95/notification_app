const { dialog } = require("electron/main");
const { showMessage } = require("./dialog");
const { closeApp } = require("./close-app");
const { initSocketConnection } = require("../src/socket");

function checkIfAsSingleApp(app) {
	if (!app.requestSingleInstanceLock()) {
		showMessage({
			type: 'warning',
			title: process.env.USER_MODEL_ID || 'Notification App',
			message: 'La aplicación de alertas ya se está ejecutando',
		}).then((res) => {
			if (res.response === 0) closeApp(app);
		}).catch(err => {
			dialog.showErrorBox('Error', err.message)
		})
	} else initSocketConnection();
}


module.exports = { checkIfAsSingleApp }