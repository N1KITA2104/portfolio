import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-check-geo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './check-geo.component.html',
  styleUrls: ['./check-geo.component.scss']
})
export class CheckGeoComponent implements OnInit {
  status: boolean | null = null;
  statusMessage: string = '';
  statusClass: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  isPlatformMobile(userAgent: string): boolean {
    const mobileRegex = /Mobi|Android/i;
    return mobileRegex.test(userAgent);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isPlatformMobile(navigator.userAgent)) {
        this.checkGeolocation();
      } else {
        this.statusMessage = 'Not a mobile device';
        this.statusClass = 'disabled';
        this.status = false;

        setTimeout(() => {
          this.status = null;
        }, 3000);
      }
    }
  }

  checkGeolocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.statusMessage = 'Geolocation enabled';
          this.statusClass = 'enabled';
          this.status = true;
        },
        (error) => {
          this.statusMessage = 'Geolocation disabled or not available';
          this.statusClass = 'disabled';
          this.status = false;
        }
      );
    } else {
      this.statusMessage = 'Geolocation not supported';
      this.statusClass = 'disabled';
      this.status = false;
    }

    setTimeout(() => {
      this.status = null;
    }, 3000);
  }
}
