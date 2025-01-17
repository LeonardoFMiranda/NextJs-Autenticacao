import { HttpClient } from "../../infra/HttpClient/HttpClient";
import { tokenService } from "./tokenService";

export const authService = {
    async login({ username, password }) {
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`, {
            method: 'POST',
            body: {
                username,
                password,
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Usuário ou senha inválidos');
                }
                const body = response.body;
                console.log(body);

                tokenService.save(body.data.access_token)
            })
    },

    async getSession(context = null) {
        const token = tokenService.get(context);
        return HttpClient(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/session`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Erro ao buscar sessão');
            }
            return response.body.data
        });
    }
}