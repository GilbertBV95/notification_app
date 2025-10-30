### VARIABLES DE ENTORNO NECESARIAS (.env)
	1. ICON
		- Nombre del ícono mostrado en el área de notificaciones  `ICON='icon.ico'`
	2. SERVER_ADDRESS
		- Dirección del servidor `SERVER_ADDRESS='localhost'`
	3. SERVER_PORT
		- Puerto de conexión con el servidor `SERVER_PORT=3000`

### CONFIGURACIÓN INICIAL
	- Crea variables de entorno de Windows con los nombres SERVER_ADDRESS y SERVER_PORT inicializar valores por defecto, si no son creadas se inicializan en localhost:3000

### IMAGEN DE LA APLICACIÓN
	- Copiar una imagen llamada icon.png en la carpeta assets/images/
	!! EL icon.ico es usado para ser mostrado en el area de notificaciones y el icon.png es usada en el resto

### HACIENDO EL BUILD
	Estando en el directorio del proyecto ejecutar el comando `pnpm run build-win`

### SERVIDOR
	Navegar a la carpeta server para ver el ejemplo
