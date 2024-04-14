import { Component, inject } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {User} from "../../models/User.model";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {UserDalService} from "../../services/user-dal.service";

@Component({
  selector: 'app-createaccountpage',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './createaccountpage.component.html',
  styleUrl: './createaccountpage.component.css'
})
export class CreateaccountpageComponent {
  user: User = new User("", "", new Date(""), "", "");
  emailErrorMessage: string = '';
  passwordErrorMessage: string = '';
  router = inject(Router)
  DAL = inject(UserDalService);
  btnCreateClick() {

    if (this.validateEmail(this.user.email) && (this.validatePassword(this.user.password, this.user.verifyPassword))) {
      this.router.navigate(['/home']);
      this.DAL.insert(this.user).then((data)=>{
        alert("User added successfully");
      }).catch((e)=>{
        console.log("Error: error in add button click: " + e);
      })

    }
    else{
      if(!this.validateEmail(this.user.email)){
        this.emailErrorMessage = "Email is invalid";
      }
      else{
        this.emailErrorMessage = "";
      }

      if(!this.validatePassword(this.user.password, this.user.verifyPassword)){
        this.passwordErrorMessage = "Passwords do not match";
      }
      else{
        this.passwordErrorMessage = "";
      }
    }

  }

  private validateEmail(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  private validatePassword(password: string, verifyPassword: string): boolean {
    if (password === verifyPassword){
      return true;
    }
    else{
      return false;
    }
  }

  btnCancelCreateClick() {
    this.router.navigate(['/login']);
  }

}
