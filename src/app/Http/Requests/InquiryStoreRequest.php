<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InquiryStoreRequest extends FormRequest
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
            'customer_contact_id'   => ['required', 'integer', 'exists:customer_contacts,id'],
            'product_id'            => ['nullable', 'integer', 'exists:products,id'],
            'inquiry_type_id'       => ['required', 'integer', 'exists:inquiry_types,id'],
            'lead_source'           => ['required', 'integer', 'in:1,2,3,4'],
            'status'                => ['required', 'integer', 'in:1,2,3,4'],
            'message'               => ['required', 'string', 'max:1000'],
            'answer'                => ['nullable', 'string', 'max:1000'],
            'result'                => ['nullable', 'integer', 'in:1,2,3,4'],
            'result_reason'         => ['nullable', 'string', 'max:1000'],
            'in_charge_user_id'     => ['required', 'integer', 'exists:users,id'],
            'inquiry_date'          => ['required', 'date'],
        ];

    }
}
