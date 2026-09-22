import { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.trim() === "") {
      alert("Name is required");
      return;
    }

    if (email.trim() === "") {
      alert("Email is required");
      return;
    }

    if (!email.includes("@")) {
      alert("Enter a valid email");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log({
      name,
      email,
      password
    });

    alert("Registration form is valid!");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h1>Create Account</h1>

        <form onSubmit={handleSubmit}>

          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />

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

          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />

          <button type="submit">
            Register
          </button>

        </form>

        <p>
          Already have an account?
          <a href="/login"> Login</a>
        </p>

      </div>
    </div>
  );
}

export default Register;