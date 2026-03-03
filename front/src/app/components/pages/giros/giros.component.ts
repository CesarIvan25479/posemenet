import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Giro {
  name: string;
  icon: string;
  iconClass: string;
}


@Component({
  selector: 'app-giros',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './giros.component.html',
  styleUrl: './giros.component.css'
})
export class GirosComponent implements AfterViewInit, OnDestroy {
  @ViewChild('girosGrid') girosGrid!: ElementRef;

  // Touch handling variables
  private touchStartX = 0;
  private touchEndX = 0;
  private minSwipeDistance = 50;

  // All giros data organized in sets
  private allGiros: Giro[][] = [
    // Set 1
    [
      { name: 'Negocios en Línea', icon: '🌐', iconClass: 'gi-1' },
      { name: 'Ropa y Zapatos', icon: '👗', iconClass: 'gi-2' },
      { name: 'Moda', icon: '✨', iconClass: 'gi-3' },
      { name: 'Farmacias', icon: '💊', iconClass: 'gi-4' },
      { name: 'Abarrotes', icon: '🛒', iconClass: 'gi-5' },
      { name: 'Refaccionaria', icon: '🔧', iconClass: 'gi-6' },
      { name: 'Ferreterías', icon: '🔨', iconClass: 'gi-7' },
      { name: 'Papelerías', icon: '📎', iconClass: 'gi-8' },
      { name: 'Mayoristas', icon: '📦', iconClass: 'gi-9' },
    ],
    // Set 2
    [
      { name: 'Tiendas de Objetos', icon: '🏺', iconClass: 'gi-10' },
      { name: 'Electrónica', icon: '📱', iconClass: 'gi-11' },
      { name: 'Regalos y Hogar', icon: '🎁', iconClass: 'gi-12' },
      { name: 'Cafeterías', icon: '☕', iconClass: 'gi-13' },
      { name: 'Carnicerías', icon: '🥩', iconClass: 'gi-14' },
      { name: 'Tiendas de Bienestar', icon: '🌿', iconClass: 'gi-15' },
      { name: 'Tiendas para Mascotas', icon: '🐾', iconClass: 'gi-16' },
      { name: 'Verdulerías', icon: '🥦', iconClass: 'gi-17' },
      { name: 'Panaderías', icon: '🥐', iconClass: 'gi-18' },
    ],
    // Set 3
    [
      { name: 'Joyerías', icon: '💎', iconClass: 'gi-19' },
      { name: 'Mueblerías', icon: '🛋️', iconClass: 'gi-20' },
      { name: 'Ópticas', icon: '👓', iconClass: 'gi-21' },
      { name: 'Librerías', icon: '📚', iconClass: 'gi-22' },
      { name: 'Lavanderías', icon: '👕', iconClass: 'gi-23' },
      { name: 'Cuidado Personal', icon: '🧴', iconClass: 'gi-24' },
      { name: 'Belleza', icon: '💅', iconClass: 'gi-25' },
      { name: 'Tiendas de Deportes', icon: '🏋️', iconClass: 'gi-26' },
      { name: 'Jugueterías', icon: '🧸', iconClass: 'gi-27' },
    ],
    // Set 4
    [
      { name: 'Construcción', icon: '🏗️', iconClass: 'gi-28' },
      { name: 'Sex Shops', icon: '🔞', iconClass: 'gi-29' },
      { name: 'Restaurantes', icon: '🍽️', iconClass: 'gi-30' },
      { name: 'Hoteles', icon: '🏨', iconClass: 'gi-31' },
      { name: 'Estacionamientos', icon: '🅿️', iconClass: 'gi-32' },
      { name: 'Veterinarias', icon: '🐕', iconClass: 'gi-33' },
      { name: 'Florerías', icon: '💐', iconClass: 'gi-34' },
      { name: 'Pastelerías', icon: '🎂', iconClass: 'gi-35' },
      { name: 'Ferias y Eventos', icon: '🎪', iconClass: 'gi-36' },
    ]
  ];

