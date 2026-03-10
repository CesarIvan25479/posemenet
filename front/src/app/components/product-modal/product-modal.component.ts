import { Component, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[];
  features?: string[];
  feature?: string[];
  specifications?: { [key: string]: string };
  moreSpecifications?: { [key: string]: string };
  functions?: string[];
  stock?: number;
}

@Component({
  selector: 'app-product-modal',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.css']
})
export class ProductModalComponent implements OnDestroy, OnChanges {
  @Input() isOpen = false;
  @Input() product: Product | null = null;
  @Input() showAccesoriosButton = false;
  @Output() close = new EventEmitter<void>();
  @Output() contact = new EventEmitter<Product>();

  currentIndex = 0;
  isZoomOpen = false;

  private touchStart = { x: 0, y: 0 };
  private touchEnd = { x: 0, y: 0 };
  isDragging = false;
  private readonly minSwipeDistance = 50;
  private autoPlayInterval: any;
  private readonly autoPlayDelay = 2500;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isOpen'] || changes['product']) {
      if (this.isOpen && this.product) {
        this.currentIndex = 0;
        this.startAutoPlay();
        document.body.style.overflow = 'hidden';
      } else if (changes['isOpen'] && !this.isOpen) {
        this.stopAutoPlay();
        document.body.style.overflow = '';
      }
    }
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
    document.body.style.overflow = '';
  }

  get allImages(): string[] {
    if (!this.product) return [];
    return [this.product.image, ...(this.product.images || [])];
  }

  get currentImage(): string {
    return this.allImages[this.currentIndex] || '';
  }

  // ===== AUTO PLAY =====
  startAutoPlay(): void {
    this.stopAutoPlay();
    if (this.allImages.length > 1) {
      this.autoPlayInterval = setInterval(() => this.nextImage(), this.autoPlayDelay);
    }
  }

  stopAutoPlay(): void {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  private resetAutoPlay(): void {
    this.stopAutoPlay();
    this.startAutoPlay();
  }

  // ===== NAVIGATION =====
  prevImage(): void {
    if (this.allImages.length <= 1) return;
    this.currentIndex = (this.currentIndex - 1 + this.allImages.length) % this.allImages.length;
    this.resetAutoPlay();
  }

  nextImage(): void {
    if (this.allImages.length <= 1) return;
    this.currentIndex = (this.currentIndex + 1) % this.allImages.length;
    this.resetAutoPlay();
  }

  goToImage(index: number): void {
    this.currentIndex = index;
    this.resetAutoPlay();
  }

  // ===== UNIFIED TOUCH HANDLING =====
  private handleTouchStart(event: TouchEvent): void {
    this.touchStart = { x: event.touches[0].clientX, y: event.touches[0].clientY };
    this.touchEnd = { ...this.touchStart };
    this.isDragging = true;
  }

  private handleTouchMove(event: TouchEvent): void {
    if (!this.isDragging) return;
    this.touchEnd = { x: event.touches[0].clientX, y: event.touches[0].clientY };
  }

  private processSwipe(): 'left' | 'right' | 'tap' | 'none' {
    const dx = this.touchEnd.x - this.touchStart.x;
    const dy = this.touchEnd.y - this.touchStart.y;

    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > this.minSwipeDistance) {
      return dx < 0 ? 'left' : 'right';
    }
    if (Math.abs(dx) < 10 && Math.abs(dy) < 10) return 'tap';
    return 'none';
  }

  onTouchStart(event: TouchEvent): void {
    this.handleTouchStart(event);
    this.stopAutoPlay();
  }

  onTouchMove(event: TouchEvent): void {
    this.handleTouchMove(event);
  }

  onTouchEnd(_event?: TouchEvent): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    const gesture = this.processSwipe();
    if (gesture === 'left') this.nextImage();
    else if (gesture === 'right') this.prevImage();
    else if (gesture === 'tap') this.openZoom();
    this.startAutoPlay();
  }

  onZoomTouchStart(event: TouchEvent): void {
    this.handleTouchStart(event);
    event.stopPropagation();
  }

  onZoomTouchMove(event: TouchEvent): void {
    this.handleTouchMove(event);
    event.stopPropagation();
  }

  onZoomTouchEnd(event: TouchEvent): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    const gesture = this.processSwipe();
    if (gesture === 'left') { this.nextImage(); event.stopPropagation(); }
    else if (gesture === 'right') { this.prevImage(); event.stopPropagation(); }
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
    if (this.product) this.contact.emit(this.product);
  }

  onOverlayClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.closeModal();
  }
}
