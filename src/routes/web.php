<?php

use App\Http\Controllers\Api\BillingAddressController as ApiBillingAddressController;
use App\Http\Controllers\Api\CustomerContactController as ApiCustomerContactController;
use App\Http\Controllers\Api\CustomerController as ApiCustomerController;
use App\Http\Controllers\BillingAddressController;
use App\Http\Controllers\CustomerContactController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\InquiryController;
use App\Http\Controllers\InquiryTypeController;
use App\Http\Controllers\DeliveryAddressController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LeadSourceController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductCategoryGroupController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SalesActivityController;
use App\Http\Controllers\SalesOrderController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');

    // API
    Route::get('api/customers', [ApiCustomerController::class, 'index']);
    Route::get('api/customers/{customer}', [ApiCustomerController::class, 'find']);
    Route::get('api/contacts', [ApiCustomerContactController::class, 'index']);
    Route::get('api/billing-addresses', [ApiBillingAddressController::class, 'index']);

    // User
    Route::middleware(['can:admin'])->group(function () {
        Route::get('users', [UserController::class, 'index'])->name('users.index');
        Route::get('users/create', [UserController::class, 'create'])->name('users.create');
        Route::post('users', [UserController::class, 'store'])->name('users.store');
        Route::get('users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
        Route::patch('users/{user}', [UserController::class, 'update'])->name('users.update');
    });

    // Customer
    Route::get('customers', [CustomerController::class, 'index'])->name('customers.index');
    Route::get('customers/create', [CustomerController::class, 'create'])->name('customers.create');
    Route::post('customers', [CustomerController::class, 'store'])->name('customers.store');
    Route::get('customers/{customer}', [CustomerController::class, 'show'])->name('customers.show');
    Route::get('customers/{customer}/edit', [CustomerController::class, 'edit'])->name('customers.edit');
    Route::patch('customers/{customer}', [CustomerController::class, 'update'])->name('customers.update');
    Route::delete('customers/{customer}', [CustomerController::class, 'destroy'])->name('customers.destroy');
    Route::patch('customers/{customer}/billing-addresses/attach', [CustomerController::class, 'attachBillingAddress'])
        ->name('customers.attach-billing-address');
    Route::post('customers/{customer}/billing-addresses/detach', [CustomerController::class, 'detachBillingAddress'])
        ->name('customers.detach-billing-address');



    // CustomerContact
    Route::get('contacts', [CustomerContactController::class, 'index'])->name('contacts.index');
    Route::get('contacts/create', [CustomerContactController::class, 'create'])->name('contacts.create');
    Route::post('contacts', [CustomerContactController::class, 'store'])->name('contacts.store');
    Route::get('contacts/{contact}', [CustomerContactController::class, 'show'])->name('contacts.show');
    Route::get('contacts/{contact}/edit', [CustomerContactController::class, 'edit'])->name('contacts.edit');
    Route::patch('contacts/{contact}', [CustomerContactController::class, 'update'])->name('contacts.update');
    Route::delete('contacts/{contact}', [CustomerContactController::class, 'destroy'])->name('contacts.destroy');
    Route::post('customers/{customer}/contacts', [CustomerContactController::class, 'addToCustomer'])->name('customers.contacts.add');

    // LeadSource
    Route::get('lead-sources', [LeadSourceController::class, 'index'])->name('lead-sources.index');
    Route::post('lead-sources', [LeadSourceController::class, 'store'])->name('lead-sources.store');

    // BillingAddress
    Route::get('billing-addresses', [BillingAddressController::class, 'index'])
        ->name('billing-addresses.index');
    Route::post('customers/{customer}/billing-addresses', [BillingAddressController::class, 'addToCustomer'])
        ->name('customers.billing-addresses.add');
    Route::get('billing-addresses/{billingAddress}', [BillingAddressController::class, 'show'])
        ->name('billing-addresses.show');
    Route::get('billing-addresses/{billingAddress}/edit', [BillingAddressController::class, 'edit'])
        ->name('billing-addresses.edit');
    Route::patch('billing-addresses/{billingAddress}', [BillingAddressController::class, 'update'])
        ->name('billing-addresses.update');

    // DeliveryAddress
    Route::post('customers/{customer}/delivery-addresses', [DeliveryAddressController::class, 'addToCustomer'])
        ->name('customers.delivery-addresses.add');

    // ProductCategoryGroup
    Route::post('product-category-groups', [ProductCategoryGroupController::class, 'store'])->name('product-category-groups.store');

    // ProductCategory
    Route::post('product-categories', [ProductCategoryController::class, 'store'])->name('product-categories.store');

    // Product
    Route::get('products', [ProductController::class, 'index'])->name('products.index');
    Route::get('products/create', [ProductController::class, 'create'])->name('products.create');
    Route::post('products', [ProductController::class, 'store'])->name('products.store');

    // InquiryType
    Route::get('inquiry-types', [InquiryTypeController::class, 'index'])->name('inquiry-types.index');
    Route::post('inquiry-types', [InquiryTypeController::class, 'store'])->name('inquiry-types.store');

    // Inquiry
    Route::get('inquiries', [InquiryController::class, 'index'])->name('inquiries.index');
    Route::get('inquiries/create', [InquiryController::class, 'create'])->name('inquiries.create');
    Route::post('inquiries', [InquiryController::class, 'store'])->name('inquiries.store');
    Route::get('inquiries/{inquiry}/edit', [InquiryController::class, 'edit'])->name('inquiries.edit');
    Route::patch('inquiries/{inquiry}', [InquiryController::class, 'update'])->name('inquiries.update');
    Route::delete('inquiries/{inquiry}', [InquiryController::class, 'destroy'])->name('inquiries.destroy');

    // SalesActivity
    Route::get('sales-activities', [SalesActivityController::class, 'index'])->name('sales-activities.index');
    Route::get('sales-activities/create', [SalesActivityController::class, 'create'])->name('sales-activities.create');
    Route::post('sales-activities', [SalesActivityController::class, 'store'])->name('sales-activities.store');
    Route::get('sales-activities/{salesActivity}/edit', [SalesActivityController::class, 'edit'])->name('sales-activities.edit');
    Route::patch('sales-activities/{salesActivity}', [SalesActivityController::class, 'update'])->name('sales-activities.update');
    Route::delete('sales-activities/{salesActivity}', [SalesActivityController::class, 'destroy'])->name('sales-activities.destroy');
    Route::post('customers/{customer}/sales-activities', [SalesActivityController::class, 'addToCustomerContact'])
        ->name('customers.contacts.sales-activities.add');

    // SalesOrder
    Route::get('sales-orders', [SalesOrderController::class, 'index'])->name('sales-orders.index');
    Route::get('sales-orders/create', [SalesOrderController::class, 'create'])->name('sales-orders.create');
    Route::post('sales-orders', [SalesOrderController::class, 'store'])->name('sales-orders.store');
    Route::get('sales-orders/{salesOrder}', [SalesOrderController::class, 'show'])->name('sales-orders.show');
    Route::get('sales-orders/{salesOrder}/edit', [SalesOrderController::class, 'edit'])->name('sales-orders.edit');
    Route::get('sales-orders/{salesOrder}/duplicate', [SalesOrderController::class, 'duplicate'])->name('sales-orders.duplicate');
    Route::patch('sales-orders/{salesOrder}', [SalesOrderController::class, 'update'])->name('sales-orders.update');
    Route::delete('sales-orders/{salesOrder}', [SalesOrderController::class, 'destroy'])->name('sales-orders.destroy');
});


require __DIR__ . '/auth.php';
