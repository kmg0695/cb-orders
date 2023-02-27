import { useState, useEffect } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    validateInputs();
  }, [email, password]);

  const validateInputs = () => {
    let errors = {
      email: "",
      password: "",
    };

    if (!email) {
      errors.email = "Email is required";
    }

    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setEmailError(errors.email);
    setPasswordError(errors.password);

    setFormValid(Object.values(errors).every((error) => error === ""));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValid) {
      return;
    }

    try {
      await axios
        .post("http://localhost:5151/api/clients/login", {
          email,
          password,
        })
        .then((response) => {
          const { token } = response.data;
          localStorage.setItem("token", token);
          console.log(token === localStorage.getItem("token"));
          window.location.href = "http://localhost:3000";
        });
    } catch (error) {
      console.error(error);
      alert("Authentication failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="error">{emailError}</div>
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="error">{passwordError}</div>
      <button type="submit" disabled={!formValid}>
        Login
      </button>
    </form>
  );
}
