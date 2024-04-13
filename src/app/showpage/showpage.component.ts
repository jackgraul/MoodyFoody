import { Component } from '@angular/core';
import {NavComponent} from "../nav/nav.component";

@Component({
  selector: 'app-showpage',
  standalone: true,
  imports: [
    NavComponent
  ],
  templateUrl: './showpage.component.html',
  styleUrl: './showpage.component.css'
})
export class ShowpageComponent {

}
