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
        Schema::create('billing_address_customer', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('billing_address_id');
            $table->unsignedBigInteger('customer_id');
            $table->timestamps();

            $table->foreign('billing_address_id')
                ->references('id')
                ->on('billing_addresses')
                ->onDelete('cascade');

            $table->foreign('customer_id')
                ->references('id')
                ->on('customers')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('billing_address_customer');
    }
};
