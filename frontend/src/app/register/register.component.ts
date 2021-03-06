import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '../_services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public error: string = '';
  public registerForm = this.fb.group({
    email:    ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, 
              private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onFormSubmit(): void {
    const email: string = this.registerForm.get('email')?.value;
    const username: string = this.registerForm.get('username')?.value;
    const password: string = this.registerForm.get('password')?.value;

    this.auth.signup( email, username, password )
      .pipe( first() )
      .subscribe(
        result => this.router.navigate(['/login']),
        err => this.error = err.error.message
      )
  }

}
