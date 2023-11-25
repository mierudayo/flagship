<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomerStoreRequest extends FormRequest
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
            'name'             => ['required', 'string', 'max:255'],
            'name_kana'        => ['nullable', 'string', 'max:255'],
            'shortcut'         => ['nullable', 'string', 'max:255'],
            'postal_code'      => ['nullable', 'string', 'max:10'],
            'address'          => ['nullable', 'string', 'max:255'],
            'tel'              => ['nullable', 'string', 'max:15'],
            'fax'              => ['nullable', 'string', 'max:15'],
            'note'             => ['nullable', 'string'],
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
