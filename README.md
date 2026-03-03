# emenetPOS - Sitio Web Corporativo

<div align="center">
  <img src="front/public/images/emenet-logo.png" alt="emenetPOS Logo" width="200">
  
  **Sistema de Punto de Venta y Soluciones Comerciales**
  
  [Ver Demo](#) | [Reportar Bug](#) | [Solicitar Feature](#)
</div>

---

## 📋 Descripción

emenetPOS es el sitio web corporativo de **emenet comunicaciones**, una empresa especializada en comunicaciones distribuidora de internet, developer, soluciones de punto de venta, accesorios tecnológicos. Este proyecto está desarrollado con Angular 19 y ofrece una experiencia moderna, responsiva y profesional basada en una estética **Apple-style**.

## ✨ Características y Secciones

- 🏠 **Página de Inicio** - Landing page con información general y carrusel de productos.
- 💻 **Software emenetPOS** - Rediseño premium con estadísticas animadas y CTA profesional.
- 🏪 **Giros** - Sección dedicada a los diferentes giros compatibles (Farmacias, Abarrotes, Papelerías, etc.).
- 🛒 **Accesorios** - Catálogo de accesorios y equipos tecnológicos con animaciones de entrada.
- 📄 **Facturación Electrónica** - Servicios de facturación con nuevo modal interactivo de paquetes de timbres.
- 📱 **Recargas de Tiempo Aire** - Sistema de recargas móviles integrado.
- ☁️ **Servicios en la Nube** - Soluciones cloud para sincronización multisucursal.
- 🔧 **Modificaciones a la Medida** - Desarrollo de soluciones personalizadas.
- 📞 **Contacto** - Formulario de contacto e información de la empresa.

## 🚀 Actualizaciones Recientes (Marzo 2026)

Se ha implementado una gran actualización de diseño y funcionalidad:

- **Rediseño Style**: Nueva estética minimalista y profesional usando la paleta corporativa `#003796` y `#001b4f`.
- **Nuevo Modal de Timbres**: Sistema interactivo en la sección de facturación para elegir paquetes de timbres fiscales con actualización de precios en tiempo real.
- **Scroll Reveal System**: Animaciones globales en cascada que se activan al hacer scroll, mejorando la retención visual.
- **Contadores Animados**: Las estadísticas de clientes y empresas ahora se animan automáticamente al entrar en el viewport.
- **Google Fonts**: Integración de **Sora** (encabezados) y **DM Sans** (cuerpo) para una legibilidad superior.
- **Loader Inteligente**: Nuevo sistema de carga que se oculta suavemente solo cuando Angular ha terminado de renderizar la aplicación.

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Descripción |
|------------|---------|-------------|
| [Angular](https://angular.io/) | 19.2.0 | Framework principal |
| [TypeScript](https://www.typescriptlang.org/) | 5.7.2 | Lenguaje de programación |
| [Google Fonts](https://fonts.google.com/) | - | Sora & DM Sans |
| [Font Awesome](https://fontawesome.com/) | 6.5.0 | Iconografía |
| CSS3 | - | Estilos Apple-Style y animaciones Custom |
| IntersectionObserver | API | Sistema de Scroll Reveal y Contadores |

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
│   │   │   │   │   ├── software/   # Software emenetPOS (Rediseñado)
│   │   │   │   │   ├── giros/      # Giros (Nuevo)
│   │   │   │   │   ├── accesorios/ # Catálogo de accesorios
│   │   │   │   │   ├── facturacion/# Facturación (Nuevo Modal Timbres)
│   │   │   │   │   ├── tiempo-aire/# Recargas de tiempo aire
│   │   │   │   │   ├── nube/       # Servicios en la nube
│   │   │   │   │   ├── modificaciones/ # Modificaciones a la medida
│   │   │   │   │   └── contacto/   # Formulario de contacto
│   │   │   │   └── product-modal/  # Modal de productos
│   │   │   ├── layout/             # Componentes de layout
│   │   │   │   ├── header/         # Encabezado y navegación
│   │   │   │   └── footer/         # Pie de página
│   │   │   ├── app.component.ts/css/html # Componente raíz
│   │   │   ├── app.config.ts       # Configuración de la app
│   │   │   └── app.routes.ts       # Rutas de la aplicación
│   │   ├── index.html              # HTML con Loader y Scroll Scripts
│   │   ├── main.ts                 # Punto de entrada
│   │   └── styles.css              # Estilos Apple-Style y animaciones
│   ├── angular.json                # Configuración de Angular
│   ├── package.json                # Dependencias
│   └── tsconfig.json               # Configuración de TypeScript
└── README.md                       # Documentación principal
```

## 🚀 Instalación y Ejecución

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/posemenet.git
   cd posemenet
   ```

2. **Navegar e instalar dependencias**
   ```bash
   cd front
   npm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   ng serve
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:4200
   ```

## 📱 Características Responsivas e Interactivas

El sitio está optimizado para dispositivos móviles con:

- **Overflow-x Guard**: Protección global contra desbordamientos laterales.
- **Scroll Animations**: Transiciones optimizadas para pantallas táctiles.
- **Responsive Layout**: Columnas y tipografía que se adaptan dinámicamente (`clamp`).
- **Navegación Táctil**: Menú móvil con animaciones fluidas.

## 🎨 Diseño Visual

- **Estética**: Inspirada en Apple (Limpia, balanceada, tipografía cuidada).
- **Colores corporativos**: Azul profundo (#003796) y Marino (#001b4f).
- **Efectos**: Sombras suaves (`box-shadow`), degradados sutiles y transiciones `cubic-bezier`.

## 📞 Contacto

**emenet comunicaciones**

- 📱 WhatsApp: +52 713 133 4557
- 📘 Facebook: [emenet comunicaciones](https://www.facebook.com/profile.php?id=100077730288126)
- 📸 Instagram: [@mnetandador](https://www.instagram.com/mnetandador)

## 📄 Licencia

Este proyecto es propiedad de **emenet comunicaciones**. Todos los derechos reservados © 2026.

---

<div align="center">
  Desarrollado con ❤️ para emenet comunicaciones
</div>
