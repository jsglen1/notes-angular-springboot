import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'todo-front-angular';
  currentPath = '';

  constructor(private router: Router) {
    this.currentPath = router.url;
    this.router.events.subscribe(() => {
      this.currentPath = this.router.url;
    });
  }
}
