import { formatCurrency } from '@/Utils/priceCalculator';

export default function ProductTable({ products }) {
  return (
    <div className="table-wrapper is-scrollable">
      <table className="table">
        <thead className="table-header is-sticky">
          <tr className="table-row">
            <th className="th-cell u-w-64 col-fixed u-text-center">No.</th>
            <th className="th-cell u-min-w-88 u-text-center">表示順</th>
            <th className="th-cell u-min-w-120">商品番号</th>
            <th className="th-cell u-min-w-200">商品名</th>
            <th className="th-cell u-min-w-120 u-text-right">仕入単価</th>
            <th className="th-cell u-min-w-120 u-text-right">販売単価</th>
            <th className="th-cell u-min-w-120">説明</th>
            <th className="th-cell u-min-w-80">区分</th>
            <th className="th-cell u-min-w-160">カテゴリ</th>
            <th className="th-cell u-min-w-160">カテゴリグループ</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {products.map(product => (
            <tr key={product.id} className="table-row is-hoverable">
              <td className="td-cell col-fixed u-text-center">{product.id}</td>
              <td className="td-cell u-text-center">{product.display_order}</td>
              <td className="td-cell">{product.product_number}</td>
              <td className="td-cell">{product.name}</td>
              <td className="td-cell u-text-right">{formatCurrency(product.sales_price)}</td>
              <td className="td-cell u-text-right">{formatCurrency(product.purchase_price)}</td>
              <td className="td-cell">{product.description}</td>
              <td className="td-cell">{product.product_type_label}</td>
              <td className="td-cell">{product.category.name}</td>
              <td className="td-cell">{product.category.group.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
