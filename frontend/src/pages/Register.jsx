import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";

const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isStrongPassword = (pw) =>
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/.test(pw);

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const onChange = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    setErrors((p) => ({ ...p, [field]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!isValidEmail(form.email)) e.email = "Invalid email format.";

    if (!form.password) e.password = "Password is required.";
    else if (!isStrongPassword(form.password))
      e.password = "Password must be at least 8 characters long and include letters, numbers and symbols.";

    if (form.confirmPassword !== form.password)
      e.confirmPassword = "Passwords do not match.";

    return e;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    navigate("/login");
  };

  return (
    <div className="container">
      <h1>Create account</h1>
      <p>Fill in the form to create your account.</p>

      <div className="card">
        <form onSubmit={onSubmit}>
          <InputField label="Name" value={form.name} onChange={onChange("name")} error={errors.name} />
          <InputField label="Email" type="email" value={form.email} onChange={onChange("email")} error={errors.email} />
          <InputField label="Password" type="password" value={form.password} onChange={onChange("password")} error={errors.password} />
          <InputField label="Confirm password" type="password" value={form.confirmPassword} onChange={onChange("confirmPassword")} error={errors.confirmPassword} />

          <Button type="submit">Create account</Button>
        </form>
      </div>

      <p style={{ marginTop: 12 }}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
