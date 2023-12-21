<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SalesActivityStoreRequest extends FormRequest
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
            'contact_date'          => ['required', 'date'],
            'customer_contact_id'   => ['required', 'integer', 'exists:customer_contacts,id'],
            'proposal'              => ['required', 'string', 'max:1000'],
            'feedback'              => ['nullable', 'string', 'max:1000'],
            'note'                  => ['nullable', 'string', 'max:1000'],
            'in_charge_user_id'     => ['required', 'integer', 'exists:users,id'],
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
            'contact_date'          => '連絡日',
            'customer_contact_id'   => '連絡先',
            'proposal'              => '提案内容',
            'feedback'              => '反応',
            'note'                  => '備考',
            'in_charge_user_id'     => '担当ユーザー',
        ];
    }
}
