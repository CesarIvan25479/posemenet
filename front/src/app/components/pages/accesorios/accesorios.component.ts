import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircularGalleryApp } from './circular-gallery.service';
import { ProductModalComponent, Product } from '../../product-modal/product-modal.component';
import { disableDebugTools } from '@angular/platform-browser';

@Component({
  selector: 'app-accesorios',
  standalone: true,
  imports: [CommonModule, ProductModalComponent],
  templateUrl: './accesorios.component.html',
  styleUrl: './accesorios.component.css'
})
export class AccesoriosComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('galleryContainer', { static: false }) galleryContainer!: ElementRef<HTMLDivElement>;

  private galleryApp?: CircularGalleryApp;
  private resizeObserver?: ResizeObserver;
  private observer: IntersectionObserver | null = null;

  galleryTextColor = '#003796';

  // Modal state
  isModalOpen = false;
  selectedProduct: Product | null = null;

  // Hero checklist items
  readonly checkItems = ['Entrega rápida', 'Adquiere desde sucursal o en línea', 'Compatibles con POS', 'Soporte técnico'];

  // Hero floating chips
  readonly heroChips = [
    { icon: '⚡', label: 'Plug & Play', pos: 'acc-chip--tl' },
    { icon: '🛡️', label: 'Seguridad', pos: 'acc-chip--tr' },
    { icon: '📦', label: 'Envío rápido', pos: 'acc-chip--bl' },
    { icon: '✅', label: 'Certificado', pos: 'acc-chip--br' }
  ];

  // Product cards for grid display
  readonly productCards = [
    { index: 0, image: 'images/accesorios/lector.png', name: 'Lector de código profesional', description: 'Scanner de códigos de alta velocidad y precisión', price: '$600.00 MXN', delay: 'delay-100' },
    { index: 1, image: 'images/accesorios/ecline.png', name: 'Impresora Térmica EC-Line', description: 'Impresora térmica directa de alta velocidad (300 mm/seg)', price: '$3,350.00 MXN', delay: 'delay-200' },
    { index: 2, image: 'images/accesorios/cajon2.png', name: 'Cajón de Efectivo Electrónico', description: 'Cajón automático con seguridad integrada y control USB', price: '$800.00 MXN', delay: 'delay-300' },
    { index: 3, image: 'images/accesorios/rollo.png', name: 'Rollos de papel termico', description: 'Rollo de papel térmico c/u', price: '$80.00 MXN', delay: 'delay-100' },
    { index: 4, image: 'images/accesorios/quaroni1.png', name: 'Monitor Quaroni MQ19-03', description: 'Monitor LED de 19.5" HD, panel TN, HDMI/VGA', price: '$800.00 MXN', delay: 'delay-200' },
    { index: 5, image: 'images/accesorios/terminal.png', name: 'Terminal de tarjetas', description: 'Sistema completo con software integrado', price: '$450.00 MXN', delay: 'delay-300' },
    { index: 6, image: 'images/accesorios/pc.png', name: 'PC GHIA Frontier Slim 2.0', description: 'Intel N-Series 4 Núcleos 3.40 GHz, 8 GB RAM, 240 GB SSD - Sin Sistema', price: '$5,500.00 MXN', delay: '' },
    { index: 7, image: 'images/accesorios/monitor3.png', name: 'Monitor GHIA 21.5 pulgadas', description: 'Monitor GHIA MG2225 / 21.5 / VA / FHD / 100Hz / VGA, HDMI / Negro', price: '$1,200.00 MXN', delay: 'delay-100' },
    { index: 8, image: 'images/accesorios/caja.png', name: 'Caja de Rollos Térmicos 76mm', description: 'Caja de 20 rollos térmicos de 76mm compatibles con nuestras impresoras térmicas', price: '$1,500.00 MXN', delay: 'delay-200' },
    { index: 9, image: 'images/accesorios/basico.png', name: 'Kit Punto de Venta Básico', description: 'Punto de venta completo impulsado por MyBusiness POS', price: '$12,730.00 MXN', delay: 'delay-300' },
    { index: 10, image: 'images/accesorios/premium.png', name: 'Kit Punto de Venta Premium', description: 'Punto de venta completo impulsado por MyBusiness POS', price: '$19,740.00 MXN', delay: 'delay-300' },
    { index: 11, image: 'images/accesorios/minipc.png', name: 'Mini PC Hyundai', description: 'Mini PC HYUNDAI HTN4020MPC04, Intel Celeron N4020 4GB DDR4 / 128GB SSD Windows 11 Home', price: '$3,350.00 MXN', delay: 'delay-400' },
    { index: 12, image: 'images/accesorios/acteck.png', name: 'Kit Teclado y Mouse', description: 'Kit Acteck Creator MK210, Combo alámbrico multimedia, 105 teclas, Mouse 1000 DPI', price: '$190.00 MXN', delay: 'delay-500' },
    { index: 13, image: 'images/accesorios/next.png', name: 'Impresora Térmica Nextep', description: 'Impresora Térmica 80mm USB/RJ11/LAN / 160 MM/S, 203 DPI', price: '$1,700.00 MXN', delay: 'delay-500' },
  ];

  // Seccion beneficios
  readonly benefits = [
    { icon: '🔌', name: 'Integración inmediata', desc: 'Todos los equipos funcionan desde el primer enchufe con MyBusinessPOS. Sin configuraciones complicadas.', delay: 'delay-100' },
    { icon: '🏆', name: 'Calidad probada', desc: 'Hardware seleccionado tras pruebas reales en comercios mexicanos. Rendimiento garantizado en uso continuo.', delay: 'delay-200' },
    { icon: '💬', name: 'Soporte y capacitación', desc: '10 horas de capacitación y asesoría. Resolvemos cualquier duda sobre instalación, compatibilidad o uso.', delay: 'delay-300' },
    { icon: '💰', name: 'Precios accesibles', desc: 'Desde $80 MXN por rollo hasta equipos completos. Hay opción para cualquier presupuesto y tamaño de negocio.', delay: 'delay-400' },
  ];

  // Promo banner
  readonly promoItems = [
    { name: 'Lector de código', price: '$1,500 MXN' },
    { name: 'Impresora térmica', price: '$3,350 MXN' },
    { name: 'Cajón electrónico', price: '$750 MXN' },
  ];

  galleryItems = [
    { image: 'images/accesorios/impresora6.png', text: 'Impresoras Térmicas' },
    { image: 'images/accesorios/barras.png', text: 'Lectores de Código' },
    { image: 'images/accesorios/cajon.png', text: 'Cajones de Dinero' },
    { image: 'images/accesorios/monitor3.png', text: 'Monitor Quaroni' },
    { image: 'images/accesorios/terminal1.png', text: 'Terminal' },
    { image: 'images/accesorios/consumible.png', text: 'Consumibles' }
  ];

  // For del Modal para productos
  products: Product[] = [
    {
      id: 1, name: 'Lector de código profesional',
      description: 'Fácil de operar por su función Plug and Play, identifica códigos de barra ID en celulares y monitores.',
      price: 1500.00, image: 'images/accesorios/barras3.png',
      images: ['images/accesorios/barras4.png', 'images/accesorios/barras5.png'],
      features: ['Lectura de códigos 1D y 2D', 'Velocidad de escaneo de 300 escaneos/segundo', 'Conexión USB plug and play', 'Compatible con Windows, Mac y Linux', 'Diseño ergonómico para uso prolongado'],
      specifications: { 'Tipo de escaneo': 'Bidireccional', 'IP Class': 'IP52', 'Fuente de luz': '650nm Laser diodo visible', 'Material': 'ABS + PC' },
      moreSpecifications: { 'Voltaje': '5V CC', 'Peso': '246gr', 'Cable': '2 metros', 'Medidas': '175mm x 73mm x 102mm' }
    },
    {
      id: 2, name: 'Impresora Térmica EC-Line',
      description: 'Miniprinter térmica EC-PM-X30 diseñada para negocios que requieren impresiones rápidas (300 mm/seg), silenciosas y confiables. Ideal para puntos de venta con espacio limitado.',
      price: 3350.00, image: 'images/accesorios/ecline1.png',
      images: ['images/accesorios/ecline2.png', 'images/accesorios/ecline3.png'],
      features: [
        'Velocidad de impresión ultra rápida de 300 mm/s',
        'Auto-cortador de alta resistencia (2 millones de cortes)',
        'Conectividad versátil con puertos USB y Ethernet (LAN)',
        'Carga de papel sencilla (Drop-in)',
        'Compatibilidad con múltiples sistemas (Windows, Linux, Android, Mac)'
      ],
      specifications: { 'Modelo': 'EC-PM-X30', 'Tecnología': 'Térmica Directa', 'Velocidad': '300 mm/s', 'Ancho de Papel': '80 mm / 58 mm' },
      moreSpecifications: { 'Conexión': 'USB + Ethernet', 'Corte': 'Automático parcial', 'Códigos de barras': '1D/2D (QR, PDF417, UPC, EAN)', 'Vida útil cabezal': '150 KM', 'Dimensiones': '133 x 126 x 130 mm' }
    },
    {
      id: 3, name: 'Cajón de Efectivo Electrónico',
      description: 'Cajón automático con seguridad integrada y control USB. Diseñado para un manejo seguro y eficiente del efectivo en tu negocio.',
      price: 750.00, image: 'images/accesorios/cajon5.png',
      images: ['images/accesorios/cajon3.png', 'images/accesorios/cajon4.png'],
      features: ['Apertura automática mediante impulsor', '5 compartimentos para billetes', '8 compartimentos para monedas', 'Cerradura de 3 posiciones', 'Construcción en metal resistente'],
      specifications: { 'Interfaces': 'RJ11 para impresora de recibos', 'Capacidad': 'Hasta 500 billetes', 'Ranuras': 'Ranura para documentos' },
      moreSpecifications: { 'Material': 'Metal resistente', 'Dimensiones': '355 x 370 x 80 mm (L x W x H)', 'Apertura': 'Eléctrica/Manual' }
    },
    {
      id: 4, name: 'Consumibles',
      description: 'Papel Térmico, Etiquetas. Todo lo necesario para tu punto de venta.',
      price: 80.00, image: 'images/accesorios/rollo2.png',
      images: ['images/accesorios/rollo3.png', 'images/accesorios/rollo4.png'],
      features: ['Papel térmico de alta calidad', 'Etiquetas térmicas adhesivas', 'Papel termico de calidad', 'Precios competitivos por mayoreo'],
      specifications: { 'Papel térmico': '80mm x 70mm', 'Etiquetas': 'Variados tamaños', 'Calidad': 'Alta' },
      moreSpecifications: { 'Toners': 'Universal', 'Garantía': 'Calidad garantizada' }
    },
    {
      id: 5, name: 'Monitor Quaroni MQ19-03',
      description: 'Pantalla LED de 19.5 pulgadas diseñada para ofrecer una visualización clara y eficiente, ideal para oficina y puntos de venta.',
      price: 800.00, image: 'images/accesorios/quaroni.png',
      images: ['images/accesorios/quaroni2.png', 'images/accesorios/quaroni3.png'],
      features: [
        'Pantalla de 19.5 pulgadas con resolución HD',
        'Conexión versátil con puertos HDMI y VGA',
        'Tiempo de respuesta de 5ms para imágenes fluidas',
        'Diseño elegante y minimalista en color negro',
        'Panel tipo TN para un rendimiento confiable'
      ],
      specifications: { 'Tamaño': '19.5 pulgadas', 'Resolución': '1366 x 768 (HD)', 'Brillo': '200 cd/m²', 'Panel': 'TN' },
      moreSpecifications: { 'Contraste': '500:1', 'Conectores': '1x HDMI, 1x VGA', 'Frecuencia': '60 Hz', 'Garantía': '1 año' }
    },
    {
      id: 6, name: 'Terminal Billpocket nano',
      description: 'Sistema completo con software integrado. La solución todo-en-uno para gestionar tu punto de venta de manera profesional.',
      price: 450.00, image: 'images/accesorios/terminal3.png',
      images: ['images/accesorios/terminal2.png'],
      features: ['Software de gestión incluido', 'Pantalla táctil de 10 pulgadas', 'Impresora térmica integrada', 'Lector de tarjetas NFC', 'Reportes de ventas en tiempo real'],
      specifications: { 'Procesador': 'Quad Core 1.8GHz', 'RAM': '2 GB', 'Almacenamiento': '16 GB' },
      moreSpecifications: { 'Sistema': 'Android 11', 'Garantía': '2 años' }
    },
    {
      id: 7, name: 'PC GHIA Frontier Slim 2.0',
      description: 'Computadora de escritorio ultra compacta con procesador Intel de 4 núcleos con bajo consumo energético.',
      price: 5500.00, image: 'images/accesorios/pc1.png',
      images: ['images/accesorios/pc2.png', 'images/accesorios/pc3.png', 'images/accesorios/mouse1.png', 'images/accesorios/teclado1.png'],
      features: [
        'Procesador Intel N-Series de 4 Núcleos (hasta 3.40 GHz)',
        'Gabinete Slim SFF optimizado para ahorrar espacio',
        'Almacenamiento rápido en SSD de 240 GB',
        'Incluye kit de teclado y mouse alámbricos',
        'Ideal para uso continuo en puntos de venta'
      ],
      specifications: { 'Modelo': 'Frontier Slim 2.0', 'Procesador': 'Intel 4 Núcleos @ 3.40 GHz', 'RAM': '8 GB DDR4', 'Almacenamiento': '240 GB SSD' },
      moreSpecifications: { 'Sistema Operativo': 'Sin Sistema Operativo', 'Gráficos': 'Intel UHD Graphics', 'Puertos': 'USB 3.0, HDMI, VGA, RJ45 Gigabit', 'Factor de Forma': 'Slim (SFF)' }
    },
    {
      id: 8, name: 'Monitor GHIA 21.5 pulgadas',
      description: 'Monitor GHIA MG2225 de 21.5 pulgadas con panel VA y una tasa de refresco de 100Hz, visualización fluida y nítida.',
      price: 1200.00, image: 'images/accesorios/monitor.png',
      images: ['images/accesorios/monitor1.png', 'images/accesorios/monitor2.png', 'images/accesorios/monitor4.png'],
      features: [
        'Pantalla de 21.5 pulgadas Full HD (1920x1080)',
        'Panel VA para contrastes profundos y amplios ángulos de visión',
        'Frecuencia de actualización de 100Hz para mayor fluidez visual',
        'Diseño Frameless (Sin bordes) ultra moderno',
        'Conectividad dual con puertos HDMI y VGA',
        'Tiempo de respuesta de 5ms perfecto para trabajo diario'
      ],
      specifications: { 'Modelo': 'MG2225', 'Tamaño': '21.5 pulgadas', 'Resolución': 'FHD (1920x1080)', 'Panel': 'VA' },
      moreSpecifications: { 'Frecuencia': '100Hz', 'Puertos': '1x HDMI, 1x VGA', 'VESA': '75 x 75 mm', 'Garantía': '3 años (Directo con marca)' }
    },
    {
      id: 9, name: 'Caja de Rollos Térmicos 76mm',
      description: 'Caja de 20 rollos térmicos de 76mm, compatibles con nuestras impresoras térmicas. Alta calidad de impresión.',
      price: 1500.00, image: 'images/accesorios/caja1.png',
      images: ['images/accesorios/caja2.png', 'images/accesorios/caja3.png'],
      features: ['20 Rollos térmicos de 76mm', 'Compatible con impresoras térmicas', 'Alta calidad de impresión', 'Larga duración del papel', 'Empaque por caja económica'],
      specifications: { 'Ancho': '76mm', 'Tipo': 'Papel térmico', 'Compatibilidad': 'Impresoras térmicas 76mm' },
      moreSpecifications: { 'Presentación': 'Caja con múltiples rollos', 'Calidad': 'Premium' }
    },
    {
      id: 10, name: 'Kit Punto de Venta Básico',
      description: 'Punto de venta completo y listo para operar, impulsado por MyBusiness POS. Incluye equipo esencial y soporte especializado para que empieces a vender desde el primer día, todo en un solo paquete.',
      price: 12730.00, image: 'images/accesorios/basico1.png',
      images: ['images/accesorios/minipc.png', 'images/accesorios/quaroni.png', 'images/accesorios/acteck1.png', 'images/accesorios/cajon3.png', 'images/accesorios/next1.png', 'images/accesorios/barras5.png'],
      features: [
        'Mini PC Hyundai HTN4020MPC04 con Windows 11 Home',
        'Monitor Quaroni MQ19-03 de 19.5" HD (HDMI/VGA)',
        'Kit de Teclado y Mouse Acteck Creator MK210 Alámbrico',
        'Impresora Térmica Nextep de 80mm (USB/LAN/RJ11)',
        'Lector de códigos de barras GHIA GSCBI 1D con Base',
        'Cajón de dinero GHIA GCDS81 de acero reforzado',
        '3 horas de capacitación y soporte técnico especializado'
      ],
      specifications: { 'Computadora': 'Mini PC Hyundai HTN4020MPC04 4GB/128GB', 'Monitor': 'Quaroni MQ19-03 19.5" HD', 'Periféricos': 'Kit Acteck Creator MK210', 'Impresora': 'Nextep Térmica 80mm (160 mm/s)', 'Lector': 'GHIA GSCBI 1D CCD con Base', 'Cajón': 'GHIA GCDS81 (5 billetes / 8 monedas)', 'Sistema Operativo': 'Windows 11 Home', 'Software': 'MyBusiness POS v24' },
      functions: ['Ventas de productos y servicios', 'Inventario de productos', 'Compras y control de proveedores', 'Control de clientes', 'Cobranza a clientes', 'Impresión de tickets', 'Ventas de tiempo aire', 'Cobros con tarjeta de débito y crédito']
    },
    {
      id: 11, name: 'Kit Punto de Venta Premium',
      description: 'Punto de venta completo y listo para operar, impulsado por MyBusiness POS. Incluye equipo esencial y soporte especializado para que empieces a vender desde el primer día, todo en un solo paquete.',
      price: 19740.00, image: 'images/accesorios/premium1.png',
      images: ['images/accesorios/pc2.png', 'images/accesorios/monitor.png', 'images/accesorios/ecline1.png', 'images/accesorios/barras3.png', 'images/accesorios/cajon5.png'],
      features: [
        'Computadora GHIA Frontier Slim 2.0 (Intel 4 Núcleos @ 3.40 GHz)',
        'Monitor GHIA MG2225 de 21.5" VA FHD 100Hz Frameless',
        'Impresora Térmica EC-Line EC-PM-X30 (300 mm/seg)',
        'Lector de códigos de barras GHIA GSCBI 1D con Base',
        'Cajón de dinero GHIA GCDS81 de acero reforzado',
        'Incluye kit de teclado y mouse alámbricos',
        '10 horas de capacitación y soporte técnico premium integral'
      ],
      specifications: { 'Computadora': 'GHIA Frontier Slim 20 Intel 4 núcleos @ 3.40 GHz', 'RAM': '8 GB DDR4', 'Almacenamiento': '240 GB SSD', 'Monitor': 'GHIA MG2225 21.5" VA FHD 100Hz', 'Impresora': 'EC-Line EC-PM-X30 80mm (300 mm/s)', 'Lector': 'GHIA GSCBI 1D LED CCD con Base', 'Cajón': 'GHIA GCDS81 (5 billetes / 8 monedas)', 'Sistema Operativo': 'Sin Sistema Operativo', 'Software': 'MyBusiness POS v24' },
      functions: ['Ventas de productos y servicios', 'Inventario de productos', 'Compras y control de proveedores', 'Control de clientes', 'Cobranza a clientes', 'Impresión de tickets', 'Ventas de tiempo aire', 'Cobros con tarjeta de débito y crédito']
    },

    {
      id: 12, name: 'Mini PC Hyundai',
      description: 'Mini PC HYUNDAI HTN4020MPC04, una solución compacta y potente diseñada para maximizar la productividad en espacios reducidos. Ideal para puntos de venta, oficinas y señalización digital.',
      price: 3350.00, image: 'images/accesorios/minipc1.png',
      images: ['images/accesorios/minipc2.png', 'images/accesorios/minipc3.png'],
      features: [
        'Procesador Intel Celeron N4020 (hasta 2.8GHz)',
        '4GB Memoria RAM DDR4 (Expandible hasta 8GB)',
        '128GB de almacenamiento interno SSD',
        'Sistema Operativo Windows 11 Home presinstalado',
        'Soporte para pantalla dual (HDMI y VGA) con resolución 4K UHD',
        'Diseño ultra compacto y silencioso (Fanless)'
      ],
      specifications: { 'Modelo': 'HTN4020MPC04', 'Procesador': 'Intel Celeron N4020', 'RAM': '4GB DDR4', 'Almacenamiento': '128GB SSD' },
      moreSpecifications: { 'Sistema Operativo': 'Windows 11 Home', 'Conexión': 'Wi-Fi 5 + Bluetooth 4.2', 'Puertos': 'USB 3.0, HDMI, VGA, RJ45 Gigabit', 'Gráficos': 'Intel UHD Graphics 600' }
    },
    {
      id: 13, name: 'Kit Teclado y Mouse Acteck',
      description: 'Kit Acteck Creator MK210, la combinación perfecta para tu espacio de trabajo.',
      price: 190.00, image: 'images/accesorios/acteck1.png',
      images: ['images/accesorios/acteck2.png', 'images/accesorios/acteck3.png'],
      features: [
        'Conexión USB alámbrica Plug & Play',
        'Teclado completo con 105 teclas (Layout Español)',
        'Mouse óptico con resolución de 1000 DPI',
        'Diseño ergonómico y elegante en color negro',
        'Largo de cable de 1.5 metros',
        'Compatibilidad con Windows XP y posteriores'
      ],
      specifications: { 'Modelo': 'Creator MK210 (AC-928984)', 'Tipo de kit': 'Alámbrico USB', 'Teclas': '105 Teclas', 'Idioma': 'Español' },
      moreSpecifications: { 'Resolución Mouse': '1000 DPI', 'Botones': '2 + Scroll', 'Largo Cable': '1.5 metros', 'Vida Útil Click': '3 millones de clicks', 'Material': 'Plástico ABS' }
    },
    {
      id: 14, name: 'Impresora Térmica Nextep',
      description: 'Impresora térmica Nextep de 80mm diseñada para alto rendimiento en puntos de venta.',
      price: 1700.00, image: 'images/accesorios/next1.png',
      images: ['images/accesorios/next2.png', 'images/accesorios/next3.png'],
      features: [
        'Impresión térmica directa de alta velocidad (160 mm/s)',
        'Conectividad triple: USB, LAN (Ethernet) y RJ11 para cajón',
        'Resolución de 203 DPI para tickets nítidos y legibles',
        'Ancho de impresión de 80 mm ideal para recibos detallados',
        'Cortador automático integrado de larga duración',
        'Diseño compacto y robusto para uso continuo'
      ],
      specifications: { 'Modelo': 'NE-511', 'Tecnología': 'Térmica directa', 'Velocidad': '160 mm/s', 'Resolución': '203 DPI', 'Ancho de Papel': '80 mm' },
      moreSpecifications: { 'Interfaces': 'USB + LAN + RJ11', 'Comandos': 'ESC/POS', 'Vida del cabezal': '150 KM', 'Compatibilidad': 'Windows, Linux, macOS', 'Peso': '1.2 kg' }
    }
  ];
  ngOnInit(): void { }

  ngAfterViewInit(): void {
    if (this.galleryContainer) {
      this.galleryApp = new CircularGalleryApp(this.galleryContainer.nativeElement, {
        items: this.galleryItems,
        textColor: this.galleryTextColor
      });

      this.resizeObserver = new ResizeObserver(() => this.galleryApp?.onResize());
      this.resizeObserver.observe(this.galleryContainer.nativeElement);
    }
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.resizeObserver?.disconnect();
    this.galleryApp?.destroy();
    this.observer?.disconnect();
  }

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal-active');
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => this.observer?.observe(el));
  }

  openModal(product: Product): void {
    this.selectedProduct = product;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedProduct = null;
    document.body.style.overflow = 'auto';
  }

  onContact(product: Product): void {
    const message = `Hola, estoy interesado en el producto: ${product.name} ($${product.price})`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5217131334557&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    this.closeModal();
  }
}
