import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CircularGalleryApp } from './circular-gallery.service';


@Component({
  selector: 'app-accesorios',
  imports: [],
  templateUrl: './accesorios.component.html',
  styleUrl: './accesorios.component.css'
})
export class AccesoriosComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('galleryContainer', { static: false }) galleryContainer!: ElementRef<HTMLDivElement>;
  
  private galleryApp?: CircularGalleryApp;

  // Color del texto de la galería (formato hexadecimal)
  galleryTextColor: string = '#003796'; // Azul - Cambia este valor para modificar el color del texto
  

  galleryItems = [
    {
      image: 'images/impresora.png',
      text: 'Impresoras Térmicas'
    },
    {
      image: 'images/barras.png',
      text: 'Lectores de Código'
    },
    {
      image: 'images/cajon.png',
      text: 'Cajones de Dinero'
    },
    {
      image: 'images/compu.png',
      text: 'All In One Paquete'
    },
    {
      image: 'images/terminal1.png',
      text: 'Terminal'
    },
    {
      image: 'images/consumible.png',
      text: 'Consumibles'
    }
  ];

  ngOnInit(): void {
    // Initialization logic
  }

  ngAfterViewInit(): void {
    if (this.galleryContainer) {
      this.galleryApp = new CircularGalleryApp(
        this.galleryContainer.nativeElement,
        {
          items: this.galleryItems,
          textColor: this.galleryTextColor
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (this.galleryApp) {
      this.galleryApp.destroy();
    }
  }
}
