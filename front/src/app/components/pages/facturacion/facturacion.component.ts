import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderModalComponent } from "../../header-modal/header-modal.component";

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
  imports: [RouterLink, CommonModule, HeaderModalComponent],
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
  'Reportes y contabilidad simplificada',
  'Soporte técnico especializado',
  'Integración con sistemas contables',
  'Acceso desde cualquier dispositivo',
];


floatCards = [
  {
    icon: "fa-solid fa-ticket",
    title: "Desde $465",
    description: "paquete de 100 timbres",
    class: "fc-ventas"
  },
  {
    icon: "m",
    title: "Factura CFDI",
    description: "emitida en segundos",
    class: "fc-ticket"
  }
];
}
