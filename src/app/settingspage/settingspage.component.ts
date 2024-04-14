import {Component, inject} from '@angular/core';
import {NavComponent} from "../nav/nav.component";
import {Router} from "@angular/router";
import {User} from "../../models/User.model";

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
  router = inject(Router);

  // btnUpdateAccountClick(user: User) {
  //   this.router.navigate([`/update/${user.id}`])
  // }

  btnDeleteAccountClick() {

  }

  btnUpdateAccountClick() {

  }
}
