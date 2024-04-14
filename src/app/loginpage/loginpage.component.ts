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
    if (this.validateLogin(this.user.email, this.user.password)) {
      this.router.navigate(['/home']);
      this.DAL.selectAll().then((data)=>{
        alert("Login Successful");
      }).catch((e)=>{
        console.log("Error: error in finding login: " + e);
      });
    }
    else{
      if (!this.validateLogin(this.user.email, this.user.password)){
        this.errorMessage = "Login is invalid";
      }
      else{
        this.errorMessage = "";
      }
    }
  }

  validateLogin(email: string, password: string): boolean {
    if ((this.user.email === email) && (this.user.password === password)){
      return true;
    }
    else{
      return false;
    }
  }

  btnCreateAccountClick() {
    console.log('reeee')
    this.router.navigate(['/create']);
  }
}
