import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../_services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public error: string = '';
  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, 
              private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onFormSubmit(): void {
    const { username, password } = this.loginForm.value;

    this.auth.login( username, password )
      .pipe( first() )
      .subscribe(
        result => this.router.navigate(['/dashboard']),
        err => {
          this.error = err.error.message;
        }
      )
  }
}
