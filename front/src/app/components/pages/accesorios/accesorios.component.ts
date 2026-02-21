import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CircularGalleryApp } from './circular-gallery.service';
import { ProductModalComponent, Product } from '../../product-modal/product-modal.component';


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

  // Color del texto de la galería (formato hexadecimal)
  galleryTextColor: string = '#003796'; // Azul - Cambia este valor para modificar el color del texto
  
  // Modal state
  isModalOpen = false;
  selectedProduct: Product | null = null;

  galleryItems = [
    {
      image: 'images/impresora.png',
      text: 'Impresoras Térmicas'
    },
    {
      image: 'images/barras.png',
      text: 'Lectores de Código'
    },
    {
      image: 'images/cajon.png',
      text: 'Cajones de Dinero'
    },
    {
      image: 'images/compu.png',
      text: 'All In One Paquete'
    },
    {
      image: 'images/terminal1.png',
      text: 'Terminal'
    },
    {
      image: 'images/consumible.png',
      text: 'Consumibles'
    }
  ];

  // Products data for modal
  products: Product[] = [
    {
      id: 1,
      name: 'Lector de código profesional',
      description: 'Fácil de operar por su función Plug and Play, identifica códigos de barra ID en celulares y monitores.',
      price: 1500.00,
      image: 'images/barras3.png',
      images: ['images/barras4.png', 'images/barras5.png'],
      features: [
        'Lectura de códigos 1D y 2D',
        'Velocidad de escaneo de 300 escaneos/segundo',
        'Conexión USB plug and play',
        'Compatible con Windows, Mac y Linux',
        'Diseño ergonómico para uso prolongado'
      ],
      specifications: {
        'Tipo de escaneo': 'Bidireccional',
        'IP Class': 'IP52', 
        'Fuente de luz': '650nm Laser diodo visible',
        'Material': 'ABS + PC',
      },
      moreSpecifications: {
        
        'Voltaje': '5V CC',
        'Peso' : '246gr',
        'Cable' : '2 metros',
        'Medidas' : '175mm x 73mm x 102mm'
      }
    },
    {
      id: 2,
      name: 'Impresora Térmica Compacta',
      description: 'Impresora térmica para recibos y etiquetas. Perfecta para puntos de venta que requieren impresión rápida y silenciosa.',
      price: 1200.00,
      image: 'images/impresora3.png',
      images: ['images/impresora4.png', 'images/impresora5.png'],
      features: [
        'Impresión térmica directa sin tinta.',
        'Resolución 203 DPI nítida y profesional.',
        'Conexión USB y Ethernet',
        'Cortador automático integrado',
        'Bandeja de papel de fácil carga'
      ],
      specifications: {
        'Tamaño impresión': '76mm',
        'Velocidad': '250mm/s',
        'Operación': 'Continua estable',
        'Tecnología': 'Termica',
        
        
      },
      moreSpecifications: {
        'Conexión': 'USB + Ethernet',
        'Interfaces' : 'Puerto USB 2.0 y Ethernet LAN (RJ-45)',
        'Código de barras' : '1D/2D, Code 39, EAN13, PDF417, QR, UPC',
        'Movilidad' : 'Alámbrico'
      }
  
    },
    {
      id: 3,
      name: 'Cajón de Efectivo Electrónico',
      description: 'Cajón automático con seguridad integrada y control USB. Diseñado para un manejo seguro y eficiente del efectivo en tu negocio.',
      price: 750.00,
      image: 'images/cajon5.png',
      images: ['images/cajon3.png', 'images/cajon4.png'],
      features: [
        'Apertura automática mediante impulsor',
        '4 compartimentos para billetes',
        '8 compartimentos para monedas',
        'Cerradura de 3 posiciones',
        'Construcción en metal resistente'
      ],
      specifications: {
        'Interfaces': 'RJ11 para impresora de recibos',
        'Capacidad': 'Hasta 500 billetes',
        'Ranuras': 'Ranura para documentos'
      },
      moreSpecifications: {
        'Material': 'Metal resistente',
        'Dimensiones': '355 x 370 x 80 mm (L x W x H)',
        'Apertura': 'Eléctrica/Manual'
      }
    },
    {
      id: 4,
      name: 'Consumibles',
      description: 'Papel Térmico, Etiquetas. Todo lo necesario para tu punto de venta.',
      price: 80.00,
      image: 'images/rollo2.png',
      images: ['images/rollo3.png', 'images/rollo4.png'],
      features: [
        'Papel térmico de alta calidad',
        'Etiquetas térmicas adhesivas',
        'Papel termico de calidad',
        '',
        'Precios competitivos por mayoreo'
      ],
      specifications: {
        'Papel térmico': '80mm x 70mm',
        'Etiquetas': 'Variados tamaños',
        'Calidad': 'Alta'
      },
      moreSpecifications: {
        'Toners': 'Universal',
        'Garantía': 'Calidad garantizada'
      }
    },
    {
      id: 5,
      name: 'Computadora All In One',
      description: 'Monitor táctil capacitivo con soporte VESA. Interfaz intuitiva y responsive para tu sistema de punto de venta.',
      price: 4999.99,
      image: 'images/compu2.png',
      images: ['images/compu3.png', 'images/compu4.png'],
      features: [
        'Tecnología táctil capacitiva proyectada',
        'Resolución HD de 1024x768',
        'Mouse y teclado incluidos',
        'Software POS preinstalado',
        'Soporte VESA ajustable'
      ],
      specifications: {
        'Tamaño': '15 pulgadas',
        'Resolución': '1024 x 768',
        'Brillo': '250 cd/m²'
      },
      moreSpecifications: {
        'Contraste': '700:1',
        'Garantía': '3 años'
      }
    },
    {
      id: 6,
      name: 'Terminal Billpocket nano',
      description: 'Sistema completo con software integrado. La solución todo-en-uno para gestionar tu punto de venta de manera profesional.',
      price: 450.00,
      image: 'images/terminal3.png',
      images: ['images/terminal2.png'],
      features: [
        'Software de gestión incluido',
        'Pantalla táctil de 10 pulgadas',
        'Impresora térmica integrada',
        'Lector de tarjetas NFC',
        'Reportes de ventas en tiempo real'
      ],
      specifications: {
        'Procesador': 'Quad Core 1.8GHz',
        'RAM': '2 GB',
        'Almacenamiento': '16 GB'
      },
      moreSpecifications: {
        'Sistema': 'Android 11',
        'Garantía': '2 años'
      }
    },
    {
      id: 7,
      name: 'PC GHIA Frontier Slim 2.0',
      description: 'Computadora de escritorio con excelente rendimiento para punto de venta y oficina. Disco 1 TB y RAM 8 GB para un desempeño óptimo.',
      price: 5999.99,
      image: 'images/pc.png',
      images: ['images/pc.png'],
      features: [
        'Procesador de alto rendimiento',
        'Disco duro de 1 TB de capacidad',
        'Memoria RAM de 8 GB',
        'Diseño slim compacto',
        'Ideal para punto de venta y oficina'
      ],
      specifications: {
        'Disco Duro': '1 TB',
        'RAM': '8 GB',
        'Modelo': 'Frontier Slim 2.0'
      },
      moreSpecifications: {
        'Marca': 'GHIA',
        'Garantía': '1 año'
      }
    },
    {
      id: 8,
      name: 'Monitor GHIA 23.8 pulgadas',
      description: 'Monitor de alta definición con pantalla de 23.8 pulgadas. Perfecto para punto de venta y uso empresarial con excelente calidad de imagen.',
      price: 2499.99,
      image: 'images/monitor.png',
      images: ['images/monitor2.png'],
      features: [
        'Pantalla de 23.8 pulgadas',
        'Resolución Full HD',
        'Conexión HDMI y VGA',
        'Diseño elegante y moderno',
        'Bajo consumo energético'
      ],
      specifications: {
        'Tamaño': '23.8 pulgadas',
        'Resolución': 'Full HD 1920x1080',
        'Conexiones': 'HDMI, VGA'
      },
      moreSpecifications: {
        'Marca': 'GHIA',
        'Garantía': '1 año'
      }
    },
    {
      id: 9,
      name: 'Rollos Térmicos 76mm',
      description: 'Caja de consumibles con rollos térmicos de 76mm, compatibles con nuestras impresoras térmicas. Alta calidad de impresión.',
      price: 149.99,
      image: 'images/consumible.png',
      images: ['images/consumible2.png', 'images/consumible3.png'],
      features: [
        'Rollos térmicos de 76mm',
        'Compatible con impresoras térmicas',
        'Alta calidad de impresión',
        'Larga duración del papel',
        'Empaque por caja económica'
      ],
      specifications: {
        'Ancho': '76mm',
        'Tipo': 'Papel térmico',
        'Compatibilidad': 'Impresoras térmicas 76mm'
      },
      moreSpecifications: {
        'Presentación': 'Caja con múltiples rollos',
        'Calidad': 'Premium'
      }
    }
  ];

  ngOnInit(): void {
    // Initialization logic
  }

  ngAfterViewInit(): void {
    if (this.galleryContainer) {
      this.galleryApp = new CircularGalleryApp(
        this.galleryContainer.nativeElement,
        {
          items: this.galleryItems,
          textColor: this.galleryTextColor
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.galleryApp) {
      this.galleryApp.destroy();
    }
  }

  // Modal methods
  openModal(product: Product): void {
    this.selectedProduct = product;
    this.isModalOpen = true;
    // Prevenir scroll del body cuando el modal está abierto
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedProduct = null;
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
  }

  onContact(product: Product): void {
    // Aquí puedes implementar la lógica de contacto
    // Por ejemplo, abrir un formulario de contacto o redirigir a WhatsApp
    const message = `Hola, estoy interesado en el producto: ${product.name} ($${product.price})`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5217131334557&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    this.closeModal();
  }
}
