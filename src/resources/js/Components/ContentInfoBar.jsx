export default function ContentInfoBar({ createdAt, createdBy, updatedAt, updatedBy }) {
  return (
    <div className="content-info-bar">
      <div>登録: {createdAt} {createdBy && `(${createdBy})`}</div>
      {updatedBy && <div>更新: {updatedAt} ({updatedBy})</div>}
    </div>
  );
};
