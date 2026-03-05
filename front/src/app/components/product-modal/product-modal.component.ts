import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[];               // Array de imágenes adicionales para el carrusel
  features?: string[];
  feature?: string[];
  specifications?: { [key: string]: string };
  moreSpecifications?: { [key: string]: string }; // Especificaciones adicionales
  functions?: string[];            // Funciones del producto/sistema
}

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnInit, OnDestroy, OnChanges {
  @Input() isOpen = false;
  @Input() product: Product | null = null;
  @Input() showAccesoriosButton = false;
  @Output() close = new EventEmitter<void>();
  @Output() contact = new EventEmitter<Product>();

  currentIndex = 0;
  isZoomOpen = false;
  isDragging = false;

  // Touch handling
  private touchStartX = 0;
  private touchStartY = 0;
  private touchEndX = 0;
  private touchEndY = 0;
  private minSwipeDistance = 50; // Mínima distancia para considerar un swipe
  private autoPlayInterval: any;
  private autoPlayDelay = 2500; // 2.5 segundos

  ngOnInit(): void {
    // El autoplay se iniciará cuando el modal se abra con un producto
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Iniciar autoplay cuando el modal se abre con un producto
    if (changes['isOpen'] || changes['product']) {
      if (this.isOpen && this.product) {
        this.currentIndex = 0;
        this.startAutoPlay();
      } else {
        this.stopAutoPlay();
      }
    }
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  get allImages(): string[] {
    if (!this.product) return [];
    const images = [this.product.image];
    if (this.product.images && this.product.images.length > 0) {
      images.push(...this.product.images);
    }
    return images;
  }

  get currentImage(): string {
    return this.allImages[this.currentIndex] || '';
  }

  // ===== AUTO PLAY =====
  startAutoPlay(): void {
    this.stopAutoPlay();
    if (this.allImages.length > 1) {
      this.autoPlayInterval = setInterval(() => {
        this.nextImage();
      }, this.autoPlayDelay);
    }
  }

  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  // ===== NAVIGATION =====
  prevImage(): void {
    if (this.allImages.length > 1) {
      this.currentIndex = this.currentIndex === 0
        ? this.allImages.length - 1
        : this.currentIndex - 1;
      this.resetAutoPlay();
    }
  }

  nextImage(): void {
    if (this.allImages.length > 1) {
      this.currentIndex = this.currentIndex === this.allImages.length - 1
        ? 0
        : this.currentIndex + 1;
      this.resetAutoPlay();
    }
  }

  goToImage(index: number): void {
    this.currentIndex = index;
    this.resetAutoPlay();
  }

  resetAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  // ===== TOUCH HANDLING FOR CAROUSEL =====
  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
    this.isDragging = true;
    this.stopAutoPlay();
  }

  onTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    this.touchEndX = event.touches[0].clientX;
    this.touchEndY = event.touches[0].clientY;
  }

  onTouchEnd(event: TouchEvent): void {
    if (!this.isDragging) return;
    this.isDragging = false;

    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;

    // Solo procesar si el movimiento horizontal es mayor que el vertical
    // y si la distancia es suficiente
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.minSwipeDistance) {
      if (deltaX < 0) {
        // Swipe izquierda -> siguiente imagen
        this.nextImage();
      } else {
        // Swipe derecha -> imagen anterior
        this.prevImage();
      }
    } else {
      // Si no fue un swipe, tratar como tap para zoom
      if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
        this.openZoom();
      }
    }

    // Reset values
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.touchStartY = 0;
    this.touchEndY = 0;

    this.startAutoPlay();
  }

  // ===== TOUCH HANDLING FOR ZOOM =====
  onZoomTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
    this.touchStartY = event.touches[0].clientY;
    this.isDragging = true;
    event.stopPropagation();
  }

  onZoomTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    this.touchEndX = event.touches[0].clientX;
    this.touchEndY = event.touches[0].clientY;
    event.stopPropagation();
  }

  onZoomTouchEnd(event: TouchEvent): void {
    if (!this.isDragging) return;
    this.isDragging = false;

    const deltaX = this.touchEndX - this.touchStartX;
    const deltaY = this.touchEndY - this.touchStartY;

    // Solo procesar si el movimiento horizontal es mayor que el vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.minSwipeDistance) {
      if (deltaX < 0) {
        this.nextImage();
      } else {
        this.prevImage();
      }
      event.stopPropagation();
    }

    // Reset values
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.touchStartY = 0;
    this.touchEndY = 0;
  }

  // ===== ZOOM =====
  openZoom(): void {
    this.isZoomOpen = true;
    this.stopAutoPlay();
  }

  closeZoom(): void {
    this.isZoomOpen = false;
    this.startAutoPlay();
  }

  closeModal(): void {
    this.currentIndex = 0;
    this.isZoomOpen = false;
    this.isDragging = false;
    this.stopAutoPlay();
    this.close.emit();
  }

  onContact(): void {
    if (this.product) {
      this.contact.emit(this.product);
    }
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}
