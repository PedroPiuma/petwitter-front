import { useAuth } from "../context/auth-context";

function AuthStatus() {
  let auth = useAuth();

  if (!auth.user) {
    return <p>Você não está logado.</p>;
  }

  return (
    <p>
      Bem vindo(a) {auth.user?.name}!{" "}
    </p>
  );
}

export default AuthStatus;
