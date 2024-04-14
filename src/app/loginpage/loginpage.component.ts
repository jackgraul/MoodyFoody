import { Component, inject } from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
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
  router = inject(Router)
  dal = inject(UserDalService);

  user: User = new User("", "", new Date(""), "", "");
  errorMessage: string = "";
  isFormSubmitted: boolean = false;
  passwordVisibility: boolean = false;

  btnLoginClick(loginForm: NgForm) {
    if (loginForm.valid){
      this.dal.selectAll().then((users: User[]) => {
        const foundUser = users.find(u => u.email === this.user.email && u.password === this.user.password);
        if (foundUser) {
          // @ts-ignore
          localStorage.setItem("id", foundUser.id.toString());
          this.router.navigate(['/home']);
          alert("Login Successful");
        } else {
          this.errorMessage = "Incorrect email / password. Try again.";
        }
      }).catch((e) => {
        console.log("Error: error in finding login: " + e);
        this.errorMessage = "Error occurred while logging in";
      });
      this.isFormSubmitted = true;
    } else {
      console.log('Form is invalid');
      this.isFormSubmitted = true;
      // Handle the form validation errors
      for (const controlName in loginForm.controls) {
        if (loginForm.controls.hasOwnProperty(controlName)) {
          const control = loginForm.controls[controlName];
          if (control.invalid) {
            console.log(`Control Name: ${controlName}, Errors: `, control.errors);
          }
        }
      }
    }
  }

  btnCreateAccountClick() {
    this.router.navigate(['/create']);
  }

  togglePasswordVisibility(inputFieldId: string) {
    const inputField = document.getElementById(inputFieldId) as HTMLInputElement;
    if (inputField.type === "password") {
      inputField.type = "text";
      this.passwordVisibility = true;
    } else {
      inputField.type = "password";
      this.passwordVisibility = false;
    }
  }
}
