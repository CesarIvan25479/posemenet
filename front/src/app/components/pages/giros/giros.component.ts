import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Giro {
  name: string;
  icon: string;
  iconClass: string;
}

@Component({
  selector: 'app-giros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './giros.component.html',
  styleUrl: './giros.component.css'
})
export class GirosComponent implements AfterViewInit {
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

  ngAfterViewInit(): void {
    this.setupTouchSwipe();
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

// rotating-hero.ts
interface RotatorConfig {
  elementId: string;
  words: string[];
  intervalMs: number;
  fadeMs: number;
}

class HeroTextRotator {
  private el: HTMLElement;
  private words: string[];
  private intervalMs: number;
  private fadeMs: number;
  private currentIndex: number = 0;
  private timer: ReturnType<typeof setInterval> | null = null;

  constructor(config: RotatorConfig) {
    const el = document.getElementById(config.elementId);
    if (!el) throw new Error(`Element #${config.elementId} not found`);
    this.el = el;
    this.words = config.words;
    this.intervalMs = config.intervalMs;
    this.fadeMs = config.fadeMs;
    this.el.textContent = this.words[0];
    this.el.classList.add('fade-in');
  }

  private async rotate(): Promise<void> {
    // Salida
    this.el.classList.remove('fade-in');
    this.el.classList.add('fade-out');

    await new Promise<void>(resolve => setTimeout(resolve, this.fadeMs));

    // Cambiar texto
    this.currentIndex = (this.currentIndex + 1) % this.words.length;
    this.el.textContent = this.words[this.currentIndex];

    // Entrada
    this.el.classList.remove('fade-out');
    this.el.classList.add('fade-in');
  }

  public start(): void {
    this.timer = setInterval(() => this.rotate(), this.intervalMs);
  }

  public stop(): void {
    if (this.timer) clearInterval(this.timer);
  }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  const rotator = new HeroTextRotator({
    elementId: 'rotating-text',
    words: [
      'punto de venta',
      'POS para Ropa',
      'POS para Farmacias',
      'POS para Abarrotes',
      'POS para Cafeterías',
      'POS para Joyerías',
    ],
    intervalMs: 2800,
    fadeMs: 300,
  });
  rotator.start();
});

type CompId =
  | 'sicar'
  | 'aspel'
  | 'castelec'
  | 'eposnow'
  | 'pharmacylite'
  | 'pharmacysoft';

/**
 * Muestra el panel de comparativa correspondiente al
 * competidor seleccionado y activa su tab.
 *
 * @param id  - ID del competidor (debe coincidir con el sufijo del elemento #comp-{id})
 * @param btn - El botón HTMLElement que fue clickeado
 */
function showComp(id: CompId, btn: HTMLElement): void {
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
  if (!targetPanel) {
    console.warn(`[comp-tabs] Panel #comp-${id} no encontrado en el DOM.`);
    return;
  }
  targetPanel.classList.add('active');

  // Activar el tab clickeado
  btn.classList.add('active');
}

/**
 * Clase que encapsula toda la lógica de los tabs
 * de comparativa para un uso más estructurado.
 */
class CompTabsController {
  private panels: NodeListOf<HTMLElement>;
  private tabs: NodeListOf<HTMLElement>;

  constructor() {
    this.panels = document.querySelectorAll<HTMLElement>('.comp-panel');
    this.tabs   = document.querySelectorAll<HTMLElement>('.comp-tab');
  }

  /**
   * Desactiva todos los paneles y tabs.
   */
  private resetAll(): void {
    this.panels.forEach((panel: HTMLElement) => panel.classList.remove('active'));
    this.tabs.forEach((tab: HTMLElement)     => tab.classList.remove('active'));
  }

  /**
   * Activa el panel y tab correspondiente al ID recibido.
   *
   * @param id  - ID del competidor
   * @param btn - Botón clickeado
   */
  public show(id: CompId, btn: HTMLElement): void {
    this.resetAll();

    const targetPanel = document.getElementById(`comp-${id}`);
    if (!targetPanel) {
      console.warn(`[CompTabsController] Panel #comp-${id} no encontrado.`);
      return;
    }

    targetPanel.classList.add('active');
    btn.classList.add('active');
  }

  /**
   * Registra los event listeners automáticamente
   * leyendo el atributo data-comp de cada tab.
   *
   * Uso en HTML:
   *   <button class="comp-tab" data-comp="sicar">vs. Sicar</button>
   */
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

// ─────────────────────────────────────────────
//  Inicialización al cargar el DOM
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', (): void => {
  const controller = new CompTabsController();

  // Opción A — bindAll() si usas data-comp en los botones
  controller.bindAll();

  // Opción B — exposición global para onclick inline en HTML
  // Permite seguir usando: onclick="showComp('sicar', this)"
  (window as Window & typeof globalThis & { showComp: typeof showComp }).showComp = showComp;
});

