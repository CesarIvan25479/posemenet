/* ===== HEADER COMPONENT ===== */

const headerHTML = `
<header id="main-header">
    <nav>
        <div class="nav-logo">
            <a href="view.html">
                <img src="images/emenetLogoN.png" alt="Logo Emenet">
            </a>
        </div>

        <div class="nav-menu">
            <div class="dropdown">
                <input type="checkbox" id="productos-menu" class="dropdown-toggle">
                <label for="productos-menu" class="dropdown-label">Productos</label>
                <div class="dropdown-content" id="productos-dropdown">
                    <!-- Links will be dynamically loaded -->
                </div>
            </div>
            <a href="contacto.html" class="nav-link">Contacto</a>
        </div>
    </nav>

    <section class="textos-header" id="textos-header">
        <!-- Dynamic content -->
    </section>

    <div class="wave" style="height: 150px; overflow: hidden;">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" style="height:100%; width: 100%;">
            <path d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                style="stroke: none; fill: #fff;"></path>
        </svg>
    </div>
</header>
`;

// Product links configuration - EDIT HERE TO ADD/REMOVE PRODUCTS
const productLinks = [
    { href: 'software.html', text: 'Software emenetPOS' },
    { href: 'recargas.html', text: 'Recargas de Tiempo Aire' },
    { href: 'facturacion.html', text: 'Facturación Electrónica' },
    { href: 'servicios.html', text: 'Servicios en la Nube' },
    { href: 'modificaciones.html', text: 'Modificaciones a la Medida' },
    { href: 'modificaciones.html', text: 'Modificaciones a la Medida' }
];

/**
 * Generate dropdown links HTML
 */
function getDropdownLinks() {
    return productLinks.map(link => {
        return `<a href="${link.href}">${link.text}</a>`;
    }).join('');
}

/**
 * Render header component
 */
function renderHeader() {
    const headerContainer = document.getElementById('header-container');
    if (headerContainer) {
        headerContainer.innerHTML = headerHTML;

        // Render dropdown links
        const dropdownContainer = document.getElementById('productos-dropdown');
        if (dropdownContainer) {
            dropdownContainer.innerHTML = getDropdownLinks();
        }
    }
}

/**
 * Update header content (title and subtitle)
 */
function updateHeader(title, subtitle, customClass = '') {
    const header = document.getElementById('main-header');
    if (header) {
        // Remove all custom header classes
        header.className = '';
        // Add custom class if provided
        if (customClass) {
            header.classList.add(customClass);
        }
    }

    const textosHeader = document.getElementById('textos-header');
    if (textosHeader) {
        textosHeader.innerHTML = `
            <div>
                <h1>${title}</h1>
                <h2>${subtitle}</h2>
            </div>
        `;
    }
}

// Export for use in other modules
export { renderHeader, updateHeader, productLinks };