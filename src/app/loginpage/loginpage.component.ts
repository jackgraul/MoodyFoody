import { Component, inject } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {User} from "../../models/User.model";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {UserDalService} from "../../services/user-dal.service";

@Component({
  selector: 'app-loginpage',
  standalone: true,
    imports: [
        FormsModule,
        JsonPipe,
        ReactiveFormsModule,
        CommonModule
    ],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent {
  user: User = new User("", "", new Date(""), "", "");
  router = inject(Router)
  DAL = inject(UserDalService);
  errorMessage: string = "";

  btnLoginClick() {
    this.DAL.selectAll().then((users: User[]) => {
      const foundUser = users.find(u => u.email === this.user.email && u.password === this.user.password);
      if (foundUser) {
        // @ts-ignore
        localStorage.setItem("id", foundUser.id.toString());
        this.router.navigate(['/home']);
        alert("Login Successful");
      } else {
        this.errorMessage = "Login is invalid";
      }
    }).catch((e) => {
      console.log("Error: error in finding login: " + e);
      this.errorMessage = "Error occurred while logging in";
    });
  }

  btnCreateAccountClick() {
    this.router.navigate(['/create']);
  }
}
