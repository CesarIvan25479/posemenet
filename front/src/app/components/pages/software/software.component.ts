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
    name: 'Kit Punto de Venta Premium',
    description: 'Punto de venta completo y listo para operar, impulsado por MyBusiness POS. Incluye equipo esencial y soporte especializado para que empieces a vender desde el primer día, todo en un solo paquete.',
    price: 19740,
    image: 'images/software/paquete.png',
    images: ['images/accesorios/pc/ghia/pc3.png', 'images/accesorios/monitor/ghia/monitor4.png', 'images/accesorios/impresora/ecline/ecline1.png', 'images/accesorios/lector/ghia/barras4.png', 'images/accesorios/cajon/ghia/cajon4.png'],
    features: [
      'Computadora GHIA Frontier Slim 2.0 (Intel 4 Núcleos @ 3.40 GHz)',
      'Monitor GHIA MG2225 de 21.5" VA FHD 100Hz Frameless',
      'Impresora Térmica EC-Line EC-PM-X30 (300 mm/seg)',
      'Lector de códigos de barras GHIA GSCBI 1D con Base',
      'Cajón de dinero GHIA GCDS81 de acero reforzado',
      'Incluye kit de teclado y mouse alámbricos',
      '10 horas de capacitación y soporte técnico premium integral'
    ],
    specifications: {
      'Computadora': 'GHIA Frontier Slim 20 Intel 4 núcleos @ 3.40 GHz',
      'RAM': '8 GB DDR4',
      'Almacenamiento': '240 GB SSD',
      'Monitor': 'GHIA MG2225 21.5" VA FHD 100Hz',
      'Impresora': 'EC-Line EC-PM-X30 80mm (300 mm/s)',
      'Lector': 'GHIA GSCBI 1D LED CCD con Base',
      'Cajón': 'GHIA GCDS81 (5 billetes / 8 monedas)',
      'Sistema Operativo': 'Sin Sistema Operativo',
      'Software': 'MyBusiness POS v24'
    },
    functions: [
      'Ventas de productos y servicios', 'Inventario de productos',
      'Compras y control de proveedores', 'Control de clientes',
      'Cobranza a clientes', 'Impresión de tickets',
      'Ventas de tiempo aire', 'Cobros con tarjeta de débito y crédito'
    ],
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
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedProduct = null;
  }

  onContact(product: Product): void {
    const message = `Hola, estoy interesado en el paquete completo de emenetPOS Punto de Venta ($${product.price.toLocaleString()} MX)`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=5217131334557&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    this.closeModal();
  }
}
