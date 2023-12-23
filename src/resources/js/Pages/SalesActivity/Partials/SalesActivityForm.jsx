
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import CustomSelect from '@/Components/Form/CustomSelect';
import DateInput from '@/Components/Form/DateInput';
import FormLabel from '@/Components/Form/FormLabel';
import Input from '@/Components/Form/Input';
import InvalidFeedback from '@/Components/Form/InvalidFeedback'
import Textarea from '@/Components/Form/Textarea';

export default function SalesActivityForm({ setIsModalOpen, data, setData, errors, submit, inChargeUserOptions, contactInfo}) {

  return (
    <form id="salesActivityForm" onSubmit={submit}>
      <div className="table-wrapper">
        <table className="table">
          <tbody className="tbody">
            <tr className="table-row is-flexible">
              <th className="th-cell u-w-160">
                <FormLabel htmlFor="contact_date" label="連絡日" isRequired={true} />
              </th>
              <td className="td-cell">
                <DateInput
                  id="contact_date"
                  value={data.contact_date}
                  onChange={e => setData('contact_date', e.target.value)}
                  error={errors.contact_date}
                />
                <InvalidFeedback errors={errors} name="contact_date" />
              </td>
            </tr>

            <tr className="table-row is-flexible">
              <th className="th-cell">
                <FormLabel label="営業担当" isRequired={true} />
              </th>
              <td className="td-cell">
                <CustomSelect
                  onChange={value => setData('in_charge_user_id', value)}
                  options={inChargeUserOptions}
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
                <FormLabel label="顧客情報" isRequired={true} />
              </th>
              <td className="td-cell">
                <div className="u-flex">
                  <Input
                    type="text"
                    value={data.customer_contact_id}
                    className="u-max-w-64 u-mr-1"
                    placeholder="ID"
                    readOnly={true}
                  />
                  <Input
                    type="text"
                    value={contactInfo.contactName}
                    className="u-max-w-240 u-mr-1"
                    placeholder="顧客名"
                    readOnly={true}
                  />
                  <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(true)}>
                    <ManageSearchIcon />
                  </button>
                </div>
                <div className="u-mt-2">
                  <Input
                    type="text"
                    value={contactInfo.customerName}
                    className="u-max-w-368"
                    placeholder="取引先名"
                    readOnly={true}
                  />
                </div>
                <div className="u-mt-2">
                  <Input
                    type="text"
                    value={contactInfo.contactEmail}
                    className="u-max-w-368"
                    placeholder="E-mail"
                    readOnly={true}
                  />
                </div>
                <div className="u-flex u-mt-2">
                  <Input
                    type="text"
                    value={contactInfo.contactTel}
                    className="u-max-w-176 u-mr-3"
                    placeholder="TEL"
                    readOnly={true}
                  />
                  <Input
                    type="text"
                    value={contactInfo.contactMobile}
                    className="u-max-w-176"
                    placeholder="携帯"
                    readOnly={true}
                  />
                </div>
                <InvalidFeedback errors={errors} name="customer_contact_id" />
              </td>
            </tr>

            <tr className="table-row is-flexible">
              <th className="th-cell">
                <FormLabel htmlFor="proposal" label="提案内容" isRequired={true} />
              </th>
              <td className="td-cell">
                <Textarea
                  id="proposal"
                  value={data.proposal}
                  onChange={e => setData('proposal', e.target.value)}
                  error={errors.proposal}
                  height="medium"
                />
                <InvalidFeedback errors={errors} name="proposal" />
              </td>
            </tr>

            <tr className="table-row is-flexible">
              <th className="th-cell">
                <FormLabel htmlFor="feedback" label="フィードバック" isRequired={false} />
              </th>
              <td className="td-cell">
                <Textarea
                  id="feedback"
                  value={data.feedback}
                  onChange={e => setData('feedback', e.target.value)}
                  error={errors.feedback}
                  height="medium"
                />
                <InvalidFeedback errors={errors} name="feedback" />
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
