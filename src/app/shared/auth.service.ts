import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, first } from 'rxjs/operators';



// --- --------------------
import { JwtHelperService } from '@auth0/angular-jwt';
const decoder = new JwtHelperService();





@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<{token: string}>('/api/auth/signin', {email: email, password: password})
      .pipe(
        map(result => {

          if(result.token){
            localStorage.setItem('access_token', result.token);
            return true;
          }else{
            return result;
          }
          
          
        })
      );
  }

  //---- user card service --------------------------
  getUserCard(): Observable<any> {
    let usertoken = localStorage.getItem('access_token');

    if(usertoken){
      const decodedToken = decoder.decodeToken(usertoken);
      let {userId, userEmail} = decodedToken;
      
      return this.http.get<{token: string}>(`/api/user/card/${userId}`)
      .pipe(
        map(result => {
          return result;
        })
      );

    }else return null;
  
  }

  addToCard



  //---- user card service --------------------------



  signup(firstName, lastName, gender, birtDate, phone, email, password, iAgree) {

    return this.http.post<any[]>('/api/auth/signup', 
    {
      firstName: firstName, 
      lastName: lastName,
      gender: gender,
      birtDate: birtDate,
      phone: phone,
      email: email,
      password: password,
      iAgree: iAgree
    })
    .pipe(map(result => { return result }));
      
  }

  
  public logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

}
