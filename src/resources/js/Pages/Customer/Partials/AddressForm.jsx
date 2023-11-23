import { useForm } from "@inertiajs/react";
import TableRadioRow from '../../../Components/TableRadioRow';
import TableInputRow from '../../../Components/TableInputRow';
import TableTextAreaRow from '../../../Components/TableTextAreaRow';

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
              <TableRadioRow
                labelName="区分"
                inputName="address_type"
                options={deliveryAddressTypes}
                isRequired={true}
                data={data}
                errors={errors}
                setData={setData}
                widthClass="u-w-200"
              />

              <TableInputRow
                labelName="郵便番号"
                inputName="post_code"
                data={data}
                errors={errors}
                setData={setData}
              />

              <TableInputRow
                labelName="住所"
                inputName="address"
                data={data}
                errors={errors}
                setData={setData} isRequired={true}
              />

              <TableInputRow
                labelName="会社名"
                inputName="company_name"
                data={data}
                errors={errors}
                setData={setData}
              />

              <TableInputRow
                labelName="担当者名"
                inputName="contact_name"
                data={data}
                errors={errors}
                setData={setData}
              />

              <TableInputRow
                labelName="TEL"
                inputName="tel"
                data={data}
                errors={errors}
                setData={setData}
              />

              <TableTextAreaRow
                labelName="備考"
                inputName="note"
                data={data}
                errors={errors}
                setData={setData}
                isRequired={false}
              />

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

