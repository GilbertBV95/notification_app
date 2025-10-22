const { exec } = require('node:child_process');
const { stderr } = require('node:process');
const { promisify } = require('node:util');

const execCommand = async (command = 'net session') => {
	try {
		const d = promisify(exec);
		const { stderr, stdout } = await d(command)

		if (stderr) return { success: false };

		return { success: true, stdout };
	} catch (error) {
		return { success: false, stderr };
	}
}

module.exports = { execCommand }