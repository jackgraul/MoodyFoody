import { Component, inject } from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {User} from "../../models/User.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {UserDalService} from "../../services/user-dal.service";
import {NavComponent} from "../nav/nav.component";

@Component({
  selector: 'app-updateaccountpage',
  standalone: true,
  imports: [
    FormsModule,
    JsonPipe,
    ReactiveFormsModule,
    CommonModule,
    NavComponent
  ],
  templateUrl: './updateaccountpage.component.html',
  styleUrl: './updateaccountpage.component.css'
})
export class UpdateaccountpageComponent {
  router = inject(Router)
  dal = inject(UserDalService);
  activatedRoute = inject(ActivatedRoute);

  isFormSubmitted: boolean = false;
  passwordVisibility: boolean = false;
  verifyPasswordVisibility: boolean = false;

  user: any = {
    firstName: '',
    lastName: '',
    dob: null,
    email: '',
    password: '',
    verifyPassword: ''
  }

  ngOnInit(){
    const id: number = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.dal.select(id).then((data)=>{
      this.user = data;
    }).catch((e)=>{
      console.log("Error: " + e.message);
    });
  }

  btnUpdateClick(userForm: NgForm) {
    if (userForm.valid){
      this.router.navigate(['/settings']);
      this.dal.update(this.user).then((data)=>{
        alert("User updated successfully");
      }).catch((e)=>{
        console.log("Error: error in update button click: " + e);
      });

      this.isFormSubmitted = true;
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
    this.router.navigate(['/settings']);
  }

  validatePassword(password: string, verifyPassword: string): boolean {
    if (password === verifyPassword){
      return true;
    }
    else{
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
