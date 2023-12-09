import OptionsList from '@/Components/OptionsList';

export default function PaymentSelectGroup({ data, setData, errors, paymentTermOptions, billingTypeKey, cutoffDayKey, paymentMonthOffsetKey, paymentDayKey, paymentDayOffsetKey }) {
  const billingType = data[billingTypeKey];

  return (
    <div className="">
      <SelectInput
        name={billingTypeKey}
        label="..."
        value={billingType}
        onChange={e => setData(billingTypeKey, e.target.value)}
        error={errors[billingTypeKey]}
        options={paymentTermOptions.billingTypes}
        className="u-w-120"
      />
      {billingType == 1 && (
        <>
          <div className="u-flex u-items-center u-my-2">
            <SelectInput
              name={cutoffDayKey}
              label="締め日..."
              value={data[cutoffDayKey]}
              onChange={e => setData(cutoffDayKey, e.target.value)}
              error={errors[cutoffDayKey]}
              options={paymentTermOptions.cutoffDays}
              className="u-w-120 u-mr-2"
            />
            <span>締め</span>
          </div>

          <div className="u-flex u-items-center u-mb-2">
            <SelectInput
              name={paymentMonthOffsetKey}
              label="支払月..."
              value={data[paymentMonthOffsetKey]}
              onChange={e => setData(paymentMonthOffsetKey, e.target.value)}
              error={errors[paymentMonthOffsetKey]}
              options={paymentTermOptions.monthOffsets}
              className="u-w-120 u-mr-2"
            />
            <SelectInput
              name={paymentDayKey}
              label="支払日..."
              value={data[paymentDayKey]}
              onChange={e => setData(paymentDayKey, e.target.value)}
              error={errors[paymentDayKey]}
              options={paymentTermOptions.paymentDay}
              className="u-w-120 u-mr-2"
            />
            <span>払い</span>
          </div>
        </>
      )}
      {billingType == 2 && (
        <SelectInput
          name={paymentDayOffsetKey}
          label="期限..."
          value={data[paymentDayOffsetKey]}
          onChange={e => setData(paymentDayOffsetKey, e.target.value)}
          error={errors[paymentDayOffsetKey]}
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
