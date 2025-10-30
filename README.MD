### VARIABLES DE ENTORNO NECESARIAS (.env)
	1. ICON
		- Nombre del icono mostrado en el area de notificaciones  `ICON='icon.ico'`
	2. SERVER_ADDRESS
		- Direccion del servidor `SERVER_ADDRESS='localhost'`
	3. SERVER_PORT
		- Puerto de conexion con el servidor `SERVER_PORT=3000`
	4. USER_MODEL_ID
		-Id necesario para poder mostrar la notificaciones en Windows `USER_MODEL_ID = 'gilbertbv.notification.app'`

### CONFIGURACION INICIAL
	- Crea variables de entorno de Windows con los nombres SERVER_ADDRESS y SERVER_PORT inicializar valores por defecto, esta configuracion tiene precedencia a la del `.env`

### CONFIGURACION DEL BUILD
	1. appId
		- Id dado a la aplicacion despues del build, tiene que ser igual al USER_MODEL_ID `"appId": "gilbertbv.notification.app"`
	2. productName
		- Nombre de la aplicacion `"productName": "Notification App"`
	3. shortcutName
		- Nombre mostrado al usuario `"shortcutName": "Notification App"`
	4 icon
		- Icono mostrado en la barra de tareas `"icon": "assets/images/icon.png"`

### HACIENDO EL BUILD
	Estando en el directorio del proyecto ejecutar el comando `pnpm run build-win`
