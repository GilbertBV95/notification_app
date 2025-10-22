require('dotenv').config();
const { app, dialog, ipcMain } = require('electron/main');
const { checkIfAsSingleApp } = require('./utils/check-unique-app');
const { createTray } = require('./src/tray');
const { execCommand } = require('./utils/exec');
const { initSocketConnection } = require('./src/socket');
const { showMessage } = require('./utils/dialog');
const { closeWindows } = require('./utils/close-app');

let tray;

const handleSetConfig = async (_, data) => {
	const { server, port } = data;
	const command = `SETX SERVER_ADDRESS ${server} && SETX SERVER_PORT ${port}`;
	const result = await execCommand(command);
	const { success } = result;

	if (success) {
		initSocketConnection();
		closeWindows();
		showMessage({ message: 'Configuración realizada correctamente' });
	} else dialog.showErrorBox('Error', 'Error al realizar la configuración')

	return success;
}

app.setAppUserModelId(process.env.USER_MODEL_ID || 'Notification Application');
app.whenReady()
	.then(() => checkIfAsSingleApp(app))
	.then(() => ipcMain.handle('set-config', handleSetConfig))
	.then(() => tray = createTray(app))
	.catch(err => dialog.showErrorBox('Error', err.message))

app.on('window-all-closed', () => {
	return true;
})