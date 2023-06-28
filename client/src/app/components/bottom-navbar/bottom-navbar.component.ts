import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bottom-navbar',
  templateUrl: './bottom-navbar.component.html',
  styleUrls: ['./bottom-navbar.component.scss']
})
export class BottomNavbarComponent {
  constructor(private route: ActivatedRoute) {}

  isActive() {
    return this.route.snapshot.routeConfig?.path === 'messages';
  }
}
