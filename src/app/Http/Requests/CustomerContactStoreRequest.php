<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomerContactStoreRequest extends FormRequest
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
            'contact_name'   => ['required', 'string'],
            'name_kana'      => ['nullable', 'string', 'max:255'],
            'tel_number'     => ['nullable', 'string', 'max:20', 'regex:/^[\d\-+\s]+$/'],
            'mobile_number'  => ['nullable', 'string', 'max:20', 'regex:/^[\d\-+\s]+$/'],
            'email'          => ['nullable', 'string', 'max:255', 'email'],
            'position'       => ['nullable', 'string', 'max:255'],
            'role'           => ['nullable', 'string', 'max:255'],
            'is_active'      => ['required', 'boolean'],
            'note'           => ['nullable', 'string', 'max:2000'],
        ];

    }
}
