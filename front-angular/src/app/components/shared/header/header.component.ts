import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  currentPath = '';

  constructor(private router: Router) {
    this.currentPath = router.url;
    this.router.events.subscribe(() => {
      this.currentPath = this.router.url;
    });
  }

  signOut(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
