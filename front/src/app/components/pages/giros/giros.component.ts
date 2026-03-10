import { Component, AfterViewInit, OnDestroy, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RotatingTextComponent } from '../../shared/rotating-text/rotating-text.component';

// SVG strings from Lucide Icons (https://lucide.dev) — rendered as inline SVG
// anim: CSS animation class applied on hover for each icon type
interface RawGiroCard {
  svg: string;
  iconClass: string;
  name: string;
  anim: string;
}

interface GiroCard {
  svg: SafeHtml;    // sanitized after construction
  iconClass: string;
  name: string;
  anim: string;
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

  // ── Grid estático de la sección giros (34 tarjetas) ──────────────────
  // SVGs from Lucide Icons – stroke only, 24x24 viewBox, stroke-width 2
  giros: GiroCard[] = [];

  private readonly rawGiros: RawGiroCard[] = [
    {
      svg: `<circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>`,
      iconClass: 'gi-1', name: 'Negocios en Línea', anim: 'spin'
    },
    {
      svg: `<path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.57a1 1 0 0 0 .99.86H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.86l.58-3.57a2 2 0 0 0-1.34-2.23z"/>`,
      iconClass: 'gi-2', name: 'Ropa y Zapatos', anim: 'bounce'
    },
    {
      svg: `<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3 4 6l-3 .875L4 7l1 3 1-3 3-.875L6 6 5 3z"/><path d="M19 18.5l-.75 2.25-2.25.625 2.25.625L19 24l.75-2.25 2.25-.625-2.25-.625L19 18.5z"/>`,
      iconClass: 'gi-3', name: 'Moda', anim: 'pulse'
    },
    {
      svg: `<path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z"/><path d="m8.5 8.5 7 7"/>`,
      iconClass: 'gi-4', name: 'Farmacias', anim: 'wiggle'
    },
    {
      svg: `<circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>`,
      iconClass: 'gi-5', name: 'Abarrotes', anim: 'bounce'
    },
    {
      svg: `<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>`,
      iconClass: 'gi-6', name: 'Refaccionaria', anim: 'spin'
    },
    {
      svg: `<path d="M15 12H3"/><path d="M15 6H3"/><path d="M21 18H3"/><path d="m17 8 4 4-4 4"/>`,
      iconClass: 'gi-7', name: 'Ferreterías', anim: 'wiggle'
    },
    {
      svg: `<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>`,
      iconClass: 'gi-8', name: 'Papelerías', anim: 'wiggle'
    },
    {
      svg: `<path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/>`,
      iconClass: 'gi-9', name: 'Mayoristas', anim: 'bounce'
    },
    {
      svg: `<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>`,
      iconClass: 'gi-10', name: 'Tiendas de Objetos', anim: 'bounce'
    },
    {
      svg: `<rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>`,
      iconClass: 'gi-11', name: 'Electrónica', anim: 'shake'
    },
    {
      svg: `<polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/>`,
      iconClass: 'gi-12', name: 'Regalos y Hogar', anim: 'bounce'
    },
    {
      svg: `<path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/>`,
      iconClass: 'gi-13', name: 'Cafeterías', anim: 'pulse'
    },
    {
      svg: `<line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/>`,
      iconClass: 'gi-14', name: 'Carnicerías', anim: 'spin'
    },
    {
      svg: `<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>`,
      iconClass: 'gi-15', name: 'Tiendas de Bienestar', anim: 'wiggle'
    },
    {
      svg: `<path d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.898 2.344-3"/><path d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.96-1.898-2.344-3"/><path d="M8 14v.5"/><path d="M16 14v.5"/><path d="M11.25 16.25h1.5L12 17l-.75-.75z"/><path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 22 12 22s8-3.272 8-7.444c0-1.061-.162-2.08-.455-3.038"/><path d="M10.5 10.625a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/><path d="M13.5 10.625a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1"/>`,
      iconClass: 'gi-16', name: 'Tiendas para Mascotas', anim: 'bounce'
    },
    {
      svg: `<path d="m10.5 10.5-.5-3 3 2.5-3 1 .5-.5z"/><path d="M20 4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2"/><path d="M4.267 4.68A2.615 2.615 0 0 1 6 4h12a2 2 0 0 1 2 2v8H4V6a2 2 0 0 1 .267-.68z"/><path d="M14 14v2a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2v-2"/><path d="M18 14v7"/><path d="M2 19h20"/><path d="M6 14v7"/>`,
      iconClass: 'gi-17', name: 'Verdulerías', anim: 'wiggle'
    },
    {
      svg: `<path d="M17 13.5c0 4.142-3.358 7.5-7.5 7.5a7.5 7.5 0 0 1-3.422-.818"/><path d="M17 13.5a7.5 7.5 0 0 0-14.985.832"/><path d="M2 13.5a7.5 7.5 0 0 0 6.078 7.35"/><path d="M17 3a3 3 0 0 1 0 6H4a3 3 0 0 1 0-6 3 3 0 0 1 5.83-1A4 4 0 0 1 17 3z"/>`,
      iconClass: 'gi-18', name: 'Panaderías', anim: 'bounce'
    },
    {
      svg: `<path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41L13.7 2.71a2.41 2.41 0 0 0-3.41 0z"/>`,
      iconClass: 'gi-19', name: 'Joyerías', anim: 'pulse'
    },
    {
      svg: `<path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M1 9h22v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9z"/><path d="m8 16 .5 6H3l1-6"/><path d="M19.5 16l.5 6h-6l.5-6"/>`,
      iconClass: 'gi-20', name: 'Mueblerías', anim: 'wiggle'
    },
    {
      svg: `<circle cx="6" cy="12" r="4"/><circle cx="18" cy="12" r="4"/><line x1="10" y1="11" x2="14" y2="11"/><line x1="10" y1="13" x2="14" y2="13"/>`,
      iconClass: 'gi-21', name: 'Ópticas', anim: 'shake'
    },
    {
      svg: `<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>`,
      iconClass: 'gi-22', name: 'Librerías', anim: 'flip'
    },
    {
      svg: `<path d="M3 22 16.01 8.97"/><path d="M11.53 6.06 13 4.99A3.336 3.336 0 0 1 19 7c0 1.31-.72 2.41-1.77 2.97L13 12.46c-.83.5-1.84.22-2.32-.65l-1.4-2.08"/><path d="m5.53 14.06-.54.41A3.336 3.336 0 0 0 6 21a3.34 3.34 0 0 0 2.7-1.38L11 16.53c.83-.5 1.11-1.55.65-2.35l-1.18-1.98"/>`,
      iconClass: 'gi-23', name: 'Lavanderías', anim: 'spin'
    },
    {
      svg: `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
      iconClass: 'gi-24', name: 'Cuidado Personal', anim: 'pulse'
    },
    {
      svg: `<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>`,
      iconClass: 'gi-25', name: 'Belleza', anim: 'ping'
    },
    {
      svg: `<circle cx="12" cy="5" r="3"/><path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8z"/>`,
      iconClass: 'gi-26', name: 'Tiendas de Deportes', anim: 'bounce'
    },
    {
      svg: `<rect x="2" y="11" width="20" height="12" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/><circle cx="12" cy="17" r="1"/>`,
      iconClass: 'gi-27', name: 'Jugueterías', anim: 'shake'
    },
    {
      svg: `<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>`,
      iconClass: 'gi-28', name: 'Construcción', anim: 'wiggle'
    },
    {
      svg: `<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>`,
      iconClass: 'gi-29', name: 'Sex Shops', anim: 'pulse'
    },
    {
      svg: `<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>`,
      iconClass: 'gi-30', name: 'Tienda de música', anim: 'bounce'
    },
    {
      svg: `<rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>`,
      iconClass: 'gi-31', name: 'Tienda gamer', anim: 'shake'
    },
    {
      svg: `<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>`,
      iconClass: 'gi-32', name: 'Imprentas', anim: 'bounce'
    },
    {
      svg: `<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>`,
      iconClass: 'gi-33', name: 'Tiendas de regalos', anim: 'wiggle'
    },
    {
      svg: `<path d="M3 11l19-9-9 19-2-8-8-2z"/>`,
      iconClass: 'gi-34', name: 'Restaurantes', anim: 'spin'
    },
  ];

  private readonly delays = ['delay-100', 'delay-200', 'delay-300', 'delay-400', 'delay-500'];

  getDelayClass(index: number): string {
    return this.delays[index % this.delays.length];
  }

  constructor(private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer) {
    // Sanitize all SVG strings so Angular renders them as trusted HTML
    this.giros = this.rawGiros.map(g => ({
      ...g,
      svg: this.sanitizer.bypassSecurityTrustHtml(g.svg)
    }));
  }

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
