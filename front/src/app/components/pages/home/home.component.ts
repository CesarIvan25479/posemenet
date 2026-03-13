import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HeaderModalComponent } from "../../header-modal/header-modal.component";

@Component({
  selector: 'app-home',
  imports: [RouterLink, HeaderModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

    features = [
    'Controla el efectivo de tu caja',
    'Emite facturas CFDI de tus ventas',
    'Reportes e inventarios en tiiempo real',
  ];


floatCards = [
  {
    icon: "fa-solid fa-chart-line",
    color: "rgb(249, 0, 0)",
    title: "+34% ventas",
    description: "este mes vs anterior",
    class: "fc-ventas"
  },
  {
    icon: "fa-solid fa-book-atlas",
    color: " rgb(17, 17, 17)",
    title: "Factura CFDI",
    description: "emitida correctamente",
    class: "fc-ticket"
  }
];
  
  

 }
