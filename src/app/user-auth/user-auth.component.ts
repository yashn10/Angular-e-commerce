import { Component, OnInit } from '@angular/core';
import { login, signup } from '../datatype';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.scss']
})
export class UserAuthComponent implements OnInit {


  islogin = false;

  constructor(private user: UserService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.router.navigate(['/']);
    }
  }


  signup(data: signup) {
    this.user.usersignup(data);
  }


  loginuser(data: login) {
    this.user.userlogin(data);
    this.user.isloginerror.subscribe(
      (error) => {
        if (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'login failed!',
            footer: 'Incorrect email or password'
          })
          this.router.navigate(['user-auth']);
        } else {
          Swal.fire(
            'Good job!',
            'You login successfully!',
            'success'
          )
        }
      }
    )
  }


  signupnow() {
    this.islogin = false
  }
  

  login() {
    this.islogin = true
  }

}
