export class User{
  id: number | undefined;
  firstName: string = "";
  lastName: string = "";
  dob: Date = new Date();
  email: string = "";
  password: string = "";

  constructor(firstName: string = "", lastName: string = "", dob: Date = new Date(), email: string = "", password: string = "") {
    this.firstName = firstName;
    this.lastName = lastName;
    this.dob = dob;
    this.email = email;
    this.password = password;
  }
}
