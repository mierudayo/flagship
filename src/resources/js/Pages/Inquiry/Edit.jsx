import AppLayout from '@/Layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';
import CancelButton from '../../Components/CancelButton';
import TableInputRow from '../../Components/TableInputRow';
import TableSelectRow from '../../Components/TableSelectRow';
import TableGenericSelectRow from '../../Components/TableGenericSelectRow';
import TableTextAreaRow from '../../Components/TableTextAreaRow';

const Edit = ({ inquiry, customerContactOption, productOption, inquiryTypeOption, inChargeUserOption, inquiryStatus, inquiryLeadSource }) => {
  const { data, setData, patch, processing, errors, reset, isDirty } = useForm({
    inquiry_date: inquiry.inquiry_date,
    customer_contact_id: inquiry.customer_contact_id,
    product_id: inquiry.product_id || '',
    product_detail: inquiry.product_detail || '',
    inquiry_type_id: inquiry.inquiry_type_id || '',
    lead_source: inquiry.lead_source,
    project_scale: inquiry.project_scale || '',
    status: inquiry.status,
    subject: inquiry.subject || '',
    message: inquiry.message,
    answer: inquiry.answer || '',
    feedback: inquiry.feedback || '',
    note: inquiry.note || '',
    in_charge_user_id: inquiry.in_charge_user_id,
  });

  function submit(e) {
    e.preventDefault();
    patch(route('inquiries.update', inquiry), {
      onSuccess: () => reset(),
    });
  };

  return (
    <>
      <h1 className="content-title">問い合わせ 編集</h1>
      <div className="content-navbar">
        <button
          type="submit"
          form="inquiryCreateForm"
          className="btn btn-primary u-mr-3"
          disabled={processing}
        >
          更新する
        </button>
        <CancelButton isDirty={isDirty} route={route('inquiries.index')} />
        {processing && <span>Now Loading...</span>}
        <Link
          onBefore={() => confirm('本当に削除しますか？')}
          href={route('inquiries.destroy', inquiry)}
          method="delete"
          className="btn btn-danger u-ml-auto"
          as="button"
        >
          削除
        </Link>
      </div>
      <form id="inquiryCreateForm" onSubmit={submit}>
        <div className="table-wrapper is-scrollable">
          <table className="table">
            <tbody className="tbody">
              <TableInputRow type="date" labelName="問い合わせ日" inputName="inquiry_date" data={data} errors={errors} setData={setData} isRequired={true} widthClass="u-w-200" />

              <TableGenericSelectRow
                label="顧客"
                name="customer_contact_id"
                data={data}
                setData={setData}
                errors={errors}
                options={customerContactOption}
                isRequired={true}
              />

              <TableInputRow type="text" labelName="件名" inputName="subject" data={data} errors={errors} setData={setData} isRequired={false} />

              <TableTextAreaRow
                labelName="問い合わせ内容"
                inputName="message"
                data={data}
                errors={errors}
                setData={setData}
                isRequired={true}
              />

              <TableTextAreaRow
                labelName="回答内容"
                inputName="answer"
                data={data}
                errors={errors}
                setData={setData}
                isRequired={false}
              />

              <TableSelectRow
                label="リード獲得元"
                name="lead_source"
                data={data}
                errors={errors}
                setData={setData}
                options={inquiryLeadSource}
                isRequired={true}
              />

              <TableInputRow type="number" labelName="案件規模" inputName="project_scale" data={data} errors={errors} setData={setData} isRequired={false} />

              <TableSelectRow
                label="ステータス"
                name="status"
                data={data}
                errors={errors}
                setData={setData}
                options={inquiryStatus}
                isRequired={true}
              />

              <TableTextAreaRow
                labelName="フィードバック"
                inputName="feedback"
                data={data}
                errors={errors}
                setData={setData}
                isRequired={false}
              />

              <TableGenericSelectRow
                label="担当ユーザー"
                name="in_charge_user_id"
                data={data}
                setData={setData}
                errors={errors}
                options={inChargeUserOption}
              />

              <TableGenericSelectRow
                label="問い合わせ区分"
                name="inquiry_type_id"
                data={data}
                setData={setData}
                errors={errors}
                options={inquiryTypeOption}
              />

              <TableGenericSelectRow
                label="対象商品"
                name="product_id"
                data={data}
                setData={setData}
                errors={errors}
                options={productOption}
              />

              <TableInputRow type="text" labelName="商品詳細" inputName="product_detail" data={data} errors={errors} setData={setData} isRequired={false} />

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
    </>
  );
}

Edit.layout = page => <AppLayout children={page} />

export default Edit
