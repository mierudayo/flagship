import { useState, useEffect } from 'react';
import { Link, useForm, usePage } from '@inertiajs/react';

import MenuItem from '@mui/material/MenuItem';

import AppLayout from '@/Layouts/AppLayout';
import Alert from '@/Components/Alert';
import DropdownMenu from '@/Components/DropdownMenu';
import DateRangePicker from '@/Components/DateRangePicker';
import Pagination from '@/Components/Pagination';
import KeywordSearchForm from '@/Components/KeywordSearchForm';
import InquiryTable from './Partials/InquiryTable';
import ToggleFilterButton from '@/Components/ToggleFilterButton';
import FilterForm from '@/Components/FilterForm';
import InquiryFilter from './Partials/InquiryFilter';
import PageSizeSelector from '@/Components/PageSizeSelector';

const Index = ({ inquiries, productOptions, inChargeUserOptions, inquiryTypeOptions, inquiryStatusOptions }) => {
  const urlParams = route().params;
  const { flash } = usePage().props;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (Object.keys(urlParams).length > 0) {
      setIsFilterOpen(true);
    }
  }, []);

  const { data, setData, get, errors } = useForm({
    page_size: urlParams.page_size || 100,
    keyword: urlParams.keyword || '',
    inquiry_id: urlParams.inquiry_id || '',
    customer_info: urlParams.customer_info || '',
    start_date: urlParams.start_date || '',
    end_date: urlParams.end_date || '',
    in_charge_user_id: urlParams.in_charge_user_id || '',
    status: urlParams.status || '',
    inquiry_type_id: urlParams.inquiry_type_id || '',
    product_id: urlParams.product_id || '',
  });

  function submit(e) {
    e.preventDefault();
    get(route('inquiries.index'), {
      preserveState: true,
    });
  };

  const [prevPageSize, setPrevPageSize] = useState(data.page_size);

  if (data.page_size !== prevPageSize) {
    get(route('inquiries.index'), {
      preserveState: true,
    });
    setPrevPageSize(data.page_size);
  }

  function resetSearchInputs() {
    setData({
      ...data,
      page_size: 100,
      keyword: '',
      inquiry_id: '',
      customer_info: '',
      start_date: '',
      end_date: '',
      in_charge_user_id: '',
      status: '',
      inquiry_type_id: '',
      product_id: '',
    })

    setPrevPageSize(100);
  }

  return (
    <>
      <h1 className="content-title">問い合わせ 一覧</h1>
      <div className="content-navbar">
        <Link
          href={route('inquiries.create')}
          className="btn btn-primary u-mr-3"
        >
          新規登録
        </Link>

        <DropdownMenu
          buttonLabel="設定"
          buttonClassName="u-mr-3"
        >
          <Link href={route('inquiry-types.index')}>
            <MenuItem>
              区分登録
            </MenuItem>
          </Link>
        </DropdownMenu>


        <KeywordSearchForm
          placeholder="件名、内容で検索"
          data={data}
          setData={setData}
          errors={errors}
          submit={submit}
        />

        <DateRangePicker
          dateColumnLabel="問い合わせ日"
          data={data}
          setData={setData}
          errors={errors}
          submit={submit}
        />

        <ToggleFilterButton isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen} />

        <div className="record-count">
          {inquiries.total}件
        </div>

        <PageSizeSelector
          pageSize={data.page_size}
          onChange={e => setData('page_size', e.target.value)}
        />

        <Pagination paginator={inquiries} />
      </div>

      <FilterForm submit={submit} isFilterOpen={isFilterOpen}>
        <InquiryFilter
          submit={submit}
          data={data}
          setData={setData}
          errors={errors}
          productOptions={productOptions}
          inChargeUserOptions={inChargeUserOptions}
          inquiryStatusOptions={inquiryStatusOptions}
          inquiryTypeOptions={inquiryTypeOptions}
          resetSearchInputs={resetSearchInputs}
        />
      </FilterForm>

      <Alert type={flash.type} message={flash.message} />

      <InquiryTable inquiries={inquiries.data} />
    </>
  );
}

Index.layout = page => <AppLayout title="問い合わせ 一覧" children={page} />

export default Index
