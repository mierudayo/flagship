<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Auth Routes
|--------------------------------------------------------------------------
*/
Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])->name('logout');
});

/*
|--------------------------------------------------------------------------
| デモ環境 ゲストログイン
|--------------------------------------------------------------------------
*/
Route::middleware('guest')->group(function () {
    if (app()->environment(['local', 'staging'])) {
        Route::get('/demo', function () {
            $user = App\Models\User::where('name', 'ゲスト')->first();
            if (!$user) {
                $user = App\Models\User::factory()->create([
                    'name'          => 'ゲスト',
                    'permission_id' => App\Models\Permission::where('name', 'staff')->first()->id,
                    'resignation_date' => null,
                ]);
            }
            Auth::loginUsingId($user->id);
            return redirect('/');
        });
    }
});
