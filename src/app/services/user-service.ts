import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { UserSearchResponse } from '../viewmodels/userSearchResponse';
import { UserDetailsResponse } from '../viewmodels/userDetailsResponse';
@Injectable()
export class UserSearchService {
    constructor(private http: Http) { }
    getUserRepos(userName: any): Observable<UserSearchResponse[]> {
        const url = `https://api.github.com/users/${userName}/repos`;
        return this.http.get(url).map(response => {
            if (response) {
                return response.json() as UserSearchResponse[];
            }
        },
            err => {
                console.log(err);
                return null;
            });
    }
    getUserDetails(userName: any): Observable<UserDetailsResponse> {
        const url = `https://api.github.com/users/${userName}`;
        return this.http.get(url).map(response => {
            if (response) {
                return response.json() as UserDetailsResponse;
            }
        },
            err => {
                console.log(err);
                return null;
            });
    }
}
