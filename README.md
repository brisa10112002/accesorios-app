# MAJOMO | Tienda de accesorios

Proyecto final de **Algoritmos y Estructuras de Datos III**. Es una tienda online de accesorios y bijouterie hecha en **Angular 21**, con catálogo, carrito, panel de administración y login con roles.

- **Aplicación publicada:** https://accesorios-app-six.vercel.app
- **Repositorio:** https://github.com/brisa10112002/accesorios-app

## Usuarios de prueba

| Rol | Usuario | Contraseña | Qué puede hacer |
| --- | --- | --- | --- |
| Administrador | `admin` | `1234` | Crear, editar y eliminar productos desde el panel de admin |
| Cliente | `cliente` | `1234` | Comprar, usar el carrito y guardar favoritos |

También se puede crear una cuenta nueva desde **Registrate** (siempre con rol cliente).

## Cómo correrlo en la compu

Requisitos: Node.js y Angular CLI.

```bash
npm install
ng serve
```

Después abrir `http://localhost:4200/`.

## Cómo generar el build

```bash
ng build
```

Los archivos quedan en `dist/accesorios-app/browser`. La aplicación está publicada en Vercel, que hace el build sola con cada push a `main`.

## Qué probar

1. **Sin sesión:** recorrer el inicio, el catálogo (buscador, filtros, orden, "Solo con stock") y el detalle de un producto. Entrar a una dirección que no existe para ver la página 404.
2. **Rutas protegidas:** sin sesión, entrar a `/carrito` o `/admin` (redirigen al login).
3. **Cliente:** iniciar sesión con `cliente / 1234`, agregar productos al carrito, cambiar cantidades y finalizar la compra eligiendo provincia y localidad. El stock se descuenta en la API.
4. **Administrador:** iniciar sesión con `admin / 1234` y hacer el CRUD completo: crear un producto (con foto), editarlo y eliminarlo. Probar el formulario con datos inválidos para ver los mensajes de error.
5. **Roles:** con `cliente`, escribir `/admin` en la barra de direcciones (redirige al inicio).
6. **Cerrar sesión:** vuelve al inicio público y se vacían el carrito y los favoritos.

## Tecnologías y servicios

- **Angular 21** con componentes standalone, signals y RxJS
- **Angular Material** (tabla, formularios, diálogos y avisos)
- **MockAPI** como API REST para productos y usuarios
- **Georef** (API del gobierno argentino) para provincias y localidades del envío
- **Cloudinary** para subir las fotos de los productos
- **Vercel** para la publicación

## Organización del proyecto

```
src/app/
  features/   una carpeta por funcionalidad (inicio, catalogo, admin, auth, carrito, favoritos, no-encontrado)
  shared/     lo compartido: services, models, guards, pipes, directives, validators, components
```
