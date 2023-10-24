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
            'employee_code'     => 'required|string|max:5',
            'name'              => 'required|string|max:255',
            'email'             => 'required|string|email|max:255|unique:'.User::class,
            'password'          => ['required', 'confirmed', Rules\Password::defaults()],
            'mobile_number'     => 'nullable|string|min:10|max:15',
            'employment_date'   => 'nullable|date',
        ];
    }
}
