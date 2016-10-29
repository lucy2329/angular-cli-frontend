import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ng2-webstorage';
import { JwtHelper, tokenNotExpired } from 'angular2-jwt';

interface tokenData {
  token: string,
  refresh_token: string
}

@Injectable()
export class UserService {
  /**
   * Constructor of the class.
   *
   * @param {LocalStorageService} localStorage
   * @param {JwtHelper}           jwtHelper
   */
  constructor(
    private localStorage: LocalStorageService,
    private jwtHelper: JwtHelper
  ) { }

  /**
   * Method to store JWT token data to local storage.
   *
   * @param {tokenData} data
   */
  public storeTokens(data: tokenData): void {
    this.localStorage.store('token', data.token);
    this.localStorage.store('refreshToken', data.refresh_token);
  }

  /**
   * Method to get current user profile data from JWT data.
   *
   * @returns {{}}
   */
  public profile(): Object {
    return (this.loggedIn()) ? this.jwtHelper.decodeToken(this.localStorage.retrieve('token')) : {};
  }

  /**
   * Method to check if current user is logged in or not.
   *
   * @returns {boolean}
   */
  public loggedIn(): boolean {
    return tokenNotExpired('token', this.localStorage.retrieve('token'));
  }

  /**
   * Method to erase all local storage data related to user.
   */
  public erase(): void {
    this.localStorage.clear();
  }
}
