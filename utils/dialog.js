const { dialog, Notification, nativeImage } = require("electron/main")
const { join } = require('node:path');

const showMessage = ({ message, type = 'info', title, detail, buttons = ['OK'] }) => {
	return dialog.showMessageBox(null, {
		type,
		message,
		buttons,
		title,
		detail,
		icon: selectIcon(type)
	})
}

const showNotification = ({ title, message, type = 'info' }) => {
	if (Notification.isSupported())
		new Notification({
			title, body: message, icon: selectIcon(type)
		}).show();
	else
		showMessage({ title, message, type })
}

const selectIcon = (type) => {
	const icons = {
		warning: join(`${__dirname}`, '../assets', 'warning_x256.png'),
		info: join(`${__dirname}`, '../assets', 'info_x256.png'),
		error: join(`${__dirname}`, '../assets', 'error_x256.png'),
		none: 'none'
	}

	return nativeImage.createFromPath(icons[type]) || 'none'
}

function showDialogTypes() {
	const dialogTypes = [
		'none',     // Sin icono
		'info',     // ℹ️ Información
		'error',    // ❌ Error
		'question', // ❓ Pregunta
		'warning'   // ⚠️ Advertencia
	]

	dialogTypes.forEach(type => {
		showMessage({
			message: `Este es un diálogo de tipo ${type}`,
			type,
			title: `Tipo: ${type}`
		})
	})
}

module.exports = { showMessage, showNotification }