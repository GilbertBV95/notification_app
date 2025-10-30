const { dialog, Notification } = require("electron/main");
const { selectIcon } = require("./select-icon");

//MOSTRAR POPUPS EN LA PANTALLA
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
const showNotification = ({ title, message, type = 'info', app }) => {
	if (Notification.isSupported()) {
		const imagen = `file:///${selectIcon(type, app, true)}`.replace(/\\/g, '/');
		const toastXmlString = `
		<toast>
			<visual>
				<binding template="ToastGeneric">
					<image placement="appLogoOverride" src="${imagen}"/>
					<text id="1">${title}</text>
					<text id="2">${message}</text>
				</binding>
			</visual>
		</toast>`

		new Notification({
			toastXml: toastXmlString
		}).show();
	}
	else
		showMessage({ title, message, type })
}

module.exports = { showMessage, showNotification }