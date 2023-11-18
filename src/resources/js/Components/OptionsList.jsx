export default function OptionsList({ options }) {
  return (
    <>
      {Object.entries(options).map(([id, label]) => (
        <option key={id} value={id}>{label}</option>
      ))}
    </>
  );
}

