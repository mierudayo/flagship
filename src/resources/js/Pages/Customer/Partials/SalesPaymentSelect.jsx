import ClearAllIcon from '@mui/icons-material/ClearAll';
import IconButton from '@mui/material/IconButton';
import OptionsList from '@/Components/OptionsList';

export default function SalesPaymentSelect({ data, setData, errors, paymentTermOptions }) {

  const billingType = data.sales_term?.billing_type;

  function handleClickDefaultTerms() {
    setData('sales_term', {
      ...data.sales_term,
      billing_type: 2,
      payment_day_offset: 0,
    })
  }

  function handleClickClear() {
    setData('sales_term', {
      ...data.sales_term,
      billing_type: '',
      cutoff_day: '',
      payment_month_offset: '',
      payment_day: '',
      payment_day_offset: '',
    });
  }

  function handleChange(key, value) {
    setData('sales_term', {
      ...data.sales_term,
      [key]: value,
    });
  }

  return (
    <div>
      <div className="u-flex">
        <SelectInput
          label="..."
          value={billingType}
          onChange={e => handleChange('billing_type', e.target.value)}
          error={errors['sales_term.billing_type']}
          options={paymentTermOptions.billingTypes}
          className="u-w-120 u-mr-2"
        />
        <button
          type="button"
          className="btn btn-secondary"
          style={{ padding: '4px', fontSize: '0.875rem' }}
          onClick={handleClickDefaultTerms}
        >
          デフォルト
        </button>
        {billingType && (
          <IconButton size="small" aria-label="edit" onClick={handleClickClear}>
            <ClearAllIcon />
          </IconButton>
        )}
      </div>
      {billingType == 1 && (
        <>
          <div className="u-flex u-items-center u-my-2">
            <SelectInput
              label="締め日..."
              value={data.sales_term?.cutoff_day}
              onChange={e => handleChange('cutoff_day', e.target.value)}
              error={errors['sales_term.cutoff_day']}
              options={paymentTermOptions.cutoffDays}
              className="u-w-120 u-mr-2"
            />
            <span>締め</span>
          </div>

          <div className="u-flex u-items-center u-mb-2">
            <SelectInput
              label="支払月..."
              value={data.sales_term?.payment_month_offset}
              onChange={e => handleChange('payment_month_offset', e.target.value)}
              error={errors['sales_term.payment_month_offset']}
              options={paymentTermOptions.monthOffsets}
              className="u-w-120 u-mr-2"
            />
            <SelectInput
              label="支払日..."
              value={data.sales_term?.payment_day}
              onChange={e => handleChange('payment_day', e.target.value)}
              error={errors['sales_term.payment_day']}
              options={paymentTermOptions.paymentDay}
              className="u-w-120 u-mr-2"
            />
            <span>払い</span>
          </div>
        </>
      )}
      {billingType == 2 && (
        <SelectInput
          label="期限..."
          value={data.sales_term?.payment_day_offset}
          onChange={e => handleChange('payment_day_offset', e.target.value)}
          error={errors['sales_term.payment_day_offset']}
          options={paymentTermOptions.dayOffsets}
          className="u-w-120 u-mt-2"
        />
      )}
    </div>
  );
};

const SelectInput = ({ name = null, label, value, onChange, error, options, className }) => {
  const selectClassName = `form-select ${error ? 'is-invalid' : ''} ${className || ''}`;

  return (
    <>
      <select
        value={value}
        onChange={onChange}
        className={selectClassName}
      >
        <option value="" hidden>{label}</option>
        <OptionsList options={options} />
      </select>
    </>
  );
};
