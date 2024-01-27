<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SalesOrderSearchRequest extends FormRequest
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
            'page_size'          => ['nullable', 'in:100,200,500'],
            'keyword'            => ['nullable', 'max:255'],
            'customer_name'      => ['nullable', 'max:255'],
            'sales_in_charge_id' => ['nullable', 'integer'],
            'consignee'          => ['nullable', 'max:255'],
            'supplier_name'      => ['nullable', 'max:255'],
            'purchase_in_charge_id' => ['nullable', 'integer'],
            'start_date'         => ['nullable', 'date'],
            'end_date'           => ['nullable', 'date'],
        ];
    }
}
