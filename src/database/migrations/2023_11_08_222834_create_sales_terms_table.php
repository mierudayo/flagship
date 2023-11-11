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
        Schema::create('sales_terms', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('customer_id')->comment('取引先ID');
            $table->tinyInteger('billing_type')->nullable()->default(2)->comment('請求タイプ');
            $table->integer('cutoff_day')->nullable()->comment('締日');
            $table->integer('payment_month_offset')->nullable()->comment('支払月');
            $table->integer('payment_day')->nullable()->comment('支払日');
            $table->integer('payment_day_offset')->nullable()->default(0)->comment('支払期限日数');
            $table->timestamps();

            // Foreign Key References
            $table->foreign('customer_id')->references('id')->on('customers')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales_terms', function (Blueprint $table) {
            $table->dropForeign(['customer_id']);
        });
        Schema::dropIfExists('sales_terms');
    }
};
