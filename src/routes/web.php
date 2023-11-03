<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Home');
    })->name('home');

    Route::get('users', [UserController::class, 'index'])->name('users.index');
    Route::get('users/create', [UserController::class, 'create'])->name('users.create')->can('admin');
    Route::post('users/store', [UserController::class, 'store'])->name('users.store')->can('admin');
    Route::get('users/{user}/edit', [UserController::class, 'edit'])->name('users.edit')->can('admin');
    Route::patch('users/{user}', [UserController::class, 'update'])->name('users.update')->can('admin');
});


require __DIR__ . '/auth.php';
