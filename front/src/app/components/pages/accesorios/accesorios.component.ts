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
    { index: 1, image: 'images/accesorios/impresora.png', name: 'Impresora Térmica Compacta', description: 'Impresora térmica para recibos y etiquetas', price: '$1,700.00 MXN', delay: 'delay-200' },
    { index: 2, image: 'images/accesorios/cajon2.png', name: 'Cajón de Efectivo Electrónico', description: 'Cajón automático con seguridad integrada y control USB', price: '$800.00 MXN', delay: 'delay-300' },
    { index: 3, image: 'images/accesorios/rollo.png', name: 'Rollos de papel termico', description: 'Rollo de papel térmico c/u', price: '$80.00 MXN', delay: 'delay-100' },
    { index: 4, image: 'images/accesorios/quaroni1.png', name: 'Monitor Quaroni MQ19-03', description: 'Monitor LED de 19.5" HD, panel TN, HDMI/VGA', price: '$800.00 MXN', delay: 'delay-200' },
    { index: 5, image: 'images/accesorios/terminal.png', name: 'Terminal de tarjetas', description: 'Sistema completo con software integrado', price: '$450.00 MXN', delay: 'delay-300' },
    { index: 6, image: 'images/accesorios/pc.png', name: 'PC GHIA Frontier Slim 2.0', description: '1 TB Disco, RAM 8 GB - Ideal para punto de venta', price: '$5,500.00 MXN', delay: '' },
    { index: 7, image: 'images/accesorios/monitor3.png', name: 'Monitor GHIA 21.5 pulgadas', description: 'Monitor Full HD para punto de venta y oficina', price: '$1,200.00 MXN', delay: 'delay-100' },
    { index: 8, image: 'images/accesorios/caja.png', name: 'Caja de Rollos Térmicos 76mm', description: 'Caja de 20 rollos térmicos de 76mm compatibles con nuestras impresoras térmicas', price: '$1,500.00 MXN', delay: 'delay-200' },
    { index: 9, image: 'images/accesorios/paquete.png', name: 'Kit Punto de Venta Básico', description: 'Punto de venta completo impulsado por MyBusiness POS', price: '$12,730.00 MXN', delay: 'delay-300' },
    { index: 10, image: 'images/accesorios/paquete.png', name: 'Kit Punto de Venta Premium', description: 'Punto de venta completo impulsado por MyBusiness POS', price: '$19,740.00 MXN', delay: 'delay-300' },
    { index: 11, image: 'images/accesorios/teclado2.png', name: 'Teclado Multimedia', description: 'Teclado con teclas de acceso rápido y pad numérico', price: '$150.00 MXN', delay: 'delay-400' },
    { index: 12, image: 'images/accesorios/hp.png', name: 'Mouse Óptico', description: 'Mouse ergonómico de 1200 DPI con sensor óptico', price: '$99.00 MXN', delay: 'delay-500' },
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
    { name: 'Impresora térmica', price: '$1,200 MXN' },
    { name: 'Cajón electrónico', price: '$750 MXNN' },
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
      id: 2, name: 'Impresora Térmica Compacta',
      description: 'Impresora térmica para recibos y etiquetas. Perfecta para puntos de venta que requieren impresión rápida y silenciosa.',
      price: 1200.00, image: 'images/accesorios/impresora.png',
      images: ['images/accesorios/impresora4.png', 'images/accesorios/impresora5.png'],
      features: ['Impresión térmica directa sin tinta.', 'Resolución 203 DPI nítida y profesional.', 'Conexión USB y Ethernet', 'Cortador automático integrado', 'Bandeja de papel de fácil carga'],
      specifications: { 'Tamaño impresión': '76mm', 'Velocidad': '250mm/s', 'Operación': 'Continua estable', 'Tecnología': 'Termica' },
      moreSpecifications: { 'Conexión': 'USB + Ethernet', 'Interfaces': 'Puerto USB 2.0 y Ethernet LAN (RJ-45)', 'Código de barras': '1D/2D, Code 39, EAN13, PDF417, QR, UPC', 'Movilidad': 'Alámbrico' }
    },
    {
      id: 3, name: 'Cajón de Efectivo Electrónico',
      description: 'Cajón automático con seguridad integrada y control USB. Diseñado para un manejo seguro y eficiente del efectivo en tu negocio.',
      price: 750.00, image: 'images/accesorios/cajon5.png',
      images: ['images/accesorios/cajon3.png', 'images/accesorios/cajon4.png'],
      features: ['Apertura automática mediante impulsor', '4 compartimentos para billetes', '8 compartimentos para monedas', 'Cerradura de 3 posiciones', 'Construcción en metal resistente'],
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
      description: 'Computadora de escritorio con excelente rendimiento para punto de venta y oficina. Disco 1 TB y RAM 8 GB para un desempeño óptimo.',
      price: 5999.99, image: 'images/accesorios/pc1.png',
      images: ['images/accesorios/pc2.png', 'images/accesorios/pc3.png', 'images/accesorios/mouse1.png', 'images/accesorios/teclado1.png'],
      features: ['Procesador de alto rendimiento', 'Disco duro de 1 TB de capacidad', 'Diseño slim compacto', 'Ideal para punto de venta y oficina'],
      specifications: { 'Disco Duro': '1 TB', 'RAM': '8 GB', 'Modelo': 'Frontier Slim 2.0', 'Procesador': 'Intel Pentium GOLD Core 3.7 GHz' },
      moreSpecifications: { 'Teclado': 'Conexión USB Plug & Play', 'Periféricos': 'Compatibilidad universal con todas las marcas', 'Mouse': 'Sensor óptico de 1200 DPI' }
    },
    {
      id: 8, name: 'Monitor GHIA 23.8 pulgadas',
      description: 'Monitor de alta definición con pantalla de 23.8 pulgadas. Perfecto para punto de venta y uso empresarial con excelente calidad de imagen.',
      price: 2499.99, image: 'images/accesorios/monitor.png',
      images: ['images/accesorios/monitor1.png', 'images/accesorios/monitor2.png'],
      features: ['Pantalla de 23.8 pulgadas', 'Resolución Full HD', 'Conexión HDMI y VGA', 'Diseño elegante y moderno', 'Bajo consumo energético'],
      specifications: { 'Tamaño': '23.8 pulgadas', 'Resolución': 'Full HD 1920x1080', 'Conexiones': 'HDMI, VGA' },
      moreSpecifications: { 'Marca': 'GHIA', 'Garantía': '1 año' }
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
      price: 12730.00, image: 'images/software/paquete.png',
      images: ['images/software/mybusiness2.png', 'images/software/monitor2.png', 'images/software/pc.png', 'images/cajon5.png', 'images/impresora3.png', 'images/barras3.png', 'images/teclado.png'],
      features: ['Configuración, instalación del sistema completo', 'Todos los accesorios de punto de venta', 'Implementación del sistema de recargas de tiempo aire', 'Implementación del sistema de cobro con tarjeta de débito y crédito', '10 horas de capacitación incluidas', 'Soporte técnico especializado'],
      specifications: { 'Computadora': 'PC GHIA Frontier Slim 2.0 1 TB Disco RAM 8 GB', 'Procesador': 'Intel Pentium GOLD Core 3.7 GHz', 'Monitor': '23.8 pulgadas', 'Periféricos': 'Teclado y ratón incluidos', 'Sistema Operativo': 'Windows 11', 'Software': 'MyBusiness POS v24', 'Impresora': 'Ticket 3 pulgadas', 'Lector': 'Código de barras', 'Cajón': '5 billetes, 8 monedas' },
      functions: ['Ventas de productos y servicios', 'Inventario de productos', 'Compras y control de proveedores', 'Control de clientes', 'Cobranza a clientes', 'Impresión de tickets', 'Ventas de tiempo aire', 'Cobros con tarjeta de débito y crédito']
    },
    {
      id: 11, name: 'Kit Punto de Venta Premium',
      description: 'Punto de venta completo y listo para operar, impulsado por MyBusiness POS. Incluye equipo esencial y soporte especializado para que empieces a vender desde el primer día, todo en un solo paquete.',
      price: 19740.00, image: 'images/software/paquete.png',
      images: ['images/software/mybusiness2.png', 'images/software/monitor2.png', 'images/software/pc.png', 'images/cajon5.png', 'images/impresora3.png', 'images/barras3.png', 'images/teclado.png'],
      features: ['Configuración, instalación del sistema completo', 'Todos los accesorios de punto de venta', 'Implementación del sistema de recargas de tiempo aire', 'Implementación del sistema de cobro con tarjeta de débito y crédito', '10 horas de capacitación incluidas', 'Soporte técnico especializado'],
      specifications: { 'Computadora': 'PC GHIA Frontier Slim 2.0 1 TB Disco RAM 8 GB', 'Procesador': 'Intel Pentium GOLD Core 3.7 GHz', 'Monitor': '23.8 pulgadas', 'Periféricos': 'Teclado y ratón incluidos', 'Sistema Operativo': 'Windows 11', 'Software': 'MyBusiness POS v24', 'Impresora': 'Ticket 3 pulgadas', 'Lector': 'Código de barras', 'Cajón': '5 billetes, 8 monedas' },
      functions: ['Ventas de productos y servicios', 'Inventario de productos', 'Compras y control de proveedores', 'Control de clientes', 'Cobranza a clientes', 'Impresión de tickets', 'Ventas de tiempo aire', 'Cobros con tarjeta de débito y crédito']
    },

    {
      id: 12, name: 'Teclado Alámbrico Multimedia',
      description: 'Teclado profesional con teclas multimedia y teclado numérico integrado para uso intenso en puntos de venta.',
      price: 150.00, image: 'images/accesorios/teclado1.png',
      images: ['images/accesorios/teclado4.png', 'images/accesorios/teclado3.png'],
      features: ['Conexión USB Plug & Play', 'Incluye teclado numérico', 'Accesos directos multimedia', 'Compatibilidad universal con todas las marcas', 'Diseño resistente al uso diario, ergonomico'],
      specifications: { 'Conexión': 'Alámbrico USB', 'Longitud de cable': '1.6 metros', 'Color': 'Negro', 'Idioma': 'Español' },
      moreSpecifications: { 'Interfaz': 'USB', 'Teclado numérico': 'Sí', 'Multimedia': 'Sí' }
    },
    {
      id: 13, name: 'Mouse Óptico USB',
      description: 'Mouse óptico de alta precisión con sensor de 1200 DPI. Ideal para navegación rápida y precisa en sistemas de punto de venta.',
      price: 99.00, image: 'images/accesorios/mouse.png',
      images: ['images/accesorios/mouse1.png'],
      features: ['Sensor óptico de 1200 DPI', 'Rueda de desplazamiento (Scroll)', 'Conexión USB Plug & Play', 'Compatibilidad universal con todas las marcas', 'Diseño ergonómico y ambidiestro'],
      specifications: { 'Conexión': 'Alámbrico USB', 'Longitud de cable': '1.6 metros', 'Color': 'Negro', 'DPI': '1200' },
      moreSpecifications: { 'Interfaz': 'USB', 'Scroll': 'Sí', 'Apagado automático': 'No' }
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
