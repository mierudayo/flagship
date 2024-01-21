export default function TermDetails({ purchaseOrder }) {
  const termLabels = purchaseOrder.purchase_term_labels;
  switch (purchaseOrder?.billing_type) {
    case 1:
      return (
        <>
          <span className="u-mr-3">{termLabels?.cutoff_day}締め</span>
          <span>{termLabels?.payment_month_offset}{termLabels?.payment_day}払い</span>
        </>
      );
    case 2:
      return (
        <>
          <span>{termLabels?.payment_day_offset}</span>
        </>
      );
    default:
      return null;
  }
};
