const { nativeImage } = require("electron/common");
const { join } = require('node:path');

const selectIcon = (type) => {
	const path = '../assets/images'
	const icons = {
		warning: join(`${__dirname}`, path, 'warning_x128.png'),
		info: join(`${__dirname}`, path, 'info_x128.png'),
		error: join(`${__dirname}`, path, 'error_x128.png'),
		check: join(`${__dirname}`, path, 'check_64.png'),
		offline: join(`${__dirname}`, path, 'offline_x16.png'),
		online: join(`${__dirname}`, path, 'online_x16.png'),
		exit: join(`${__dirname}`, path, 'exit_x16.png'),
		server: join(`${__dirname}`, path, 'server_x16.png'),
		icon: join(`${__dirname}`, path, process.env.ICON),
		none: 'none'
	}

	return nativeImage.createFromPath(icons[type]) || 'none'
}

module.exports = { selectIcon }