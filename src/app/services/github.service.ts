import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CLIENT_ID, CLIENT_SECRET } from "../credentials/githubCred";
import { Observable, catchError, count, retry, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class GithubService {
    constructor(private httpClient: HttpClient){}

    //for profile
    public getProfile(searchQuery: string):Observable<any>{
        let dataURL = `https://api.github.com/users/${searchQuery}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
        return this.httpClient.get<any>(dataURL).pipe(
            retry(1),
            catchError(this.handleErrors)
        );
    }

    // for repos
    public getRepos(searchQuery: string):Observable<any[]>{
        let dataURL = `https://api.github.com/users/${searchQuery}/repos?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`;
        return this.httpClient.get<any[]>(dataURL).pipe(
            retry(1),
            catchError(this.handleErrors)
        );
    }

    public handleErrors(error: HttpErrorResponse) {
        let errorMessage: string;
      
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `MESSAGE: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `STATUS: ${error.status} MESSAGE: ${error.message}`;
        }
      
        
        return throwError(errorMessage);
      }
}
