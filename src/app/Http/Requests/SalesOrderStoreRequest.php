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
            'customer_id'           => 'required|integer|exists:customers,id',
            'customer_contact_id'   => 'nullable|integer|exists:customer_contacts,id',
            'billing_address_id'    => 'nullable|integer|exists:billing_addresses,id', // TODO: 仕様再検討（必須になるかも)
            'delivery_address_id'   => 'required|integer|exists:delivery_addresses,id',
            'product_category_id'   => 'required|integer|exists:product_categories,id',

            // SalesTerm
            'billing_type'          => 'nullable|integer|in:1,2',
            'cutoff_day'            => 'nullable|integer|min:1|max:28',
            'payment_month_offset'  => 'nullable|integer|min:0',
            'payment_day'           => 'nullable|integer|min:1|max:28',
            'payment_day_offset'    => 'nullable|integer|min:0',
            'payment_date'          => 'nullable|date',
            'payment_status'        => 'nullable|string|max:255',

            'customer_name'         => 'required|string|max:255',
            'delivery_address'      => 'required|string|max:255',
            'order_date'            => 'required|date',
            'shipping_date'         => 'nullable|date',
            'shipping_status'       => 'nullable|string|max:255',
            'delivery_date'         => 'nullable|date',
            'delivery_status'       => 'nullable|string|max:255',
            'delivery_memo'         => 'nullable|string|max:255',

            'note'                  => 'nullable|string',
            'sales_in_charge_id'    => 'required|integer|exists:users,id',

            // SalesOrderDetail
            'sales_order_details.*.product_id'       => ['nullable', 'integer', 'exists:products,id'],
            'sales_order_details.*.product_name'     => ['required', 'string', 'max:255'],
            'sales_order_details.*.product_detail'   => ['nullable', 'string', 'max:255'],
            'sales_order_details.*.quantity'         => ['required', 'numeric', 'min:0.01', 'max:99999999'],
            'sales_order_details.*.unit_price'       => ['required', 'numeric', 'min:0.01', 'max:99999999'],
            'sales_order_details.*.tax_rate'         => ['numeric', 'max:1'],
            'sales_order_details.*.is_tax_inclusive' => ['boolean'],
            'sales_order_details.*.note'             => ['nullable', 'string', 'max:255'],
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
            'customer_contact_id'   => '連絡先ID',
            'billing_address_id'    => '請求先ID',
            'delivery_address_id'   => '納品先ID',
            'product_category_id'   => '集計品目ID',
            'billing_type'          => '請求タイプ',
            'cutoff_day'            => '締め日',
            'payment_month_offset'  => '支払月',
            'payment_day'           => '支払日',
            'payment_day_offset'    => '支払期限日数',
            'payment_date'          => '入金日',
            'payment_status'        => '入金状況',
            'customer_name'         => '販売先名',
            'delivery_address'      => '納品先住所',
            'order_date'            => '受注日',
            'shipping_date'         => '出荷日',
            'shipping_status'       => '出荷状況',
            'delivery_date'         => '納品日',
            'delivery_status'       => '納品状況',
            'delivery_memo'         => '配送メモ',
            'total_amount'          => '総合計金額',
            'note'                  => '備考',
            'sales_in_charge_id'    => '受注担当者ID',
        ];
    }
}
