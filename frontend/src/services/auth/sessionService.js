import { redirect } from "next/dist/server/api-utils";
import { authService } from "./authService";


export function withSession(funcao) {
    try {
        return async (context) => {
            const session = await authService.getSession(context);
            const contextModified = {
                ...context,
                req: {
                    ...context.req,
                    session
                }
            }
            return funcao(contextModified);
        }
    } catch (error) {
        return {
            redirect: {
                destination: '/?404',
                permanent: false
            }
        }
    }
}