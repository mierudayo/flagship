export default function ProductTable({ products }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table">
        <thead className="table-header is-sticky">
          <tr className="table-row">
            <th className="th-cell col-fixed">ID</th>
            <th className="th-cell col-fixed">商品名</th>
            <th className="th-cell col-fixed">カテゴリ</th>
            <th className="th-cell col-fixed">カテゴリグループ</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {products.map(product => (
            <tr key={product.id} className="table-row is-hoverable">
              <td className="td-cell col-fixed">{product.id}</td>
              <td className="td-cell">{product.name}</td>
              <td className="td-cell">{product.category.name}</td>
              <td className="td-cell">{product.category.group.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
