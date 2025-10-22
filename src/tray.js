const { Tray, Menu, BrowserWindow } = require('electron/main')
const { selectIcon } = require('../utils/select-icon');
const { execCommand } = require('../utils/exec');
const { join } = require('node:path');

//CREA EL ICONO DE LA APLICACION
const createTray = async () => {
	tray = new Tray(selectIcon('icon'));

	tray.setToolTip(process.env.USER_MODEL_ID || 'Notification App');
	await updateMenu('disconnect');

	tray.addListener('click', () => {
		tray.popUpContextMenu();
	})
}

//ACTUALIZAR EL MENU EL TRAY
const updateMenu = async (state, icon = 'offline') => {
	const contextMenu = Menu.buildFromTemplate([
		{
			label: `Estado: ${getLabelForState(state)}`,
			enabled: false,
			id: 'status',
			icon: selectIcon(icon)
		},
		{ type: 'separator' },
		{
			label: 'Cambiar servidor',
			toolTip: `Server`,
			enabled: (await execCommand()).success,
			id: 'server',
			icon: selectIcon('server'),
			click: () => { openChangeServerWindow() }
		},
		{ type: 'separator' },
		{
			label: 'Cerrar',
			role: 'quit',
			icon: selectIcon('exit')
		},
	])
	tray.setContextMenu(contextMenu);
}

//ABRIR VENTANA DE CONFIGURACION DEL SERVER
const openChangeServerWindow = (server) => {
	if (!BrowserWindow.getAllWindows().length) {
		const win = new BrowserWindow({
			title: 'Configuración del Servidor',
			width: 800, height: 600, modal: true, closable: true,
			autoHideMenuBar: true,
			webPreferences: {
				devTools: true,
				nodeIntegration: true,
				contextIsolation: true,
				preload: join(__dirname, '../assets/scripts/preload.js')
			},
			show: false,
			icon: selectIcon('icon')
		});
		win.loadFile('views/change_server.html');

		win.once('ready-to-show', () => {
			win.show();
		})
	}
}

const getLabelForState = (state) => {
	return {
		disconnect: 'Esperando conexión...',
		connect: 'Conectado.'
	}[state]
}

module.exports = { createTray, updateMenu }