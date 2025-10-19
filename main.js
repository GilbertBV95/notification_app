require('dotenv').config();
const { app, Tray, Menu } = require('electron/main');
const { checkIfAsSingleApp } = require('./utils/check-unique-app');
const { closeApp } = require('./utils/close-app');

function createTray() {
	const tray = new Tray(process.env.ICON_PATH)
	const contextMenu = Menu.buildFromTemplate([
		{
			label: 'Estado: Esperando datos...',
			enabled: false,
			id: 'status'
		},
		{ type: 'separator' },
		{ label: 'Cerrar', click: () => closeApp(app) },
	])
	tray.setToolTip('Notification App')
	tray.setContextMenu(contextMenu)
}

app.setAppUserModelId('Notification Application');
app.whenReady()
	.then(() => checkIfAsSingleApp(app))
	.then(() => createTray())