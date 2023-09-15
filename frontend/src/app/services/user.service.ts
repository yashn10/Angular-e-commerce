import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { login, signup } from '../datatype';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  isloginerror = new EventEmitter<boolean>(false)

  usersignup(data: signup) {
    return this.http.post('http://localhost:3000/users', data, { observe: 'response' }).subscribe(
      (result) => {
        console.log(result);
      }
    )
  }

  userlogin(data: login) {
    this.http.get<signup[]>(`http://localhost:3000/users?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe(
      (result) => {
        if (result && result.body?.length) {
          localStorage.setItem('user', JSON.stringify(result.body[0]));
          console.log(result);
          this.isloginerror.emit(false);
          this.router.navigate(['/']);
        } else {
          this.isloginerror.emit(true);
        }
      }
    )
  }

}
