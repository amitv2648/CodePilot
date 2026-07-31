import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  signup,
  googleLogin,
} from "../../services/firebase/auth";


function Signup() {

  const navigate = useNavigate();


  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");


  async function handleSignup(
    e: React.FormEvent
  ) {

    e.preventDefault();


    try {

      await signup(
        email,
        password
      );


      navigate("/onboarding");


    } catch {

      setError(
        "Could not create account."
      );

    }

  }


  async function handleGoogleSignup() {

    try {

      await googleLogin();


      navigate("/onboarding");


    } catch {

      setError(
        "Google signup failed."
      );

    }

  }


  return (

    <div>

      <h1>
        Create CodePilot Account
      </h1>


      {
        error &&
        <p>{error}</p>
      }


      <form
        onSubmit={handleSignup}
      >

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


        <button>
          Create Account
        </button>


      </form>


      <button
        onClick={handleGoogleSignup}
      >
        Continue with Google
      </button>


      <button
        onClick={() =>
          navigate("/login")
        }
      >
        Already have an account? Login
      </button>


    </div>

  );

}


export default Signup;