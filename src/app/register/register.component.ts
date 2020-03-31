import { Component, OnInit } from '@angular/core';
import { User } from '../models/User';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  registrationForm: FormGroup;
  confirmation:string;
  message:string;

  constructor(private fb: FormBuilder, private registerService: RegisterService,
    private router: Router) { }

  ngOnInit() {
    this.user = new User;
    this.createForm();
  }

  createForm(){
    this.registrationForm = this.fb.group({
      username: [this.user.username, [Validators.required], null],
      password: [this.user.password, [Validators.required], null],
      confirmation: [this.confirmation, [Validators.required], null]
    });
  }

  register() {
    console.log("In register");
    this.user = this.registrationForm.value as User;
    this.confirmation = this.registrationForm.value.confirmation;
    console.log("password, confirmation", this.user.password, this.confirmation);
    if(this.user.password==this.confirmation){
      this.registerService.register(this.user).subscribe(
        (response) => {
          console.log("response",response);
          this.user.sessionId = response.toString();
          sessionStorage.setItem("session-id", this.user.sessionId.toString());
          sessionStorage.setItem("username",this.user.username.toString());
          this.router.navigate(["/home"]);
        },
        (error) => {
          this.message = "Username not available.";
          console.log(error);
        }
      )
    } else {
      this.message = "Passwords must match.";
    }
  }
}
