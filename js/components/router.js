/* ===== PRODUCT ROUTER ===== */

const products = {
    software: {
        title: 'Software emenetPOS',
        headerTitle: 'Software emenetPOS',
        headerSubtitle: 'El mejor software para tu negocio.',
        layout: 'software',
        sections: {
            hero: {
                title: 'Innovación en tu Punto de Venta',
                description: `emenetPOS es la solución integral que tu negocio necesita.
                Gestiona ventas, inventario, clientes y reportes en una sola plataforma.`,
                image: 'images/soft.jpg'
            },
            features: [
                { icon: 'fas fa-chart-line', title: 'Gestión de Ventas', description: 'Registra todas tus ventas en tiempo real.' },
                { icon: 'fas fa-boxes', title: 'Control de Inventario', description: 'Inventario actualizada y alertas automáticas.' },
                { icon: 'fas fa-mouse', title: 'Interfaz Intuitiva', description: 'Aprende a usarlo en minutos.' },
                { icon: 'fas fa-headset', title: 'Soporte 24/7', description: 'Atención técnica todo el día.' }
            ],
            extraFeatures: [
                'Múltiples formas de pago',
                'Reportes avanzados',
                'Gestión de clientes',
                'Sincronización en la nube',
                'Seguridad de datos',
                'Integración con redes sociales'
            ]
        }
    },

    facturacion: {
        title: 'Facturación Electrónica - emenetPOS',
        headerTitle: 'Facturación Electrónica',
        headerSubtitle: 'Cumple con las normativas fiscales automáticamente',
        layout: 'facturacion',
        sections: {
            hero: {
                image: 'https://via.placeholder.com/500x500/0068b2/ffffff?text=Facturacion+Digital',
                description: 'Genera facturas electrónicas para tus clientes de forma fácil.',
                subtitle: 'Nuestro sistema te permite emitir facturas legales 100% válidas en tiempo real. Cumple automáticamente con todas las normativas fiscales. Acceso a múltiples operadoras y timbres fiscales.'
            },
            beneficios: [
                { icon: 'fas fa-clock', title: 'Ahorro de Tiempo', description: 'Emite facturas en segundos sin llenar formularios complejos.' },
                { icon: 'fas fa-shield-alt', title: 'Seguridad y Legalidad', description: 'Facturas con firma digital certificada. Cumplimiento automático de normativas fiscales.' }
            ],
            caracteristicas: [
                { icon: 'fas fa-file-invoice-dollar', title: 'Emisión Legal', description: 'Genera facturas 100% válidas con firma digital y respaldo del SAT' },
                { icon: 'fas fa-cloud-upload-alt', title: 'Almacenamiento Seguro', description: 'Todas tus facturas se guardan en servidores certificados en la nube' },
                { icon: 'fas fa-envelope', title: 'Envío Automático', description: 'Envía facturas por email directamente a tus clientes' },
                { icon: 'fas fa-chart-bar', title: 'Reportes Detallados', description: 'Análisis completos de tus facturas emitidas y cumplimiento fiscal' }
            ]
        }
    },

    recargas: {
        title: 'Recargas de Tiempo Aire - emenetPOS',
        headerTitle: 'Recargas de Tiempo Aire',
        headerSubtitle: 'Aumenta tus ganancias ofreciendo recargas',
        layout: 'default',
        sections: {
            servicios: [
                { img: 'images/recargas.png', title: 'Recargas Telcel', description: 'Recarga saldo a cualquier número Telcel.' },
                { img: 'images/recargas.png', title: 'Recargas Movistar', description: 'Recarga saldo a cualquier número Movistar.' },
                { img: 'images/recargas.png', title: 'Recargas AT&T', description: 'Recarga saldo a cualquier número AT&T.' },
                { img: 'images/recargas.png', title: 'Recargas Unefon', description: 'Recarga saldo a cualquier número Unefon.' }
            ],
            sobreNosotros: {
                img: 'images/imagen1.png',
                title: 'emenetPOS gestiona tus ventas, inventarios y más desde un solo lugar.',
                description: 'Desde tu primer día hasta el crecimiento de tu cadena, emenetPOS te respalda. Únete a miles de negocios que ya lo están usando para aumentar sus ventas y crecer tu negocio.'
            },
            masServicios: [
                { img: 'images/recargas.png', title: 'Pago de Servicios', description: 'Acepta pagos de luz, agua, teléfono y más.' },
                { img: 'images/recargas.png', title: 'Comisiones Competitivas', description: 'Las mejores comisiones del mercado.' },
                { img: 'images/recargas.png', title: 'Instantáneo', description: 'Las recargas se activan en segundos.' }
            ]
        }
    },

    servicios: {
        title: 'Servicios en la Nube - emenetPOS',
        headerTitle: 'Servicios en la Nube',
        headerSubtitle: 'Accede a tu información desde cualquier lugar',
        layout: 'default',
        sections: {
            servicios: [
                { img: 'images/corporativo.png', title: 'Backup Automático', description: 'Tu información siempre segura y respaldada.' },
                { img: 'images/corporativo.png', title: 'Acceso Remoto', description: 'Accede a tu sistema desde cualquier dispositivo.' },
                { img: 'images/corporativo.png', title: 'Sincronización', description: 'Datos actualizados en tiempo real.' },
                { img: 'images/corporativo.png', title: 'Seguridad', description: 'Encriptación de nivel empresarial.' }
            ],
            sobreNosotros: {
                img: 'images/imagen1.png',
                title: 'emenetPOS gestiona tus ventas, inventarios y más desde un solo lugar.',
                description: 'Desde tu primer día hasta el crecimiento de tu cadena, emenetPOS te respalda. Únete a miles de negocios que ya lo están usando para aumentar sus ventas y crecer tu negocio.'
            },
            masServicios: [
                { img: 'images/corporativo.png', title: 'Multiplataforma', description: 'Funciona en Windows, Mac, Linux y web.' },
                { img: 'images/corporativo.png', title: 'Actualizaciones', description: 'Nuevas funciones sin costo adicional.' },
                { img: 'images/corporativo.png', title: 'Soporte Remoto', description: 'Asistencia técnica a distancia.' }
            ]
        }
    },

    modificaciones: {
        title: 'Modificaciones a la Medida - emenetPOS',
        headerTitle: 'Modificaciones a la Medida',
        headerSubtitle: 'El sistema que se adapta a tu negocio',
        layout: 'default',
        sections: {
            servicios: [
                { img: 'images/giro.png', title: 'Desarrollo Personalizado', description: 'Funciones específicas para tu negocio.' },
                { img: 'images/giro.png', title: 'Integraciones', description: 'Conexión con otros sistemas.' },
                { img: 'images/giro.png', title: 'Reportes Custom', description: 'Reportes a tu medida.' },
                { img: 'images/giro.png', title: 'Interfaz Adaptada', description: 'Diseño según tus necesidades.' }
            ],
            sobreNosotros: {
                img: 'images/imagen1.png',
                title: 'emenetPOS gestiona tus ventas, inventarios y más desde un solo lugar.',
                description: 'Desde tu primer día hasta el crecimiento de tu cadena, emenetPOS te respalda. Únete a miles de negocios que ya lo están usando para aumentar sus ventas y crecer tu negocio.'
            },
            masServicios: [
                { img: 'images/giro.png', title: 'Capacitación', description: 'Entrenamiento para tu equipo.' },
                { img: 'images/giro.png', title: 'Mantenimiento', description: 'Soporte continuo y actualizaciones.' },
                { img: 'images/giro.png', title: 'Consultoría', description: 'Asesoría para optimizar procesos.' }
            ]
        }
    }
};

export { products };