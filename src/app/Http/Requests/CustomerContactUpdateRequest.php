<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomerContactUpdateRequest extends FormRequest
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
            'customer_id'       => ['required', 'integer', 'exists:customers,id'],
            'lead_source_id'    => ['nullable', 'integer', 'exists:lead_sources,id'],
            'name'              => ['required', 'string'],
            'name_kana'         => ['nullable', 'string', 'max:255'],
            'tel'               => ['nullable', 'string', 'max:20', 'regex:/^[\d\-+\s]+$/'],
            'mobile_number'     => ['nullable', 'string', 'max:20', 'regex:/^[\d\-+\s]+$/'],
            'email'             => ['nullable', 'string', 'max:255', 'email'],
            'position'          => ['nullable', 'string', 'max:255'],
            'role'              => ['nullable', 'string', 'max:255'],
            'is_active'         => ['required', 'boolean'],
            'note'              => ['nullable', 'string', 'max:2000'],
            'in_charge_user_id' => ['nullable', 'integer', 'exists:users,id'],
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
            'customer_id'       => '所属取引先',
            'lead_source_id'    => '獲得元',
            'name'              => '担当者名',
            'name_kana'         => 'よみがな',
            'tel'               => 'TEL',
            'mobile_number'     => '携帯番号',
            'email'             => 'E-mail',
            'position'          => '役職',
            'role'              => '役割',
            'is_active'         => '使用状況',
            'note'              => '備考',
            'in_charge_user_id' => '担当ユーザー',
        ];
    }
}
