<?php

use App\Http\Controllers\CustomerContactController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\LogisticsAddressController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductCategoryGroupController;
use App\Http\Controllers\ProductController;
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
    Route::post('users', [UserController::class, 'store'])->name('users.store')->can('admin');
    Route::get('users/{user}/edit', [UserController::class, 'edit'])->name('users.edit')->can('admin');
    Route::patch('users/{user}', [UserController::class, 'update'])->name('users.update')->can('admin');

    // Customer
    Route::get('customers', [CustomerController::class, 'index'])->name('customers.index');
    Route::get('customers/create', [CustomerController::class, 'create'])->name('customers.create');
    Route::post('customers', [CustomerController::class, 'store'])->name('customers.store');
    Route::get('customers/{customer}', [CustomerController::class, 'show'])->name('customers.show');
    Route::get('customers/{customer}/edit', [CustomerController::class, 'edit'])->name('customers.edit');
    Route::patch('customers/{customer}', [CustomerController::class, 'update'])->name('customers.update');
    Route::delete('customers/{customer}', [CustomerController::class, 'destroy'])->name('customers.destroy');

    // CustomerContact
    Route::get('contacts', [CustomerContactController::class, 'index'])->name('contacts.index');
    Route::get('contacts/create', [CustomerContactController::class, 'create'])->name('contacts.create');
    Route::post('contacts', [CustomerContactController::class, 'store'])->name('contacts.store');
    Route::get('contacts/{contact}', [CustomerContactController::class, 'show'])->name('contacts.show');
    Route::get('contacts/{contact}/edit', [CustomerContactController::class, 'edit'])->name('contacts.edit');
    Route::patch('contacts/{contact}', [CustomerContactController::class, 'update'])->name('contacts.update');
    Route::delete('contacts/{contact}', [CustomerContactController::class, 'destroy'])->name('contacts.destroy');
    Route::post('customers/{customer}/contacts', [CustomerContactController::class, 'addContactToCustomer'])->name('customers.contacts.add');

    // LogisticsAddresses
    Route::post('customers/{customer}/logistics-addresses', [LogisticsAddressController::class, 'addLogisticsAddressToCustomer'])->name('customers.logistics-addresses.add');

    // Product
    Route::get('products', [ProductController::class, 'index'])->name('products.index');
    Route::post('products', [ProductController::class, 'store'])->name('products.store');
    Route::get('products/create', [ProductController::class, 'create'])->name('products.create');

    Route::post('product-category-group', [ProductCategoryGroupController::class, 'store'])->name('product-category-group.store');

    Route::post('product-category', [ProductCategoryController::class, 'store'])->name('product-category.store');
});


require __DIR__ . '/auth.php';
