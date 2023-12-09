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
            'contact_method'        => ['required', 'integer', 'in:1,2,3,4'],
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

    /**
     * Get custom attributes for validator errors.
     *
     * @return array<string, string>
     */
    public function attributes(): array
    {
        return [
            'inquiry_date'          => '問い合わせ日',
            'customer_contact_id'   => '顧客',
            'product_id'            => '対象商品',
            'product_detail'        => '商品詳細',
            'inquiry_type_id'       => '問い合わせ区分',
            'contact_method'        => '問い合わせ由来',
            'project_scale'         => '案件規模',
            'status'                => 'ステータス',
            'subject'               => '件名',
            'message'               => '問い合わせ内容',
            'answer'                => '回答内容',
            'feedback'              => 'フィードバック',
            'note'                  => '備考',
            'in_charge_user_id'     => '担当ユーザー',
        ];
    }
}
