import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getAll() {
    return this._http.get('api/tasks')
  }
  create(user) {
    return this._http.post('api/tasks', user)
  }
  findUser(user) {
    console.log('service', user);
    return this._http.post('api/tasks/user', user)
  }
  logInUser() {
    return this._http.get('api/tasks/user')
  }
  loggedInUser(id) {
    return this._http.get('api/user/' +id)
  }
  logOutUser() {
    return this._http.get('api/user/logout')
  }
}
