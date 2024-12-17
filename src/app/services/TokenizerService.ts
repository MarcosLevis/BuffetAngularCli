// import { Injectable } from "@angular/core";
// import { HttpClient, HttpHeaders, HttpErrorResponse} from "@angular/common/http";
// import { environment } from "../environment/environment.development";
// import { tap, catchError } from "rxjs/operators";
// import { Observable, throwError } from "rxjs";

// @Injectable()
// export class TokenizerService {

//     constructor(private http: HttpClient) {}

//     getToken(): Observable<any> {

//         const headers = new HttpHeaders({ "Content-Type": "application/json" });
//         const url = `${environment.API_URL}`;
//         return this.http
//         .post(url,{ userName: "username", password: "password" },{ headers: headers })
//         .pipe(tap(data => console.log("Data: " + JSON.stringify(data))),
//             catchError((error) => {
//                 return throwError(() => new Error('Error al obtener la data'));
//             })
//         );
//     }
// }
   