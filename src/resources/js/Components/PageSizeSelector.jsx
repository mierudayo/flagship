import OptionsList from '@/Components/OptionsList';

function PageSizeSelector({ pageSize, onChange,  }) {

  return (
    <div className="u-flex u-items-center u-ml-auto u-mr-2">
      <div className="u-text-sm u-text-center u-min-w-64">表示件数</div>
      <select
        value={pageSize}
        onChange={onChange}
        className="form-select u-min-w-88"
        style={{ height: '32px'}}
      >
        <OptionsList
          options={[
            { value: 100, label: '100件' },
            { value: 200, label: '200件' },
            { value: 500, label: '500件' },
          ]}
        />
      </select>
    </div>
  );
}

export default PageSizeSelector;
