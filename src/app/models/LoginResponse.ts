import { Usuario } from './Usuario';

export class LoginResponse {
    token: string;
    usuario: Usuario;

    constructor(obj?: any) {
        this.token = obj && obj.token || '';
        this.usuario = obj && obj.usuario || null;
    }

    getToken(): string {
        return this.token;
    }

    getUsuario(): Usuario {
        return this.usuario;
    }
}
