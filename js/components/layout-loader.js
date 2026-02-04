/* ===== LAYOUT LOADERS ===== */

/**
 * Load default layout (for Home, Recargas, Servicios, Modificaciones)
 */
export function loadDefaultLayout(product) {
    // Update browser title
    document.title = product.title;

    // Update header
    const textoHeader = document.querySelector('.textos-header');
    if (textoHeader) {
        textoHeader.innerHTML = `
            <div>
                <h1>${product.headerTitle}</h1>
                <h2>${product.headerSubtitle}</h2>
            </div>
        `;
    }

    // Update first services section
    const firstServiciosSection = document.querySelector('.servicios');
    if (firstServiciosSection && product.sections.servicios) {
        const serviciosHTML = product.sections.servicios.map(servicio => `
            <div class="servicio-ind">
                <img src="${servicio.img}" alt="${servicio.title}">
                <h3>${servicio.title}</h3>
                <p>${servicio.description}</p>
            </div>
        `).join('');

        const contenedorServicios = firstServiciosSection.querySelector('.servicio-cont');
        if (contenedorServicios) {
            contenedorServicios.innerHTML = serviciosHTML;
        }

        // Update section title
        const tituloServicios = firstServiciosSection.querySelector('.titulo');
        if (tituloServicios) {
            tituloServicios.textContent = 'Características principales';
        }
    }

    // Update about section
    const sobreNosotros = document.querySelector('.sobre-nosotros');
    if (sobreNosotros && product.sections.sobreNosotros) {
        const sobreNosotrosHTML = `
            <img src="${product.sections.sobreNosotros.img}" alt="" class="imagen-about-us">
            <div class="contenido-textos">
                <h1>${product.sections.sobreNosotros.title}</h1>
                <p>${product.sections.sobreNosotros.description}</p>
            </div>
        `;

        const contenedorSobreNosotros = sobreNosotros.querySelector('.contenedor-sobre-nosotros');
        if (contenedorSobreNosotros) {
            contenedorSobreNosotros.innerHTML = sobreNosotrosHTML;
        }
    }

    // Update second services section (Mas soluciones)
    const serviciosSections = document.querySelectorAll('.servicios');
    if (serviciosSections.length >= 2 && product.sections.masServicios) {
        const secondServiciosSection = serviciosSections[1];
        const masServiciosHTML = product.sections.masServicios.map(servicio => `
            <div class="servicio-ind">
                <img src="${servicio.img}" alt="${servicio.title}">
                <h3>${servicio.title}</h3>
                <p>${servicio.description}</p>
            </div>
        `).join('');

        const contenedorMasServicios = secondServiciosSection.querySelector('.servicio-cont');
        if (contenedorMasServicios) {
            contenedorMasServicios.innerHTML = masServiciosHTML;
        }

        // Update title
        const tituloMasServicios = secondServiciosSection.querySelector('.titulo');
        if (tituloMasServicios) {
            tituloMasServicios.textContent = 'Beneficios adicionales';
        }
    }
}

/**
 * Load software layout
 */
export function loadSoftwareLayout(product) {
    document.title = product.title;

    // Update header
    const textoHeader = document.querySelector('.textos-header');
    if (textoHeader) {
        textoHeader.innerHTML = `
            <div>
                <h1>${product.headerTitle}</h1>
                <h2>${product.headerSubtitle}</h2>
            </div>
        `;
    }

    // Update hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection && product.sections.hero) {
        heroSection.innerHTML = `
            <div class="hero-container">
                <div class="hero-content">
                    <h2 class="hero-title">${product.sections.hero.title}</h2>
                    <p class="hero-description">${product.sections.hero.description}</p>
                    <div class="buttons-container">
                        <button class="btn btn-primary">
                            <i class="fas fa-download"></i> Descargar Gratis
                        </button>
                        <button class="btn btn-secondary">
                            <i class="fas fa-shopping-cart"></i> Comprar Ahora
                        </button>
                    </div>
                </div>
                <div class="hero-image">
                    <img src="${product.sections.hero.image}" alt="Software emenetPOS" class="image-hero">
                </div>
            </div>
        `;
    }

    // Update features section
    const featuresSection = document.querySelector('.features-section');
    if (featuresSection && product.sections.features) {
        const featuresHTML = product.sections.features.map(feature => `
            <div class="feature-bubble">
                <div class="bubble-icon">
                    <i class="${feature.icon}"></i>
                </div>
                <h3>${feature.title}</h3>
                <p>${feature.description}</p>
            </div>
        `).join('');

        const featuresGrid = featuresSection.querySelector('.features-grid');
        if (featuresGrid) {
            featuresGrid.innerHTML = featuresHTML;
        }
    }

    // Update additional features section
    const additionalFeatures = document.querySelector('.additional-features');
    if (additionalFeatures && product.sections.extraFeatures) {
        const extraFeaturesHTML = product.sections.extraFeatures.map(feature => `
            <div class="feature-item">
                <div class="feature-check">
                    <i class="fas fa-check"></i>
                </div>
                <div class="feature-info">
                    <h4>${feature}</h4>
                </div>
            </div>
        `).join('');

        const featuresList = additionalFeatures.querySelector('.features-list');
        if (featuresList) {
            featuresList.innerHTML = extraFeaturesHTML;
        }
    }
}

