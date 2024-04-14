import { Component, inject } from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {User} from "../../models/User.model";
import {Router} from "@angular/router";
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
  DAL = inject(UserDalService);

  isFormSubmitted: boolean = false;

  user: any = {
    firstName: '',
    lastName: '',
    dob: null,
    email: '',
    password: '',
    verifyPassword: ''
  }

  btnUpdateClick(userForm: NgForm) {
    if (userForm.valid){
      this.router.navigate(['/settings']);
      this.DAL.update(this.user).then((data)=>{
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
}
