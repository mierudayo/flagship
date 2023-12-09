import { Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import ContentInfoBar from '@/Components/ContentInfoBar';
import CancelButton from '@/Components/CancelButton';
import CustomSelect from '@/Components/Form/CustomSelect';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';
import InvalidFeedback from '@/Components/Form/InvalidFeedback'
import OptionsList from '@/Components/OptionsList';
import Textarea from '@/Components/Form/Textarea';
import FormErrorAlert from '@/Components/Form/FormErrorAlert';
import { convertNullToEmptyString } from '@/Utils/arrayHelpers';
import PaymentSelectGroup from './Partials/PaymentSelectGroup';

const Edit = ({ customer, userOptions, paymentTermOptions, addressTypeOptions }) => {
  const { flash } = usePage().props;

  const { data, setData, patch, processing, errors, reset, isDirty } = useForm({
    name: customer.name,
    name_kana: customer.name_kana || '',
    shortcut: customer.shortcut || '',
    postal_code: customer.postal_code || '',
    address: customer.address || '',
    tel: customer.tel || '',
    fax: customer.fax || '',
    note: customer.note || '',
    in_charge_user_id: customer.in_charge_user_id || '',

    purchase_billing_type: customer.purchase_term?.billing_type || '',
    purchase_cutoff_day: customer.purchase_term?.cutoff_day || '',
    purchase_payment_month_offset: customer.purchase_term?.payment_month_offset ?? '',
    purchase_payment_day: customer.purchase_term?.payment_day || '',
    purchase_payment_day_offset: customer.purchase_term?.payment_day_offset ?? '',

    sales_billing_type: customer.sales_term?.billing_type || '',
    sales_cutoff_day: customer.sales_term?.cutoff_day || '',
    sales_payment_month_offset: customer.sales_term?.payment_month_offset ?? '',
    sales_payment_day: customer.sales_term?.payment_day || '',
    sales_payment_day_offset: customer.sales_term?.payment_day_offset ?? '',

    contacts: convertNullToEmptyString(customer.contacts),
    delivery_addresses: convertNullToEmptyString(customer.delivery_addresses),
  });

  function submit(e) {
    e.preventDefault();
    patch(route('customers.update', customer), {
      onSuccess: () => reset(),
    });
  };

  function addContact() {
    setData('contacts', [
      ...data.contacts,
      {
        name: '',
        name_kana: '',
        tel: '',
        mobile_number: '',
        email: '',
        position: '',
        role: '',
        is_active: true,
        note: '',
        in_charge_user_id: '',
      }
    ])
  }

  function removeContact(indexToRemove) {
    setData('contacts', data.contacts.filter((_, index) => index !== indexToRemove));
  }

  function updateContact(index, key, value) {
    const updatedContacts = [...data.contacts];
    updatedContacts[index] = {
      ...updatedContacts[index],
      [key]: value
    };
    setData('contacts', updatedContacts);
  }

  function addDeliveryAddress() {
    setData('delivery_addresses', [
      ...data.delivery_addresses,
      {
        address_type: 1,
        postal_code: '',
        address: '',
        company_name: '',
        contact_name: '',
        tel: '',
        note: '',
      }
    ])
  }

  function removeDeliveryAddress(indexToRemove) {
    setData('delivery_addresses', data.delivery_addresses.filter((_, index) => index !== indexToRemove));
  }

  function updateDeliveryAddress(index, key, value) {
    const updatedDeliveryAddresses = [...data.delivery_addresses];
    updatedDeliveryAddresses[index] = {
      ...updatedDeliveryAddresses[index],
      [key]: value
    }
    setData('delivery_addresses', updatedDeliveryAddresses);
  }

  return (
    <>
      <h1 className="content-title">取引先 編集</h1>

      <ContentInfoBar
        createdAt={customer.created_at}
        createdBy={customer.created_by.name}
        updatedAt={customer.updated_at}
        updatedBy={customer.updated_by?.name}
      />

      <div className="content-navbar">
        <button
          type="submit"
          form="customerEditForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          更新する
        </button>
        <CancelButton isDirty={isDirty} route={route('customers.index')} />
        {processing && <span>Now Loading...</span>}
        <Link
          onBefore={() => confirm('本当に削除しますか？')}
          href={route('customers.destroy', customer)}
          method="delete"
          className="btn btn-danger u-ml-auto"
          as="button"
        >
          削除
        </Link>
      </div>

      <Alert type="danger" message={flash.message} />

      <FormErrorAlert errors={errors} />

      <form id="customerEditForm" onSubmit={submit}>
        <div className="table-wrapper">
          <table className="table">
            <tbody className="tbody">
              <tr className="table-row is-flexible">
                <th className="th-cell u-w-160">
                  <FormLabel htmlFor="name" label="取引先名" isRequired={true} />
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
                  <FormLabel htmlFor="shortcut" label="ショートカット名" isRequired={false} />
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
                  <FormLabel htmlFor="postal_code" label="〒" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="postal_code"
                    type="text"
                    value={data.postal_code}
                    onChange={e => setData('postal_code', e.target.value)}
                    error={errors.postal_code}
                    className="u-max-w-160"
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
                  <FormLabel htmlFor="tel" label="TEL" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="tel"
                    type="text"
                    value={data.tel}
                    onChange={e => setData('tel', e.target.value)}
                    error={errors.tel}
                    className="u-max-w-160"
                  />
                  <InvalidFeedback errors={errors} name="tel" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="fax" label="FAX" isRequired={false} />
                </th>
                <td className="td-cell">
                  <Input
                    id="fax"
                    type="text"
                    value={data.fax}
                    onChange={e => setData('fax', e.target.value)}
                    error={errors.fax}
                    className="u-max-w-160"
                  />
                  <InvalidFeedback errors={errors} name="fax" />
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

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="担当ユーザー" isRequired={false} />
                </th>
                <td className="td-cell">
                  <CustomSelect
                    onChange={value => setData('in_charge_user_id', value)}
                    options={userOptions}
                    value={data.in_charge_user_id}
                    valueKey="id"
                    labelKey="name"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="担当ユーザーを選択..."
                    error={errors.in_charge_user_id}
                  />
                  <InvalidFeedback errors={errors} name="in_charge_user_id" />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="purchase_billing_type" label="支払条件" isRequired={false} />
                </th>
                <td className="td-cell">
                  <PaymentSelectGroup
                    data={data}
                    setData={setData}
                    errors={errors}
                    paymentTermOptions={paymentTermOptions}
                    billingTypeKey="purchase_billing_type"
                    cutoffDayKey="purchase_cutoff_day"
                    paymentMonthOffsetKey="purchase_payment_month_offset"
                    paymentDayKey="purchase_payment_day"
                    paymentDayOffsetKey="purchase_payment_day_offset"
                  />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel htmlFor="sales_billing_type" label="請求条件" isRequired={false} />
                </th>
                <td className="td-cell">
                  <PaymentSelectGroup
                    data={data}
                    setData={setData}
                    errors={errors}
                    paymentTermOptions={paymentTermOptions}
                    billingTypeKey="sales_billing_type"
                    cutoffDayKey="sales_cutoff_day"
                    paymentMonthOffsetKey="sales_payment_month_offset"
                    paymentDayKey="sales_payment_day"
                    paymentDayOffsetKey="sales_payment_day_offset"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="content-section u-mt-4">
          <div>連絡先 登録</div>
          <div className="table-wrapper is-scrollable">
            <table className="table">
              <thead className="table-header is-sticky">
                <tr className="table-row">
                  <th className="th-cell col-fixed"></th>
                  <th className="th-cell u-min-w-200">
                    <FormLabel label="名前" isRequired={true} />
                  </th>
                  <th className="th-cell u-min-w-200">
                    <FormLabel label="よみがな" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-200">
                    <FormLabel label="TEL" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-200">
                    <FormLabel label="携帯番号" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-200">
                    <FormLabel label="Email" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-200">
                    <FormLabel label="役職" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-200">
                    <FormLabel label="役割" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-128">
                    <FormLabel label="使用状況" isRequired={true} />
                  </th>
                  <th className="th-cell u-min-w-400">
                    <FormLabel label="備考" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-400">
                    <FormLabel label="担当ユーザー" isRequired={false} />
                  </th>
                </tr>
              </thead>
              <tbody className="tbody">
                {data.contacts.map((contact, index) => (
                  <tr key={index} className="table-row">
                    <td className="td-cell col-fixed u-w-80">
                      {!contact.id && (
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => removeContact(index)}
                        >
                          行削除
                        </button>
                      )}
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={contact.name}
                        onChange={e => updateContact(index, 'name', e.target.value)}
                        error={errors[`contacts.${index}.name`]}
                      />
                      <InvalidFeedback errors={errors} name={`contacts.${index}.name`} />
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={contact.name_kana}
                        onChange={e => updateContact(index, 'name_kana', e.target.value)}
                        error={errors[`contacts.${index}.name_kana`]}
                      />
                      <InvalidFeedback errors={errors} name={`contacts.${index}.name_kana`} />
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={contact.tel}
                        onChange={e => updateContact(index, 'tel', e.target.value)}
                        error={errors[`contacts.${index}.tel`]}
                      />
                      <InvalidFeedback errors={errors} name={`contacts.${index}.tel`} />
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={contact.mobile_number}
                        onChange={e => updateContact(index, 'mobile_number', e.target.value)}
                        error={errors[`contacts.${index}.mobile_number`]}
                      />
                      <InvalidFeedback errors={errors} name={`contacts.${index}.mobile_number`} />
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={contact.email}
                        onChange={e => updateContact(index, 'email', e.target.value)}
                        error={errors[`contacts.${index}.email`]}
                      />
                      <InvalidFeedback errors={errors} name={`contacts.${index}.email`} />
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={contact.position}
                        onChange={e => updateContact(index, 'position', e.target.value)}
                        error={errors[`contacts.${index}.position`]}
                      />
                      <InvalidFeedback errors={errors} name={`contacts.${index}.position`} />
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={contact.role}
                        onChange={e => updateContact(index, 'role', e.target.value)}
                        error={errors[`contacts.${index}.role`]}
                      />
                      <InvalidFeedback errors={errors} name={`contacts.${index}.role`} />
                    </td>

                    <td className="td-cell">
                      <select
                        value={contact.is_active}
                        onChange={e => updateContact(index, 'is_active', e.target.value === 'true')}
                        className={`form-select ${errors[`contacts.${index}.is_active`] ? 'is-invalid' : ''}`}
                      >
                        <OptionsList
                          options={[
                            { value: true, label: '使用中' },
                            { value: false, label: '使用不可' }
                          ]}
                        />
                      </select>
                      <InvalidFeedback errors={errors} name={`contacts.${index}.is_active`} />
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={contact.note}
                        onChange={e => updateContact(index, 'note', e.target.value)}
                        error={errors[`contacts.${index}.note`]}
                      />
                      <InvalidFeedback errors={errors} name={`contacts.${index}.note`} />
                    </td>

                    <td className="td-cell">
                      <CustomSelect
                        onChange={value => updateContact(index, 'in_charge_user_id', value)}
                        options={userOptions}
                        value={contact.in_charge_user_id}
                        valueKey="id"
                        labelKey="name"
                        isClearable={true}
                        isSearchable={true}
                        placeholder="担当ユーザーを選択..."
                        error={errors[`contacts.${index}.in_charge_user_id`]}
                      />
                      <InvalidFeedback errors={errors} name={`contacts.${index}.in_charge_user_id`} />
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="button" className="btn btn-secondary u-mt-3" onClick={addContact}>+ 行を追加</button>
        </div>

        <div className="content-section u-mt-4">
          <div>配送情報 登録</div>
          <div className="table-wrapper is-scrollable">
            <table className="table">
              <thead className="table-header is-sticky">
                <tr className="table-row">
                  <th className="th-cell col-fixed"></th>
                  <th className="th-cell u-min-w-160">
                    <FormLabel label="区分" isRequired={true} />
                  </th>
                  <th className="th-cell u-min-w-160">
                    <FormLabel label="郵便番号" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-320">
                    <FormLabel label="住所" isRequired={true} />
                  </th>
                  <th className="th-cell u-min-w-320">
                    <FormLabel label="会社名" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-200">
                    <FormLabel label="担当者名" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-200">
                    <FormLabel label="TEL" isRequired={false} />
                  </th>
                  <th className="th-cell u-min-w-200">
                    <FormLabel label="備考" isRequired={false} />
                  </th>
                </tr>
              </thead>
              <tbody className="tbody">
                {data.delivery_addresses.map((deliveryAddress, index) => (
                  <tr key={index} className="table-row">
                    <td className="td-cell col-fixed u-w-80">
                      {!deliveryAddress.id && (
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => removeDeliveryAddress(index)}
                        >
                          削除
                        </button>
                      )}
                    </td>

                    <td className="td-cell">
                      <select
                        value={deliveryAddress.address_type}
                        onChange={e => updateDeliveryAddress(index, 'address_type', e.target.value)}
                        className={`form-select ${errors[`contacts.${index}.address_type`] ? 'is-invalid' : ''}`}
                      >
                        <OptionsList options={addressTypeOptions} />
                      </select>
                      <InvalidFeedback errors={errors} name={`contacts.${index}.address_type`} />
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={deliveryAddress.postal_code}
                        onChange={e => updateDeliveryAddress(index, 'postal_code', e.target.value)}
                        error={errors[`delivery_addresses.${index}.postal_code`]}
                      />
                      <InvalidFeedback errors={errors} name={`delivery_addresses.${index}.postal_code`} />
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={deliveryAddress.address}
                        onChange={e => updateDeliveryAddress(index, 'address', e.target.value)}
                        error={errors[`delivery_addresses.${index}.address`]}
                      />
                      <InvalidFeedback errors={errors} name={`delivery_addresses.${index}.address`} />
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={deliveryAddress.company_name}
                        onChange={e => updateDeliveryAddress(index, 'company_name', e.target.value)}
                        error={errors[`delivery_addresses.${index}.company_name`]}
                      />
                      <InvalidFeedback errors={errors} name={`delivery_addresses.${index}.company_name`} />
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={deliveryAddress.contact_name}
                        onChange={e => updateDeliveryAddress(index, 'contact_name', e.target.value)}
                        error={errors[`delivery_addresses.${index}.contact_name`]}
                      />
                      <InvalidFeedback errors={errors} name={`delivery_addresses.${index}.contact_name`} />
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={deliveryAddress.tel}
                        onChange={e => updateDeliveryAddress(index, 'tel', e.target.value)}
                        error={errors[`delivery_addresses.${index}.tel`]}
                      />
                      <InvalidFeedback errors={errors} name={`delivery_addresses.${index}.tel`} />
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={deliveryAddress.note}
                        onChange={e => updateDeliveryAddress(index, 'note', e.target.value)}
                        error={errors[`delivery_addresses.${index}.note`]}
                      />
                      <InvalidFeedback errors={errors} name={`delivery_addresses.${index}.note`} />
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="button" className="btn btn-secondary u-mt-3" onClick={addDeliveryAddress}>+ 行を追加</button>
        </div>
      </form>
    </>
  );
}

Edit.layout = page => <AppLayout children={page} />

export default Edit
