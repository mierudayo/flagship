<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InquirySearchRequest extends FormRequest
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
            'page_size'         => ['nullable', 'in:100,200,500'],
            'keyword'           => ['nullable', 'string', 'max:255'],
            'start_date'        => ['nullable', 'date'],
            'end_date'          => ['nullable', 'date', 'after_or_equal:start_date'],
            'inquiry_id'        => ['nullable', 'integer'],
            'customer_info'     => ['nullable', 'string', 'max:255'],
            'in_charge_user_id' => ['nullable', 'integer'],
            'status'            => ['nullable', 'integer'],
            'inquiry_type_id'   => ['nullable', 'integer'],
            'product_id'        => ['nullable', 'integer']
        ];
    }
}
