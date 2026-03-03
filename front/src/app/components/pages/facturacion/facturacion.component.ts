import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TimbresModalComponent } from '../../shared/timbres-modal/timbres-modal.component';

@Component({
  selector: 'app-tiempo-aire',
  standalone: true,
  imports: [RouterLink, TimbresModalComponent],
  templateUrl: './facturacion.component.html',
  styleUrl: './facturacion.component.css'
})
export class FacturacionComponent {
  isTimbresModalOpen = false;

  openTimbresModal(): void {
    this.isTimbresModalOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeTimbresModal(): void {
    this.isTimbresModalOpen = false;
    document.body.style.overflow = 'auto';
  }
}
