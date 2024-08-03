import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss']
})
export class CookieConsentComponent implements OnInit {
  cookieAccepted: boolean = false;

  ngOnInit(): void {
    if (this.isDocumentAvailable()) {
      this.checkCookieConsent();
    }
  }

  checkCookieConsent(): void {
    if (this.isDocumentAvailable()) {
      this.cookieAccepted = this.getCookie('cookieAccepted') === 'true';
    }
  }

  acceptCookies(): void {
    this.cookieAccepted = true;
    if (this.isDocumentAvailable()) {
      this.setCookie('cookieAccepted', 'true', 365);
    }
  }

  declineCookies(): void {
    this.cookieAccepted = true;
    if (this.isDocumentAvailable()) {
      this.setCookie('cookieAccepted', 'false', 365);
    }
  }

  private isDocumentAvailable(): boolean {
    return typeof document !== 'undefined';
  }

  private setCookie(name: string, value: string, days: number): void {
    if (!this.isDocumentAvailable()) return;

    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  private getCookie(name: string): string | null {
    if (!this.isDocumentAvailable()) return null;

    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
}