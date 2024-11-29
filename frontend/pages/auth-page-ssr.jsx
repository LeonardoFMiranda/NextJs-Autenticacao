import { redirect } from "next/dist/server/api-utils";
import { authService } from "../src/services/auth/authService";
import { withSession } from "../src/services/auth/sessionService";

export function AuthPageSSR(props) {

    return (
        <div>
            <div>
                <h1>Auth Page SSR</h1>
            </div>
            <pre>
                {JSON.stringify(props, null, 2)}
            </pre>
        </div>
    );
}

export default AuthPageSSR;

//Decorator Pattern

    // export const getServerSideProps = withSession((context) => {
    //     return {
    //         props: {
    //             session: context.req.session
    //         }
    //     }
    // })

export async function getServerSideProps(context) {
    try {
        const session = await authService.getSession(context);

        return {
            props: {
                session
            }
        }
    } catch(error) {
        return {
            redirect: {
                destination: '/?404',
                permanent: false
            }
        }
    }
}