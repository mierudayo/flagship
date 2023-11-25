<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserUpdateRequest extends FormRequest
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
            'permission_id'     => ['required', 'exists:permissions,id'],
            'employee_code'     => [
                'required',
                'string',
                'max:5',
                Rule::unique('users')->ignore($this->route('user'))
            ],
            'name'              => ['required', 'string', 'max:255'],
            'name_kana'         => ['nullable', 'string', 'max:255'],
            'email'             => [
                'required',
                'email',
                'max:255',
                Rule::unique('users')->ignore($this->route('user'))
            ],
            'mobile_number'     => ['nullable', 'string', 'min:10', 'max:15'],
            'employment_date'   => ['nullable', 'date'],
            'resignation_date'  => ['nullable', 'date', 'after_or_equal:employment_date'],
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
            'permission_id'     => '権限',
            'employee_code'     => '社員番号',
            'name'              => '名前',
            'name_kana'         => 'よみがな',
            'email'             => 'E-mail',
            'mobile_number'     => '携帯番号',
            'employment_date'   => '入社日',
            'resignation_date'  => '退職日',
        ];
    }
}
