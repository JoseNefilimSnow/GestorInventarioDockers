# Proyecto de Implantación de Odoo

### Valper Soluciones y Mantenimiento SL
##### Adrián Vera Pulido
##### Jose Juan Díaz Vega

![valper](https://i.imgur.com/0cRmFzC.jpg)


# Indice

 1. [Introducción](#1)
 2. [Manual de Instalación de Odoo y PostgreSQL en Dockers](#2)
 3. [Módulo de Posición de Producto](#3)
 4. [Funcionamiento de las Rutas de Venta -Compra y Reserva](#4)
 5. [Construcción de aplicación Ionic con conexión a Odoo](#5)

<div id='1' />

# [Introducción]

El proyecto a realizar es una gestión de inventario propuesto por la empresa Valper. Este se fijara en el esquema interno de los trabajadores del inventario el cual existe un responsable y empleados a su cargo. A parte de estos, un grupo ajeno a esta organización también tendrá acceso al portal a desarrollar será un empleado de cara al público y finalmente se seguirá el siguiente esquema de casos de uso: 

![Imgur](https://i.imgur.com/QCU7GIh.png)
 
 
### Modulos Instalados

Los módulos que hemos usado para nuestro proyecto, son los siguientes: 

![Imgur](https://i.imgur.com/OYPyDjr.png)

Vamos a explicar el uso de cada uno dentro de nuestro proyecto: 

### Gestión de Inventario

Este módulo como su nombre indica, nos servirá para llevar toda la gestión de un inventario. 
Tenemos la siguiente vista con todas las acciones que podemos hacer en el:

![Imgur](https://i.imgur.com/Tzlwwfl.png)

Como podemos observar las opciones más básicas que tenemos son: 
 Añadir un producto 
 Crear reglas de abastecimiento para llevar un control del stock mínimo de 
nuestros productos 
 Informes 
 Gestión de almacenes, donde podemos llevar el control de varios almacenes y 
las ubicaciones 

Nosotros aparte de las opciones básicas que trae por defecto el modulo, hemos activado otras para nuestro proyecto ya que nos hacen falta: 

![Imgur](https://i.imgur.com/ChXbLS9.png)


### Gestión de Ventas

Este módulo nos sirve para llevar las ventas de nuestros productos. 
La vista de dicho modulo es la siguiente:

![Imgur](https://i.imgur.com/BQvfPMf.png) 

Las funciones más básicas de este módulo son las siguientes: 
 Creación de presupuestos 
 Creación de pedidos 
 Administración de clientes 
 Facturación 
 Productos 
 Informes 



### Gestión de Facturas

Este módulo nos sirve para gestionar las facturas de nuestras ventas 
La vista de dicho modulo es la siguiente: 

![Imgur](https://i.imgur.com/ZXNzNtC.png)

Las funciones más básicas son las siguientes: 
 Facturas de cliente 
 Rectificativas de cliente 
 Pagos 
 Compras 
 Informes 


### Gestión de Compras

Este módulo nos sirve para controlar nuestras compras con los proveedores  
La vista de este módulo es la siguiente: 

![Imgur](https://i.imgur.com/HfB7hnS.png)

Las funciones más básicas son las siguientes: 
 Solicitudes de presupuesto 
 Pedidos de compra 
 Proveedores 
 Productos 
 Control 
 Informes

### Directorio de Empleados

Este módulo nos sirve para llevar un control de los departamentos, puestos de trabajo y empleados de nuestra empresa. 

En el podemos crear empleados y departamentos

### Directorio de Contactos

Este módulo nos sirve para guardar nuestros clientes, proveedores y empresas. 
 
 ![Imgur](https://i.imgur.com/BGDDZRD.png)

<div id='2' />

# [Manual de Instalación de Odoo y PostgreSQL en Dockers]

Los requisitos que vamos a usar son los siguientes:

Ubuntu 18.04 Server virtualizado en VirtualBox

Dockers en su version estable

Odoo 11

PostgreSQL 9.6

Python 3


Lo primero que debemos tener antes de comenzar es Dockers instalado en nuestra máquina. La instalación la he realizado desde el principio de la configuración de mi maquina Ubuntu.


![Imgur](https://i.imgur.com/WdGsXfB.png)


Le damos ENTER y elegimos la versión estable.


![Imgur](https://i.imgur.com/j3rkZJ5.png)

Volvemos atrás y terminamos la instalación de nuestra maquina Ubuntu.

Antes de instalar las imágenes y los contenedores, usaremos dos comandos antes para tener todo actualizado.

**Sudo apt-get update**

**Sudo apt-get upgrade**

Con estos dos comandos actualizamos primero las listas donde descargaremos las últimas actualizaciones y por ultimo las instalamos.

Ahora ya tenemos todo listo para instalar nuestras dos respectivas imágenes con sus contenedores.

Lo primero que tenemos que hacer, es crear un archivo llamado docker-composer.yml, que es el que va a contener todas las instrucciones para la creacion y instalación de nuestras imágenes y contenedores.

**Sudo nano docker-compose.yml**

Una vez creado el fichero, lo siguiente que vamos a hacer es crear su estructura para que podamos crear y ejecutar los contenedores con sus respectivas imagenes

![Imgur](https://i.imgur.com/646kXiG.png)
Rojo: Esta es la configuración de el contenedor de PostgreSQL.

**image**: Es el repositorio donde vamos a descargar nuestra imagen para el contenedor. En mi caso la imagen la tengo subida a mi repositorio, pero podemos cambiar la sentencia por: postgres9.6 (Si no ponemos el 9.6 despues del nombre de la imagen, descargará la ultima version estable de postgres).
**volumes**: Esta ruta seria para tener un enlace con el contenedor de dockers, de tal manera que podemos agregar/modificar los archivos de nuestro contenedor desde nuestra maquina, sin necesidad de tener que estar accediendo a el. (Cambiar siempre el nombre del usuario(Despues de /home) y la ruta de la carpeta donde queramos tener todo creado.)
**ports**: Esto nos sirve para mapear los puertos que nuestro contenedor va a usar.
**environment**: Este campo nos sirve para añadir variables de entorno a nuestro contenedor, en este caso lo que he añadido yo es que el usuario y la contraseña es "odoo" y que el nombre de la base de datos sea "postgres" y que los datos de dicha base de datos, se guarden en la ruta de "PGDATA".

Azul: Esta es la configuración de el contenedor de Odoo

**image**: Es el repositorio donde vamos a descargar nuestra imagen para el contenedor. En mi caso la imagen la tengo subida a mi repositorio, pero podemos cambiar la sentencia por: odoo11 (Si no ponemos el 1 despues del nombre de la imagen, descargará la ultima version estable de odoo).
**depends_on**: Aqui le estamos diciendo que el contenedor de odoo depende del contenedor de postgres, ya que sin el no podria guardar nada.
**ports**: Esto nos sirve para mapear los puertos que nuestro contenedor va a usar.
**volumes**: Esta ruta seria para tener un enlace con el contenedor de dockers, de tal manera que podemos agregar/modificar los archivos de nuestro contenedor desde nuestra maquina, sin necesidad de tener que estar accediendo a el. (Cambiar siempre el nombre del usuario(Despues de /home) y la ruta de la carpeta donde queramos tener todo creado.)

Una vez tengamos todo configurado, lo siguiente es iniciar nuestros contenedores y acceder a odoo. El comando para iniciar nuestro archivo docker-compose es:

**sudo docker-compose up -d**
Y si queremos apagarlo seria:
**sudo docker-compose down**

Una vez iniciado, accedemos a la ip de nuestra maquina y ya accederiamos a odoo
![Imgur](https://i.imgur.com/dEJCZ3a.png)
Como podemos observar nos pide una contraseña maestra que es la que tenemos configurada en nuestro archivo odoo.conf de la carpeta config

![Imgur](https://i.imgur.com/JzNks6i.png)
Podemos ver que en nuestro fichero, la contraseña es "prueba" y que cuando queramos podemos cambiarla por otra. Ahora que ya tenemos la contraseña, podemos finalizar la creacion de nuestra base de datos en Odoo.


### Creación de los módulos

Hemos creado dos módulos, el primero tiene una única función y es la instalación de los módulos necesarios para nuestro proyecto.

![Imgur](https://i.imgur.com/3wvAfCD.png)


Aquí podemos ver que en el código, lo único que hemos dicho es decir que este módulo va a depender de otros y con eso conseguimos que al instalarlo, se instalen los módulos que nosotros queremos.


El segundo módulo que hemos creado sirve para añadir las ubicaciones a los productos que tenemos introducidos en nuestro inventario. Odoo por defecto en el módulo de Inventario, ya trae esta característica, pero Valper requirió el uso de ubicaciones mediante “Strings”.

Odoo:

![Imgur](https://i.imgur.com/jdELLRz.png)


Nuestro modulo:

![Imgur](https://i.imgur.com/m1NxTRJ.png)


### Clases Heredadas

Nosotros hemos creado en nuestro modulo, cuatro clases de las cuales una de ella tiene un campo en el cual guardamos las ubicaciones y la otra clase tiene un unico campo con una relación One2many del campo de la clase anterior que guarda las diferentes posiciones de nuestras ubicaciones.

![Imgur](https://i.imgur.com/N2hQpK6.png)


Aquí podemos observar que tenemos varios campos de las clases en las cuales tienen varias relaciones entre si.


![Imgur](https://i.imgur.com/Ji1A9td.png)


Esta es la vista de nuestro modulo, en el que tenemos creado varios registros en los cuales hay varias ubicaciones.

### Vistas Heredadas

En nuestro modulo de posicionamiento, hemos creado una clase en la cual tiene una relacion One2many con el campo pos, para posteriormente crear una vista heredada en el formulario "stock.view_location_form" del modulo "stock.location" y tambien hemos creado una vista donde luego se insertara en el modelo donde queremos hacer la heredación

Vista del modelo:
![Imgur](https://i.imgur.com/B0Vwvyo.png)

Vista del XML: 
![Imgur](https://i.imgur.com/Wx08RYF.png)

Esto lo que hace es: En el modelo, creamos la clase "posicionamientoinventarioi" y en ella el campo con la relacion One2many tambien introducimos dos campos que son "_inherit" que es donde pondremos el nombre del modelo al que queremos introducir la heredación y el campo "_name" que si nos fijamos bien lo hemos llamado igual que el campo "_inherit" ya que si no tenemos el mismo nombre, nos fallará. Luego en la vista hemos creado una expresion xpath en la cual le estamos diciendo que vaya a la ruta //form/group/group y que el nombre de dicho grupo es "localization" y que dentro de el, queremos añadir el campo que hemos creado anteriormente.

### Grupos

Hemos creado un grupo para el módulo de inventario el cual hemos llamado Inventario/Jefes, en el irán aquellas personas que sean los administradores del inventario.


![Imgur](https://i.imgur.com/Bd44J7y.png)


En este caso tengo a un usuario llamado Paco el cual es el Jefe de los inventarios de nuestra empresa.

<div id='3' />

# [Módulo de Posición de Producto]
### Introducción: Funcionalidad y planteamiento


 El modulo de posicionamiento añade, mediante una herencia de los componentes de **Odoo** usando **Python** y sentencias **Xpath**, a los productos almacenados una serie de cadenas de caracteres que definen la posición de los mismos. 
 
La razón que nos llevó a descartar las localizaciones de el formulario de Ubicaciones es que ademas el uso de campos individuales para cada elemento de la localización (estantería, pasillo y altura ) es la posibilidad de asignar a los productos un listado de las posiciones donde se encuentran o se han encontrado dentro del almacén sin importar realmente que sea una posición fija para cada uno.

Para instalarlo solo debes buscar “Posicionamiento Inventario” en la pantalla de Aplicaciones de Odoo 

### ¿Como funciona? 

La herramienta se encuentra dentro de la pestaña “Inventario” al abrir el formulario de cualquier producto: 

![Imgur](https://i.imgur.com/76BbVFB.png)

Desde ahí podemos ver una lista, en la cual iremos añadiendo las ubicaciones en las que pueden encontrarse dicho producto

![Imgur](https://i.imgur.com/qlJYIGU.png)

 En la lista de posiciones se referencia las cadenas de caracteres anteriormente nombradas las cuales puedes crear o seleccionar una anteriormente creada: 

![Imgur](https://i.imgur.com/p99tsDC.png)

Para finalmente completar la lista:

![Imgur](https://i.imgur.com/5BSri0X.png)

### ¿Como funciona?: Dentro del código 


La aplicación esta formada por 4 modelo en Python que se encargan de la creación de la lista, (***posicionamientoinventario.posicionamientoinventario***) mediante un One2many , la creación de un campo que recuerda entrada de registros anteriores , (***posicionamientoinventarioub.ubicacion***) usando un Many2one, y finalmente la creación del modelo referenciado por este ultimo que contendrá el campo de cadena de caracteres (***posicionamientoinventariopl.placeholder***). 

### Cuaderno de batalla: 


• Creación del modulo no se ajusta a una lista (Arreglado (Implementación de un One2many))

 • Creación del modulo substituye la cadena de caracteres por un numero(Arreglado (Creación de un campo id invisible)) 

• El campo que contiene la cadena de caracteres no mantiene los registros anteriores ni con el atributo “Store” (Arreglado (Implementación de un campo Many2one que referencie otro modelo con la cadena)) 

• El campo id invisible tanto en ***posicionamientoinventarioub.ubicacion*** como en ***posicionamientoinventariopl.placeholder*** parece guardar un número que se repite en cada instancia de la lista (por ejemplo si esta es la quinta lista, se recrean registros nuevos para todas con una id nueva)(en proceso)

<div id='4' />

# [Funcionamiento de las Rutas de Venta – Compra y Reserva]

### Venta

Vamos a realizar varias ventas de un mismo producto del cual tenemos stock y mediante las solicitudes del producto, nos quedaremos sin su stock y necesitaremos crear un presupuesto con las cantidades restantes.

Empezamos creando varias ventas y validándolas:

![Imgur](https://i.imgur.com/U8rV4av.png)

Llegaremos a un punto, que en la ultima venta, nos comentara que de la cantidad pedida por el cliente es mas alta que la que tenemos en stock.

![Imgur](https://i.imgur.com/PEDmusc.png)

Una vez tengamos todas las ventas creadas y validadas, lo siguiente que haremos es irnos al inventario y nos vamos a los productos y entramos dentro del producto que hemos estado vendiendo.

### Inventario

![Imgur](https://i.imgur.com/xWfmh19.png)

Como podemos comprobar en el rectángulo rojo, aun de nuestro producto tenemos 10 cantidades, ya que aún no las hemos entregado a los clientes en la parte de transferencias.

Y si vemos el rectángulo de color negro, veremos que nos aparece -6 de cantidad de nuestro producto. Esta vista lo que nos da es una previsión de stock de nuestro producto dependiendo de las ventas o compras que hagamos con él. En este caso nos sale -6 ya que hemos vendido 6 cantidades más de las que teníamos de base en stock.

Ahora nos vamos a la vista de transferencias:

![Imgur](https://i.imgur.com/BbBzBLO.png)

Como podemos comprobar dentro del rectángulo de color negro, vemos ahí que tenemos 4 transferencias de las cuales 2 de ellas están preparadas ya para ser entregadas (las dos primeras) a los clientes,1 está preparada, pero le falta aun 1 cantidad (Color amarillo) y la última (Color marrón) está en estado de espera ya que no tenemos productos en nuestro inventario para completar la transacción.

Entonces, para completar las 2 ultimas transferencias que nos quedan, hay que pedir las cantidades que faltan. Para ello vamos a crear una regla de reabastecimiento de nuestro producto.

![Imgur](https://i.imgur.com/ZEVGI13.png)

**Nombre**: Es el nombre de la regla de reabastecimiento.

**Producto:** El producto al que le vamos a crear la regla de reabastecimiento.

**Cantidad mínima:** Como su nombre indica, es la cantidad mínima que queremos tener en nuestro almacén.

**Cantidad máxima:** Como su nombre indica, es la cantidad máxima que queremos tener en nuestro almacén.

**Múltiplo de la cantidad:** La cantidad se redondeará al múltiplo introducido.

**Plazo de entrega:** Es el tiempo en el que tardara nuestro producto en ser entregado.

Vamos a dejar las cantidades mínimas y máximas a 0 y luego les daremos un valor y veremos las diferencias.

Guardamos la regla de abastecimiento y le daremos al botón de Ejecutar Planificador.

![Imgur](https://i.imgur.com/XXuOqgw.png)

Ahora si nos vamos a Compra deberíamos de tener una solicitud de presupuesto creada con las cantidades restantes de cada pedido.

### Compra

![Imgur](https://i.imgur.com/6hKOA5X.png)

Como podemos comprobar la solicitud de presupuesto, tenemos una solicitud del producto01 con 5 cantidades, de las cuales 1 es para el pedido 3 y los 4 restantes para el pedido 4.

Si, por ejemplo, ahora borráramos esta solicitud y cambiáramos las reglas de abastecimiento y le pusiéramos un mínimo y un máximo, nos daría otra cantidad diferente.

![Imgur](https://i.imgur.com/xkPMfJN.png)

Guardamos los cambios y volvemos a ejecutar el planificador.

![Imgur](https://i.imgur.com/PUkFJgT.png)

Ahora nos aparecerá una solicitud de presupuesto para el producto anterior con 55 cantidades. Esto es porque en nuestra regla definimos que nuestro mínimo eran 10 unidades y al estar las unidades por debajo del minimo, se nos pide el máximo que eran 50 unidades, pero como tenemos dos pedidos de los cuales nos faltaban unidades de nuestro producto, se nos incluyen con las reglas de reabastecimiento para que no restemos de nuestro máximo.

Vamos a confirmar la solicitud de presupuesto y a validar que nos han llegado esas unidades de nuestro producto.

![Imgur](https://i.imgur.com/JU8gBMo.png)

Ahora si nos vamos a nuestro producto, deberíamos tener las unidades que hemos pedido y también las que teníamos antes, ya que no hemos validado ninguna de las transferencias.

![Imgur](https://i.imgur.com/lQ997ks.png)

Como podemos comprobar también, si nos fijamos en la vista de Previsto, ya no aparece -6 si no 50, ya que ahora si finalizamos todas las transferencias nos vamos a quedar con el máximo de nuestro stock.

Vamos a finalizar todas las transferencias.

![Imgur](https://i.imgur.com/H8MTaRR.png)

Si nos fijamos en la transferencia 3 que era la que nos faltaba uno, aun sale que tenemos reservado 2 de 3 que se nos han pedido. Las transferencias no nos auto reserva las unidades automáticamente cuando nos llegan, para ello tenemos un botón dentro de las transferencias que se llama “Comprobar disponibilidad” el cual lo que hará es comprobar que hay existencias de ese producto en nuestro almacén y añadir la cantidad que falta para poder completar esa transacción.

![Imgur](https://i.imgur.com/sW0j557.png)

Ahora si nos fijamos, después de darle al botón, ya nos ha puesto 3 de 3 y ya podemos finalizar la transacción.

Una vez terminado de finalizar todas las transferencias, si nos volvemos a ir a productos y entramos en nuestro producto ya la cantidad y la previsión están al máximo de nuestra regla de reabastecimiento.

![Imgur](https://i.imgur.com/zcfslSe.png)

<div id="5" />

# [Construcción de aplicación Ionic con conexión a Odoo]

- ## Prerrequisitos:
  - ### Instalación de Node 6 o Superior
  - ### Instalación de Ionic (en este caso versión 3)

## Creación de el proyecto:
Iniciamos la consola de comandos y escribimos el comando de inicio:

![clipboard](https://i.imgur.com/msP7Zht.png)

Elegimos un proyecto en blanco:

![clipboard](https://i.imgur.com/G6Sd1B1.png)

Decidimos si deseamos hacer una aplicacion con Cordova (que añade una implementacion a Android o IOS) en este caso aceptamos:

![clipboard](https://i.imgur.com/bOKllGU.png)

Para también generar aplicaciones de escritorio instalamos Capacitor que nos permite exportar a Electron:

![clipboard](https://i.imgur.com/zJKtQc5.png)

Tras inicializar Capacitor te pide un nombre y la id que esta contenida en el config.xml:

![clipboard](https://i.imgur.com/fpGYX1Y.png)

Y finalmente instalamos el modulo HTTP de angular para comunicarnos con la API de Odoo:

![clipboard](https://i.imgur.com/BQRGB5z.png)

Como configuración adicional, en la carpeta "app" generada por Ionic dentro de "src" abrimos "app.module.ts" e importamos el modulo HTTP de la siguiente manera:

![clipboard](https://i.imgur.com/QkvGsfD.png)


## Preparar el servicio que se conectará a Odoo:
En la carpeta "src" creamos una carpeta llamada services y dentro un archivo typescript que será nuestro servicio:

![clipboard](https://i.imgur.com/J1EjlnS.png)

En el archivo importamos los modulos necesarios:

![nbL4w0D](https://i.imgur.com/dVzeWOF.png)

Este servicio es injectable y lo exportaremos para ser usado por toda la aplicación por lo cual definimos lo siguiente:

![clipboard](https://i.imgur.com/lBLD0x5.png)

Creamos atributos para la clase que contendrán la IP de la API y la base de datos a acceder y inicializamos el constructor con el modulo http :

![clipboard](https://i.imgur.com/3C3pFwA.png)

## Creación de Inicio de Sesión para Odoo:

Como tarea principal, crearemos un inicio de sesión, esto creará una sesion en Odoo que dependiendo de los permisos que tenga definidos. Para ello creamos un metodo que recogerá el correo y el email desde cualquier otra pagina que llame al servicio pasandoselos como parametro, a parte guardamos el contexto del usuario para que sea el contexto de los metodos a usar:

![clipboard](https://i.imgur.com/LCq0VEb.png)


Para clarificar más el código, separamos el metodo que finalmente enviará la propuesta a Odoo que tendrá como parámetro un url único para cada acción (correspondiente a un CRUD) y los parametros necesarios cada vez:

![clipboard](https://i.imgur.com/ndUDjTk.png)

Realizamos una prueba usando la pagina que Ionic nos genera por defecto creando un formulario
y recogiendo los datos necesarios pero antes debemos ir a "app.module.ts" y después de importarlo, lo añadimos a providers:

![clipboard](https://i.imgur.com/exY59D0.png)

La prueba la realizamos usando electron ya que nos permite tener en el escritorio una copia del proyecto final, para esto escribimos la siguiente sucesión de comandos:

![clipboard](https://i.imgur.com/wF8sRYy.png)

- ### npm run build : Construye la aplicación
- ### npx cap copy electron : El capacitor se encarga de copiar la build actual como aplicación electron
- ### cd electron : Nos posiciona en la carpeta de electron
- ### npm run electron:start : Inicia la aplicación electron

En la aplicacion veremos esto:

![clipboard](https://i.imgur.com/Cpfzyp5.png)

El "result",(en la consola a la derecha) nos muestra que el inicio de sesión ha sido exitoso devolviendonos el contexto del usuario ("user_context") y el id que tiene dentro de Odoo (partner_id).

## Llamadas a metodos:
Antes de generar las instancias debemos crear una funcion que envie estos metodos de los modelos de Odoo:

![clipboard](https://i.imgur.com/vClLvwM.png)

Estos metodos se pueden encontrar en los modelos de python que se encuentran en la carpeta \server\odoo\addons de la carpeta de instalación de Odoo:

![clipboard](https://i.imgur.com/11rzpGk.png)


 o usando el modo desarrollador desde el framework que te ofrece Odoo:
 
 ![clipboard](https://i.imgur.com/1Ohr3cx.png)
 
  Por ejemplo en facturas el metodo para validar sería:
  
  ![clipboard](https://i.imgur.com/f1Mh8ol.png)

## C.R.U.D de instancias de los modulos de Odoo:

Odoo consta con módulos con los cuales podemos interacturar creando instancias, leyendolas, editandolas y borrandolas. Cada una de estas acciones llaman a un url de metodo diferente en la API. A continuación veremos como se construye cada una de estas funciones.


### Creacion de instancia:

Crea una instancia de un modelo de Odoo usando el metodo de "create":

![clipboard](https://i.imgur.com/Lspsazw.png)

### Lectura de instancias:

Lee las instancias de un modelo de Odoo. En esta lectura podemos especificar los campos que queremos leer, condiciones para la busqueda, limite de entradas, intervalo y como ordenarlos:

![clipboard](https://i.imgur.com/tlMkpOp.png)

### Editar instancias:

Obtenemos una instancia y podemos editar sus campos:

![clipboard](https://i.imgur.com/zK1dkTX.png)

### Borrar instancias:

Borramos una instancia de un modelo:

![clipboard](https://i.imgur.com/GwBP0aQ.png)

## Cuaderno de batalla:

  Aquí recopilaremos un historico de los mayores inconvenientes que hemos afrontado en el desarrollo:
  
  - CORS: Al realizar pruebas con la herramienta de Debug de Ionic (ionic serve) nos hemos encontrado con un error de cabeceras por parte de la API ya que la situa en la misma localización que Odoo. Para sobrepasar este error, construimos la aplicacion con electron o sobre otras plataformas lo cual solventa este error.

### Con esto damos por concluido el manual para crear una aplicación básica con Odoo 
