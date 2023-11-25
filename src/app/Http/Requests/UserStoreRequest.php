<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules;

class UserStoreRequest extends FormRequest
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
            'employee_code'     => ['required', 'string', 'max:5', 'unique:users'],
            'name'              => ['required', 'string', 'max:255'],
            'name_kana'         => ['nullable', 'string', 'max:255'],
            'email'             => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password'          => ['required', 'confirmed', Rules\Password::defaults()],
            'mobile_number'     => ['nullable', 'string', 'min:10', 'max:15'],
            'employment_date'   => ['nullable', 'date'],
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
            'password'          => 'パスワード',
            'mobile_number'     => '携帯番号',
            'employment_date'   => '入社日',
        ];
    }
}
