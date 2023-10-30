<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserSearchRequest;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(UserSearchRequest $request): Response
    {
        $keyword    = $request->input('keyword', '');
        $usersPaginator = User::where('name', 'LIKE', "%$keyword%")->paginate(20)->withQueryString();

        return Inertia::render('User/Index', [
            'usersPaginator' => $usersPaginator,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('User/Create');
    }

    public function store(UserStoreRequest $request): RedirectResponse
    {
        User::create([
            'employee_code'     => $request->input('employee_code'),
            'name'              => $request->input('name'),
            'email'             => $request->input('email'),
            'password'          => Hash::make($request->input('password')),
            'mobile_number'     => $request->input('mobile_number'),
            'employment_date'   => $request->input('employment_date'),
        ]);

        return to_route('users.index');
    }

    public function edit(User $user): Response
    {
        return Inertia::render('User/Edit', ['user' => $user]);
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        $user->update([
            'employee_code'     => $request->input('employee_code'),
            'name'              => $request->input('name'),
            'email'             => $request->input('email'),
            'mobile_number'     => $request->input('mobile_number'),
            'employment_date'   => $request->input('employment_date'),
            'resignation_date'  => $request->input('resignation_date'),
        ]);

        return to_route('users.index');
    }
}
