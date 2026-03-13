import { Component } from '@angular/core';
import { HeaderModalComponent } from "../../header-modal/header-modal.component";

@Component({
  selector: 'app-tiempo-aire',
  standalone: true,
  imports: [ HeaderModalComponent],
  templateUrl: './modificaciones.component.html',
  styleUrl: './modificaciones.component.css'
})
export class ModificacionesComponent {

    features = [
    'Sistema adaptable.',
    'Personalizable a tu gusto.',
    'Se ajusta a la forma de trabajar de tu negocio.',
  ];


  floatCards = [
    {
      icon: "fa-solid fa-chalkboard-user",
      color: "rgb(0, 124, 249)",
      title: "Adaptación",
      description: "Personalizamos tu sistema",
      class: "fc-ventas"
    },
    {
      icon: "fa-solid fa-thumbs-up",
      color: " rgb(255, 2, 2)",
      title: "Tu gusto",
      description: "Tu sistema a tu manera",
      class: "fc-ticket"
    }
  ];

}
