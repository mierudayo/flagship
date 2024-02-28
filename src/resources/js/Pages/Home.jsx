import { useState } from 'react';

import { useForm } from '@inertiajs/react';

import OptionsList from '@/Components/OptionsList';
import AppLayout from '@/Layouts/AppLayout'
import { formatNumber, formatCurrency } from '@/Utils/priceCalculator';

const Home = ({ inquiriesByStatus, inquiriesCount, inquiriesByType, salesOrdersCount, salesOrdersTotalSum, purchaseOrdersTotalSum, customerContactsCount, customerContactsByLeadSource }) => {
  const { data, setData, get} = useForm({
    month_offset: 0,
  });

  const [prevData, setPrevData] = useState(data.month_offset)

  if (data.month_offset !== prevData) {
    get(route('home'), {
      preserveState: true,
    });
    setPrevData(data.month_offset);
  }

  return (
    <>
      <h1 className="content-title">ダッシュボード</h1>

      <div className="action-bar">
        <div className="u-w-88">対象期間 : </div>
        <select
          value={data.month_offset}
          onChange={e => setData('month_offset', e.target.value)}
          className="form-select u-w-88"
          style={{ height: '32px' }}
        >
          <OptionsList
            options={[
              { value: 0, label: '今月' },
              { value: -1, label: '先月' },
              { value: -2, label: '先々月' },
              { value: -3, label: '3ヶ月前' },
            ]}
          />
        </select>
      </div>

      {/* First */}
      <div className="card-wrapper">
        <div className="card u-mr-4">
          <div className="card-content">
            <div className="card-content-title">問い合わせ</div>
            <div className="card-footer">
              <span className="count">
                {inquiriesCount}
              </span>
              <span>件</span>
            </div>
            <hr />
            <div className="card-list">
              {inquiriesByStatus.map(inquiry => (
                <div key={inquiry.status} className="list-item">
                  <div className="list-label">
                    <span className={`inquiry-status status-${inquiry.status} u-mr-1`}>
                      {inquiry.status_label}
                    </span>
                  </div>
                  <div className="list-value u-text-right">
                    {inquiry.count}件
                  </div>
                </div>
              ))}
            </div>
            <hr />
            <div className="card-list">
              {inquiriesByType.map(inquiry => (
                <div key={inquiry.inquiry_type_id} className="list-item">
                  <div className="list-label">
                    <span className={`custom-label ${inquiry.inquiry_type.custom_label}`}>
                      {inquiry.inquiry_type.name}
                    </span>
                  </div>
                  <div className="list-value u-text-right">
                    {inquiry.count}件
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Second Card */}
        <div className="card u-mr-4">
          <div className="card-content">
            <div className="card-content-title">新規顧客</div>
            <div className="card-footer">
              <span className="count">
                {customerContactsCount}
              </span>
              <span>件</span>
            </div>
            <hr />
            <div className="card-list">
              {customerContactsByLeadSource.map(contact => (
                <div key={contact.lead_source_id} className="list-item">
                  <div className="list-label">
                    <span className="chip">
                      {contact.lead_source?.name ?? '未分類'}
                    </span>
                  </div>
                  <div className="list-value">
                    {contact.count}件
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Third Card */}
        <div className="card u-mr-4">
          <div className="card-content">
            <div className="card-content-title">利益</div>
            <div className="card-footer">
              <span className="count">
                {formatCurrency(salesOrdersTotalSum - purchaseOrdersTotalSum)}
              </span>
              <span>円</span>
            </div>
            <hr />
            <div className="card-list">
              <div className="list-item">
                <div className="list-label">発注金額</div>
                <div className="list-value">{formatCurrency(purchaseOrdersTotalSum)}円</div>
              </div>
              <div className="list-item">
                <div className="list-label">受注金額</div>
                <div className="list-value">{formatCurrency(salesOrdersTotalSum)}円</div>
              </div>
              <div className="list-item">
                <div className="list-label">受注件数</div>
                <div className="list-value">{formatNumber(salesOrdersCount)}件</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

Home.layout = page => <AppLayout title="HOME" children={page} />

export default Home
