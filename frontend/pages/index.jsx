import { useState } from "react";
import { useRouter } from "next/router";
import { authService } from "../src/services/auth/authService";

export default function HomeScreen() {

  const router = useRouter();
  const [values, setValues] = useState ({
    usuario: 'leonardo',
    senha: 'safepassword'
  })

  const handleChange = (e) => {
    const fieldValue = e.target.value;
    const fieldName = e.target.name;
    setValues((currentValues) => {
      return {
        ...currentValues,
        [fieldName]: fieldValue
      }
    })
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={(event) => {
        event.preventDefault();
        authService.login({
          username: values.usuario,
          password: values.senha
        })
        .then(() => {
          router.push('/auth-page-static');
          // router.push('/auth-page-srr');
        })
        .catch((error) => {
          console.log(values.usuario, values.senha)
          alert('Usuário ou senha inválidos');
        });
      }}>
        <input
          placeholder="Usuário" name="usuario"
          onChange={handleChange}
          defaultValue="leonardo"
        />
        <input
          placeholder="Senha" name="senha" type="password"
          onChange={handleChange}
          defaultValue="safepassword"
        />
        <pre>
          {JSON.stringify(values, null, 2)}
        </pre>
        <div>
          <button>
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}
