# emenetPOS - Sitio Web Corporativo

<div align="center">
  <img src="front/public/images/emenet-logo.png" alt="emenetPOS Logo" width="200">
  
  **Sistema de Punto de Venta y Soluciones Comerciales**
  
  [Ver Demo](#) | [Reportar Bug](#) | [Solicitar Feature](#)
</div>

---

## 📋 Descripción

emenetPOS es el sitio web corporativo de **emenet comunicaciones**, una empresa especializada en comunicaciones distribuidora de internet, developer, soluciones de punto de venta, accesorios tecnológicos. Este proyecto está desarrollado con Angular 19 y ofrece una experiencia moderna, responsiva y profesional.

## ✨ Características

- 🏠 **Página de Inicio** - Landing page con información general y carrusel de productos
- 💻 **Software emenetPOS** - Información sobre el sistema de punto de venta
- 🛒 **Accesorios** - Catálogo de accesorios y equipos tecnológicos
- 📄 **Facturación Electrónica** - Servicios de facturación electrónica
- 📱 **Recargas de Tiempo Aire** - Sistema de recargas móviles
- ☁️ **Servicios en la Nube** - Soluciones cloud para negocios
- 🔧 **Modificaciones a la Medida** - Desarrollo de soluciones personalizadas
- 📞 **Contacto** - Formulario de contacto y información de la empresa

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| [Angular](https://angular.io/) | 19.2.0 | Framework principal |
| [TypeScript](https://www.typescriptlang.org/) | 5.7.2 | Lenguaje de programación |
| [GSAP](https://greensock.com/gsap/) | 3.14.2 | Animaciones avanzadas |
| [OGL](https://ogl.dev/) | 1.0.11 | Gráficos 3D |
| [Font Awesome](https://fontawesome.com/) | 6.5.0 | Iconografía |
| CSS3 | - | Estilos y animaciones |

## 📁 Estructura del Proyecto

```
posemenet/
├── front/                          # Aplicación Angular
│   ├── public/                     # Archivos estáticos
│   │   └── images/                 # Imágenes del sitio
│   ├── src/                        # Código fuente
│   │   ├── app/
│   │   │   ├── components/         # Componentes de páginas
│   │   │   │   ├── pages/          # Páginas del sitio
│   │   │   │   │   ├── home/       # Página de inicio
│   │   │   │   │   ├── software/   # Software emenetPOS
│   │   │   │   │   ├── accesorios/ # Catálogo de accesorios
│   │   │   │   │   ├── facturacion/# Facturación electrónica
│   │   │   │   │   ├── tiempo-aire/# Recargas de tiempo aire
│   │   │   │   │   ├── nube/       # Servicios en la nube
│   │   │   │   │   ├── modificaciones/ # Modificaciones a la medida
│   │   │   │   │   └── contacto/   # Formulario de contacto
│   │   │   │   └── product-modal/  # Modal de productos
│   │   │   ├── layout/             # Componentes de layout
│   │   │   │   ├── header/         # Encabezado y navegación
│   │   │   │   └── footer/         # Pie de página
│   │   │   ├── app.component.ts    # Componente raíz
│   │   │   ├── app.config.ts       # Configuración de la app
│   │   │   └── app.routes.ts       # Rutas de la aplicación
│   │   ├── index.html              # HTML principal
│   │   ├── main.ts                 # Punto de entrada
│   │   └── styles.css              # Estilos globales
│   ├── angular.json                # Configuración de Angular
│   ├── package.json                # Dependencias
│   └── tsconfig.json               # Configuración de TypeScript
└── README.md                       # Documentación
```

## 🚀 Instalación y Ejecución

### Prerrequisitos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [npm](https://www.npmjs.com/) (v9 o superior)
- [Angular CLI](https://angular.io/cli) (v19 o superior)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/posemenet.git
   cd posemenet
   ```

2. **Navegar al directorio del frontend**
   ```bash
   cd front
   ```

3. **Instalar dependencias**
   ```bash
   npm install
   ```

4. **Ejecutar en modo desarrollo**
   ```bash
   npm start
   # o
   ng serve
   ```

5. **Abrir en el navegador**
   ```
   http://localhost:4200
   ```

### Comandos Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor de desarrollo |
| `npm run build` | Compila el proyecto para producción |
| `npm run watch` | Compila y observa cambios |
| `npm test` | Ejecuta los tests unitarios |

## 📱 Características Responsivas

El sitio está completamente adaptado para dispositivos móviles:

- **Menú hamburguesa** con animaciones suaves
- **Diseño adaptativo** para tablets y smartphones
- **Iconos de redes sociales** en el menú móvil
- **Navegación optimizada** para pantallas táctiles

## 🎨 Diseño

- **Paleta de colores corporativa**: Azul oscuro (#001845, #003796)
- **Tipografía**: Outfit (navegación) y Open Sans (contenido)
- **Iconografía**: Font Awesome 6
- **Animaciones**: Transiciones suaves y efectos hover

## 📞 Contacto

**emenet comunicaciones**

- 📱 WhatsApp: +52 713 133 4557
- 📘 Facebook: [emenet comunicaciones](https://www.facebook.com/profile.php?id=100077730288126)
- 📸 Instagram: [@mnetandador](https://www.instagram.com/mnetandador)

## 📄 Licencia

Este proyecto es propiedad de **emenet comunicaciones**. Todos los derechos reservados © 2026.

---

<div align="center">
  Desarrollado con ❤️ por emenet comunicaciones
</div>
