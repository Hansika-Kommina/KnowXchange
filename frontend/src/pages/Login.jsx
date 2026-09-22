import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      alert("Email is required");
      return;
    }

    if (password === "") {
      alert("Password is required");
      return;
    }

    console.log({
      email,
      password
    });

    alert("Login form is valid!");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h1>Login</h1>

        <form onSubmit={handleSubmit}>

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />

          <button type="submit">
            Login
          </button>

        </form>

        <p>
          Don't have an account?
          <a href="/register"> Register</a>
        </p>

      </div>
    </div>
  );
}

export default Login;