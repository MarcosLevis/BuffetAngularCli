import { HttpInterceptor,  HttpHandler, HttpRequest  } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

export class TokenInterceptor implements HttpInterceptor {

    constructor(){}

    private tokenPrueba: string =  `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXJjb3NAZ21haWwuY29tIiwiZXhwIjoxNzM0NTM0NTQ3fQ.OUEBtQpV_KSS2x5Uq44pc2WzVv_n1NDYCUAQH2F9FgE`;

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        console.log(`TokenInterceptor - ${req.url}`);
        
        let authReq: HttpRequest<any> = req.clone({
            setHeaders:{
                //Authorization : `Bearer ${localStorage.getItem("token")}`
                Authorization : `Bearer ${this.tokenPrueba}`
            }
        });
        return next.handle(authReq); //para no hacer cambios
                    //podría enviar next.handle(req)
    }
}