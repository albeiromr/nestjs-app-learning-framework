# Carpeta orm-cli

Esta carpeta existe debido a que nestjs no soporta las migraciones de base de datos cuando usamos un **orm**. Para realizar migraciones con **typeorm** debemos usar su **CLI** y el  **CLI**  de **typeorm** necesita el archivo **data-source-options.ts** que contiene la configuración con toda la información de conexión a la base de datos. el archivo **data-source-options.ts** es consumido por el cli cuando se compila a javascript **data-source-options.js** y se almacena en la carpeta **dist** 

En el **package.json** en el script **"typeorm"** está referenciada la ruta de el archivo de configuración, si se mueve la ubicación del archivo **data-source-options.ts** también se debe actualizar en el package.json la referencia al archivo **data-source-options.js**



---

## Links documentación:

- documentación oficial del cli https://typeorm.io/using-cli 

- documentación oficial de las migraciones con typeorm https://typeorm.io/migrations
