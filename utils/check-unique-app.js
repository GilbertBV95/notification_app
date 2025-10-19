const { dialog } = require("electron/main");
const { showMessage } = require("./dialog");
const { closeApp } = require("./close-app");
const { initConnection } = require("../src/socket");

function checkIfAsSingleApp(app) {
	if (!app.requestSingleInstanceLock()) {
		showMessage({
			type: 'warning',
			title: 'Notification App',
			message: 'La aplicación de alertas ya se está ejecutando',
		}).then((res) => {
			if (res.response === 0) closeApp(app);
		}).catch(err => {
			dialog.showErrorBox('Error', err.message)
		})
	} else initConnection();
}


module.exports = { checkIfAsSingleApp }