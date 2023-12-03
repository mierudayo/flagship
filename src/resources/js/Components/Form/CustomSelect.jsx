import Select from 'react-select';

export default function CustomSelect(props) {
  const {
    id,
    value,
    onChange,
    options,
    placeholder,
    noOptionsMessage = () => '該当する選択肢がありません',
    isClearable = true,
    isSearchable = true,
    valueKey = 'id',
    labelKey = 'name'
  } = props;

  function handleChange(selectedOption) {
    onChange(selectedOption?.[valueKey] ?? null);
  }

  const formattedOptions = options.map(option => ({
    ...option,
    value: option[valueKey],
    label: option[labelKey]
  }));

  const selectedValue = formattedOptions.find(option => option[valueKey] === value) || null;

  return (
    <Select
      id={id}
      value={selectedValue}
      onChange={handleChange}
      options={formattedOptions}
      isClearable={isClearable}
      isSearchable={isSearchable}
      placeholder={placeholder}
      noOptionsMessage={noOptionsMessage}
      menuPortalTarget={document.body}
      styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
    />
  );
}
