import { Component, OnInit } from '@angular/core';
import { LandingPageService } from './landing-page.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  user: User;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private landingService: LandingPageService,
    private router: Router) { }

  ngOnInit() {
    this.user = new User;
    this.createForm();
  }

  createForm(){
    this.loginForm = this.fb.group({
      username: [this.user.username, [Validators.required], null],
      password: [this.user.password, [Validators.required], null]
    });
  }

  login() {
    this.user = this.loginForm.value as User;
    this.landingService.login(this.user).subscribe(
      // (response) => {
      //   console.log("made it to response");
      //   this.user.sessionId = response.toString();
      //   // sessionStorage.setItem("user", JSON.stringify(this.user));
      //   console.log("login successful");
      // },
      // (error) => {
      //   console.log("login failed");
      // }
      (r)=> {
        console.log(r);
      },
      (x)=> {
        console.log("error ", x);
      }
    )
  }
}
