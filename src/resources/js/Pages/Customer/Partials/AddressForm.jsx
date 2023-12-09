import { useForm } from '@inertiajs/react';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';
import InvalidFeedback from '@/Components/Form/InvalidFeedback'
import RadioGroup from '@/Components/Form/RadioGroup';
import Textarea from '@/Components/Form/Textarea';

export default function AddressForm({ customer, addressTypes, closeModal }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    address_type: 1,
    postal_code: '',
    address: '',
    company_name: '',
    contact_name: '',
    tel: '',
    note: '',
  });

  function submit(e) {
    e.preventDefault();
    post(route('customers.delivery-addresses.add', customer), {
      onSuccess: () => {
        reset();
        closeModal();
      }
    });
  };

  return (
    <>
      <form id="deliveryAddressCreateForm" onSubmit={submit}>
        <div className="table-wrapper">
          <table className="table">
            <tbody className="tbody">
              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="address_type-1" label="区分" isRequired={true} />
                </th>
                <td className="td-cell">
                  <div className="u-flex">
                    <RadioGroup
                      id="address_type"
                      options={addressTypes}
                      value={data.address_type}
                      onChange={e => setData('address_type', parseInt(e.target.value))}
                      error={errors.address_type}
                    />
                    <InvalidFeedback errors={errors} name="address_type" />
                  </div>
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="postal_code" label="郵便番号" isRequired={false} />
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
                  <FormLabel htmlFor="address" label="住所" isRequired={true} />
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
                  <FormLabel htmlFor="company_name" label="会社名" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="company_name"
                    type="text"
                    value={data.company_name}
                    onChange={e => setData('company_name', e.target.value)}
                    error={errors.company_name}
                  />
                  <InvalidFeedback errors={errors} name="company_name" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="contact_name" label="担当者名" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="contact_name"
                    type="text"
                    value={data.contact_name}
                    onChange={e => setData('contact_name', e.target.value)}
                    error={errors.contact_name}
                  />
                  <InvalidFeedback errors={errors} name="contact_name" />
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
      <button
        type="submit"
        form="deliveryAddressCreateForm"
        className="btn btn-primary u-mt-3"
        disabled={processing}
      >
        登録する
      </button>
    </>
  );
}

