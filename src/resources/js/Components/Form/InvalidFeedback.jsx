export default function InvalidFeedback({ errors, name }) {
  return errors[name] ? (
    <div className="invalid-feedback">{errors[name]}</div>
  ) : null;
}
