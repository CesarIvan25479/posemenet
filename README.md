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

## Features

- **Modular CSS Architecture**: Organized into base, components, and pages
- **Reusable Components**: Navigation, buttons, cards, footer are reusable
- **Dynamic Product Loading**: Products load dynamically via JavaScript modules
- **Responsive Design**: Fully responsive for mobile, tablet, and desktop
- **CSS Variables**: Easy customization via CSS custom properties

## Development

### Adding New Products

1. Add product data to `js/components/router.js`
2. Create a layout loader function in `js/components/layout-loader.js` (if needed)
3. Import and register the product in the products object

### Customizing Styles

Edit `css/base/variables.css` to change:
- Colors (primary, text, backgrounds)
- Spacing units
- Border radius
- Shadows

### Running Locally

Simply open `view.html` in a browser, or use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (with http-server)
npx http-server
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2026 emenetPOS
