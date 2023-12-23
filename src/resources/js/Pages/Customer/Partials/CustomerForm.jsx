import CustomSelect from '@/Components/Form/CustomSelect';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';
import InvalidFeedback from '@/Components/Form/InvalidFeedback'
import OptionsList from '@/Components/OptionsList';
import Textarea from '@/Components/Form/Textarea';
import PurchasePaymentSelect from './PurchasePaymentSelect';
import SalesPaymentSelect from './SalesPaymentSelect';

export default function CustomerForm({
  userOptions, leadSourceOptions, paymentTermOptions, addressTypeOptions,
  data, setData, errors,
  submit,
  addContact, removeContact, updateContact,
  addDeliveryAddress, removeDeliveryAddress, updateDeliveryAddress,
  copyCustomerToAddress,
}) {

  return (
    <form id="customerForm" onSubmit={submit}>
      <div className="content-section">
        <div className="content-section-header">
          <div className="content-section-title">基本情報</div>
        </div>
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
                  <FormLabel label="支払条件" isRequired={false} />
                </th>
                <td className="td-cell">
                  <PurchasePaymentSelect
                    data={data}
                    setData={setData}
                    errors={errors}
                    paymentTermOptions={paymentTermOptions}
                  />
                </td>
              </tr>

              <tr className="table-row is-flexible">
                <th className="th-cell">
                  <FormLabel label="請求条件" isRequired={false} />
                </th>
                <td className="td-cell">
                  <SalesPaymentSelect
                    data={data}
                    setData={setData}
                    errors={errors}
                    paymentTermOptions={paymentTermOptions}
                  />
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
                    placeholder="..."
                    error={errors.in_charge_user_id}
                  />
                  <InvalidFeedback errors={errors} name="in_charge_user_id" />
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
      </div>

      <div className="content-section">
        <div className="content-section-header">
          <div className="content-section-title">連絡先</div>
          <button type="button" className="btn btn-secondary" onClick={addContact}>+ 行を追加</button>
        </div>
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
                  <FormLabel label="使用状況" isRequired={false} />
                </th>
                <th className="th-cell u-min-w-240">
                  <FormLabel label="担当ユーザー" isRequired={false} />
                </th>
                <th className="th-cell u-min-w-240">
                  <FormLabel label="リード獲得元" isRequired={false} />
                </th>
                <th className="th-cell u-min-w-400">
                  <FormLabel label="備考" isRequired={false} />
                </th>
              </tr>
            </thead>
            <tbody className="tbody">
              {data.contacts.map((contact, index) => (
                <tr key={index} className="table-row">
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
                    <CustomSelect
                      onChange={value => updateContact(index, 'in_charge_user_id', value)}
                      options={userOptions}
                      value={contact.in_charge_user_id}
                      valueKey="id"
                      labelKey="name"
                      isClearable={true}
                      isSearchable={true}
                      placeholder="..."
                      error={errors[`contacts.${index}.in_charge_user_id`]}
                    />
                    <InvalidFeedback errors={errors} name={`contacts.${index}.in_charge_user_id`} />
                  </td>

                  <td className="td-cell">
                    <CustomSelect
                      onChange={value => updateContact(index, 'lead_source_id', value)}
                      options={leadSourceOptions}
                      value={contact.lead_source_id}
                      valueKey="id"
                      labelKey="name"
                      isClearable={true}
                      isSearchable={true}
                      placeholder="..."
                      error={errors[`contacts.${index}.lead_source_id`]}
                    />
                    <InvalidFeedback errors={errors} name={`contacts.${index}.lead_source_id`} />
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

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="content-section">
        <div className="content-section-header">
          <div className="content-section-title">配送情報</div>
          <button type="button" className="btn btn-secondary u-mr-3" onClick={addDeliveryAddress}>+ 行を追加</button>
          <button type="button" className="btn btn-secondary u-mr-3" onClick={copyCustomerToAddress}>+ 基本情報をコピー追加</button>
        </div>
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
                      value={deliveryAddress.address_type}
                      onChange={e => updateDeliveryAddress(index, 'address_type', e.target.value)}
                      className={`form-select ${errors[`delivery_addresses.${index}.address_type`] ? 'is-invalid' : ''}`}
                    >
                      <OptionsList options={addressTypeOptions} />
                    </select>
                    <InvalidFeedback errors={errors} name={`delivery_addresses.${index}.address_type`} />
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
      </div>
    </form>
  );
}
