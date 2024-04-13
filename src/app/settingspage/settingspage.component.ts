import { Component } from '@angular/core';
import {NavComponent} from "../nav/nav.component";

@Component({
  selector: 'app-settingspage',
  standalone: true,
  imports: [
    NavComponent
  ],
  templateUrl: './settingspage.component.html',
  styleUrl: './settingspage.component.css'
})
export class SettingspageComponent {

  btnUpdateAccountClick() {

  }

  btnDeleteAccountClick() {

  }
}
