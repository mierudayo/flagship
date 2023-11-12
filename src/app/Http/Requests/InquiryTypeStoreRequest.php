<?php

namespace App\Http\Requests;

use App\Models\InquiryType;
use Illuminate\Foundation\Http\FormRequest;

class InquiryTypeStoreRequest extends FormRequest
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
            'name'          => 'required|string|max:20|unique:' . InquiryType::class,
            'custom_label'  => 'nullable|string|max:20',
            'display_order' => 'nullable|integer|min:1',
        ];
    }
}
