import {Component, inject, OnInit} from '@angular/core';
import {NavComponent} from "../nav/nav.component";
import {Router} from "@angular/router";
import {User} from "../../models/User.model";
import {UserDalService} from "../../services/user-dal.service";

@Component({
  selector: 'app-settingspage',
  standalone: true,
  imports: [
    NavComponent
  ],
  templateUrl: './settingspage.component.html',
  styleUrl: './settingspage.component.css'
})
export class SettingspageComponent implements OnInit{
  dal = inject(UserDalService);
  router = inject(Router);

  id: number | null = Number(localStorage.getItem("id"));
  user: User = new User();

  async getUser(): Promise<void> {
    if (this.id === null) {
      console.log("ID is not a valid number");
      return;
    }
    try {
      this.user = await this.dal.select(this.id);
      console.log(`User is: ${this.user.firstName}`);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  ngOnInit(){
    this.getUser();
  }

  btnUpdateAccountClick() {
    this.updateAccount(this.user);
  }

  updateAccount(user: User) {
    this.router.navigate([`/update/${user.id}`]);
  }

  btnDeleteAccountClick() {
    const isConfirmed = window.confirm("Are you sure you want to delete your account?");

    if (isConfirmed) {
      this.dal.delete(this.user).then((data) => {
        alert("Account deleted successfully");
        localStorage.setItem("id", "");
        this.router.navigate(['/login']);
      }).catch((e) => {
        console.log(e);
      });
    } else {
      console.log("Deletion cancelled by user");
    }
  }
}
