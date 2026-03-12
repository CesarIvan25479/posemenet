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

  packages: TimbrePackage[] = [
    {
      id: 'pkg-100',
      quantity: 100,
      title: 'Paquete Básico — 100 Timbres',
      description: 'Ideal para negocios pequeños o freelancers que facturan esporádicamente. Emite hasta 100 CFDIs válidos ante el SAT sin mensualidades.',
      price: '$465.16 MXN',
      priceNum: 465.16,
    },
    {
      id: 'pkg-200',
      quantity: 200,
      title: 'Paquete Estándar — 200 Timbres',
      description: 'Perfecto para PyMEs en crecimiento. Obtén el doble de capacidad de facturación con un precio por timbre más competitivo.',
      price: '$814.32 MXN',
      priceNum: 814.32,
    },
    {
      id: 'pkg-500',
      quantity: 500,
      title: 'Paquete Profesional — 500 Timbres',
      description: 'La opción más popular para negocios activos. Factura con mayor volumen y ahorra hasta un 25% por timbre comparado con el paquete básico.',
      price: '$1,745.80 MXN',
      priceNum: 1745.80,
      badge: 'Más popular',
      highlight: true,
    },
    {
      id: 'pkg-1000',
      quantity: 1000,
      title: 'Paquete Empresarial — 1,000 Timbres',
      description: 'Para empresas con alto volumen de facturación. El mejor costo por timbre del mercado y soporte prioritario durante todo el año.',
      price: '$2,911.60 MXN',
      priceNum: 2911.60,
      badge: 'Mejor valor',
    },
  ];

  selectedPackage: TimbrePackage = this.packages[0];

  openModal(): void {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.isModalOpen = false;
    document.body.style.overflow = '';
  }

  selectPackage(pkg: TimbrePackage): void {
    this.selectedPackage = pkg;
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
