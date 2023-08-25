import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Router } from '@angular/router';
import { login, signup } from '../datatype';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.scss']
})
export class SellerAuthComponent implements OnInit {


  constructor(private seller: SellerService, private router: Router) { }

  islogin = false

  ngOnInit(): void {
    this.seller.reloadseller();
  }


  signup(data: signup) {
    this.seller.usersignup(data);
  }


  loginuser(data: login) {
    this.seller.loginuser(data);
    this.seller.isloginerror.subscribe(
      (error) => {
        if (error) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'login failed!',
            footer: 'Incorrect email or password'
          })
          this.router.navigate(['seller']);
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


  login() {
    this.islogin = true
  }


  signupnow() {
    this.islogin = false
  }


}
