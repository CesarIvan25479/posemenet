import { Component, HostListener, ElementRef, OnInit } from '@angular/core';
import { RouterLink, Router, NavigationStart } from "@angular/router";

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isMobileMenuOpen = false;
  isDropdownOpen = false;

  constructor(private elementRef: ElementRef, private router: Router) {}

  ngOnInit(): void {
    // Cerrar menú móvil en cada navegación
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) {
      this.isDropdownOpen = false;
    }
    this.lockScroll(this.isMobileMenuOpen);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.isDropdownOpen = false;
    this.lockScroll(false);
  }

  private lockScroll(lock: boolean): void {
    const value = lock ? 'hidden' : '';
    document.body.style.overflow = value;
    document.documentElement.style.overflow = value;
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 768 && this.isMobileMenuOpen) {
      this.closeMobileMenu();
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    // Cerrar dropdown al hacer click fuera
    const target = event.target as HTMLElement;
    const dropdown = this.elementRef.nativeElement.querySelector('.dropdown');
    
    if (dropdown && !dropdown.contains(target)) {
      this.isDropdownOpen = false;
    }
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    // Cerrar menú con tecla ESC
    if (event.key === 'Escape') {
      this.closeMobileMenu();
    }
  }
}
