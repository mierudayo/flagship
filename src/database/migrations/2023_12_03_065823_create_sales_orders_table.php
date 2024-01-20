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
        Schema::create('sales_orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('customer_id');
            $table->unsignedBigInteger('customer_contact_id')->nullable();
            $table->unsignedBigInteger('billing_address_id');
            $table->unsignedBigInteger('delivery_address_id')->nullable();
            $table->unsignedBigInteger('product_category_id');
            // 請求条件
            $table->tinyInteger('billing_type')->nullable()->default(2);
            $table->integer('cutoff_day')->nullable();
            $table->integer('payment_month_offset')->nullable();
            $table->integer('payment_day')->nullable();
            $table->integer('payment_day_offset')->nullable()->default(0);
            // 入金状況
            $table->date('payment_date')->nullable();
            $table->string('payment_status')->nullable();
            $table->string('customer_name');

            // 納品先情報
            $table->string('delivery_address')->nullable();
            $table->string('consignee_company')->nullable();
            $table->string('consignee_contact')->nullable();

            $table->date('order_date');
            $table->date('shipping_date')->nullable();
            $table->string('shipping_status')->nullable();
            $table->date('delivery_date')->nullable();
            $table->string('delivery_status')->nullable();
            $table->string('delivery_memo')->nullable();
            $table->text('note')->nullable();
            $table->unsignedBigInteger('sales_in_charge_id');
            $table->unsignedBigInteger('created_by_id');
            $table->unsignedBigInteger('updated_by_id')->nullable();
            $table->timestamps();

            // 外部キー制約
            $table->foreign('customer_id')
                ->references('id')
                ->on('customers')
                ->onDelete('restrict');

            $table->foreign('customer_contact_id')
                ->references('id')
                ->on('customer_contacts')
                ->onDelete('restrict');

            $table->foreign('billing_address_id')
                ->references('id')
                ->on('billing_addresses')
                ->onDelete('restrict');

            $table->foreign('delivery_address_id')
                ->references('id')
                ->on('delivery_addresses')
                ->onDelete('restrict');

            $table->foreign('product_category_id')
                ->references('id')
                ->on('product_categories')
                ->onDelete('restrict');

            $table->foreign('sales_in_charge_id')
                ->references('id')
                ->on('users')
                ->onDelete('restrict');

            $table->foreign('created_by_id')
                ->references('id')
                ->on('users')
                ->onDelete('restrict');

            $table->foreign('updated_by_id')
                ->references('id')
                ->on('users')
                ->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('sales_orders', function (Blueprint $table) {
            $table->dropForeign(['customer_id']);
            $table->dropForeign(['customer_contact_id']);
            $table->dropForeign(['billing_address_id']);
            $table->dropForeign(['delivery_address_id']);
            $table->dropForeign(['product_category_id']);
            $table->dropForeign(['sales_in_charge_id']);
            $table->dropForeign(['created_by_id']);
            $table->dropForeign(['updated_by_id']);
        });
        Schema::dropIfExists('sales_orders');
    }
};
