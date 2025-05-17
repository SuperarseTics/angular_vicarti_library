# Autogestión de encuestas - Base de conocimiento

El presente documento tiene la finalidad de servir como una base de conocimientos para documentar las configuraciones realizadas.

## Integrar estilos de ng zorro para el renderizado de componentes
https://ng.ant.design/docs/customize-theme/en

## Cambiar de idioma los componentes de ng zorro
https://ng.ant.design/docs/i18n/en

## Configurar Tailwind en Angular
https://www.amadousall.com/how-to-add-tailwind-css-to-your-angular-application/

## Integración de ng zorro y tailwind para evitar conflictos de estilos
1. Instalar ng zorro
2. Configurar los estilos según la documentación de ng zorro
3. Instalar tailwindcss
4. En el archivo de configuración de tailwind tener la siguiente configuración base
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins:{
    //Preflight is a feature that applies default styles to HTML elements. Set it to false to prevent ng zorro overwrite styles
    preflight:false,
  }
}

```
https://daiyis.medium.com/angular-11-config-tailwind-css-with-ng-zorro-574655e785bc

## Configurar Chrome en WSL para correr los tests en Homely

Ejecutar el comando para bajar Chrome
```
sudo wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
```

Instalar chrome en wsl
```
sudo apt -y install ./google-chrome-stable_current_amd64.deb
```

Se comprueba la instalación
```
google-chrome --version
```

## Si ng zorro da problemas de que el icono no existe, a pesar de que si pertenece a la libreria
https://ng.ant.design/components/icon/en#static-loading-and-dynamic-loading