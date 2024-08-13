import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GetLocationComponent } from "../get-location/get-location.component";

@Component({
  selector: 'app-nav-option',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, GetLocationComponent],
  templateUrl: './nav-option.component.html',
  styleUrl: './nav-option.component.scss'
})
export class NavOptionComponent {

}