  currentGiroSet = 0;
  get totalGiroSets(): number {
    return this.allGiros.length;
  }

  get visibleGiros(): Giro[] {
    return this.allGiros[this.currentGiroSet];
  }

  get giroSets(): number[] {
    return Array(this.totalGiroSets).fill(0).map((_, i) => i);
  }

  private observer: IntersectionObserver | null = null;

  ngAfterViewInit(): void {
    this.setupTouchSwipe();
    this.setupTabs();
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    const options = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
        }
      });
    }, options);

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => this.observer?.observe(el));
  }



  private setupTabs(): void {
    // Exponer showComp globalmente para los onclick del HTML si es necesario
    (window as any).showComp = this.showComp.bind(this);

    // Inicializar controlador de tabs
    const controller = new CompTabsController();
    controller.bindAll();
  }

  public showComp(id: string, btn: HTMLElement): void {
    // Desactivar todos los paneles
    const panels = document.querySelectorAll<HTMLElement>('.comp-panel');
    panels.forEach((panel: HTMLElement) => {
      panel.classList.remove('active');
    });

    // Desactivar todos los tabs
    const tabs = document.querySelectorAll<HTMLElement>('.comp-tab');
    tabs.forEach((tab: HTMLElement) => {
      tab.classList.remove('active');
    });

    // Mostrar el panel seleccionado
    const targetPanel = document.getElementById(`comp-${id}`);
    if (targetPanel) {
      targetPanel.classList.add('active');
    }

    // Activar el tab clickeado
    if (btn) {
      btn.classList.add('active');
    }
  }


  setupTouchSwipe(): void {
    const gridElement = this.girosGrid?.nativeElement;
    if (!gridElement) return;

    gridElement.addEventListener('touchstart', (e: TouchEvent) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    gridElement.addEventListener('touchend', (e: TouchEvent) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });
  }

  private handleSwipe(): void {
    const swipeDistance = this.touchEndX - this.touchStartX;

    if (Math.abs(swipeDistance) > this.minSwipeDistance) {
      if (swipeDistance > 0) {
        // Swipe right - go to previous
        this.prevGiros();
      } else {
        // Swipe left - go to next
        this.nextGiros();
      }
    }
  }

  nextGiros(): void {
    this.currentGiroSet = (this.currentGiroSet + 1) % this.totalGiroSets;
  }

  prevGiros(): void {
    this.currentGiroSet = (this.currentGiroSet - 1 + this.totalGiroSets) % this.totalGiroSets;
  }
}

// ─────────────────────────────────────────────
//  Controlador de Tabs (Auxiliar)
// ─────────────────────────────────────────────
type CompId =
  | 'sicar'
  | 'aspel'
  | 'castelec'
  | 'eposnow'
  | 'pharmacylite'
  | 'pharmacysoft';

class CompTabsController {
  private panels: NodeListOf<HTMLElement>;
  private tabs: NodeListOf<HTMLElement>;

  constructor() {
    this.panels = document.querySelectorAll<HTMLElement>('.comp-panel');
    this.tabs = document.querySelectorAll<HTMLElement>('.comp-tab');
  }

  private resetAll(): void {
    this.panels.forEach((panel: HTMLElement) => panel.classList.remove('active'));
    this.tabs.forEach((tab: HTMLElement) => tab.classList.remove('active'));
  }

  public show(id: CompId, btn: HTMLElement): void {
    this.resetAll();
    const targetPanel = document.getElementById(`comp-${id}`);
    if (targetPanel) {
      targetPanel.classList.add('active');
      btn.classList.add('active');
    }
  }

  public bindAll(): void {
    this.tabs.forEach((tab: HTMLElement) => {
      const compId = tab.dataset['comp'] as CompId | undefined;
      if (!compId) return;
      tab.addEventListener('click', () => {
        this.show(compId, tab);
      });
    });
  }
}

