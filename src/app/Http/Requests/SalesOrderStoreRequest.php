<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SalesOrderStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'customer_id'           => ['required', 'integer', 'exists:customers,id'],
            'customer_contact_id'   => ['nullable', 'integer', 'exists:customer_contacts,id'],
            'billing_address_id'    => ['required', 'integer', 'exists:billing_addresses,id'],
            'delivery_address_id'   => ['required', 'integer', 'exists:delivery_addresses,id'],
            'product_category_id'   => ['required', 'integer', 'exists:product_categories,id'],

            // SalesTerm
            'billing_type'          => ['required', 'in:1,2'],
            'cutoff_day'            => ['nullable', 'integer', 'min:1', 'max:99'],
            'payment_month_offset'  => ['nullable', 'integer', 'min:0', 'max:12'],
            'payment_day'           => ['nullable', 'integer', 'min:1', 'max:99'],
            'payment_day_offset'    => ['nullable', 'integer', 'min:0'],

            'payment_date'          => ['nullable', 'date'],
            'payment_status'        => ['nullable', 'string', 'max:255'],

            'customer_name'         => ['required', 'string', 'max:255'],
            'delivery_address'      => ['required', 'string', 'max:255'],
            'order_date'            => ['required', 'date'],
            'shipping_date'         => ['nullable', 'date'],
            'shipping_status'       => ['nullable', 'string', 'max:255'],
            'delivery_date'         => ['nullable', 'date'],
            'delivery_status'       => ['nullable', 'string', 'max:255'],
            'delivery_memo'         => ['nullable', 'string', 'max:255'],
            'note'                  => ['nullable', 'string'],
            'sales_in_charge_id'    => ['required', 'integer', 'exists:users,id'],

            // SalesOrderDetail
            'detail_rows.*.sales_order_detail.product_id'       => ['nullable', 'integer', 'exists:products,id'],
            'detail_rows.*.sales_order_detail.product_name'     => ['required', 'string', 'max:255'],
            'detail_rows.*.sales_order_detail.product_detail'   => ['nullable', 'string', 'max:255'],
            'detail_rows.*.sales_order_detail.quantity'         => ['required', 'numeric', 'min:0.01', 'max:99999999'],
            'detail_rows.*.sales_order_detail.unit_price'       => ['required', 'numeric', 'min:0.01', 'max:99999999'],
            'detail_rows.*.sales_order_detail.tax_rate'         => ['numeric', 'max:1'],
            'detail_rows.*.sales_order_detail.is_tax_inclusive' => ['boolean'],
            'detail_rows.*.sales_order_detail.note'             => ['nullable', 'string', 'max:255'],

            // PurchaseOrder
            'detail_rows.*.purchase_order.customer_id'           => ['required', 'integer', 'exists:customers,id'],
            'detail_rows.*.purchase_order.customer_contact_id'   => ['required', 'integer', 'exists:customer_contacts,id'],
            'detail_rows.*.purchase_order.delivery_address_id'   => ['required', 'integer', 'exists:delivery_addresses,id'],
            'detail_rows.*.purchase_order.purchase_in_charge_id' => ['required', 'integer', 'exists:users,id'],

            // PurchaseOrderDetail
            'detail_rows.*.purchase_order_detail.quantity'         => ['required', 'numeric', 'min:0', 'max:99999999'],
            'detail_rows.*.purchase_order_detail.unit_price'       => ['required', 'numeric', 'min:0', 'max:99999999'],
            'detail_rows.*.purchase_order_detail.tax_rate'         => ['numeric', 'max:1'],
            'detail_rows.*.purchase_order_detail.is_tax_inclusive' => ['boolean'],
            'detail_rows.*.purchase_order_detail.note'             => ['nullable', 'string', 'max:255'],
        ];
    }

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'customer_contact_id'   => '連絡先',
            'billing_address_id'    => '請求先',
            'delivery_address_id'   => '納品先',
            'product_category_id'   => '商品カテゴリ',
            'billing_type'          => '請求条件',
            'cutoff_day'            => '締め日',
            'payment_month_offset'  => '支払月',
            'payment_day'           => '支払日',
            'payment_day_offset'    => '支払期限日数',
            'payment_date'          => '入金日',
            'payment_status'        => '入金状況',
            'customer_name'         => '販売先名',
            'delivery_address'      => '納品先',
            'order_date'            => '受注日',
            'shipping_date'         => '出荷日',
            'shipping_status'       => '出荷状況',
            'delivery_date'         => '納品日',
            'delivery_status'       => '納品状況',
            'delivery_memo'         => '配送メモ',
            'note'                  => '備考',
            'sales_in_charge_id'    => '受注担当者',
        ];
    }
}
