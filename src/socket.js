const { io } = require('socket.io-client');
const { getIp } = require('../utils/ip-information');
const { showNotification } = require('../utils/dialog');
const { updateMenu } = require('./tray');
const { choiceServerConfig } = require('../utils/choice-server-config.js');

let socket;
const ip = getIp();

// INICIALIZAR CONEXION CON EL SERVIDOR
const initSocketConnection = async ({
	server = 'localhost',
	port = 3000,
	defecto = true, app
}) => {
	const { s, p } = await choiceServerConfig(defecto, server, port);
	const serverString = `${s}:${p}`;

	if (socket) {
		socket.disconnect();
		updateMenu('disconnect', 'offline', serverString)
	}

	socket = io(`http://${serverString}`);
	socket.on('connect', () => {
		solicitarCredenciales(app);
	})

	socket.on('disconnect', () => {
		showNotification({
			message: 'Haz perdido la conexión con el servidor', title: 'Información', type: 'warning', app
		});
		updateMenu('disconnect');
	})

	socket.on('reconnect', () => {
		showNotification({ message: 'Haz recuperado la conexión con el servidor', title: 'Información', type: 'warning' })
	})

	//RECIBE LA INFORMACION ENVIADA DESDE EL SERVIDOR
	socket.on('tell-me-to-do', (data) => {
		const { message, title, type } = data;
		showNotification({ message, title, type, app });
	})
}


//SOLICITAR CREDENCIALES AL SERVIDOR
const solicitarCredenciales = (app) => {
	socket.emit('solicitar-credenciales', {
		type: 'secreto',
		client: `client_${ip}`
	}, async (res) => {
		if (res.success) {
			showNotification({
				message: 'Haz recuperado la conexión', title: 'Información', app
			});
			updateMenu('connect', 'online');
		}
	})
}

module.exports = { initSocketConnection }

