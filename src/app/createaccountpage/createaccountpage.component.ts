import { Component, inject } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from "@angular/forms";
import { JsonPipe } from "@angular/common";
import { User } from "../../models/User.model";
import { Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { UserDalService } from "../../services/user-dal.service";
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: 'app-createaccountpage',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule,
    CommonModule,
    NavComponent
  ],
  templateUrl: './createaccountpage.component.html',
  styleUrl: './createaccountpage.component.css'
})
export class CreateaccountpageComponent {
  router = inject(Router)
  dal = inject(UserDalService);

  isFormSubmitted: boolean = false;
  passwordVisibility: boolean = false;
  verifyPasswordVisibility: boolean = false;
  emailExists: string = '';

  user: any = {
    firstName: '',
    lastName: '',
    dob: null,
    email: '',
    password: '',
    verifyPassword: ''
  }

  ngOnInit() {
    this.checkUserEmailExistence();
  }

  async checkUserEmailExistence(): Promise<void> {
    try {
      const users = await this.dal.selectAll();
      const userEmails = users.map((user: User) => user.email);

      if (userEmails.includes(this.user.email)) {
        this.emailExists = 'Email already exists. Please use a different email.';
      }
    } catch (error) {
      console.log('Error checking user email existence:', error);
    }
  }

  btnCreateClick(userForm: NgForm) {
    if (userForm.valid) {
      this.isFormSubmitted = true;
      if (!this.checkUserEmailExistence()) {
        this.router.navigate(['/login']);
        this.dal.insert(this.user).then((data) => {
          alert("User created successfully");
        }).catch((e) => {
          console.log("Error: error in add button click: " + e);
        });
      } else {
        this.emailExists = 'Email already exists. Please use a different email.';
        //alert('Email already exists. Please use a different email.');
      }
    } else {
      console.log('Form is invalid');
      this.isFormSubmitted = true;
      // Handle the form validation errors
      for (const controlName in userForm.controls) {
        if (userForm.controls.hasOwnProperty(controlName)) {
          const control = userForm.controls[controlName];
          if (control.invalid) {
            console.log(`Control Name: ${controlName}, Errors: `, control.errors);
          }
        }
      }
    }
  }

  btnCancelClick() {
    this.router.navigate(['/login']);
  }

  validatePassword(password: string, verifyPassword: string): boolean {
    if (password === verifyPassword) {
      return true;
    }
    else {
      return false;
    }
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

  toggleVerifyPasswordVisibility(inputFieldId: string) {
    const inputField = document.getElementById(inputFieldId) as HTMLInputElement;
    if (inputField.type === "password") {
      inputField.type = "text";
      this.verifyPasswordVisibility = true;
    } else {
      inputField.type = "password";
      this.verifyPasswordVisibility = false;
    }
  }
}
