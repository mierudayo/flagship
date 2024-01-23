<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('billing_addresses', function (Blueprint $table) {
            $table->id();
            $table->string('name')->collation('utf8mb4_bin')->unique();
            $table->string('name_kana')->nullable();
            $table->string('shortcut')->nullable();
            $table->string('billing_contact_name')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('address')->nullable();
            $table->string('tel')->nullable();
            $table->string('fax')->nullable();
            $table->string('email')->nullable();
            $table->string('invoice_delivery_method')->nullable();
            $table->text('note')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('billing_addresses');
    }
};
