import { Component, AfterViewInit, ElementRef, ViewChildren, QueryList, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-software',
  imports: [CommonModule],
  templateUrl: './software.component.html',
  styleUrl: './software.component.css'
})
export class SoftwareComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren('.counter') counters!: QueryList<ElementRef>;
  private observer: IntersectionObserver | null = null;
  private hasAnimated = false;

  ngOnInit() {}

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3 // Activar cuando el 30% de la sección sea visible
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.hasAnimated) {
          this.hasAnimated = true;
          this.animateCounters();
        }
      });
    }, options);

    // Observar la sección CTA
    const ctaSection = document.querySelector('.cta-section');
    if (ctaSection) {
      this.observer.observe(ctaSection);
    }
  }

  animateCounters() {
    const counters = document.querySelectorAll('.counter-number');
    
    counters.forEach((counter, index) => {
      const target = +counter.getAttribute('data-target')!;
      const duration = 2000; // 2 segundos
      const start = 0;
      const increment = target / (duration / 16); // 60fps
      let current = start;
      
      // Agregar delay escalonado para cada contador
      const delay = index * 300;
      
      const updateCounter = () => {
        current += increment;
        if (current < target) {
          counter.textContent = Math.floor(current).toLocaleString();
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString();
        }
      };
      
      // Iniciar animación después del delay
      setTimeout(() => {
        counter.classList.add('active');
        updateCounter();
      }, delay);
    });
  }
}
