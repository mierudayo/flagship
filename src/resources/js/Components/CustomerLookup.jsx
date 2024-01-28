import { useEffect, useState, useRef } from 'react'

import { useForm } from '@inertiajs/react';

import SearchInput from './Form/SearchInput';

export default function CustomerLookup({ handleClickSelect }) {
  const inputRef = useRef(null);

  const { data, setData, errors } = useForm({
    keyword: '',
  });

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  async function fetchCustomers() {
    const response = await fetch(`/api/customers?keyword=${data.keyword}`);
    const customersJson = await response.json();
    setCustomers(customersJson);
  }

  function submit(e) {
    e.preventDefault();
    fetchCustomers();
  }

  function handleChange(e) {
    setData('keyword', e.target.value);
  }

  return (
    <>
      <form onSubmit={submit}>
        <header>
          <SearchInput
            type="search"
            ref={inputRef}
            onChange={handleChange}
            placeholder="取引先名, よみがな, ショートカット名で検索（Enter）"
          />
          {errors.keyword && <div className="invalid-feedback">{errors.keyword}</div>}
        </header>
      </form>

      <div className="table-wrapper in-modal is-scrollable u-mt-4">
        <table className="table">
          <thead className="table-header is-sticky">
            <tr className="table-row">
              <th className="th-cell u-w-80"></th>
              <th className="th-cell u-w-64">No</th>
              <th className="th-cell">取引先名</th>
              <th className="th-cell">住所</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {customers.map(customer => (
              <tr key={customer.id} className="table-row is-hoverable">
                <td className="td-cell">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleClickSelect(customer)}
                  >
                    選択
                  </button>
                </td>
                <td className="td-cell">{customer.id}</td>
                <td className="td-cell">{customer.name}</td>
                <td className="td-cell">{customer.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
