<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DeliveryAddressAddRequest extends FormRequest
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
            'address_type'  => ['required', 'integer', 'in:1,2,3'],
            'postal_code'     => ['nullable', 'string', 'max:8', 'regex:/^\d{3}-?\d{4}$/'],
            'address'       => ['required', 'string', 'max:255'],
            'company_name'  => ['nullable', 'string', 'max:255'],
            'contact_name'  => ['nullable', 'string', 'max:255'],
            'tel'           => ['nullable', 'string', 'max:15', 'regex:/^(\d{1,4}-?\d{1,4}-?\d{1,4})$/'],
            'note'          => ['nullable', 'string'],
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
            'address_type'  => '区分',
            'postal_code'     => '郵便番号',
            'address'       => '住所',
            'company_name'  => '会社名',
            'contact_name'  => '担当者名',
            'tel'           => 'TEL',
            'note'          => '備考',
        ];
    }
}
