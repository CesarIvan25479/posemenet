import { Component } from '@angular/core';
import { HeaderModalComponent } from "../../header-modal/header-modal.component";

@Component({
  selector: 'app-tiempo-aire',
  standalone: true,
  imports: [HeaderModalComponent],
  templateUrl: './tiempo-aire.component.html',
  styleUrl: './tiempo-aire.component.css'
})
export class TiempoAireComponent {

  features = [
    'Realiza recargas y gana comisiones al instante',
  ];

  floatCards = [
    {
      icon: "fa-solid fa-percent",
      color: "rgb(249, 0, 0)",
      title: "+5% comisiones",
      description: "Todas las operaciones",
      class: "fc-ventas"
    },
    {
      icon: "fa-solid fa-hand-holding-dollar",
      color: " rgb(0, 169, 25)",
      title: "Pagos de servicio",
      description: "Todo en un mismo lugar",
      class: "fc-ticket"
    }
  ];

}
