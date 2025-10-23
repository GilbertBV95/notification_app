const { io } = require('socket.io-client');
const { getIp } = require('../utils/ip-information');
const { showNotification } = require('../utils/dialog');
const { updateMenu } = require('./tray');
const { execCommand } = require('../utils/exec');

let socket;
const ip = getIp();

const initSocketConnection = async ({ server = 'localhost', port = 3000, defecto = true }) => {
	const serverDir = await execCommand('echo %SERVER_ADDRESS%')?.stdout?.trim();
	const portDir = await execCommand('echo %SERVER_PORT%')?.stdout?.trim();
	const s = defecto ? `${serverDir || process.env.SERVER_ADDRESS}` || server : server || `${serverDir || process.env.SERVER_ADDRESS}`;
	const p = defecto ? `${portDir || process.env.SERVER_PORT}` || port : port || `${portDir || process.env.SERVER_PORT}`;

	if (socket) socket.disconnect();

	socket = io(`http://${s}:${p}`);
	socket.on('connect', () => {
		solicitarCredenciales();
	})

	socket.on('disconnect', () => {
		showNotification({
			message: 'Haz perdido la conexión con el servidor', title: 'Información', type: 'warning'
		});
		updateMenu('disconnect');
	})

	socket.on('reconnect', (att) => {
		showNotification({ message: 'Haz recuperado la conexión con el servidor', title: 'Información', type: 'warning' })
	})

	socket.on('tell-me-to-do', (data) => {
		const { message, title, type } = data;
		showNotification({ message, title, type });
	})
}

const solicitarCredenciales = () => {
	socket.emit('solicitar-credenciales', {
		type: 'secreto',
		client: `client_${ip}`
	}, (res) => {
		if (res.success) {
			showNotification({
				message: 'Haz recuperado la conexión', title: 'Información'
			});
			updateMenu('connect', 'online');
		}
	})
}

module.exports = { initSocketConnection }

