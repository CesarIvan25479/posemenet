import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderModalComponent } from "../../header-modal/header-modal.component";
import { TimbresModalComponent } from '../../shared/timbres-modal/timbres-modal.component';

export interface TimbrePackage {
  id: string;
  quantity: number;
  title: string;
  description: string;
  price: string;
  priceNum: number;
  badge?: string;
  highlight?: boolean;
}

@Component({
  selector: 'app-tiempo-aire',
  standalone: true,
  imports: [CommonModule, HeaderModalComponent, TimbresModalComponent],
  templateUrl: './facturacion.component.html',
  styleUrl: './facturacion.component.css'
})
export class FacturacionComponent {

  isModalOpen = false;

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  features = [
    'Facturas CFDI válidas ante el SAT',
    'Envío automático por email',
    'Repertorio de clientes y productos',
    'Reportes y contabilidad simplificada'
  ];


  floatCards = [
    {
      icon: "fa-solid fa-hand-holding-dollar",
      color: "rgb(129, 249, 0)",
      title: "Desde $465",
      description: "paquete de 100 timbres",
      class: "fc-ventas"
    },
    {
      icon: "fa-solid fa-laptop-filefa-solid fa-file-invoice",
      color: " rgb(0, 164, 249)",
      title: "Factura CFDI",
      description: "emitida en segundos",
      class: "fc-ticket"
    }
  ];
}
