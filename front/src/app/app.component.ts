import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'front';

  ngOnInit(): void {
    // Hide loader when app is ready
    this.hideLoader();
  }

  private hideLoader(): void {
    const loader = document.getElementById('app-loader');
    const progress = loader?.querySelector('.progress') as HTMLElement;
    
    if (progress) {
      progress.classList.add('animate');
    }
    
    setTimeout(() => {
      if (loader) {
        loader.classList.add('hidden');
        // Remove loader from DOM after animation
        setTimeout(() => {
          loader.remove();
        }, 500);
      }
    }, 1500);
  }
}
