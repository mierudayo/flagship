import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import CancelButton from '@/Components/CancelButton';
import CustomSelect from '@/Components/Form/CustomSelect';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';
import OptionsList from '@/Components/OptionsList';
import Textarea from '@/Components/Form/Textarea';

const Create = ({ userSelectOptions, paymentTerms, deliveryAddressTypes }) => {
  const { data, setData, post, processing, errors, reset, isDirty } = useForm({
    name: '',
    name_kana: '',
    shortcut: '',
    postal_code: '',
    address: '',
    tel: '',
    fax: '',
    note: '',
    in_charge_user_id: '',
    purchase_billing_type: '',
    purchase_cutoff_day: '',
    purchase_payment_month_offset: '',
    purchase_payment_day: '',
    purchase_payment_day_offset: '',
    sales_billing_type: '',
    sales_cutoff_day: '',
    sales_payment_month_offset: '',
    sales_payment_day: '',
    sales_payment_day_offset: '',
    contacts: [],
    delivery_addresses: [],
  });

  function submit(e) {
    e.preventDefault();
    post(route('customers.store'), {
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
        post_code: '',
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
      <h1 className="content-title">取引先 登録</h1>
      <div className="content-navbar">
        <button
          type="submit"
          form="customerCreateForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          登録する
        </button>
        <CancelButton isDirty={isDirty} route={route('customers.index')} />
        {processing && <span>Now Loading...</span>}
      </div>

      <form id="customerCreateForm" onSubmit={submit}>
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
                  {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
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
                  {errors.name_kana && (<div className="invalid-feedback">{errors.name_kana}</div>)}
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
                  {errors.shortcut && (<div className="invalid-feedback">{errors.shortcut}</div>)}
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
                  {errors.postal_code && (<div className="invalid-feedback">{errors.postal_code}</div>)}
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
                  {errors.address && (<div className="invalid-feedback">{errors.address}</div>)}
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
                  {errors.tel && (<div className="invalid-feedback">{errors.tel}</div>)}
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
                  {errors.fax && (<div className="invalid-feedback">{errors.fax}</div>)}
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
                  {errors.note && (<div className="invalid-feedback">{errors.note}</div>)}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="担当ユーザー" isRequired={false} />
                </th>
                <td className="td-cell">
                  <CustomSelect
                    onChange={value => setData('in_charge_user_id', value)}
                    options={userSelectOptions}
                    value={data.in_charge_user_id}
                    valueKey="id"
                    labelKey="name"
                    isClearable={true}
                    isSearchable={true}
                    placeholder="担当ユーザーを選択..."
                  />
                  {errors.in_charge_user_id && (<div className="invalid-feedback">{errors.in_charge_user_id}</div>)}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <label htmlFor="purchase_billing_type" className="form-label">
                    支払条件
                  </label>
                </th>
                <td className="td-cell">
                  <select
                    name="purchase_billing_type"
                    id="purchase_billing_type"
                    value={data.purchase_billing_type}
                    onChange={e => setData('purchase_billing_type', e.target.value)}
                    className={`form-select u-w-128 u-mr-3 ${errors.purchase_billing_type ? 'is-invalid' : ''}`}
                  >
                    <option value="">-- 請求方法 --</option>
                    <OptionsList options={paymentTerms.billingTypes} />
                  </select>
                  {data.purchase_billing_type == 1 && (
                    <>
                      <select
                        name="purchase_cutoff_day"
                        id="purchase_cutoff_day"
                        value={data.purchase_cutoff_day}
                        onChange={e => setData('purchase_cutoff_day', e.target.value)}
                        className={`form-select u-w-128 ${errors.purchase_cutoff_day ? 'is-invalid' : ''}`}
                      >
                        <option value="">-- 締め日 --</option>
                        <OptionsList options={paymentTerms.cutoffDays} />
                      </select>
                      <select
                        name="purchase_payment_month_offset"
                        id="purchase_payment_month_offset"
                        value={data.purchase_payment_month_offset}
                        onChange={e => setData('purchase_payment_month_offset', e.target.value)}
                        className={`form-select u-w-128 ${errors.purchase_payment_month_offset ? 'is-invalid' : ''}`}
                      >
                        <option value="">-- 支払月 --</option>
                        <OptionsList options={paymentTerms.monthOffsets} />
                      </select>
                      <select
                        name="purchase_payment_day"
                        id="purchase_payment_day"
                        value={data.purchase_payment_day}
                        onChange={e => setData('purchase_payment_day', e.target.value)}
                        className={`form-select u-w-128 ${errors.purchase_payment_day ? 'is-invalid' : ''}`}
                      >
                        <option value="">-- 支払日 --</option>
                        <OptionsList options={paymentTerms.paymentDay} />
                      </select>
                    </>
                  )}
                  {data.purchase_billing_type == 2 && (
                    <>
                      <select
                        name="purchase_payment_day_offset"
                        id="purchase_payment_day_offset"
                        value={data.purchase_payment_day_offset}
                        onChange={e => setData('purchase_payment_day_offset', e.target.value)}
                        className={`form-select u-w-128 ${errors.purchase_payment_day_offset ? 'is-invalid' : ''}`}
                      >
                        <option value="">-- 期限 --</option>
                        <OptionsList options={paymentTerms.dayOffsets} />
                      </select>
                    </>
                  )}
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <label htmlFor="sales_billing_type" className="form-label">
                    請求条件
                  </label>
                </th>
                <td className="td-cell">
                  <select
                    name="sales_billing_type"
                    id="sales_billing_type"
                    value={data.sales_billing_type}
                    onChange={e => setData('sales_billing_type', e.target.value)}
                    className={`form-select u-w-128 u-mr-3 ${errors.sales_billing_type ? 'is-invalid' : ''}`}
                  >
                    <option value="">-- 請求方法 --</option>
                    <OptionsList options={paymentTerms.billingTypes} />
                  </select>
                  {data.sales_billing_type == 1 && (
                    <>
                      <select
                        name="sales_cutoff_day"
                        id="sales_cutoff_day"
                        value={data.sales_cutoff_day}
                        onChange={e => setData('sales_cutoff_day', e.target.value)}
                        className={`form-select u-w-128 ${errors.sales_cutoff_day ? 'is-invalid' : ''}`}
                      >
                        <option value="">-- 締め日 --</option>
                        <OptionsList options={paymentTerms.cutoffDays} />
                      </select>
                      <select
                        name="sales_payment_month_offset"
                        id="sales_payment_month_offset"
                        value={data.sales_payment_month_offset}
                        onChange={e => setData('sales_payment_month_offset', e.target.value)}
                        className={`form-select u-w-128 ${errors.sales_payment_month_offset ? 'is-invalid' : ''}`}
                      >
                        <option value="">-- 支払月 --</option>
                        <OptionsList options={paymentTerms.monthOffsets} />
                      </select>
                      <select
                        name="sales_payment_day"
                        id="sales_payment_day"
                        value={data.sales_payment_day}
                        onChange={e => setData('sales_payment_day', e.target.value)}
                        className={`form-select u-w-128 ${errors.sales_payment_day ? 'is-invalid' : ''}`}
                      >
                        <option value="">-- 支払日 --</option>
                        <OptionsList options={paymentTerms.paymentDay} />
                      </select>
                    </>
                  )}
                  {data.sales_billing_type == 2 && (
                    <>
                      <select
                        name="sales_payment_day_offset"
                        id="sales_payment_day_offset"
                        value={data.sales_payment_day_offset}
                        onChange={e => setData('sales_payment_day_offset', e.target.value)}
                        className={`form-select u-w-128 ${errors.sales_payment_day_offset ? 'is-invalid' : ''}`}
                      >
                        <option value="">-- 期限 --</option>
                        <OptionsList options={paymentTerms.dayOffsets} />
                      </select>
                    </>
                  )}
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
                  <tr key={index} className="table-row is-hoverable">
                    <td className="td-cell col-fixed u-w-80">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => removeContact(index)}
                      >
                        削除
                      </button>
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={contact.name}
                        onChange={e => updateContact(index, 'name', e.target.value)}
                        error={errors[`contacts.${index}.name`]}
                      />
                      {errors[`contacts.${index}.name`] && (
                        <div className="invalid-feedback">
                          {errors[`contacts.${index}.name`]}
                        </div>
                      )}
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={contact.name_kana}
                        onChange={e => updateContact(index, 'name_kana', e.target.value)}
                        error={errors[`contacts.${index}.name_kana`]}
                      />
                      {errors[`contacts.${index}.name_kana`] && (
                        <div className="invalid-feedback">
                          {errors[`contacts.${index}.name_kana`]}
                        </div>
                      )}
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={contact.tel}
                        onChange={e => updateContact(index, 'tel', e.target.value)}
                        error={errors[`contacts.${index}.tel`]}
                      />
                      {errors[`contacts.${index}.tel`] && (
                        <div className="invalid-feedback">
                          {errors[`contacts.${index}.tel`]}
                        </div>
                      )}
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={contact.mobile_number}
                        onChange={e => updateContact(index, 'mobile_number', e.target.value)}
                        error={errors[`contacts.${index}.mobile_number`]}
                      />
                      {errors[`contacts.${index}.mobile_number`] && (
                        <div className="invalid-feedback">
                          {errors[`contacts.${index}.mobile_number`]}
                        </div>
                      )}
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={contact.email}
                        onChange={e => updateContact(index, 'email', e.target.value)}
                        error={errors[`contacts.${index}.email`]}
                      />
                      {errors[`contacts.${index}.email`] && (
                        <div className="invalid-feedback">
                          {errors[`contacts.${index}.email`]}
                        </div>
                      )}
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={contact.position}
                        onChange={e => updateContact(index, 'position', e.target.value)}
                        error={errors[`contacts.${index}.position`]}
                      />
                      {errors[`contacts.${index}.position`] && (
                        <div className="invalid-feedback">
                          {errors[`contacts.${index}.position`]}
                        </div>
                      )}
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={contact.role}
                        onChange={e => updateContact(index, 'role', e.target.value)}
                        error={errors[`contacts.${index}.role`]}
                      />
                      {errors[`contacts.${index}.role`] && (
                        <div className="invalid-feedback">
                          {errors[`contacts.${index}.role`]}
                        </div>
                      )}
                    </td>

                    <td className="td-cell">
                      <select
                        value={data.is_active}
                        onChange={e => updateContact(index, 'is_active', e.target.value === 'true')}
                        className={`form-select ${errors[`contacts.${index}.is_active`] ? 'is-invalid' : ''}`}
                      >
                        <option value="true">使用中</option>
                        <option value="false">使用不可</option>
                      </select>
                      {errors[`contacts.${index}.is_active`] && (
                        <div className="invalid-feedback">
                          {errors[`contacts.${index}.is_active`]}
                        </div>
                      )}
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={contact.note}
                        onChange={e => updateContact(index, 'note', e.target.value)}
                        error={errors[`contacts.${index}.note`]}
                      />
                      {errors[`contacts.${index}.note`] && (
                        <div className="invalid-feedback">
                          {errors[`contacts.${index}.note`]}
                        </div>
                      )}
                    </td>

                    <td className="td-cell">
                      {/* TODO: 担当ユーザーセレクトボックスを追加 */}
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
                  <tr key={index} className="table-row is-hoverable">
                    <td className="td-cell col-fixed u-w-80">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => removeDeliveryAddress(index)}
                      >
                        削除
                      </button>
                    </td>

                    <td className="td-cell">
                      <select
                        value={data.address_type}
                        onChange={e => updateDeliveryAddress(index, 'address_type', e.target.value === 'true')}
                        className={`form-select ${errors[`contacts.${index}.address_type`] ? 'is-invalid' : ''}`}
                      >
                        <OptionsList options={deliveryAddressTypes} />
                      </select>
                      {errors[`contacts.${index}.address_type`] && (
                        <div className="invalid-feedback">
                          {errors[`contacts.${index}.address_type`]}
                        </div>
                      )}
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={deliveryAddress.post_code}
                        onChange={e => updateDeliveryAddress(index, 'post_code', e.target.value)}
                        error={errors[`delivery_addresses.${index}.post_code`]}
                      />
                      {errors[`delivery_addresses.${index}.post_code`] && (
                        <div className="invalid-feedback">
                          {errors[`delivery_addresses.${index}.post_code`]}
                        </div>
                      )}
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={deliveryAddress.address}
                        onChange={e => updateDeliveryAddress(index, 'address', e.target.value)}
                        error={errors[`delivery_addresses.${index}.address`]}
                      />
                      {errors[`delivery_addresses.${index}.address`] && (
                        <div className="invalid-feedback">
                          {errors[`delivery_addresses.${index}.address`]}
                        </div>
                      )}
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={deliveryAddress.company_name}
                        onChange={e => updateDeliveryAddress(index, 'company_name', e.target.value)}
                        error={errors[`delivery_addresses.${index}.company_name`]}
                      />
                      {errors[`delivery_addresses.${index}.company_name`] && (
                        <div className="invalid-feedback">
                          {errors[`delivery_addresses.${index}.company_name`]}
                        </div>
                      )}
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={deliveryAddress.contact_name}
                        onChange={e => updateDeliveryAddress(index, 'contact_name', e.target.value)}
                        error={errors[`delivery_addresses.${index}.contact_name`]}
                      />
                      {errors[`delivery_addresses.${index}.contact_name`] && (
                        <div className="invalid-feedback">
                          {errors[`delivery_addresses.${index}.contact_name`]}
                        </div>
                      )}
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={deliveryAddress.tel}
                        onChange={e => updateDeliveryAddress(index, 'tel', e.target.value)}
                        error={errors[`delivery_addresses.${index}.tel`]}
                      />
                      {errors[`delivery_addresses.${index}.tel`] && (
                        <div className="invalid-feedback">
                          {errors[`delivery_addresses.${index}.tel`]}
                        </div>
                      )}
                    </td>

                    <td className="td-cell">
                      <Input
                        type="text"
                        value={deliveryAddress.note}
                        onChange={e => updateDeliveryAddress(index, 'note', e.target.value)}
                        error={errors[`delivery_addresses.${index}.note`]}
                      />
                      {errors[`delivery_addresses.${index}.note`] && (
                        <div className="invalid-feedback">
                          {errors[`delivery_addresses.${index}.note`]}
                        </div>
                      )}
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

Create.layout = page => <AppLayout children={page} />

export default Create

