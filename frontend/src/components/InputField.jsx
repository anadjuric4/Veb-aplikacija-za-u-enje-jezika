export default function InputField({
  label,
  type = "text",
  value = "",
  onChange,
  placeholder = "",
  error = "",
}) {
  return (
    <div className="field">
      {label ? <label>{label}</label> : null}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />

      {error ? <div className="error">{error}</div> : null}
    </div>
  );
}
