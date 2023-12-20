import ClearAllIcon from '@mui/icons-material/ClearAll';
import IconButton from '@mui/material/IconButton';
import OptionsList from '@/Components/OptionsList';

export default function PaymentSelectGroup({ data, setData, errors, paymentTermOptions, transactionType }) {

  const prefix = transactionType ? `${transactionType}_` : '';

  const billingType = `${prefix}billing_type`;
  const cutoffDay = `${prefix}cutoff_day`;
  const paymentMonthOffset = `${prefix}payment_month_offset`;
  const paymentDay = `${prefix}payment_day`;
  const paymentDayOffset = `${prefix}payment_day_offset`;

  function getDefaultTerm() {
    if (transactionType === 'purchase') {
      return {
        [billingType]: 1,
        [cutoffDay]: 99,
        [paymentMonthOffset]: 1,
        [paymentDay]: 99,
      };
    } else if (transactionType === 'sales') {
      return {
        [billingType]: 2,
        [paymentDayOffset]: 0,
      };
    }
  }

  function handleClickDefaultTerms() {
    const defaultTerm = getDefaultTerm();

    setData({
      ...data,
      ...defaultTerm,
    })
  }

  function handleClickClear() {
    setData({
      ...data,
      [billingType]: '',
      [cutoffDay]: '',
      [paymentMonthOffset]: '',
      [paymentDay]: '',
      [paymentDayOffset]: '',
    })
  }

  return (
    <div className="">
      <div className="u-flex">
        <SelectInput
          name={billingType}
          label="..."
          value={data[billingType]}
          onChange={e => setData(billingType, e.target.value)}
          error={errors[billingType]}
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
        {data[billingType] && (
          <IconButton size="small" aria-label="edit" onClick={handleClickClear}>
            <ClearAllIcon />
          </IconButton>
        )}
      </div>
      {data[billingType] == 1 && (
        <>
          <div className="u-flex u-items-center u-my-2">
            <SelectInput
              name={cutoffDay}
              label="締め日..."
              value={data[cutoffDay]}
              onChange={e => setData(cutoffDay, e.target.value)}
              error={errors[cutoffDay]}
              options={paymentTermOptions.cutoffDays}
              className="u-w-120 u-mr-2"
            />
            <span>締め</span>
          </div>

          <div className="u-flex u-items-center u-mb-2">
            <SelectInput
              name={paymentMonthOffset}
              label="支払月..."
              value={data[paymentMonthOffset]}
              onChange={e => setData(paymentMonthOffset, e.target.value)}
              error={errors[paymentMonthOffset]}
              options={paymentTermOptions.monthOffsets}
              className="u-w-120 u-mr-2"
            />
            <SelectInput
              name={paymentDay}
              label="支払日..."
              value={data[paymentDay]}
              onChange={e => setData(paymentDay, e.target.value)}
              error={errors[paymentDay]}
              options={paymentTermOptions.paymentDay}
              className="u-w-120 u-mr-2"
            />
            <span>払い</span>
          </div>
        </>
      )}
      {data[billingType] == 2 && (
        <SelectInput
          name={paymentDayOffset}
          label="期限..."
          value={data[paymentDayOffset]}
          onChange={e => setData(paymentDayOffset, e.target.value)}
          error={errors[paymentDayOffset]}
          options={paymentTermOptions.dayOffsets}
          className="u-w-120 u-mt-2"
        />
      )}
    </div>
  );
};

const SelectInput = ({ name, label, value, onChange, error, options, className }) => {
  const selectClassName = `form-select ${error ? 'is-invalid' : ''} ${className || ''}`;

  return (
    <select
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      className={selectClassName}
    >
      <option value="" hidden>{label}</option>
      <OptionsList options={options} />
    </select>
  );
};
