import { useEffect, useState } from "react";
import {useRouter} from "next/router";
import { authService } from "../src/services/auth/authService";

function useSession() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        authService.getSession()
            .then((session) => {
                console.log(session);
                setSession(session);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, [])

    return {
        loading,
        error,
        data: {
            session
        }
    }
}


function AuthPageStatic(props) {
    const router = useRouter();
    const session = useSession();

    if (!session.loading && session.error) {
        router.push('/?404');
    }

    console.log(session);

    return (
        <div>
            <div>
                <h1>Auth Page Static</h1>
            </div>
            <pre>
                {JSON.stringify(session, null, 2)}
            </pre>
        </div>
    );
}

export default AuthPageStatic;

//EXEMPLO DE HOC
// import { useEffect, useState } from "react";
// import { useRouter } from "next/router";
// import { authService } from "../src/services/auth/authService";

// function useSession() {
//     const [session, setSession] = useState(null);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         authService.getSession()
//             .then((session) => {
//                 console.log(session);
//                 setSession(session);
//             })
//             .catch((error) => {
//                 setError(error);
//             })
//             .finally(() => {
//                 setLoading(false);
//             })
//     }, [])

//     return {
//         loading,
//         error,
//         data: {
//             session
//         }
//     }
// }

// function withSessionHOC(Component) {
//     return function Wrapper(props) {
//         const router = useRouter();
//         const session = useSession();

//         if (!session.loading && session.error) {
//             router.push('/?404');
//         }

//         const modiefiedProps = {
//             ...props,
//             session: session.data
//         }

//         return (
//             <Component {...modiefiedProps}/>
//         )
//     }
// }

// function AuthPageStatic(props) {

//     return (
//         <div>
//             <div>
//                 <h1>Auth Page Static</h1>
//             </div>
//             <pre>
//                 {JSON.stringify(props, null, 2)}
//             </pre>
//         </div>
//     );
// }

// export default withSessionHOC(AuthPageStatic);