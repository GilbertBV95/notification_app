const { createServer } = require('http');
const { Server } = require('socket.io');

const httpServer = new createServer()
const io = new Server(httpServer, {
	cors: {
		origin: "*"
	}
});

io.on('connection', (socket) => {
	console.log('Cliente conectado sin autenticar:', socket.id);

	// SOLICITANDO CREDENCIALES AL SERVIDOR
	socket.on('solicitar-credenciales', (data, callback) => {
		console.log('Solicitud de credenciales recibida:', data);
		const { client } = data;
		socket.data.client = client;

		// RESPUESTA CORRECTA AL CLIENTE
		if (callback) {
			callback({
				success: true
			});
		}
	});

	/** ESPERANDO UN TIEMPO PARA ENVIAR MENSAJE AL CLIENTE
	 * EN PRODUCCION SE DEBE CREAR UN ENDPOINT PARA EMITIR ESTE EVENTO
	*/
	setTimeout(() => {
		io.to(socket.id).emit('tell-me-to-do', {
			message: 'Enviado desde el servidor',
			title: 'Titulo de prueba',
			type: 'warning'
		})
	}, 5000)
});

httpServer.listen(3000);