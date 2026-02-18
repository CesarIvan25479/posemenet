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
      description: 'Scanner de códigos de alta velocidad y precisión. Ideal para comercios, almacenes y cualquier negocio que requiera lectura rápida y confiable de códigos.',
      price: 229.99,
      image: 'images/barras2.png',
      images: ['images/barras3.png', 'images/barras.png'],
      features: [
        'Lectura de códigos 1D y 2D',
        'Velocidad de escaneo de 300 escaneos/segundo',
        'Conexión USB plug and play',
        'Compatible con Windows, Mac y Linux',
        'Diseño ergonómico para uso prolongado'
      ],
      specifications: {
        'Tipo de escaneo': 'Imager 2D',
        'Interfaz': 'USB 2.0',
        'Alcance': 'Hasta 30 cm',
        'Temperatura': '0°C a 50°C'
      }
    },
    {
      id: 2,
      name: 'Impresora Térmica Compacta',
      description: 'Impresora térmica para recibos y etiquetas. Perfecta para puntos de venta que requieren impresión rápida y silenciosa.',
      price: 1999.99,
      image: 'images/impresora2.png',
      images: ['images/impresora3.webp', 'images/impresora4.webp', 'images/impresora.png'],
      features: [
        'Velocidad de impresión de 250mm/segundo',
        'Corte automático de papel',
        'Conexión USB y Ethernet',
        'Compatible con ESC/POS',
        'Bandeja de papel de fácil carga'
      ],
      specifications: {
        'Ancho de papel': '80mm',
        'Velocidad': '250mm/s',
        'Resolución': '203 DPI',
        'Conexión': 'USB + Ethernet',
        'Garantía': '1 año'
      }
    },
    {
      id: 3,
      name: 'Cajón de Efectivo Electrónico',
      description: 'Cajón automático con seguridad integrada y control USB. Diseñado para un manejo seguro y eficiente del efectivo en tu negocio.',
      price: 1499.99,
      image: 'images/cajon2.png',
      images: ['images/cajon3.webp', 'images/cajon4.webp', 'images/cajon.png'],
      features: [
        'Apertura automática mediante impulsor',
        '4 compartimentos para billetes',
        '8 compartimentos para monedas',
        'Cerradura con 2 llaves incluidas',
        'Construcción en acero resistente'
      ],
      specifications: {
        'Dimensiones': '410 x 420 x 100 mm',
        'Capacidad': 'Hasta 500 billetes',
        'Material': 'Acero galvanizado',
        'Apertura': 'Eléctrica/Manual'
      }
    },
    {
      id: 4,
      name: 'Consumibles',
      description: 'Papel Térmico, Etiquetas Térmicas, Cartuchos y Toners. Todo lo necesario para tu punto de venta.',
      price: 74.99,
      image: 'images/consumible2.png',
      images: ['images/consumible3.png', 'images/consumible.png'],
      features: [
        'Papel térmico de alta calidad',
        'Etiquetas térmicas adhesivas',
        'Cartuchos compatibles múltiples marcas',
        'Toners de alto rendimiento',
        'Precios competitivos por mayoreo'
      ],
      specifications: {
        'Papel térmico': '80mm x 70mm',
        'Etiquetas': 'Variados tamaños',
        'Cartuchos': 'HP, Canon, Epson',
        'Toners': 'Universal',
        'Garantía': 'Calidad garantizada'
      }
    },
    {
      id: 5,
      name: 'Computadora All In One',
      description: 'Monitor táctil capacitivo con soporte VESA. Interfaz intuitiva y responsive para tu sistema de punto de venta.',
      price: 4999.99,
      image: 'images/compu.png',
      images: ['images/compu2.png', 'images/compu3.png', 'images/compu4.png'],
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
        'Brillo': '250 cd/m²',
        'Contraste': '700:1',
        'Garantía': '3 años'
      }
    },
    {
      id: 6,
      name: 'Caja Registradora Electrónica',
      description: 'Sistema completo con software integrado. La solución todo-en-uno para gestionar tu punto de venta de manera profesional.',
      price: 449.99,
      image: 'images/terminal1.png',
      images: ['images/terminal1.png'],
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
        'Almacenamiento': '16 GB',
        'Sistema': 'Android 11',
        'Garantía': '2 años'
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
