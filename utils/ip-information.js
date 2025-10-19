const { networkInterfaces } = require('node:os');

const getIp = () => {
	const interfaces = networkInterfaces();
	const keys = Object.keys(interfaces);

	for (const key of keys) {
		const isExternal = interfaces[key].find(int => !int.internal);
		if (isExternal && isExternal.family == 'IPv4')
			return isExternal.address;
	}

	return '127.0.0.1';
}

module.exports = { getIp }
