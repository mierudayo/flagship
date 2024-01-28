import { useEffect, useState, useRef } from 'react'

import { useForm } from '@inertiajs/react';

import SearchInput from './Form/SearchInput';

export default function BillingAddressLookup({ handleClickAttach }) {
  const inputRef = useRef(null);

  const { data, setData, errors } = useForm({
    keyword: '',
  });

  const [billingAddresses, setBillingAddresses] = useState([]);

  useEffect(() => {
    fetchBIllingAddresses();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  async function fetchBIllingAddresses() {
    const response = await fetch(`/api/billing-addresses?keyword=${data.keyword}`);
    const billingAddressesJson = await response.json();
    setBillingAddresses(billingAddressesJson);
  }

  function submit(e) {
    e.preventDefault();
    fetchBIllingAddresses();
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
            placeholder="請求先名で検索（Enter）"
          />
          {errors.keyword && <div className="invalid-feedback">{errors.keyword}</div>}
        </header>
      </form>

      <div className="table-wrapper in-modal is-scrollable u-mt-4">
        <table className="table">
          <thead className="table-header is-sticky">
            <tr className="table-row">
              <th className="th-cell u-w-80"></th>
              <th className="th-cell u-w-64">No.</th>
              <th className="th-cell">請求先</th>
              <th className="th-cell">住所</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {billingAddresses.map(billingAddress => (
              <tr key={billingAddress.id} className="table-row is-hoverable">
                <td className="td-cell">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleClickAttach(billingAddress)}
                  >
                    紐付け
                  </button>
                </td>
                <td className="td-cell">{billingAddress.id}</td>
                <td className="td-cell">{billingAddress.name}</td>
                <td className="td-cell">{billingAddress.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
