import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[]; // Array de imágenes adicionales para el carrusel
  features?: string[];
  feature?: string[];
  specifications?: { [key: string]: string };
}

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="modal-overlay" *ngIf="isOpen" (click)="onOverlayClick($event)">
      <div class="modal-container">
        <button class="modal-close" (click)="closeModal()" aria-label="Cerrar">
          <span>&times;</span>
        </button>
        
        <div class="modal-content" *ngIf="product">
          <!-- Layout de dos columnas -->
          <div class="modal-body">
            <!-- Columna izquierda: Carrusel de Imágenes -->
            <div class="modal-carousel">
              <div class="carousel-main-image" 
                   (click)="openZoom()"
                   (touchstart)="onTouchStart($event)"
                   (touchmove)="onTouchMove($event)"
                   (touchend)="onTouchEnd($event)">
                <img [src]="currentImage" [alt]="product.name" class="carousel-image" [class.dragging]="isDragging">
                <div class="zoom-hint">
                  <span>&#128269;</span>
                </div>
              </div>
              
              <!-- Indicadores de navegación del carrusel -->
              <div class="carousel-nav" *ngIf="allImages.length > 1">
                <button class="carousel-btn prev" (click)="prevImage()" aria-label="Anterior">
                  <span>&#10094;</span>
                </button>
                <div class="carousel-dots">
                  <span 
                    *ngFor="let img of allImages; let i = index" 
                    class="dot" 
                    [class.active]="i === currentIndex"
                    (click)="goToImage(i)">
                  </span>
                </div>
                <button class="carousel-btn next" (click)="nextImage()" aria-label="Siguiente">
                  <span>&#10095;</span>
                </button>
              </div>
            </div>

            <!-- Columna derecha: Información del producto -->
            <div class="modal-info">
              <h2 class="modal-title">{{ product.name }}</h2>
              <p class="modal-description">{{ product.description }}</p>
              
              <div class="modal-price-section">
                <span class="modal-price">{{ product.price | currency }}</span>
              </div>
              
              <div class="modal-features" *ngIf="product.features?.length">
                <h3>Características principales:</h3>
                <ul>
                  <li *ngFor="let feature of product.features">{{ feature }}</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Parte inferior: Especificaciones y Botones -->
          <div class="modal-footer">
            <div class="modal-specifications" *ngIf="product.specifications">
              <h3>Especificaciones técnicas:</h3>
              <div class="specs-grid">
                <div class="spec-item" *ngFor="let spec of product.specifications | keyvalue">
                  <span class="spec-key">{{ spec.key }}:</span>
                  <span class="spec-value">{{ spec.value }}</span>
                </div>
              </div>
            </div>
            
            <div class="modal-actions">
              <button class="btn-primary" (click)="onContact()">Contactar para comprar</button>
              <button class="btn-secondary" (click)="closeModal()">Seguir explorando</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de Zoom -->
    <div class="zoom-overlay" *ngIf="isZoomOpen" (click)="closeZoom()">
      <div class="zoom-container"
           (touchstart)="onZoomTouchStart($event)"
           (touchmove)="onZoomTouchMove($event)"
           (touchend)="onZoomTouchEnd($event)">
        <button class="zoom-close" (click)="closeZoom()" aria-label="Cerrar zoom">
          <span>&times;</span>
        </button>
        <img [src]="currentImage" [alt]="product?.name" class="zoom-image" [class.dragging]="isDragging">
        <div class="zoom-nav" *ngIf="allImages.length > 1">
          <button class="zoom-btn prev" (click)="prevImage(); $event.stopPropagation()" aria-label="Anterior">
            <span>&#10094;</span>
          </button>
          <button class="zoom-btn next" (click)="nextImage(); $event.stopPropagation()" aria-label="Siguiente">
            <span>&#10095;</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      padding: 20px;
      animation: fadeIn 0.3s ease;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .modal-container {
      background: white;
      border-radius: 16px;
      max-width: 900px;
      width: 100%;
      max-height: 90vh;
      position: relative;
      animation: slideUp 0.3s ease;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translateY(50px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .modal-close {
      position: absolute;
      top: 15px;
      right: 15px;
      background: #003796;
      color: white;
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      font-size: 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      z-index: 10;
    }

    .modal-close:hover {
      background: #002a75;
      transform: rotate(90deg);
    }

    .modal-content {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow-y: auto;
    }

    /* ===== CUERPO PRINCIPAL - DOS COLUMNAS ===== */
    .modal-body {
      display: flex;
      flex-direction: row;
      padding: 25px;
      gap: 25px;
      flex: 1;
    }

    /* ===== CARRUSEL DE IMÁGENES - COLUMNA IZQUIERDA ===== */
    .modal-carousel {
      flex: 0 0 45%;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: #f8f9fa;
      border-radius: 12px;
      padding: 15px;
    }

    .carousel-main-image {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 250px;
      cursor: pointer;
      position: relative;
      border-radius: 8px;
      overflow: hidden;
      touch-action: pan-y;
      user-select: none;
      -webkit-user-select: none;
    }

    .carousel-main-image:hover .zoom-hint {
      opacity: 1;
    }

    .zoom-hint {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: rgba(0, 55, 150, 0.8);
      color: white;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .carousel-image {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
      border-radius: 8px;
      transition: transform 0.3s ease;
    }

    .carousel-image.dragging {
      transition: none;
    }

    .carousel-main-image:hover .carousel-image {
      transform: scale(1.05);
    }

    .carousel-nav {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 15px;
      margin-top: 10px;
    }

    .carousel-btn {
      background: #003796;
      color: white;
      border: none;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      font-size: 14px;
    }

    .carousel-btn:hover {
      background: #002a75;
      transform: scale(1.1);
    }

    .carousel-dots {
      display: flex;
      gap: 8px;
    }

    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #ccc;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .dot.active {
      background: #003796;
      transform: scale(1.2);
    }

    .dot:hover {
      background: #003796;
    }

    /* ===== INFORMACIÓN - COLUMNA DERECHA ===== */
    .modal-info {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .modal-title {
      color: #003796;
      font-size: 1.5rem;
      margin-bottom: 10px;
      font-weight: 700;
    }

    .modal-description {
      color: #666;
      font-size: 0.95rem;
      line-height: 1.5;
      margin-bottom: 15px;
    }

    .modal-price-section {
      margin-bottom: 15px;
    }

    .modal-price {
      font-size: 1.6rem;
      color: #ff0101;
      font-weight: 700;
    }

    .modal-features {
      flex: 1;
    }

    .modal-features h3 {
      color: #333;
      font-size: 1rem;
      margin-bottom: 10px;
      font-weight: 600;
    }

    .modal-features ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .modal-features li {
      padding: 6px 0;
      padding-left: 20px;
      position: relative;
      color: #555;
      font-size: 0.9rem;
    }

    .modal-features li::before {
      content: '\\2713';
      position: absolute;
      left: 0;
      color: #003796;
      font-weight: bold;
    }

    /* ===== FOOTER - ESPECIFICACIONES Y BOTONES ===== */
    .modal-footer {
      padding: 20px 25px;
      border-top: 1px solid #eee;
      background: #fafafa;
    }

    .modal-specifications h3 {
      color: #333;
      font-size: 1rem;
      margin-bottom: 12px;
      font-weight: 600;
    }

    .specs-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px 20px;
      margin-bottom: 20px;
    }

    .spec-item {
      display: flex;
      gap: 8px;
      font-size: 0.85rem;
    }

    .spec-key {
      font-weight: 600;
      color: #333;
    }

    .spec-value {
      color: #555;
    }

    .modal-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }

    .btn-primary, .btn-secondary {
      padding: 12px 24px;
      border-radius: 8px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;
      flex: 1;
      min-width: 180px;
    }

    .btn-primary {
      background: #003796;
      color: white;
    }

    .btn-primary:hover {
      background: #002a75;
      transform: translateY(-2px);
      box-shadow: 0 5px 20px rgba(0, 55, 150, 0.3);
    }

    .btn-secondary {
      background: transparent;
      color: #003796;
      border: 2px solid #003796;
    }

    .btn-secondary:hover {
      background: #003796;
      color: white;
    }

    /* ===== ZOOM MODAL ===== */
    .zoom-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.95);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 2000;
      animation: fadeIn 0.3s ease;
    }

    .zoom-container {
      position: relative;
      max-width: 90vw;
      max-height: 90vh;
      display: flex;
      align-items: center;
      justify-content: center;
      touch-action: pan-y;
      user-select: none;
      -webkit-user-select: none;
    }

    .zoom-close {
      position: absolute;
      top: -50px;
      right: 0;
      background: white;
      color: #003796;
      border: none;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      font-size: 28px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      z-index: 10;
    }

    .zoom-close:hover {
      background: #003796;
      color: white;
      transform: rotate(90deg);
    }

    .zoom-image {
      max-width: 90vw;
      max-height: 80vh;
      object-fit: contain;
      border-radius: 8px;
      animation: zoomIn 0.3s ease;
    }

    .zoom-image.dragging {
      transition: none;
    }

    @keyframes zoomIn {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .zoom-nav {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      display: flex;
      justify-content: space-between;
      padding: 0 20px;
      pointer-events: none;
    }

    .zoom-btn {
      background: rgba(255, 255, 255, 0.9);
      color: #003796;
      border: none;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      font-size: 20px;
      pointer-events: auto;
    }

    .zoom-btn:hover {
      background: #003796;
      color: white;
      transform: scale(1.1);
    }

    @media (max-width: 768px) {
      .modal-container {
        max-width: 95%;
        max-height: 85vh;
      }

      .modal-body {
        flex-direction: column;
        padding: 15px;
        gap: 15px;
      }

      .modal-carousel {
        flex: none;
        padding: 10px;
      }

      .carousel-main-image {
        height: 180px;
      }

      .modal-info {
        padding: 0;
      }

      .modal-title {
        font-size: 1.25rem;
      }

      .modal-price {
        font-size: 1.4rem;
      }

      .specs-grid {
        grid-template-columns: 1fr;
      }

      .modal-footer {
        padding: 15px;
      }

      .modal-actions {
        flex-direction: column;
      }

      .btn-primary, .btn-secondary {
        width: 100%;
        min-width: auto;
      }

      .zoom-btn {
        width: 40px;
        height: 40px;
        font-size: 16px;
      }

      .zoom-close {
        top: -45px;
        width: 40px;
        height: 40px;
        font-size: 24px;
      }
    }
  `]
})
export class ProductModalComponent implements OnInit, OnDestroy {
  @Input() isOpen = false;
  @Input() product: Product | null = null;
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
  private autoPlayDelay = 4000; // 4 segundos

  ngOnInit(): void {
    this.startAutoPlay();
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
