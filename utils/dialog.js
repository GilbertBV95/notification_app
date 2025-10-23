const { dialog, Notification } = require("electron/main")
const { selectIcon } = require("./select-icon");

//MOSTRAR MENSAJE EN LA PANTALLA
const showMessage = ({ message, type = 'info', title = 'Información', detail, buttons = ['OK'] }) => {
	return dialog.showMessageBox(null, {
		type,
		message,
		buttons,
		title,
		detail,
		icon: selectIcon(type)
	})
}

//MOSTRAR NOTIFICACION EN LA PANTALLA
const showNotification = ({ title, message, type = 'info' }) => {
	if (Notification.isSupported())
		new Notification({
			title, body: message, icon: selectIcon(type)
		}).show();
	else
		showMessage({ title, message, type })
}

module.exports = { showMessage, showNotification }