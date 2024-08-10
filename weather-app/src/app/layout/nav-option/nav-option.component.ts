import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-option',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-option.component.html',
  styleUrl: './nav-option.component.scss'
})
export class NavOptionComponent {

}
