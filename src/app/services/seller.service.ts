import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { login, signup } from '../datatype';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {


  issellerloggedin = new BehaviorSubject<boolean>(false)
  isloginerror = new EventEmitter<boolean>(false)

  constructor(private http: HttpClient, private router: Router) { }

  usersignup(data: signup) {
    this.http.post('http://localhost:3000/seller', data, { observe: "response" }).subscribe(
      (result) => {
        this.issellerloggedin.next(true);
        // localStorage.setItem("seller", JSON.stringify(result.body))
        this.router.navigate(['seller-home']);
      }
    )
  }

  loginuser(data: login) {
    this.http.get<signup[]>(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result) => {
      console.warn(result)
      if (result && result.body && result.body.length) {
        console.log("user logged in");
        localStorage.setItem('seller', JSON.stringify(result.body))
        this.router.navigate(['seller-home'])
        this.isloginerror.emit(false)
      } else {
        console.warn("login failed");
        this.isloginerror.emit(true)
      }
    })
  }

  reloadseller() {
    if (localStorage.getItem('seller')) {
      this.issellerloggedin.next(true);
      this.router.navigate(['seller-home']);
    }
  }

}
