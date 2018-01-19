import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Observer } from "rxjs/Rx"

@Injectable()
export class AppService {
    domain = "http://localhost:8000"
    status: Observable<boolean>;
    authToken: any;
    private observer: Observer<boolean>;
    constructor(private http: HttpClient) {
        this.status = new Observable<boolean>(observer =>
            this.observer = observer
        ).share();
    }
    loginUser(user) {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        return this.http.post(this.domain + '/api/v1/auth/login/', user, { headers: headers });
    }
    changeValue(value) {
        const headers = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Authorization': 'JWT ' + this.authToken
        });
        return this.http.post("./api/board", value, { headers: headers })
    }
    loadToken() {
        const token = localStorage.getItem('id_token');
        this.authToken = token
    }
    storeUserData(token, username, email) {
        localStorage.setItem('id_token', token)
        this.authToken = token;
    }
    changeState(newState: boolean) {
        if (this.observer !== undefined) this.observer.next(newState);
    }

    verifyUser() {
        this.loadToken()
        const headers = new HttpHeaders(
            {
                'Content-Type': 'application/json; charset=utf-8'
            });
        const token = {
            "token": this.authToken
        }
        return this.http.post(this.domain + '/api/v1/auth/verify/', token, { headers: headers });
    }
}