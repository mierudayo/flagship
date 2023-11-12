<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductStoreRequest extends FormRequest
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
            'category_id'       => ['required', 'integer', 'exists:product_categories,id'],
            'product_number'    => ['nullable', 'string', 'max:255', 'unique:products,product_number'],
            'product_type'      => ['required', 'integer', 'in:1,2'],
            'name'              => ['required', 'string', 'max:255'],
            'description'       => ['nullable', 'string'],
            'sales_price'       => ['nullable', 'numeric', 'min:0', 'max:99999999.99'],
            'purchase_price'    => ['nullable', 'numeric', 'min:0', 'max:99999999.99'],
            'display_order'     => ['nullable', 'integer', 'min:1'],
        ];

    }
}
