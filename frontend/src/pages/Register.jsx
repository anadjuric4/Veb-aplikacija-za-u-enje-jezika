import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useAuthContext } from "../context/AuthContext";


const isValidEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const isStrongPassword = (pw) =>
  pw.length >= 6; 

export default function Register() {
  const navigate = useNavigate();
  const { register, error } = useAuthContext();


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
      e.password = "Password must be at least 6 characters long.";

    if (form.confirmPassword !== form.password)
      e.confirmPassword = "Passwords do not match.";

    return e;
  };

  const onSubmit = async (e) => { 
    e.preventDefault();
    const v = validate();
    setErrors(v);
    if (Object.keys(v).length) return;

    const ok = await register({
      name: form.name,
      email: form.email,
      password: form.password,
      password_confirmation: form.confirmPassword,
    });

    if (ok) {
      navigate("/courses");
    }
  };

  return (
    <div className="container">
      <h1>Create account</h1>
      <p>Fill in the form to create your account.</p>

      
      {error && (
        <div
          style={{
            backgroundColor: "#fee",
            border: "1px solid #fcc",
            color: "#c33",
            padding: 12,
            borderRadius: 4,
            marginBottom: 16,
          }}
        >
          {error}
        </div>
      )}


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