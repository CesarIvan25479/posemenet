/* ===== EMENETPOS MAIN APP ===== */

import { renderHeader, updateHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';

// Global functions (accessible from HTML)
function comprarTimbres() {
    alert('Redirigiendo a compra de timbres fiscales...\n\nEn una aplicación real, esto te llevaría a un carrito de compras.');
}

// Make function global for onclick handlers
window.comprarTimbres = comprarTimbres;

/**
 * Page configurations - EDIT HERE TO CONFIGURE EACH PAGE
 */
const pageConfigs = {
    'view.html': {
        title: 'emenetPOS tu mejor opción',
        subtitle: 'Gestiona tus ventas, inventarios y más.',
        customClass: ''
    },
    'software.html': {
        title: 'Software emenetPOS',
        subtitle: 'El mejor sistema para tu negocio',
        customClass: ''
    },
    'recargas.html': {
        title: 'Recargas de Tiempo Aire',
        subtitle: 'Aumenta tus ganancias ofreciendo recargas y servicios de pago',
        customClass: 'recargas-header'
    },
    'facturacion.html': {
        title: 'Facturación Electrónica',
        subtitle: 'Cumple con las normativas fiscales automáticamente',
        customClass: 'facturacion-header'
    },
    'servicios.html': {
        title: 'Servicios en la Nube',
        subtitle: 'Accede a tu información desde cualquier lugar',
        customClass: 'servicios-header'
    },
    'modificaciones.html': {
        title: 'Modificaciones a la Medida',
        subtitle: 'El sistema que se adapta a tu negocio',
        customClass: 'modificaciones-header'
    },
    'contacto.html': {
        title: 'Nuestro Contacto',
        subtitle: 'La mejor decisión emenetPOS',
        customClass: ''
    }
};

/**
 * Get current page configuration
 */
function getCurrentPageConfig() {
    const pathname = window.location.pathname;
    const pageName = pathname.split('/').pop() || 'view.html';

    // Try exact match first
    if (pageConfigs[pageName]) {
        return pageConfigs[pageName];
    }

    // Default to view.html config
    return pageConfigs['view.html'];
}

/**
 * Initialize menu event listeners
 */
function initMenuListeners() {
    // Add event listeners to dropdown links
    const dropdownLinks = document.querySelectorAll('.dropdown-content a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Allow normal navigation for direct href links
            // No need for preventDefault since we want to navigate
        });
    });
}

/**
 * Initialize the application
 */
function init() {
    // Render reusable components
    renderHeader();
    renderFooter();

    // Update header content for current page
    const config = getCurrentPageConfig();
    updateHeader(config.title, config.subtitle, config.customClass);

    // Initialize menu listeners
    initMenuListeners();
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', init);