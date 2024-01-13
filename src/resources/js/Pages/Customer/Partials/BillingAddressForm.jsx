import { useForm } from '@inertiajs/react';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';
import InvalidFeedback from '@/Components/Form/InvalidFeedback'
import Textarea from '@/Components/Form/Textarea';

export default function BillingAddressForm({ customer, closeModal }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    name_kana: '',
    shortcut: '',
    billing_contact_name: '',
    postal_code: '',
    address: '',
    email: '',
    tel: '',
    fax: '',
    invoice_delivery_method: '',
    note: '',
  });

  function handleClickCopyCustomer() {
    setData({
      ...data,
      name: customer.name || '',
      name_kana: customer.name_kana || '',
      shortcut: customer.shortcut || '',
      postal_code: customer.postal_code || '',
      address: customer.address || '',
      tel: customer.tel || '',
      fax: customer.fax || '',
      note: customer.note || '',
    })
  }

  function submit(e) {
    e.preventDefault();
    post(route('customers.billing-addresses.add', customer), {
      onSuccess: () => {
        reset();
        closeModal();
      }
    });
  };

  return (
    <>
      <form id="billingAddressCreateForm" onSubmit={submit}>
        <div className="table-wrapper">
          <table className="table">
            <tbody className="tbody">
              <tr className="table-row is-flexible">
                <th className="th-cell u-w-160">
                  <FormLabel htmlFor="name" label="請求先名" isRequired={true} />
                </th>
                <td className="td-cell">
                  <Input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    error={errors.name}
                  />
                  <InvalidFeedback errors={errors} name="name" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="name_kana" label="よみがな" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="name_kana"
                    type="text"
                    value={data.name_kana}
                    onChange={e => setData('name_kana', e.target.value)}
                    error={errors.name_kana}
                  />
                  <InvalidFeedback errors={errors} name="name_kana" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="shortcut" label="ショートカット" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="shortcut"
                    type="text"
                    value={data.shortcut}
                    onChange={e => setData('shortcut', e.target.value)}
                    error={errors.shortcut}
                  />
                  <InvalidFeedback errors={errors} name="shortcut" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="billing_contact_name" label="請求先担当者" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="billing_contact_name"
                    type="text"
                    value={data.billing_contact_name}
                    onChange={e => setData('billing_contact_name', e.target.value)}
                    error={errors.billing_contact_name}
                  />
                  <InvalidFeedback errors={errors} name="billing_contact_name" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="postal_code" label="〒" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="postal_code"
                    type="text"
                    value={data.postal_code}
                    onChange={e => setData('postal_code', e.target.value)}
                    error={errors.postal_code}
                  />
                  <InvalidFeedback errors={errors} name="postal_code" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="address" label="住所" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="address"
                    type="text"
                    value={data.address}
                    onChange={e => setData('address', e.target.value)}
                    error={errors.address}
                  />
                  <InvalidFeedback errors={errors} name="address" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="email" label="Email" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="email"
                    type="text"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    error={errors.email}
                  />
                  <InvalidFeedback errors={errors} name="email" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="tel" label="TEL" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="tel"
                    type="text"
                    value={data.tel}
                    onChange={e => setData('tel', e.target.value)}
                    error={errors.tel}
                  />
                  <InvalidFeedback errors={errors} name="tel" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="fax" label="Fax" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="fax"
                    type="text"
                    value={data.fax}
                    onChange={e => setData('FAX', e.target.value)}
                    error={errors.fax}
                  />
                  <InvalidFeedback errors={errors} name="fax" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="invoice_delivery_method" label="請求書送付方法" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="invoice_delivery_method"
                    type="text"
                    value={data.invoice_delivery_method}
                    onChange={e => setData('invoice_delivery_method', e.target.value)}
                    error={errors.invoice_delivery_method}
                  />
                  <InvalidFeedback errors={errors} name="invoice_delivery_method" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="note" label="備考" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Textarea
                    id="note"
                    value={data.note}
                    onChange={e => setData('note', e.target.value)}
                    error={errors.note}
                  />
                  <InvalidFeedback errors={errors} name="note" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
      <div className="u-flex u-mt-3">
        <button
          type="submit"
          form="billingAddressCreateForm"
          className="btn btn-primary u-mr-4"
          disabled={processing}
        >
          登録する
        </button>
        <button
          type="submit"
          className="btn btn-secondary"
          onClick={handleClickCopyCustomer}
        >
          取引先情報をコピー
        </button>

      </div>
    </>
  );
}

