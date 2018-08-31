import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { distinctUntilChanged } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';
import { User } from '../models';



@Injectable()
export class UserService {
    private currentUserSubject = new BehaviorSubject<User>(new User());
    public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    public isAuthenticated = this.isAuthenticatedSubject.asObservable();

    constructor(
        private apiService: ApiService,
        private http: Http,
    ){}

    setAuth(user: User) {
        // Set curretn user data into observable
        this.currentUserSubject.next(user);
        // Set isAuthenticated to true
        this.isAuthenticatedSubject.next(true);
    }

    attemptAuth( type, credentials): Observable<User> {
        const route = ( type === 'login') ? '/login' : '';
        return this.apiService.post( '/users' + route, {user: credentials} )
        .map(
            data => {
                this.setAuth(data.user);
                return data;
            }
        );
    }

    getCurrentUser(): User {
        return this.currentUserSubject.value;
    }
}