/**
 * Load facturacion layout
 */
export function loadFacturacionLayout(product) {
    document.title = product.title;

    // Update header
    const textoHeader = document.querySelector('.textos-header');
    if (textoHeader) {
        textoHeader.innerHTML = `
            <div>
                <h1>${product.headerTitle}</h1>
                <h2>${product.headerSubtitle}</h2>
            </div>
        `;
    }

    // Create and show hero section
    const firstServiciosSection = document.querySelector('.servicios');
    if (firstServiciosSection) {
        const heroHTML = `
            <div class="facturacion-hero">
                <div class="facturacion-hero-container">
                    <div class="facturacion-hero-content">
                        <h2 class="facturacion-hero-title">Facturación Digital Profesional</h2>
                        <p class="facturacion-hero-description">${product.sections.hero.description}</p>
                        <p class="facturacion-hero-subtitle">${product.sections.hero.subtitle}</p>
                        <button class="facturacion-btn-comprar" onclick="comprarTimbres()">
                            <i class="fas fa-shopping-cart"></i> Comprar Timbres Fiscales
                        </button>
                    </div>
                    <div class="facturacion-hero-image">
                        <img src="${product.sections.hero.image}" alt="Facturación Electrónica" class="facturacion-image">
                        <div class="facturacion-image-badge">
                            <i class="fas fa-check-circle"></i>
                            <span>100% Legal</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        firstServiciosSection.innerHTML = heroHTML;
        firstServiciosSection.classList.add('facturacion-section-hero');
    }

    // Create and show beneficios section
    const sobreNosotros = document.querySelector('.sobre-nosotros');
    if (sobreNosotros && product.sections.beneficios) {
        const beneficiosHTML = `
            <div class="facturacion-beneficios-container">
                <h2 class="titulo">Beneficios de Emitir Facturas Electrónicas</h2>
                <div class="facturacion-beneficios-grid">
                    ${product.sections.beneficios.map(beneficio => `
                        <div class="facturacion-burbuja">
                            <div class="facturacion-burbuja-icon">
                                <i class="${beneficio.icon}"></i>
                            </div>
                            <h3>${beneficio.title}</h3>
                            <p>${beneficio.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        sobreNosotros.innerHTML = beneficiosHTML;
        sobreNosotros.classList.add('facturacion-beneficios');
    }

    // Create and show caracteristicas section
    const serviciosSections = document.querySelectorAll('.servicios');
    if (serviciosSections.length >= 2 && product.sections.caracteristicas) {
        const caracteristicasHTML = `
            <div class="contenedor">
                <h2 class="titulo">Características Principales</h2>
                <div class="facturacion-caracteristicas-grid">
                    ${product.sections.caracteristicas.map(caracteristica => `
                        <div class="facturacion-caracteristica-item">
                            <div class="caracteristica-icon">
                                <i class="${caracteristica.icon}"></i>
                            </div>
                            <h3>${caracteristica.title}</h3>
                            <p>${caracteristica.description}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        const secondServiciosSection = serviciosSections[1];
        secondServiciosSection.innerHTML = caracteristicasHTML;
    }
}

/**
 * Main function to load product based on its layout type
 */
export function loadProduct(productKey, products) {
    const product = products[productKey];

    if (!product) {
        console.error('Producto no encontrado:', productKey);
        return;
    }

    // Choose layout based on product
    switch (product.layout) {
        case 'software':
            loadSoftwareLayout(product);
            break;
        case 'facturacion':
            loadFacturacionLayout(product);
            break;
        default:
            loadDefaultLayout(product);
    }

    // Close dropdown
    const checkbox = document.getElementById('productos-menu');
    if (checkbox) {
        checkbox.checked = false;
    }

    // Scroll to top
    window.scrollTo(0, 0);
}