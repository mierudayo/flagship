<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CustomerSearchRequest extends FormRequest
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
            'keyword'       => ['nullable', 'max:255'],
            'customer_id'   => ['nullable', 'integer'],
            'address'       => ['nullable', 'max:255'],
            'phone'         => ['nullable', 'max:255'],
            'in_charge_user_id' => ['nullable', 'integer'],
            'delivery_address'  => ['nullable', 'max:255'],
        ];
    }
}
