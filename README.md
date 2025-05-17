# Autogestion de Encuestas

Autogestión de encuestas es una aplicación que fue concebida como una actualización respecto a su versión anterior. Esta aplicación permite que los clientes puedan diseñar, construir, administrar y distribuir sus propias encuestas a través de los distintos canales de distribución disponibles.

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 13.3.11.

## Instalación del proyecto

1. Clone el repositorio desde Bitbucket con el siguiente comando
```
git clone git@bitbucket.org:plugresearchdevelopment/surveys-management-ng.git
```
2. Instale las dependencias con el comando
```
npm install
```
>Nota: Nunca ejecute el comando de actualización de dependencias

3. Ejecute el comando `ng serve -o` cuanto esté seguro de que el backend esté funcionando

## Obtener el proyecto compilado
Para realizar el compilado del proyecto y embeberlo en VoC, debe ejecutar el siguiente comando

Actualizar el comando si cambia
```
ng build --prod --base-href /surveysmanagement/
```

## Ejecución de las pruebas unitarias
Para ejecutar las pruebas es importante contar con el navegador Chrome.

Para realizar la ejecución de las pruebas unitarias del proyecto, utilice el comando. Este siempre estará a la escucha de todas las pruebas. 
```
ng test
```

Si desea ejecutar una sola vez los tests, ejecute el siguiente comando:
```
ng test --no-watch
```

En ambos casos obtendrá un output similar a este
```
SUMMARY:
✔ 2 tests completed
✖ 1 test failed

FAILED TESTS:
  AppComponent
    ✖ should render title
      Chrome 115.0.0.0 (Linux x86_64)
    Error: Expected undefined to contain 'library-project app is running!'.
        at <Jasmine>
        at UserContext.<anonymous> (src/app/app.component.spec.ts:33:66)
        at _ZoneDelegate.invoke (node_modules/zone.js/fesm2015/zone.js:372:1)
        at ProxyZoneSpec.onInvoke (node_modules/zone.js/fesm2015/zone-testing.js:287:1)
```

### Generar reporte de cobertura
Para generar el reporte de cobertura de las pruebas unitarias, ejecute el siguiente comando:
```
ng test --no-watch --code-coverage
```

Como resultado de su ejecución, se genera un directorio en la raíz del proyecto con el nombre de **coverage**. Si desea visualizarlo, debe ingresar a ese directorio, buscar el archivo  **.html** del componente del cual se hicieron las pruebas en un navegador web.
