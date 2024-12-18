import { HttpInterceptor,  HttpHandler, HttpRequest  } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

export class TokenInterceptor implements HttpInterceptor {

    constructor(){}
    
    //Esto existe hasta que se cree el login con el local storage
    private tokenPrueba: string =  `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXJjb3NAZ21haWwuY29tIiwiZXhwIjoxNzM0NTYyNTUwfQ.2ULPlYtQTLLcPuU0YgQzpWU2Vj60VfSjXRBdELE3qBc`;

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