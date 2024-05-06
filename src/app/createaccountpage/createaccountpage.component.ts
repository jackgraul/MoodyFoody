import {Component, inject, OnInit} from '@angular/core';
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
export class CreateaccountpageComponent implements OnInit{
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

  async checkUserEmailExistence(): Promise<boolean> {
    try {
      const users = await this.dal.selectAll();
      const userEmails = users.map((user: User) => user.email);
      return userEmails.includes(this.user.email);
    } catch (error) {
      console.log('Error checking user email existence:', error);
      return false;
    }
  }

  async btnCreateClick(userForm: NgForm): Promise<void> {
    this.isFormSubmitted = true;
    if (userForm.valid) {
      try {
        const emailExists = await this.checkUserEmailExistence();
        if (!emailExists) {
          // If email doesn't exist, proceed with user creation
          this.router.navigate(['/login']);
          await this.dal.insert(this.user);
          alert("User created successfully");
        } else {
          // Email exists, show error message
          this.emailExists = 'Email already exists. Please use a different email.';
        }
      } catch (error) {
        console.log("Error: error in add button click: " + error);
      }
    } else {
      console.log('Form is invalid');
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
