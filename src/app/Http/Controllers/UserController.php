<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserSearchRequest;
use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\Permission;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(UserSearchRequest $request): Response
    {
        $keyword    = $request->input('keyword', '');

        $usersQuery      = User::query()->with('permission')->searchByKeyword($keyword);
        $usersPaginator  = $usersQuery->paginate(20)->withQueryString();

        return Inertia::render('User/Index', [
            'usersPaginator' => $usersPaginator,
            'canAdmin'       => Gate::allows('admin'),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('User/Create', [
            'permissionSelectOptions' =>  Permission::all(),
        ]);
    }

    public function store(UserStoreRequest $request): RedirectResponse
    {
        $user = User::create([
            'permission_id'     => $request->input('permission_id'),
            'employee_code'     => $request->input('employee_code'),
            'name'              => $request->input('name'),
            'name_kana'         => $request->input('name_kana'),
            'email'             => $request->input('email'),
            'password'          => Hash::make($request->input('password')),
            'mobile_number'     => $request->input('mobile_number'),
            'employment_date'   => $request->input('employment_date'),
        ]);

        return to_route('users.index')
            ->with('message', "ユーザーID:{$user->id} 登録成功しました。");
    }

    public function edit(User $user): Response
    {
        return Inertia::render('User/Edit', [
            'user' => $user,
            'permissionSelectOptions' =>  Permission::all(),
        ]);
    }

    public function update(UserUpdateRequest $request, User $user): RedirectResponse
    {
        $user->update([
            'permission_id'     => $request->input('permission_id'),
            'employee_code'     => $request->input('employee_code'),
            'name'              => $request->input('name'),
            'name_kana'         => $request->input('name_kana'),
            'email'             => $request->input('email'),
            'mobile_number'     => $request->input('mobile_number'),
            'employment_date'   => $request->input('employment_date'),
            'resignation_date'  => $request->input('resignation_date'),
        ]);

        return to_route('users.index')
            ->with('message', "ユーザーID:{$user->id} 更新しました。");
    }
}
