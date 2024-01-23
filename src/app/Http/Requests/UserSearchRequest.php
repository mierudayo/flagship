<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserSearchRequest extends FormRequest
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
            'page_size'     => ['nullable', 'in:100,200,500'],
            'keyword'       => ['nullable', 'max:255'],
            'user_id'       => ['nullable', 'integer'],
            'employee_code' => ['nullable', 'max:255'],
            'email'         => ['nullable', 'max:255'],
        ];
    }
}
