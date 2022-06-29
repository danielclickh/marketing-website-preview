import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {DOCUMENT, isPlatformBrowser} from "@angular/common";
import {Observable, of, ReplaySubject} from "rxjs";

export interface Icon {
  name: string;
  svgRelativePath: string;
}

export type CpTheme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly themeSubject = new ReplaySubject<CpTheme>(1);

  private iconList: Icon[] = [
    {name: 'menu_arrow', svgRelativePath: 'menu_arrow.svg'},
    {name: 'moon', svgRelativePath: 'moon.svg'},
    {name: 'sun', svgRelativePath: 'sun.svg'},
    {name: 'right_arrow', svgRelativePath: 'right_arrow.svg'},
    {name: 'check_icon', svgRelativePath: 'check_icon.svg'},
    {name: 'hamburger_menu', svgRelativePath: 'hamburger_menu.svg'},
    {name: 'x_icon', svgRelativePath: 'x_icon.svg'},
  ];

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer,
              @Inject(PLATFORM_ID) private platformId: Object,
              @Inject(DOCUMENT) private document: Document) {
    this.setInitialTheme();
  }

  initializeIcons() {
    for (const icon of this.iconList) {
      this.matIconRegistry.addSvgIcon(
        icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`/assets/icons/${icon.svgRelativePath}`)
      );
    }
  }

  setTheme(theme: CpTheme, saveToLocalStorage = false) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }
    this.document.body.classList.remove('light', 'dark');
    this.document.body.classList.add(theme);
    if (saveToLocalStorage) {
      localStorage.setItem('ch_theme', theme);
    }
    this.themeSubject.next(theme);
  }

  observeTheme(): Observable<CpTheme> {
    if (!isPlatformBrowser(this.platformId)) {
      return of('light');
    }
    return this.themeSubject;
  }

  private setInitialTheme() {
    if (!isPlatformBrowser(this.platformId)) {
      this.setTheme('light');
      return;
    }
    let theme = this.getThemeFromLocalStorage();
    if (theme) {
      this.setTheme(theme);
    } else {
      const window = this.document.defaultView as any;
      this.setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
  }

  private getThemeFromLocalStorage(): CpTheme | undefined {
    if (!isPlatformBrowser(this.platformId)) {
      return undefined;
    }
    return localStorage.getItem('ch_theme') as CpTheme | undefined;
  }

  registerIcon(hash: string, url: string) {
    this.matIconRegistry.addSvgIcon(hash, this.domSanitizer.bypassSecurityTrustResourceUrl(url));
  }
}
