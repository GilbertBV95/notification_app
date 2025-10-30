const { execCommand } = require("./exec");

//SELECCIONAR LA CONFIGURACION DEL SERVIDOR
const choiceServerConfig = async (defecto, server = 'localhost', port = 3000) => {
	const serverDir = await execCommand('echo %SERVER_ADDRESS%')?.stdout?.trim();
	const portDir = await execCommand('echo %SERVER_PORT%')?.stdout?.trim();

	//DIRECCION DEL SERVIDOR
	const s = defecto ?
		`${serverDir || process.env.SERVER_ADDRESS}` || server :
		server || `${serverDir || process.env.SERVER_ADDRESS}`;

	//PUERTO DEL SERVIDOR
	const p = defecto ?
		`${portDir || process.env.SERVER_PORT}` || port :
		port || `${portDir || process.env.SERVER_PORT}`;

	return { s, p }
}

module.exports = {
	choiceServerConfig
}