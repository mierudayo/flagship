import { useForm } from "@inertiajs/react";
import TableRow from '../../../Components/Table/TableRow';
import TableHeaderCell from '../../../Components/Table/TableHeaderCell';
import TableDataCell from '../../../Components/Table/TableDataCell';
import RadioGroup from '../../../Components/Form/RadioGroup';
import FormLabel from '../../../Components/Form/FormLabel';
import Input from '../../../Components/Form/Input';
import Textarea from '../../../Components/Form/Textarea';

export default function AddressForm({ customer, deliveryAddressTypes, closeModal }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    address_type: 1,
    post_code: '',
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
              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="address_type-1" label="区分" isRequired={true} />
                </TableHeaderCell>
                <TableDataCell className="u-flex">
                  <RadioGroup
                    id="address_type"
                    options={deliveryAddressTypes}
                    value={data.address_type}
                    onChange={e => setData('address_type', parseInt(e.target.value))}
                    error={errors.address_type}
                  />
                  {errors.address_type && (<div className="invalid-feedback">{errors.address_type}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="post_code" label="郵便番号" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="post_code"
                    type="text"
                    value={data.mobile_number}
                    onChange={e => setData('post_code', e.target.value)}
                  />
                  {errors.post_code && (<div className="invalid-feedback">{errors.post_code}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="address" label="住所" isRequired={true} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="address"
                    type="text"
                    value={data.mobile_number}
                    onChange={e => setData('address', e.target.value)}
                  />
                  {errors.address && (<div className="invalid-feedback">{errors.address}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="company_name" label="会社名" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="company_name"
                    type="text"
                    value={data.mobile_number}
                    onChange={e => setData('company_name', e.target.value)}
                  />
                  {errors.company_name && (<div className="invalid-feedback">{errors.company_name}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="contact_name" label="担当者名" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="contact_name"
                    type="text"
                    value={data.mobile_number}
                    onChange={e => setData('contact_name', e.target.value)}
                  />
                  {errors.contact_name && (<div className="invalid-feedback">{errors.contact_name}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="tel" label="TEL" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Input
                    id="tel"
                    type="text"
                    value={data.mobile_number}
                    onChange={e => setData('tel', e.target.value)}
                  />
                  {errors.tel && (<div className="invalid-feedback">{errors.tel}</div>)}
                </TableDataCell>
              </TableRow>

              <TableRow className="is-flexible">
                <TableHeaderCell>
                  <FormLabel htmlFor="note" label="備考" isRequired={false} />
                </TableHeaderCell>
                <TableDataCell>
                  <Textarea
                    id="note"
                    value={data.note}
                    onChange={e => setData('note', e.target.value)}
                  />
                  {errors.note && (<div className="invalid-feedback">{errors.note}</div>)}
                </TableDataCell>
              </TableRow>
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

