import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authenticationService.login(this.loginForm.value).subscribe(
        (response: any) => {
          const jwt = response.token;
          this.authenticationService.setToken(jwt);
          this.router.navigate(['/products']) 
        }, (error) => {
          console.log(error);
        }
      )
    }
  }
}
