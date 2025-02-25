import { HttpInterceptor,  HttpHandler, HttpRequest  } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()

export class TokenInterceptor implements HttpInterceptor {

    constructor(){}
    
    

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        console.log(`TokenInterceptor - ${req.url}`);        
        let authReq: HttpRequest<any> = req.clone({
            setHeaders:{
                Authorization : `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        return next.handle(authReq); //para no hacer cambios
                    //podría enviar next.handle(req)
    }
}