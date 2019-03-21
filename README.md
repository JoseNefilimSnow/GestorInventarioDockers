
Manual de Instalación de Odoo y PostgreSQL en Dockers
=====================================================


Los requisitos que vamos a usar son:


Ubuntu 18.04 virtualizado en VirtualBox


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


Creación de los módulos
=======================


Hemos creado dos módulos, el primero tiene una única función y es la instalación de los módulos necesarios para nuestro proyecto.

![Imgur](https://i.imgur.com/3wvAfCD.png)


Aquí podemos ver que en el código, lo único que hemos dicho es decir que este módulo va a depender de otros y con eso conseguimos que al instalarlo, se instalen los módulos que nosotros queremos.


El segundo módulo que hemos creado sirve para añadir las ubicaciones a los productos que tenemos introducidos en nuestro inventario. Odoo por defecto en el módulo de Inventario, ya trae esta característica, pero Valper requirió el uso de ubicaciones mediante “Strings”.

Odoo:


![Imgur](https://i.imgur.com/SjYtbXE.png)


Nuestro modulo:


![Imgur](https://i.imgur.com/DjzTXV4.png)


Clases Heredadas
================


Nosotros hemos creado en nuestro modulo, dos clases de las cuales una de ella tiene un campo en el cual guardamos las ubicaciones y la otra clase tiene un unico campo con una relación One2many del campo de la clase anterior que guarda las diferentes posiciones de nuestras ubicaciones.

![Imgur](https://i.imgur.com/uBjNYHt.png)


Aquí podemos observar que tenemos el campo“pos” del cual tienen una relación One2many con la tabla “posicionamientoinventarioub”


![Imgur](https://i.imgur.com/Ji1A9td.png)


Esta es la vista de nuestro modulo, en el que tenemos creado varios registros en los cuales hay varias ubicaciones.

Vistas Heredadas
================
En nuestro modulo de posicionamiento, hemos creado una clase en la cual tiene una relacion One2many con el campo pos, para posteriormente crear una vista heredada en el formulario "stock.view_location_form" del modulo "stock.location" y tambien hemos creado una vista donde luego se insertara en el modelo donde queremos hacer la heredación

Vista del modelo:
![Imgur](https://i.imgur.com/CPIpwEx.png)

Vista del XML: 
![Imgur](https://i.imgur.com/Wx08RYF.png)

Esto lo que hace es: En el modelo creamos la clase "posicionamientoinventarioi" y en ella el campo con la relacion One2many tambien introducimos dos campos que son "_inherit" que es donde pondremos el nombre del modelo al que queremos introducir la heredación y el campo "_name" que si nos fijamos bien lo hemos llamado igual que el campo "_inherit" ya que si no tenemos el mismo nombre, nos fallará. Luego en la vista hemos creado una expresion xpath en la cual le estamos diciendo que vaya a la ruta //form/group/group y que el nombre de dicho grupo es "localization" y que dentro de el, queremos añadir el campo que hemos creado anteriormente.

Grupos
======


Hemos creado un grupo para el módulo de inventario el cual hemos llamado
Inventario/Jefes, en el irán aquellas personas que sean los administradores del
inventario.


![Imgur](https://i.imgur.com/Bd44J7y.png)


En este caso tengo a un usuario llamado Paco el cual es el Jefe de los
inventarios de nuestra empresa.