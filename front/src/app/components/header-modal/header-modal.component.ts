import { Component, Input } from '@angular/core';
import { RouterLink } from "@angular/router";
import { NgFor, NgClass } from "@angular/common";
@Component({
  selector: 'app-header-modal',
  imports: [RouterLink, NgFor, NgClass],
  templateUrl: './header-modal.component.html',
  styleUrl: './header-modal.component.css'
})


export class HeaderModalComponent {

  @Input() badge: string = '';
  @Input() titulo: string = '';
  @Input() descripcion: string = '';
  @Input() imagen: string = '';
  @Input() features: string[] = [];
  @Input() floatCards: FloatCard[] = [];

}

export interface FloatCard {
  icon: string;
  color: string;
  title: string;
  description: string;
  class?: string;
}