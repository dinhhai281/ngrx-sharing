import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RepsonseData, User } from '@app/models';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  register(email: string, password: string) {
    return this.http.post<RepsonseData<User>>(environment.service.register, {
      email,
      password,
    });
  }

  login(email: string, password: string) {
    return this.http.post<RepsonseData<User>>(`${environment.service.register}/login`, {
      email,
      password,
    });
  }

  constructor(private readonly http: HttpClient) {}
}
