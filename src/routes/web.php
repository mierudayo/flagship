<?php

use App\Http\Controllers\CustomerContactController;
use App\Http\Controllers\CustomerController;
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

    // Customer
    Route::get('customers', [CustomerController::class, 'index'])->name('customers.index');
    Route::get('customers/create', [CustomerController::class, 'create'])->name('customers.create')->can('admin');
    Route::post('customers/store', [CustomerController::class, 'store'])->name('customers.store')->can('admin');
    Route::get('customers/{customer}', [CustomerController::class, 'show'])->name('customers.show');
    Route::get('customers/{customer}/edit', [CustomerController::class, 'edit'])->name('customers.edit')->can('admin');
    Route::patch('customers/{customer}', [CustomerController::class, 'update'])->name('customers.update')->can('admin');
    Route::delete('customers/{customer}', [CustomerController::class, 'destroy'])->name('customers.destroy')->can('admin');

    // CustomerContact
    Route::post('customers/{customer}/contacts', [CustomerContactController::class, 'store'])->name('customers.contacts.store');
});


require __DIR__ . '/auth.php';
