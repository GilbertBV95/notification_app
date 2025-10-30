const { nativeImage } = require("electron/common");
const { join } = require('node:path');

//RETORNA UN NATIVEIMAGE O STRING CON EL PATH DEL ICONO
const selectIcon = (type, app, string = false) => {
	const icons = {
		warning: 'warning_x128.png',
		info: 'info_x128.png',
		error: 'error_x128.png',
		check: 'check_64.png',
		offline: 'offline_x16.png',
		online: 'online_x16.png',
		exit: 'exit_x16.png',
		server: 'server_x16.png',
		config: 'configuration_x16.png',
		icon: process.env.ICON || 'icon.ico',
		none: 'none'
	}

	const pathRem = getIconPath(icons[type], app);
	return (string ? pathRem : nativeImage.createFromPath(pathRem)) || 'none'
}

// RETORNA LA DIRECCION DEL ICONO SI LA APP ESTA PROD O DEV MODE
const getIconPath = (fileName, app) => {
	if (app?.isPackaged)
		return join(process.resourcesPath, 'assets/images', fileName);
	else
		return join(__dirname, '../assets/images', fileName);
}

module.exports = { selectIcon }