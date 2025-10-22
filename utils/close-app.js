const { BrowserWindow } = require("electron/main");

function closeApp(app) {
	app.quit();
}

const closeWindows = () => {
	const windows = BrowserWindow.getAllWindows();
	if (windows.length)
		windows[0].close();
}

module.exports = { closeApp, closeWindows }