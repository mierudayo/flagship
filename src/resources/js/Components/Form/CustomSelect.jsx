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
    labelKey = 'name',
    error,
  } = props;

  /** react-selectのスタイル適用方法 */
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderColor: state.isFocused && !error ? 'var(--color-focus)' : error ? 'var(--color-invalid-focus)' : provided.borderColor,
      boxShadow: state.isFocused && !error ? 'var(--color-focus-shadow)' : error ? 'var(--color-invalid-focus-shadow)' : provided.boxShadow,
      '&:hover': {
        borderColor: state.isFocused && !error ? 'var(--color-focus)' : error ? 'var(--color-invalid-focus)' : provided.borderColor,
        boxShadow: state.isFocused && !error ? 'var(--color-focus-shadow)' : error ? 'var(--color-invalid-focus-shadow)' : provided.boxShadow,
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'var(--color-focus)' : provided.backgroundColor,
      color: state.isSelected ? 'white' : provided.color,
    }),
  };


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
      styles={{
        ...customStyles,
        menuPortal: base => ({ ...base, zIndex: 9999 })
      }}
    />
  );
}
