const { io } = require('socket.io-client');
const { getIp } = require('../utils/ip-information');
const { showNotification } = require('../utils/dialog');

const socket = io(process.env.SERVER);

const ip = getIp();

const initConnection = () => {
	socket.on('connect', () => {
		solicitarCredenciales();
	})
}

socket.on('disconnect', () => {
	showNotification({ message: 'Haz perdido la conexión con el servidor', title: 'Información', type: 'warning' })
})

socket.on('reconnect', (att) => {
	showNotification({ message: 'Haz recuperado la conexión con el servidor', title: 'Información', type: 'warning' })
})

socket.on('tell-me-to-do', (data) => {
	const { message, title, type } = data;
	showNotification({ message, title, type });
})

const solicitarCredenciales = () => {
	socket.emit('solicitar-credenciales', {
		type: 'secreto',
		client: `client_${ip}`
	}, (res) => {
		if (res.success) showNotification({ message: 'Haz recuperado la conexión', title: 'Información', type: 'info' });
	})
}

module.exports = { initConnection }

