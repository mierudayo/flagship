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
            'name'             => ['required', 'string', 'max:255'],
            'name_kana'        => ['nullable', 'string', 'max:255'],
            'shortcut'         => ['nullable', 'string', 'max:255'],
            'postal_code'      => ['nullable', 'string', 'max:10'],
            'address'          => ['nullable', 'string', 'max:255'],
            'tel'              => ['nullable', 'string', 'max:15'],
            'fax'              => ['nullable', 'string', 'max:15'],
            'note'             => ['nullable', 'string'],
            'in_charge_user_id'=> ['nullable', 'integer', 'exists:users,id'],
        ];
    }
}
