import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RotatingTextComponent } from '../../shared/rotating-text/rotating-text.component';

interface GiroCard {
  icon: string;
  iconClass: string;
  name: string;
}

@Component({
  selector: 'app-giros',
  standalone: true,
  imports: [CommonModule, RouterModule, RotatingTextComponent],
  templateUrl: './giros.component.html',
  styleUrl: './giros.component.css'
})
export class GirosComponent implements AfterViewInit, OnDestroy {
  @ViewChild('girosGrid') girosGrid!: ElementRef;

  private observer: IntersectionObserver | null = null;

  // ── Grid estático de la sección giros (29 tarjetas) ──────────────────
  readonly giros: GiroCard[] = [
    { icon: '🌐', iconClass: 'gi-1', name: 'Negocios en Línea' },
    { icon: '👗', iconClass: 'gi-2', name: 'Ropa y Zapatos' },
    { icon: '✨', iconClass: 'gi-3', name: 'Moda' },
    { icon: '💊', iconClass: 'gi-4', name: 'Farmacias' },
    { icon: '🛒', iconClass: 'gi-5', name: 'Abarrotes' },
    { icon: '🔧', iconClass: 'gi-6', name: 'Refaccionaria' },
    { icon: '🔨', iconClass: 'gi-7', name: 'Ferreterías' },
    { icon: '✏️​', iconClass: 'gi-8', name: 'Papelerías' },
    { icon: '📦', iconClass: 'gi-9', name: 'Mayoristas' },
    { icon: '🏺', iconClass: 'gi-10', name: 'Tiendas de Objetos' },
    { icon: '📱', iconClass: 'gi-11', name: 'Electrónica' },
    { icon: '🎁', iconClass: 'gi-12', name: 'Regalos y Hogar' },
    { icon: '☕', iconClass: 'gi-13', name: 'Cafeterías' },
    { icon: '🥩', iconClass: 'gi-14', name: 'Carnicerías' },
    { icon: '🌿', iconClass: 'gi-15', name: 'Tiendas de Bienestar' },
    { icon: '🐾', iconClass: 'gi-16', name: 'Tiendas para Mascotas' },
    { icon: '🥦', iconClass: 'gi-17', name: 'Verdulerías' },
    { icon: '🥐', iconClass: 'gi-18', name: 'Panaderías' },
    { icon: '💎', iconClass: 'gi-19', name: 'Joyerías' },
    { icon: '🛋️', iconClass: 'gi-20', name: 'Mueblerías' },
    { icon: '👓', iconClass: 'gi-21', name: 'Ópticas' },
    { icon: '📚', iconClass: 'gi-22', name: 'Librerías' },
    { icon: '👕', iconClass: 'gi-23', name: 'Lavanderías' },
    { icon: '🧴', iconClass: 'gi-24', name: 'Cuidado Personal' },
    { icon: '💅', iconClass: 'gi-25', name: 'Belleza' },
    { icon: '🏋️', iconClass: 'gi-26', name: 'Tiendas de Deportes' },
    { icon: '🧸', iconClass: 'gi-27', name: 'Jugueterías' },
    { icon: '🏗️', iconClass: 'gi-28', name: 'Construcción' },
    { icon: '🔞', iconClass: 'gi-29', name: 'Sex Shops' },
    { icon: '🎙️​', iconClass: 'gi-30', name: 'Tienda de música' },
    { icon: '🎮​', iconClass: 'gi-31', name: 'Tienda gamer' },
    { icon: '🖨️​', iconClass: 'gi-32', name: 'Imprentas' },
    { icon: '🛍️', iconClass: 'gi-33', name: 'Tiendas de regalos' },
    { icon: '🍽️', iconClass: 'gi-34', name: 'Restaurantes' },
  ];

  private readonly delays = ['delay-100', 'delay-200', 'delay-300', 'delay-400', 'delay-500'];

  getDelayClass(index: number): string {
    return this.delays[index % this.delays.length];
  }

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.setupTabs();
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('reveal-active');
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach(el => this.observer?.observe(el));
  }

  private setupTabs(): void {
    const tabs = document.querySelectorAll<HTMLElement>('.comp-tab');
    const panels = document.querySelectorAll<HTMLElement>('.comp-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Reset all
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));
        // Activate selected
        tab.classList.add('active');
        const compId = tab.dataset['comp'];
        if (compId) {
          document.getElementById(`comp-${compId}`)?.classList.add('active');
        }
      });
    });
  }
}
