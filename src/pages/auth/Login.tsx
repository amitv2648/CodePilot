import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  login,
  googleLogin,
} from "../../services/firebase/auth";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function handleLogin(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/dashboard");

    } catch (err) {
      setError(
        "Invalid email or password."
      );
    }
  }


  async function handleGoogleLogin() {

    try {
      await googleLogin();
      navigate("/dashboard");

    } catch (err) {
      setError(
        "Google login failed."
      );
    }

  }


  return (
    <div>

      <h1>Login to CodePilot</h1>


      {error && (
        <p>{error}</p>
      )}


      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />


        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />


        <button type="submit">
          Login
        </button>

      </form>


      <button onClick={handleGoogleLogin}>
        Continue with Google
      </button>


      <p>
        Don't have an account?
        <button
          onClick={() =>
            navigate("/signup")
          }
        >
          Sign up
        </button>
      </p>


    </div>
  );
}

export default Login;