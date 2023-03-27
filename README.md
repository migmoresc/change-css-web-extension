# change-css-web-extension
Modificaciones al css de una web a través de una extensión

No acepto pull request / I don't accept pull request

¿Cómo se usa?

1. Descargamos todos los archivos en una carpeta del disco duro.
2. Abrimos el archivo manifest.json con el bloc de notas y en la parte de:
"matches": [
    "https://www.google.es/*",
    "https://www.marca.com/*"
 ],
 Sustituimos por nuestras direcciones web en las que queramos modificar el CSS.
- Abrimos Google Chrome y vamos al gestor de extensiones, podemos escribir en la barra de navegación chrome://extensions/ y pulsamos la tecla Enter / Intro.
3. Activamos el modo desarrollador .
4. Pulsamos en cargar descomprimida y seleccionamos la carpeta anterior donde hemos guardado los archivos.
5. Ya tenemos instalada la extensión.
6. Ahora cada vez que accedamos a la web que hemos escrito en el archivo manifest.json, podremos pulsar en el icono de nuestra extensión y escribir nuestras reglas CSS una por una con el formato siguiente:
selector {
	propiedad: valor;
	propiedad: valor;
}

Si pulsamos en Ejecutar se aplicará y podremos ver si en la página se ha producido el cambio. Si no lo ha hecho es porque el selector está mal apuntado.
Cuando sepamos que es el correcto, pulsaremos en el botón + y se guardará.
Si queremos eliminar un selector solo tenemos que "clickar" en el selector y pulsar sobre el botón - .
Si pulsamos en borrar todo se eliminarán todos los selectores.


CHANGELOG

Versión 1.0

	Extensión funciona cuando todo se hace bien.


TO DO

- Refactorizar todo.
- Ejecutar los estilos al iniciar el navegador.
- Control de errores cuando el usuario escribe mal algo.
- Conectarse a una web para traerse estilos.