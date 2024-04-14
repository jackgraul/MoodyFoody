import {Component, inject, OnInit} from '@angular/core';
import {NavComponent} from "../nav/nav.component";
import {User} from "../../models/User.model";
import {UserDalService} from "../../services/user-dal.service";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    NavComponent
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit{
  dal = inject(UserDalService);

  user: User = new User();
  name: string = '';
  id: number | null = Number(localStorage.getItem("id"));

  async getUser(): Promise<void> {
    if (this.id === null) {
      console.log("ID is not a valid number");
      return;
    }
    try {
      this.user = await this.dal.select(this.id);
      this.name = this.user.firstName;
      console.log(`User is: ${this.user.firstName}`);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  }

  ngOnInit(){
    this.getUser();
  }
}
