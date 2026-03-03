import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TimbrePaquete {
    id: number;
    cantidad: number;
    precio: number;
    descripcion: string;
    popular?: boolean;
}

@Component({
    selector: 'app-timbres-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './timbres-modal.component.html',
    styleUrl: './timbres-modal.component.css'
})
export class TimbresModalComponent {
    @Input() isOpen = false;
    @Output() closeEvent = new EventEmitter<void>();

    paquetes: TimbrePaquete[] = [
        {
            id: 1, cantidad: 100, precio: 465.16,
            descripcion: 'Ideal para negocios pequeños con facturación básica mensual.'
        },
        {
            id: 2, cantidad: 200, precio: 814.32,
            descripcion: 'Perfecto para negocios en crecimiento con flujo constante de facturas.'
        },
        {
            id: 3, cantidad: 500, precio: 1745.80, popular: true,
            descripcion: 'Recomendado para empresas medianas con alto volumen de facturación.'
        },
        {
            id: 4, cantidad: 1000, precio: 2911.60,
            descripcion: 'La mejor opción para empresas con gran volumen de operaciones diarias.'
        },
        {
            id: 5, cantidad: 5000, precio: 11646.40,
            descripcion: 'Paquete empresarial para corporativos y cadenas de negocios.'
        }
    ];

    selectedPaquete: TimbrePaquete = this.paquetes[0];

    selectPaquete(paq: TimbrePaquete): void {
        this.selectedPaquete = paq;
    }

    get precioUnitario(): string {
        if (!this.selectedPaquete) return '0.00';
        return (this.selectedPaquete.precio / this.selectedPaquete.cantidad).toFixed(2);
    }

    getWhatsAppUrl(): string {
        const msg = 'Hola buen día, me interesa comprar el paquete de '
            + this.selectedPaquete.cantidad + ' timbres fiscales ($'
            + this.selectedPaquete.precio + ' MXN)';
        return 'https://api.whatsapp.com/send?phone=5217131334557&text=' + encodeURIComponent(msg);
    }

    closeModal(): void {
        this.isOpen = false;
        this.closeEvent.emit();
        document.body.style.overflow = 'auto';
    }

    onOverlayClick(event: MouseEvent): void {
        if ((event.target as HTMLElement).classList.contains('timbres-overlay')) {
            this.closeModal();
        }
    }
}
