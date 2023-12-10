<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomerUpdateRequest extends FormRequest
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
            // Customer
            'name'              => ['required', 'string', 'max:255'],
            'name_kana'         => ['nullable', 'string', 'max:255'],
            'shortcut'          => ['nullable', 'string', 'max:255'],
            'postal_code'       => ['nullable', 'string', 'max:10'],
            'address'           => ['nullable', 'string', 'max:255'],
            'tel'               => ['nullable', 'string', 'max:15'],
            'fax'               => ['nullable', 'string', 'max:15'],
            'note'              => ['nullable', 'string'],
            'in_charge_user_id' => ['nullable', 'integer', 'exists:users,id'],

            // PurchaseTerm
            'purchase_billing_type'         => ['nullable', 'in:1,2'],
            'purchase_cutoff_day'           => ['nullable', 'integer', 'min:1', 'max:99'],
            'purchase_payment_month_offset' => ['nullable', 'integer', 'min:0', 'max:12'],
            'purchase_payment_day'          => ['nullable', 'integer', 'min:1', 'max:99'],
            'purchase_payment_day_offset'   => ['nullable', 'integer', 'min:0'],

            // SalesTerm
            'sales_billing_type'            => ['nullable', 'in:1,2'],
            'sales_cutoff_day'              => ['nullable', 'integer', 'min:1', 'max:99'],
            'sales_payment_month_offset'    => ['nullable', 'integer', 'min:0', 'max:12'],
            'sales_payment_day'             => ['nullable', 'integer', 'min:1', 'max:99'],
            'sales_payment_day_offset'      => ['nullable', 'integer', 'min:0'],

            // CustomerContact
            'contacts.*.name'              => ['required', 'string'],
            'contacts.*.name_kana'         => ['nullable', 'string', 'max:255'],
            'contacts.*.tel'               => ['nullable', 'string', 'max:20', 'regex:/^[\d\-+\s]+$/'],
            'contacts.*.mobile_number'     => ['nullable', 'string', 'max:20', 'regex:/^[\d\-+\s]+$/'],
            'contacts.*.email'             => ['nullable', 'string', 'max:255', 'email'],
            'contacts.*.position'          => ['nullable', 'string', 'max:255'],
            'contacts.*.role'              => ['nullable', 'string', 'max:255'],
            'contacts.*.is_active'         => ['required', 'boolean'],
            'contacts.*.note'              => ['nullable', 'string', 'max:2000'],
            'contacts.*.in_charge_user_id' => ['nullable', 'integer', 'exists:users,id'],

            // DeliveryAddress
            'delivery_addresses.*.address_type'  => ['required', 'integer', 'in:1,2,3'],
            'delivery_addresses.*.postal_code'   => ['nullable', 'string', 'max:8', 'regex:/^\d{3}-?\d{4}$/'],
            'delivery_addresses.*.address'       => ['required', 'string', 'max:255'],
            'delivery_addresses.*.company_name'  => ['nullable', 'string', 'max:255'],
            'delivery_addresses.*.contact_name'  => ['nullable', 'string', 'max:255'],
            'delivery_addresses.*.tel'           => ['nullable', 'string', 'max:15', 'regex:/^(\d{1,4}-?\d{1,4}-?\d{1,4})$/'],
            'delivery_addresses.*.note'          => ['nullable', 'string'],
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
            // Customer
            'name'              => '名前',
            'name_kana'         => 'よみがな',
            'shortcut'          => 'ショートカット',
            'postal_code'       => '郵便番号',
            'address'           => '住所',
            'tel'               => 'TEL',
            'fax'               => 'FAX',
            'note'              => '備考',
            'in_charge_user_id' => '担当ユーザー',

            // PurchaseTerm
            'purchase_billing_type'         => '請求タイプ',
            'purchase_cutoff_day'           => '締日',
            'purchase_payment_month_offset' => '支払月',
            'purchase_payment_day'          => '支払日',
            'purchase_payment_day_offset'   => '支払期限日数',

            // SalesTerm
            'sales_billing_type'            => '請求タイプ',
            'sales_cutoff_day'              => '締日',
            'sales_payment_month_offset'    => '支払月',
            'sales_payment_day'             => '支払日',
            'sales_payment_day_offset'      => '支払期限日数',
        ];
    }
}

