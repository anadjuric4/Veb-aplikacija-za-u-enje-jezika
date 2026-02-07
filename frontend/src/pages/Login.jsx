import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useAuth } from "../hooks/useAuth";

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from || "/courses";

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const onChange = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!isValidEmail(form.email)) e.email = "Please enter a valid email.";

    if (!form.password) e.password = "Password is required.";
    return e;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    login();
    navigate(from, { replace: true });
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <p>Please enter your email and password to continue.</p>

      <div className="card">
        <form onSubmit={onSubmit}>
          <InputField
            label="Email"
            type="email"
            value={form.email}
            onChange={onChange("email")}
            error={errors.email}
            placeholder="you@example.com"
          />
          <InputField
            label="Password"
            type="password"
            value={form.password}
            onChange={onChange("password")}
            error={errors.password}
            placeholder="Your password"
          />

          <Button type="submit">Log in</Button>
        </form>
      </div>

      <p style={{ marginTop: 12 }}>
        Don’t have an account? <Link to="/register">Create one</Link>
      </p>
    </div>
  );
}
