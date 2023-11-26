export default function FormErrorAlert({ errors }) {
  const errorCount = Object.keys(errors).length;
  if (errorCount > 0) {
    return <div className="alert alert-danger">入力エラーが{errorCount}件あります。</div>;
  }
  return null;
}
