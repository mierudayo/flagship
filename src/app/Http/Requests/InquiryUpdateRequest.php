<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class InquiryUpdateRequest extends FormRequest
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
            'inquiry_date'          => ['required', 'date'],
            'customer_contact_id'   => ['required', 'integer', 'exists:customer_contacts,id'],
            'product_id'            => ['nullable', 'integer', 'exists:products,id'],
            'product_detail'        => ['nullable', 'string', 'max:255'],
            'inquiry_type_id'       => ['required', 'integer', 'exists:inquiry_types,id'],
            'lead_source'           => ['required', 'integer', 'in:1,2,3,4'],
            'project_scale'         => ['nullable', 'integer', 'max:10000'],
            'status'                => ['required', 'integer', 'in:1,2,3,4,5,6,7'],
            'subject'               => ['nullable', 'string', 'max:255'],
            'message'               => ['required', 'string', 'max:1000'],
            'answer'                => ['nullable', 'string', 'max:1000'],
            'feedback'              => ['nullable', 'string', 'max:1000'],
            'note'                  => ['nullable', 'string', 'max:1000'],
            'in_charge_user_id'     => ['required', 'integer', 'exists:users,id'],
        ];
    }
}
