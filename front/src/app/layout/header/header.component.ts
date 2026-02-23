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
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.isDropdownOpen = false;
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
