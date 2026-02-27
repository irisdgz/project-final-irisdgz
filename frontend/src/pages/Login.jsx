import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuthStore } from "../store/authStore";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data?.message || "Could not log in");
        return;
      }

      login({ accessToken: data.accessToken, user: data.user });
      navigate("/");
    } catch {
      setErrorMsg("Network error. Try again.");
    }
  };

  return (
    <Page>
      <Card>
        <h1>Log in</h1>

        <Form onSubmit={onSubmit}>
          <label>
            Email
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </label>

          {errorMsg && <Error role="alert">{errorMsg}</Error>}

          <button type="submit">Log in</button>
        </Form>

        <p>
          No account? <Link to="/signup">Sign up</Link>
        </p>
      </Card>
    </Page>
  );
}

const Page = styled.main`
  padding: 24px 16px;
  display: flex;
  justify-content: center;
`;

const Card = styled.section`
  width: 100%;
  max-width: 420px;
  border: 1px solid #eee;
  border-radius: 16px;
  padding: 16px;
`;

const Form = styled.form`
  display: grid;
  gap: 12px;

  label {
    display: grid;
    gap: 6px;
    font-size: 14px;
  }

  input {
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #ddd;
  }

  button {
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;
  }
`;

const Error = styled.p`
  margin: 0;
`;