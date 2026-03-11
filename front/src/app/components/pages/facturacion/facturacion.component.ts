import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TimbresModalComponent } from '../../../components/shared/timbres-modal/timbres-modal.component';

@Component({
  selector: 'app-tiempo-aire',
  standalone: true,
  imports: [RouterLink, CommonModule, TimbresModalComponent],
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
}
