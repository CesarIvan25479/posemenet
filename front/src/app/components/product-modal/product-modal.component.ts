import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  images?: string[]; // Array de imágenes adicionales para el modal
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
          <div class="modal-image-section">
            <div class="modal-images-grid" [class.single-image]="!product.images || product.images.length === 0">
              <img [src]="product.image" [alt]="product.name" class="modal-image">
              <ng-container *ngIf="product.images && product.images.length > 0">
                <img *ngFor="let img of product.images" [src]="img" [alt]="product.name" class="modal-image">
              </ng-container>
            </div>
          </div>
          
          <div class="modal-info-section">
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
            
            <div class="modal-specifications" *ngIf="product.specifications">
              <h3>Especificaciones técnicas:</h3>
              <table>
                <tr *ngFor="let spec of product.specifications | keyvalue">
                  <td><strong>{{ spec.key }}:</strong></td>
                  <td>{{ spec.value }}</td>
                </tr>
              </table>
            </div>
            
            <div class="modal-actions">
              <button class="btn-primary" (click)="onContact()">Contactar para comprar</button>
              <button class="btn-secondary" (click)="closeModal()">Seguir explorando</button>
            </div>
          </div>
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
      overflow-y: auto;
      position: relative;
      animation: slideUp 0.3s ease;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
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
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0;
    }

    .modal-image-section {
      padding: 30px;
      background: #f8f9fa;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 16px 0 0 16px;
    }

    .modal-images-grid {
      display: flex;
      flex-direction: column;
      gap: 15px;
      width: 100%;
      align-items: center;
    }

    .modal-images-grid.single-image {
      display: flex;
      justify-content: center;
    }

    .modal-image {
      max-width: 100%;
      max-height: 350px;
      object-fit: contain;
      border-radius: 8px;
    }

    .modal-info-section {
      padding: 30px;
    }

    .modal-title {
      color: #003796;
      font-size: 1.8rem;
      margin-bottom: 15px;
      font-weight: 700;
    }

    .modal-description {
      color: #666;
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 20px;
    }

    .modal-price-section {
      margin-bottom: 25px;
    }

    .modal-price {
      font-size: 2rem;
      color: #003796;
      font-weight: 700;
    }

    .modal-features, .modal-specifications {
      margin-bottom: 25px;
    }

    .modal-features h3, .modal-specifications h3 {
      color: #333;
      font-size: 1.1rem;
      margin-bottom: 12px;
      font-weight: 600;
    }

    .modal-features ul {
      list-style: none;
      padding: 0;
    }

    .modal-features li {
      padding: 8px 0;
      padding-left: 25px;
      position: relative;
      color: #555;
    }

    .modal-features li::before {
      content: '\\2713';
      position: absolute;
      left: 0;
      color: #003796;
      font-weight: bold;
    }

    .modal-specifications table {
      width: 100%;
      border-collapse: collapse;
    }

    .modal-specifications td {
      padding: 8px 0;
      border-bottom: 1px solid #eee;
      color: #555;
    }

    .modal-actions {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }

    .btn-primary, .btn-secondary {
      padding: 14px 28px;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      border: none;
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

    @media (max-width: 768px) {
      .modal-content {
        grid-template-columns: 1fr;
      }

      .modal-image-section {
        border-radius: 16px 16px 0 0;
        padding: 20px;
      }

      .modal-images-grid {
        flex-direction: column;
        gap: 10px;
      }

      .modal-image {
        max-height: 250px;
      }

      .modal-info-section {
        padding: 20px;
      }

      .modal-title {
        font-size: 1.4rem;
      }

      .modal-price {
        font-size: 1.6rem;
      }

      .modal-actions {
        flex-direction: column;
      }

      .btn-primary, .btn-secondary {
        width: 100%;
      }
    }
  `]
})
export class ProductModalComponent {
  @Input() isOpen = false;
  @Input() product: Product | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() contact = new EventEmitter<Product>();

  closeModal(): void {
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
