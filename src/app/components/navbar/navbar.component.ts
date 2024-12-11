import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Theme, ThemeService } from '../../services/theme/theme.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isDarkTheme: boolean = false;
  currentTheme: Theme = 'system';
  private themeSubscription: Subscription | undefined;

  constructor(private themeService: ThemeService, public authService: AuthService) {}

  ngOnInit() {
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.currentTheme = theme;
      this.isDarkTheme = this.themeService.isDarkTheme();
    });
  }

  ngOnDestroy() {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }

  logOut() {
    this.authService.clearStorage();
  }
}
