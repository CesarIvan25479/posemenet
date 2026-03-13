import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderModalComponent } from "../../header-modal/header-modal.component";

@Component({
  selector: 'app-tiempo-aire',
  standalone: true,
  imports: [HeaderModalComponent],
  templateUrl: './nube.component.html',
  styleUrl: './nube.component.css'
})
export class NubeComponent {

  features = [
    'Sincronización sin errores.',
    'Control central en todas tus sucursales.',
    'Actualización remota inmediata.',
    'Expansión rápida y sin complicaciones.'
  ];


  floatCards = [
    {
      icon: "fa-solid fa-house-signal",
      color: "rgb(249, 0, 0)",
      title: "Acceso",
      description: "Multisucursal y multiusuario",
      class: "fc-ventas"
    },
    {
      icon: "fa-solid fa-download",
      color: " rgb(4, 71, 255)",
      title: "Instalación facil",
      description: "Tu información segura",
      class: "fc-ticket"
    }
  ];

}
