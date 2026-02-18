import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductModalComponent, Product } from '../../product-modal/product-modal.component';

@Component({
  selector: 'app-software',
  imports: [CommonModule, RouterModule, ProductModalComponent],
  templateUrl: './software.component.html',
  styleUrl: './software.component.css'
})
export class SoftwareComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('.counter') counters!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;
  private hasAnimated = false;

  // Modal state
  isModalOpen = false;
  selectedProduct: Product | null = null;

  // MyBusiness POS Package data
  posPackage: Product = {
    id: 1,
    name: 'emenetPOS Punto de Venta',
    description: 'Solución integral para la administración eficiente de tu negocio. Paquete completo con todo lo necesario para iniciar operaciones de manera profesional.',
    price: 30500,
    image: 'images/mybusiness2.png',
    images: ['images/monitor2.png', 'images/pc.png', 'images/cajon5.png', 'images/impresora5.png','images/lector.png','images/teclado.png'],
    features: [
      'Configuración, instalación y puesta en marcha del sistema completo',
      'Implementación del sistema de recargas de tiempo aire',
      'Implementación del sistema de cobro con tarjeta de débito y crédito',
      '10 horas de capacitación incluidas',
      'Soporte técnico especializado'
    ],
    specifications: {
      'Computadora': 'PC GHIA Frontier Slim 2.0',
      'Procesador': 'Intel Pentium GOLD Core 3.7 GHz',
      'Memoria RAM': '8 GB',
      'Almacenamiento': '1 TB Disco duro',
      'Monitor': '23.8 pulgadas',
      'Periféricos': 'Teclado y ratón incluidos',
      'Sistema Operativo': 'Windows 11',
      'Software': 'MyBusiness POS v24',
      'Impresora': 'Ticket 3 pulgadas',
      'Lector': 'Código de barras',
      'Cajón': '5 billetes, 8 monedas'
    },
    functions: [
      'Ventas de productos y servicios',
      'Inventario de productos',
      'Compras y control de proveedores',
      'Control de clientes',
      'Cobranza a clientes',
      'Impresión de tickets',
      'Ventas de tiempo aire',
      'Cobros con tarjeta de débito y crédito'
    ]
  };

  ngOnInit() {}

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3 // Activar cuando el 30% de la sección sea visible
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.animateCounters();
        }
      });
    }, options);

    // Observar la sección CTA
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
      this.observer.observe(ctaSection);
    }
  }

  animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    counters.forEach((counter, index) => {
      const target = +counter.getAttribute('data-target')!;
      const duration = 2000; // 2 segundos
      const start = 0;
      const increment = target / (duration / 16); // 60fps
      let current = start;
      
      // Agregar delay escalonado para cada contador
      const delay = index * 300;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current).toLocaleString();
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };
      
      // Iniciar animación después del delay
      setTimeout(() => {
        counter.classList.add('active');
        updateCounter();
      }, delay);
    });
  }

  // Modal methods
  openModal(): void {
    this.selectedProduct = this.posPackage;
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
    // Redirigir a WhatsApp con mensaje predefinido
    const message = `Hola, estoy interesado en el paquete completo de emenetPOS Punto de Venta ($${product.price.toLocaleString()} MX)`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5217131334557&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    this.closeModal();
  }
}
