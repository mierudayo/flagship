import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function FormErrorAlert({ errors }) {
  const errorCount = Object.keys(errors).length;
  if (errorCount > 0) {
    return (
      <div className="alert alert-danger">
        <ErrorOutlineIcon />
        <span className="u-ml-2">入力エラーが{errorCount}件あります。</span>
      </div>
    );
  }
  return null;
}
