import AppLayout from '@/Layouts/AppLayout'
import { formatNumber, formatCurrency } from '@/Utils/priceCalculator';

const Home = ({ inquiriesByStatus, inquiriesCount, inquiriesByType, salesOrdersCount, salesOrdersTotalSum, purchaseOrdersTotalSum, customerContactsCount, customerContactsByLeadSource }) => {
  return (
    <>
      <h1>HOME</h1>
      <p>Welcome to Sales Manager+</p>

      <div className="u-my-3">
        対象期間: 今月
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
                    <span>
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
