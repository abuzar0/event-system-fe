import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAdminRole = false;

  constructor() {
    const info = localStorage.getItem('user_info');
  }

  isAdmin(): boolean {
    return this.isAdminRole;
  }

  clearStorage() {
    localStorage.removeItem("user_info");
  }
}
