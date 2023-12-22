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
      minHeight: 'var(--max-height-partials)',
      maxHeight: 'var(--max-height-partials)',
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

  /**
   * route().paramsでURLパラメータから取得した値は文字列のため、等価比較演算子でint型のid系にも対応する
   */
  const selectedValue = formattedOptions.find(option => option[valueKey] == value) || null;

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
      menuPosition="fixed"
      menuShouldBlockScroll={true}
      menuPortalTarget={document.body}
      styles={{
        ...customStyles,
        menuPortal: base => ({ ...base, zIndex: 9999 })
      }}
    />
  );
}
