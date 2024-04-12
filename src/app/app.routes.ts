import { Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {ShowpageComponent} from "./showpage/showpage.component";
import {DetailpageComponent} from "./detailpage/detailpage.component";
import {SettingspageComponent} from "./settingspage/settingspage.component";
import {AddpageComponent} from "./addpage/addpage.component";
import {ErrorpageComponent} from "./errorpage/errorpage.component";
import {LoginpageComponent} from "./loginpage/loginpage.component";
import {CreateaccountpageComponent} from "./createaccountpage/createaccountpage.component";
import {UpdateaccountpageComponent} from "./updateaccountpage/updateaccountpage.component";

export const routes: Routes = [
  {path: "login", component: LoginpageComponent},
  {path: "home", component: HomepageComponent},
  {path: "show", component: ShowpageComponent},
  {path: "detail/:id", component: DetailpageComponent},
  {path: "settings", component: SettingspageComponent},
  {path: "add", component: AddpageComponent},
  {path: "create", component: CreateaccountpageComponent},
  {path: "update/:id", component: UpdateaccountpageComponent},
  {path: "", redirectTo: "/login", pathMatch: "full"},
  {path: "**", component: ErrorpageComponent},
];
