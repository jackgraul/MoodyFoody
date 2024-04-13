import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {User} from "../../models/User.model";

@Component({
  selector: 'app-loginpage',
  standalone: true,
    imports: [
        FormsModule,
        JsonPipe,
        ReactiveFormsModule
    ],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent {
  user: User = new User("Ricky", "Bobby", new Date("1972-06-19"), "rickybobby@mail.com", "password");


  btnLoginClick() {

  }

  btnCreateAccountClick() {

  }
}
