import { Component, inject } from '@angular/core';
import {FormsModule, NgForm, ReactiveFormsModule} from "@angular/forms";
import {JsonPipe} from "@angular/common";
import {User} from "../../models/User.model";
import {Router} from "@angular/router";
import {CommonModule} from "@angular/common";
import {UserDalService} from "../../services/user-dal.service";
import {NavComponent} from "../nav/nav.component";

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

  btnCreateClick(createForm: NgForm) {
    if (createForm.valid){
      this.router.navigate(['/login']);
      this.DAL.insert(this.user).then((data)=>{
        alert("User added successfully");
      }).catch((e)=>{
        console.log("Error: error in add button click: " + e);
      });

      this.isFormSubmitted = true;
    } else {
      console.log('Form is invalid');
      this.isFormSubmitted = true;
      // Handle the form validation errors
      for (const controlName in createForm.controls) {
        if (createForm.controls.hasOwnProperty(controlName)) {
          const control = createForm.controls[controlName];
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
    if (password === verifyPassword){
      return true;
    }
    else{
      return false;
    }
  }
}
