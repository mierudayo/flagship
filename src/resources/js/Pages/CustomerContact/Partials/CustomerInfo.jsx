import { useEffect, useState } from 'react'
import { useForm } from '@inertiajs/react';
import Input from '../../../Components/Form/Input';
import TableRow from '../../../Components/Table/TableRow';
import TableHeaderCell from '../../../Components/Table/TableHeaderCell';
import TableDataCell from '../../../Components/Table/TableDataCell';;

export default function CustomerInfo({ handleClickSelect }) {
  const { data, setData, errors } = useForm({
    keyword: '',
  });

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
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
          <div className="u-flex u-mr-3">
            <Input
              type="search"
              onChange={handleChange}
              placeholder="取引先名, よみがな, ショートカット名で検索（Enter）"
            />
            <button className="btn btn-secondary">検索</button>
          </div>
          {errors.keyword && <div className="invalid-feedback">{errors.keyword}</div>}
        </header>
      </form>

      <div className="table-wrapper is-scrollable u-mt-4">
        <table className="table">
          <thead className="table-header">
            <TableRow>
              <TableHeaderCell className="u-w-80"></TableHeaderCell>
              <TableHeaderCell className="u-w-64">ID</TableHeaderCell>
              <TableHeaderCell>取引先名</TableHeaderCell>
              <TableHeaderCell>住所</TableHeaderCell>
            </TableRow>
          </thead>
          <tbody className="table-body">
            {customers.map(customer => (
              <TableRow key={customer.id} className="is-hoverable">
                <TableDataCell>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleClickSelect(customer)}
                  >
                    選択
                  </button>
                </TableDataCell>
                <TableDataCell>{customer.id}</TableDataCell>
                <TableDataCell>{customer.name}</TableDataCell>
                <TableDataCell>{customer.address}</TableDataCell>
              </TableRow>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
