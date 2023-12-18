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
        Schema::create('sales_purchase_order_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sales_order_detail_id');
            $table->unsignedBigInteger('purchase_order_detail_id');
            $table->timestamps();

            $table->foreign('sales_order_detail_id')
                ->references('id')
                ->on('sales_order_details')
                ->onDelete('cascade');

            $table->foreign('purchase_order_detail_id')
                ->references('id')
                ->on('purchase_order_details')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales_purchase_order_details');
    }
};
