import { Injectable } from "@angular/core";
import { environment } from "./routeApi";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    //obtencion de headers
    getHeaders(): HttpHeaders {
        let headers = new HttpHeaders().set('Accept', 'application/json');
        return headers;
    }

    //peticiones https a laravel
    sendEmail(data : any): Observable<any>{
    const headers = this.getHeaders();
    return this.http.post<any>(`${this.apiUrl}/send-email`, data, { headers });
  }
}