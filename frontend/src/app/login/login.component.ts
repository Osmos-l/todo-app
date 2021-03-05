import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
    const username: string = this.loginForm.get('username')?.value;
    const password: string = this.loginForm.get('password')?.value;

    this.auth.login( username, password )
      .pipe( first() )
      .subscribe(
        result => this.router.navigate(['/dashboard']),
        err => this.error = err.error
      )
  }
}
