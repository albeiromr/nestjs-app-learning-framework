# Carpeta migrations

Esta carpeta existe para guardar los archivos de migración que se generan cada vez que usamos el  **CLI** de **typeorm** para crear una nueva migración del eschema de base de datos. así que cada vez que escribamos un comando para crear una migración debemos escribir la ruta de esta carpeta.

las migraciones de esta carpeta son consumidas por el **CLI** de **typeorm** cuando esl proyecto es compilado a javascript.

El archivo de configuración de typeorm **data-source-options.ts** tiene una referencia a la carpeta **migrations** mediante una variable de entorno, en este caso **dist/migrations** y el archivo **.gitignore** también tiene una referencia a la carpeta **migrations**.

Ojo!!, si se mueve la carpeta **migrations** de ubicación o se le cambia el nombre hay que actualizar también la variable de entorno y el **.gitIgnore**.

---

## Comandos para correr migraciones

### Crear migración

para crear una nueva migración usamos el siguiente comando: **npm run generate:environmen_de_migracion:migration -- src/migrations/nombre_de_migracion**



### Ejecutar migración

para ejecutar las migraciones usamos el siguiente comando: **npm run run:environmen_de_migracion:migration**



### Revertir Migración

para revertir una migración usamos el siguiente comando: **npm run revert:environmen_de_migracion:migration**

---

## Copia de scripts del cli

Configurar el **CLI** para hacer las migraciones es complicado y no hay información clara al respecto. por lo cual a continuación encontramos una copia de los scripts que al momento de la creación de este documento están funcionales.

```json
 "typeorm": "npm run build && typeorm -d dist/orm-cli/data-source-options.js",
 "generate:dev:migration": "cross-env NODE_ENV=dev npm run typeorm -- migration:generate",
 "run:dev:migration": "cross-env NODE_ENV=dev npm run typeorm -- migration:run",
 "revert:dev:migration": "cross-env NODE_ENV=dev npm run typeorm -- migration:revert",
 "generate:stage:migration": "cross-env NODE_ENV=stage npm run typeorm -- migration:generate",
 "run:stage:migration": "cross-env NODE_ENV=stage npm run typeorm -- migration:run",
 "revert:stage:migration": "cross-env NODE_ENV=stage npm run typeorm -- migration:revert",
 "generate:prod:migration": "cross-env NODE_ENV=prod npm run typeorm -- migration:generate",
 "run:prod:migration": "cross-env NODE_ENV=prod npm run typeorm -- migration:run",
 "revert:dprod:migration": "cross-env NODE_ENV=prod npm run typeorm -- migration:revert",
```

---

## Links documentación:

- documentación oficial del cli https://typeorm.io/using-cli

- documentación oficial de las migraciones con typeorm https://typeorm.io/migrations


