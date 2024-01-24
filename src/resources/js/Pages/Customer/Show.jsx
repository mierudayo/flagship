import { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import ContentInfoBar from '@/Components/ContentInfoBar';
import Modal from '@/Components/Modal';
import ContactForm from './Partials/ContactForm';
import AddressForm from './Partials/AddressForm';
import SalesActivityForm from './Partials/SalesActivityForm';
import BillingAddressLookup from '@/Components/BillingAddressLookup';
import BillingAddressForm from './Partials/BillingAddressForm';
import EditLinkButton from '@/Components/EditLinkButton';
import ContactSection from './Partials/Show/ContactSection';
import CustomerSection from './Partials/Show/CustomerSection';
import BillingAddressSection from './Partials/Show/BillingAddressSection';
import DeliveryAddressSection from './Partials/Show/DeliveryAddressSection';
import SalesActivitySection from './Partials/Show/SalesActivitySection';
import InquirySection from './Partials/Show/InquirySection';
import SalesOrderSection from './Partials/Show/SalesOrderSection';
import PurchaseOrderSection from './Partials/Show/PurchaseOrderSection';

const Show = ({ customer, userOptions, addressTypeOptions, leadSourceOptions }) => {
  const { flash } = usePage().props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isSalesActivityModalOpen, setIsSalesActivityModalOpen] = useState(false);
  const [isBillingAddressCreateModalOpen, setIsBillingAddressCreateModalOpen] = useState(false);
  const [isBillingAddressModalOpen, setIsBillingAddressModalOpen] = useState(false);

  function attachBillingAddress(billingAddress) {
    const url = route('customers.attach-billing-address', customer);
    router.visit(url, {
      method: 'patch',
      data: { billing_address_id: billingAddress.id },
      onSuccess: () => setIsBillingAddressModalOpen(false),
    });
  }

  function detachBillingAddress(billingAddress) {
    const url = route('customers.detach-billing-address', customer)
    router.visit(url, {
      method: 'post',
      data: { billing_address_id: billingAddress.id },
    });
  }

  return (
    <>
      <h1 className="content-title">取引先 詳細</h1>

      <ContentInfoBar
        createdAt={customer.created_at}
        createdBy={customer.created_by.name}
        updatedAt={customer.updated_at}
        updatedBy={customer.updated_by?.name}
      />

      <div className="content-navbar">
        <EditLinkButton href={route('customers.edit', customer)} style={{ marginRight: '16px' }} />
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn btn-secondary u-mr-3">
          +連絡先を追加
        </button>
        <button
          onClick={() => setIsAddressModalOpen(true)}
          className="btn btn-secondary u-mr-3">
          +配送情報を追加
        </button>
        <button
          onClick={() => setIsSalesActivityModalOpen(true)}
          className="btn btn-secondary u-mr-3">
          +営業履歴を追加
        </button>
        <button
          onClick={() => setIsBillingAddressCreateModalOpen(true)}
          className="btn btn-secondary u-mr-3">
          +請求先を追加
        </button>
        <button
          onClick={() => setIsBillingAddressModalOpen(true)}
          className="btn btn-secondary u-mr-3">
          既存の請求先を紐付け
        </button>
      </div>

      {isModalOpen &&
        <Modal closeModal={() => setIsModalOpen(false)} title="連絡先登録">
          <ContactForm
            customer={customer}
            userOptions={userOptions}
            leadSourceOptions={leadSourceOptions}
            closeModal={() => setIsModalOpen(false)}
          />
        </Modal>}

      {isAddressModalOpen &&
        <Modal closeModal={() => setIsAddressModalOpen(false)} title="配送情報 登録">
          <AddressForm customer={customer} addressTypeOptions={addressTypeOptions} closeModal={() => setIsAddressModalOpen(false)} />
        </Modal>}

      {isSalesActivityModalOpen &&
        <Modal closeModal={() => setIsSalesActivityModalOpen(false)} title="営業履歴 登録">
          <SalesActivityForm customer={customer} userOptions={userOptions} closeModal={() => setIsSalesActivityModalOpen(false)} />
        </Modal>}

      {isBillingAddressCreateModalOpen &&
        <Modal closeModal={() => setIsBillingAddressCreateModalOpen(false)} title="請求先 登録">
          <BillingAddressForm customer={customer} closeModal={() => setIsBillingAddressCreateModalOpen(false)} />
        </Modal>}

      {isBillingAddressModalOpen &&
        <Modal closeModal={() => setIsBillingAddressModalOpen(false)} title="請求先 紐付け">
          <BillingAddressLookup
            customer={customer}
            handleClickAttach={billingAddress => attachBillingAddress(billingAddress)}
          />
        </Modal>}

      <Alert type={flash.type} message={flash.message} />

      <CustomerSection customer={customer} />

      <BillingAddressSection
        billingAddresses={customer.billing_addresses}
        detachBillingAddress={detachBillingAddress}
      />

      <ContactSection contacts={customer.contacts} />

      <DeliveryAddressSection deliveryAddresses={customer.delivery_addresses} />

      <SalesActivitySection contacts={customer.contacts} />

      <InquirySection contacts={customer.contacts} />

      <SalesOrderSection salesOrders={customer.sales_orders} />

      <PurchaseOrderSection purchaseOrders={customer.purchase_orders} />

    </>
  );
}

Show.layout = page => <AppLayout title="取引先 詳細" children={page} />

export default Show
