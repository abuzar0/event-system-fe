import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'system' | 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private themeSubject = new BehaviorSubject<Theme>(this.getStoredTheme());
  theme$ = this.themeSubject.asObservable();

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.initializeTheme();
  }

  private getStoredTheme(): Theme {
    return (localStorage.getItem('theme') as Theme) || 'system';
  }

  private initializeTheme() {
    const storedTheme = this.getStoredTheme();
    this.setTheme(storedTheme);
    this.applyTheme(storedTheme);

    // Listen for system preference changes
    if (storedTheme === 'system') {
      this.listenForSystemPreferenceChanges();
    }
  }

  setTheme(theme: Theme) {
    localStorage.setItem('theme', theme);
    this.themeSubject.next(theme);
    this.applyTheme(theme);
  }

  private applyTheme(theme: Theme) {
    let effectiveTheme = theme;
    if (theme === 'system') {
      effectiveTheme = this.getSystemPreference();
    }

    if (effectiveTheme === 'dark') {
      this.renderer.addClass(document.body, 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark');
    }
  }

  private getSystemPreference(): 'light' | 'dark' {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private listenForSystemPreferenceChanges() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (this.themeSubject.value === 'system') {
        this.applyTheme('system');
      }
    });
  }

  isDarkTheme(): boolean {
    const currentTheme = this.themeSubject.value;
    return currentTheme === 'dark' || (currentTheme === 'system' && this.getSystemPreference() === 'dark');
  }
}

