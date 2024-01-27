import FormLabel from '@/Components/Form/FormLabel';
import RadioGroup from '@/Components/Form/RadioGroup';
import Input from '@/Components/Form/Input';
import LookupButton from '@/Components/LookupButton';
import InvalidFeedback from '@/Components/Form/InvalidFeedback'
import Textarea from '@/Components/Form/Textarea';
import CustomSelect from '@/Components/Form/CustomSelect';

export default function ContactsForm({ userOptions, leadSourceOptions, setIsModalOpen, customerName, data, setData, errors, submit }) {

  return (
    <form id="customerContactForm" onSubmit={submit}>
      <div className="table-wrapper">
        <table className="table">
          <tbody className="tbody">
            <tr className="table-row is-flexible">
              <th className="th-cell">
                <FormLabel label="所属取引先" isRequired={true} />
              </th>
              <td className="td-cell">
                <div className="u-flex">
                  <Input
                    type="text"
                    value={data.customer_id}
                    className="u-max-w-64 u-mr-1"
                    placeholder="No"
                    readOnly={true}
                  />
                  <Input
                    type="text"
                    value={customerName}
                    className="u-max-w-240 u-mr-1"
                    placeholder="取引先名"
                    readOnly={true}
                  />
                  <LookupButton onClick={() => setIsModalOpen(true)} />

                </div>
                <InvalidFeedback errors={errors} name="customer_id" />
              </td>
            </tr>

            <tr className="table-row is-flexible">
              <th className="th-cell u-w-160">
                <FormLabel htmlFor="name" label="名前" isRequired={true} />
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
                <FormLabel htmlFor="tel" label="TEL" isRequired={false} />
              </th>
              <td className="td-cell">
                <Input
                  id="tel"
                  type="text"
                  value={data.tel}
                  onChange={e => setData('tel', e.target.value)}
                  error={errors.tel}
                  className="u-w-160"
                />
                <InvalidFeedback errors={errors} name="tel" />
              </td>
            </tr>

            <tr className="table-row is-flexible">
              <th className="th-cell">
                <FormLabel htmlFor="mobile_number" label="携帯番号" isRequired={false} />
              </th>
              <td className="td-cell">
                <Input
                  id="mobile_number"
                  type="text"
                  value={data.mobile_number}
                  onChange={e => setData('mobile_number', e.target.value)}
                  error={errors.mobile_number}
                  className="u-w-160"
                />
                <InvalidFeedback errors={errors} name="mobile_number" />
              </td>
            </tr>

            <tr className="table-row is-flexible">
              <th className="th-cell">
                <FormLabel htmlFor="email" label="E-mail" isRequired={false} />
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
                <FormLabel htmlFor="position" label="役職" isRequired={false} />
              </th>
              <td className="td-cell">
                <Input
                  id="position"
                  type="text"
                  value={data.position}
                  onChange={e => setData('position', e.target.value)}
                  error={errors.position}
                />
                <InvalidFeedback errors={errors} name="position" />
              </td>
            </tr>

            <tr className="table-row is-flexible">
              <th className="th-cell">
                <FormLabel htmlFor="role" label="役割" isRequired={false} />
              </th>
              <td className="td-cell">
                <Input
                  id="role"
                  type="text"
                  value={data.role}
                  onChange={e => setData('role', e.target.value)}
                  error={errors.role}
                />
                <InvalidFeedback errors={errors} name="role" />
              </td>
            </tr>

            <tr className="table-row is-flexible">
              <th className="th-cell">
                <FormLabel label="リード獲得元" isRequired={false} />
              </th>
              <td className="td-cell">
                <CustomSelect
                  onChange={value => setData('lead_source_id', value)}
                  options={leadSourceOptions}
                  value={data.lead_source_id}
                  valueKey="id"
                  labelKey="name"
                  isClearable={true}
                  isSearchable={true}
                  placeholder="..."
                  error={errors.lead_source_id}
                />
                <InvalidFeedback errors={errors} name="lead_source_id" />
              </td>
            </tr>

            <tr className="table-row is-flexible">
              <th className="th-cell">
                <FormLabel htmlFor="is_active-true" label="使用状況" isRequired={false} />
              </th>
              <td className="td-cell">
                <div className="u-flex">
                  <RadioGroup
                    id="is_active"
                    options={[
                      { value: true, label: '使用中' },
                      { value: false, label: '使用不可' },
                    ]}
                    value={data.is_active}
                    onChange={e => setData('is_active', e.target.value === 'true')}
                    error={errors.is_active}
                  />
                  <InvalidFeedback errors={errors} name="is_active" />
                </div>
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
                  searchKey="name_kana"
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
                  height="medium"
                />
                <InvalidFeedback errors={errors} name="note" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  );
}
