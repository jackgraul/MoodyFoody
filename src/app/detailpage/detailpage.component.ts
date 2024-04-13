import { Component } from '@angular/core';
import {NavComponent} from "../nav/nav.component";

@Component({
  selector: 'app-detailpage',
  standalone: true,
  imports: [
    NavComponent
  ],
  templateUrl: './detailpage.component.html',
  styleUrl: './detailpage.component.css'
})
export class DetailpageComponent {

}
