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
  message:string;
  errorMessage:string;

  constructor(private fb: FormBuilder, private landingService: LandingPageService,
    private router: Router) { }

  ngOnInit() {
    this.user = new User;
    this.message = null;
    this.errorMessage = null;
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
    this.errorMessage = null;
    this.message = "Logging In..."
    this.landingService.login(this.user).subscribe(
      (response) => {
        this.user.sessionId = response.toString();
        sessionStorage.setItem("session-id", this.user.sessionId.toString());
        sessionStorage.setItem("username",this.user.username.toString());
        this.router.navigate(["/home"]);
      },
      (error) => {
        this.message = null;
        this.errorMessage = "Invalid Credentials";
      }
    )
  }

  registerNewUser(){
    this.router.navigate(["/register"]);
  }
}
