import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductModalComponent, Product } from '../../product-modal/product-modal.component';

@Component({
  selector: 'app-software',
  imports: [CommonModule, RouterModule, ProductModalComponent],
  templateUrl: './software.component.html',
  styleUrl: './software.component.css'
})
export class SoftwareComponent implements AfterViewInit, OnDestroy {
  private observer: IntersectionObserver | null = null;
  private hasAnimated = false;

  // Modal state
  isModalOpen = false;
  selectedProduct: Product | null = null;

  // MyBusiness POS Package data
  posPackage: Product = {
    id: 1,
    name: 'emenetPOS Punto de Venta',
    description: 'Punto de venta completo y listo para operar, impulsado por MyBusiness POS. Incluye equipo esencial y soporte especializado para que empieces a vender desde el primer día, todo en un solo paquete.',
    price: 30500,
    image: 'images/software/paquete.png',
    images: ['images/software/mybusiness2.png', 'images/software/monitor2.png', 'images/software/pc.png', 'images/cajon5.png', 'images/impresora3.png', 'images/barras3.png', 'images/teclado.png'],
    features: [
      'Configuración, instalación y puesta en marcha del sistema completo',
      'Implementación del sistema de recargas de tiempo aire',
      'Implementación del sistema de cobro con tarjeta de débito y crédito',
      '10 horas de capacitación incluidas',
      'Soporte técnico especializado'
    ],
    specifications: {
      'Computadora': 'PC GHIA Frontier Slim 2.0 1 TB Disco RAM 8 GB',
      'Procesador': 'Intel Pentium GOLD Core 3.7 GHz',
      'Monitor': '23.8 pulgadas',
      'Periféricos': 'Teclado y ratón incluidos',
      'Sistema Operativo': 'Windows 11',
      'Software': 'MyBusiness POS v24',
      'Impresora': 'Ticket 3 pulgadas',
      'Lector': 'Código de barras',
      'Cajón': '5 billetes, 8 monedas'
    },
    functions: [
      'Ventas de productos y servicios', 'Inventario de productos',
      'Compras y control de proveedores', 'Control de clientes',
      'Cobranza a clientes', 'Impresión de tickets',
      'Ventas de tiempo aire', 'Cobros con tarjeta de débito y crédito'
    ]
  };

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private setupIntersectionObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.animateCounters();
        }
      });
    }, { root: null, rootMargin: '0px', threshold: 0.3 });

    const ctaSection = document.querySelector('.sw-cta-section');
    if (ctaSection) this.observer.observe(ctaSection);
  }

  private animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    counters.forEach((counter, index) => {
      const target = +(counter.getAttribute('data-target') || 0);
      const increment = target / 125; // ~2s at 60fps
      let current = 0;

      const update = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current).toLocaleString();
          requestAnimationFrame(update);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };

      setTimeout(() => {
        counter.classList.add('active');
        update();
      }, index * 300);
    });
  }

  // Modal methods
  openModal(): void {
    this.selectedProduct = this.posPackage;
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedProduct = null;
    document.body.style.overflow = 'auto';
  }

  onContact(product: Product): void {
    const message = `Hola, estoy interesado en el paquete completo de emenetPOS Punto de Venta ($${product.price.toLocaleString()} MX)`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5217131334557&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    this.closeModal();
  }
}
