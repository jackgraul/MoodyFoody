import { Component } from '@angular/core';
import {NavComponent} from "../nav/nav.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NavComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
