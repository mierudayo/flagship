import { useEffect, useState, useRef } from 'react'
import { useForm } from '@inertiajs/react';
import Input from '@/Components/Form/Input';

export default function ContactLookup({ handleClickSelect }) {
  const inputRef = useRef(null);

  const { data, setData, errors } = useForm({
    keyword: '',
  });

  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetchContacts();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  async function fetchContacts() {
    const response = await fetch(`/api/contacts?keyword=${data.keyword}`);
    const contactsJson = await response.json();
    setContacts(contactsJson);
  }

  function submit(e) {
    e.preventDefault();
    fetchContacts();
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
              ref={inputRef}
              onChange={handleChange}
              placeholder="連絡先名または取引先名で検索（Enter）"
            />
            <button className="btn btn-secondary">検索</button>
          </div>
          {errors.keyword && <div className="invalid-feedback">{errors.keyword}</div>}
        </header>
      </form>

      <div className="table-wrapper in-modal is-scrollable u-mt-4">
        <table className="table">
          <thead className="table-header is-sticky">
            <tr className="table-row">
              <th className="th-cell u-w-80"></th>
              <th className="th-cell u-w-64">ID</th>
              <th className="th-cell">連絡先名</th>
              <th className="th-cell">取引先名</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {contacts.map(contact => (
              <tr key={contact.id} className="table-row is-hoverable">
                <td className="td-cell">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleClickSelect(contact)}
                  >
                    選択
                  </button>
                </td>
                <td className="td-cell">{contact.id}</td>
                <td className="td-cell">{contact.name}</td>
                <td className="td-cell">{contact.customer.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
