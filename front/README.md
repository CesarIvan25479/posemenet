# emenetPOS — Front-end

Este proyecto es el front-end oficial de **emenetPOS**, una solución integral de software punto de venta impulsada por MyBusiness POS. Construido con Angular 19.

## 🚀 Actualizaciones Recientes (Marzo 2026)

Se ha implementado un rediseño completo del sistema visual y de experiencia de usuario, adoptando una estética **Apple-style: minimalista, profesional y de alto impacto**.

### 🎨 Sistema de Diseño
- **Paleta de Colores**: Basada en los azules corporativos del proyecto (`#003796` y `#001b4f`) sobre capas de blanco y gris claro (`#f5f5f7`).
- **Tipografía**: Integración de Google Fonts (**Sora** para encabezados y **DM Sans** para cuerpo de texto).
- **Iconografía**: Uso de FontAwesome 6 para una interfaz intuitiva.

### ✨ Nuevas Funcionalidades y Mejoras
1. **Rediseño de la Página de Software**: Nueva sección de estadísticas y CTA con contadores animados y diseño ultra-limpio.
2. **Sistema de Timbres Fiscales**: 
   - Modal interactivo con selección de paquetes.
   - Actualización dinámica de precios y descripciones.
3. **Banners de Promoción**: Implementados en las secciones de Facturación, Tiempo Aire, Nube y Modificaciones con diseño consistente y profesional.
4. **Sistema de Animaciones Globales (Scroll Reveal)**:
   - Los elementos aparecen en cascada al hacer scroll hacia abajo.
   - Animación de contadores numéricos automática.
   - Loader inteligente que desaparece cuando la aplicación está lista para interactuar.
5. **Optimización Responsive**: Corrección de desbordamientos horizontales y mejora del layout en dispositivos móviles y tablets.

---

## 🛠 Instalación y Desarrollo

### Requisitos
- [Node.js](https://nodejs.org/) (Versión recomendada LTS)
- [Angular CLI](https://github.com/angular/angular-cli) versión 19.2.14

### Servidor de Desarrollo
Para iniciar el servidor local, ejecuta:
```bash
ng serve
```
Navega a `http://localhost:4200/`. El sitio se recargará automáticamente al detectar cambios.

### Generación de Componentes
```bash
ng generate component nombre-del-componente
```

### Construcción para Producción
```bash
ng build
```
Los archivos optimizados se guardarán en el directorio `dist/`.

---

## 🏗 Estructura del Proyecto
- `src/app/components/pages/`: Contiene las vistas principales (Software, Facturación, Nube, etc.).
- `src/styles.css`: Sistema de animaciones globales y tokens de diseño.
- `src/index.html`: Lógica de Loader y IntersectionObserver para animaciones de scroll.

---

## 🔐 Créditos
Desarrollado para **3MNET / emenetPOS**.
