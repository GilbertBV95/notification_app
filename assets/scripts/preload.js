const { contextBridge, ipcRenderer } = require('electron/renderer')

contextBridge.exposeInMainWorld('updateConfig', {
	setConfig: ({ server, port }) => ipcRenderer.invoke('set-config', { server, port })
})