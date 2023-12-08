<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PurchaseOrderStoreRequest extends FormRequest
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
            'billing_address_id'    => ['nullable', 'integer', 'exists:billing_addresses,id'], // 仕様再検討（必須になるかも)
            'delivery_address_id'   => ['required', 'integer', 'exists:delivery_addresses,id'],
            'product_category_id'   => ['required', 'integer', 'exists:product_categories,id'],

            // PurchaseOrder
            'billing_type'          => ['required', 'integer', 'in:1,2'],
            'cutoff_day'            => ['nullable', 'integer', 'between:1,99'],
            'payment_month_offset'  => ['nullable', 'integer', 'min:0'],
            'payment_day'           => ['nullable', 'integer', 'between:1,99'],
            'payment_day_offset'    => ['nullable', 'integer', 'min:0'],
            'payment_date'          => ['nullable', 'date'],
            'payment_status'        => ['nullable', 'string', 'max:255'],

            'customer_name'         => ['required', 'string', 'max:255'],
            'ship_from_address'     => ['required', 'string', 'max:255'],
            'purchase_date'         => ['required', 'date'],
            'note'                  => ['nullable', 'string'],
            'purchase_in_charge_id' => ['required', 'integer', 'exists:users,id'],

            // PurchaseOrderDetail
            'purchase_order_details.*.product_id'       => ['nullable', 'integer', 'exists:products,id'],
            'purchase_order_details.*.product_name'     => ['required', 'string', 'max:255'],
            'purchase_order_details.*.product_detail'   => ['nullable', 'string', 'max:255'],
            'purchase_order_details.*.quantity'         => ['required', 'numeric', 'min:0.01', 'max:99999999'],
            'purchase_order_details.*.unit_price'       => ['required', 'numeric', 'min:0.01', 'max:99999999'],
            'purchase_order_details.*.tax_rate'         => ['numeric', 'max:1'],
            'purchase_order_details.*.is_tax_inclusive' => ['boolean'],
            'purchase_order_details.*.note'             => ['nullable', 'string', 'max:255'],
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
            'customer_id'           => '取引先ID',
            'customer_contact_id'   => '連絡先ID',
            'billing_address_id'    => '請求先ID',
            'delivery_address_id'   => '出荷元ID',
            'product_category_id'   => '集計品目ID',
            'billing_type'          => '請求タイプ',
            'cutoff_day'            => '締め日',
            'payment_month_offset'  => '支払月',
            'payment_day'           => '支払日',
            'payment_day_offset'    => '支払期限日数',
            'payment_date'          => '支払日',
            'payment_status'        => '入金状況',
            'customer_name'         => '仕入先名',
            'ship_from_address'     => '出荷元住所',
            'purchase_date'         => '発注日',
            'note'                  => '備考',
            'purchase_in_charge_id' => '発注担当者ID',
        ];
    }
}
