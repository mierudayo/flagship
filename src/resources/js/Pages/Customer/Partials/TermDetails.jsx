export default function TermDetails({ term }) {
  switch (term?.billing_type) {
    case 1:
      return (
        <>
          <span className="u-mr-3">{term?.cutoff_day_label}締め</span>
          <span>{term?.payment_month_offset_label}{term?.payment_day_label}払い</span>
        </>
      );
    case 2:
      return (
        <>
          <span>{term?.payment_day_offset_label}</span>
        </>
      );
    default:
      return null;
  }
};
