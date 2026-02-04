# emenetPOS Website

Website for emenetPOS point of sale system.

## Project Structure

```
posemenet/
├── css/
│   ├── base/
│   │   ├── variables.css     # CSS variables (colors, spacing, shadows)
│   │   ├── reset.css         # Reset and base styles
│   │   └── utilities.css     # Utility classes and animations
│   ├── components/
│   │   ├── navigation.css    # Navigation and dropdown menus
│   │   ├── buttons.css       # Button styles
│   │   ├── footer.css        # Footer component
│   │   ├── cards.css         # Card components (services, features)
│   │   └── sections.css      # Section layouts (hero, features, CTA)
│   ├── pages/
│   │   └── facturacion.css  # Facturación page specific styles
│   ├── responsive.css        # Media queries for all devices
│   └── main.css              # Main stylesheet (imports all)
├── js/
│   ├── components/
│   │   ├── router.js         # Product data and routing configuration
│   │   └── layout-loader.js  # Layout loading functions
│   └── menu.js               # Main menu initialization
├── images/                       # All project images
├── view.html                    # Home page
├── software.html                # Software product page
└── contacto.html                # Contact page
```

# Características

- **Arquitectura CSS modular**: Organizada en base, componentes y páginas
- **Componentes reutilizables**: Navegación, botones, tarjetas y pie de página reutilizables
- **Carga dinámica de productos**: Los productos se cargan dinámicamente mediante módulos JavaScript
- **Diseño responsivo**: Totalmente responsivo para dispositivos móviles, tabletas y computadoras de escritorio
- **Variables CSS**: Fácil personalización mediante propiedades personalizadas CSS

## Desarrollo

### Añadir nuevos productos

1. Añadir los datos del producto a `js/components/router.js`
2. Crear una función de carga de diseño en `js/components/layout-loader.js` (si es necesario)
3. Importar y registrar el producto en el objeto de productos

### Personalizar estilos

Editar `css/base/variables.css` para cambiar:
- Colores (primario, texto, fondos)
- Unidades de espaciado
- Radio del borde
- Sombras

### Ejecución local

Simplemente abrir `view.html` en un navegador o usar un servidor local:

```bash
# Usando Python
python -m http.server 8000

# Usando Node.js (con http-server)
npx http-server
```

## Compatibilidad con navegadores

- Chrome (última versión)
- Firefox (última versión)
- Safari (última versión)
- Edge (última versión)

## Licencia

© 2026 emenetPOS