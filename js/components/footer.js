/* ===== FOOTER COMPONENT ===== */

const footerHTML = `
<footer>
    <div class="contenedor-footer">
        <div class="content-foo">
            <h4>Teléfono</h4>
            <p>123456</p>
        </div>
        <div class="content-foo">
            <h4>Correo</h4>
            <p>correo.emenet@gmail.com</p>
        </div>
        <div class="content-foo">
            <h4>Ubicación</h4>
            <p>Avenida...</p>
        </div>
    </div>
    <h2 class="titulo-final">&copy; emenetPOS | 2026</h2>
</footer>
`;

// Footer configuration - EDIT HERE TO UPDATE FOOTER INFO
const footerConfig = {
    phone: '123456',
    email: 'correo.emenet@gmail.com',
    address: 'Avenida...',
    year: '2026'
};

/**
 * Generate footer HTML with custom config
 */
function getFooterHTML(config = footerConfig) {
    return `
<footer>
    <div class="contenedor-footer">
        <div class="content-foo">
            <h4>Teléfono</h4>
            <p>${config.phone}</p>
        </div>
        <div class="content-foo">
            <h4>Correo</h4>
            <p>${config.email}</p>
        </div>
        <div class="content-foo">
            <h4>Ubicación</h4>
            <p>${config.address}</p>
        </div>
    </div>
    <h2 class="titulo-final">&copy; emenetPOS | ${config.year}</h2>
</footer>
    `;
}

/**
 * Render footer component
 */
function renderFooter() {
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        footerContainer.innerHTML = getFooterHTML();
    }
}

// Export for use in other modules
export { footerHTML, getFooterHTML, renderFooter, footerConfig };