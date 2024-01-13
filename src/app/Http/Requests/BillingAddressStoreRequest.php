<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class BillingAddressStoreRequest extends FormRequest
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
            'name'                    => ['required', 'string', 'max:255'],
            'name_kana'               => ['nullable', 'string', 'max:255'],
            'shortcut'                => ['nullable', 'string', 'max:255'],
            'billing_contact_name'    => ['nullable', 'string', 'max:255'],
            'postal_code'             => ['nullable', 'string', 'regex:/^\d{3}-\d{4}$/'],
            'address'                 => ['nullable', 'string', 'max:255'],
            'email'                   => ['nullable', 'email', 'max:255'],
            'tel'                     => ['nullable', 'string', 'max:255'],
            'fax'                     => ['nullable', 'string', 'max:255'],
            'invoice_delivery_method' => ['nullable', 'string', 'max:255'],
            'note'                    => ['nullable', 'string', 'max:1000']
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
            'name'                    => '名前',
            'name_kana'               => '名前（カナ）',
            'shortcut'                => 'ショートカット',
            'billing_contact_name'    => '請求先担当者名',
            'postal_code'             => '郵便番号',
            'address'                 => '住所',
            'email'                   => 'メールアドレス',
            'tel'                     => '電話番号',
            'fax'                     => 'FAX番号',
            'invoice_delivery_method' => '請求書の送付方法',
            'note'                    => '備考'
        ];
    }
}
